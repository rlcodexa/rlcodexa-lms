import React, { useState, useContext } from 'react';
import { AssessmentContext, API_BASE_URL } from '../context/AssessmentContext';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import './BulkUpload.css';

const BulkUpload = ({ onComplete }) => {
  const { isOnline, addActivityLog } = useContext(AssessmentContext);
  const [file, setFile] = useState(null);
  const [jsonInput, setJsonInput] = useState('');
  const [mode, setMode] = useState('file'); // 'file' | 'json'
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [results, setResults] = useState(null);
  const [assessmentId, setAssessmentId] = useState('ASM001');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setStatus(null);
    setMessage('');
  };

  const validateQuestions = (questions) => {
    if (!Array.isArray(questions) || questions.length === 0) {
      return { valid: false, error: 'File must contain a non-empty array of questions.' };
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length < 2 || !q.answer) {
        return { valid: false, error: `Question ${i + 1} is missing required fields (question, options[], answer).` };
      }
    }
    return { valid: true, count: questions.length };
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const qIdx = headers.indexOf('question');
    const optA = headers.indexOf('optiona') !== -1 ? headers.indexOf('optiona') : headers.indexOf('option_a');
    const optB = headers.indexOf('optionb') !== -1 ? headers.indexOf('optionb') : headers.indexOf('option_b');
    const optC = headers.indexOf('optionc') !== -1 ? headers.indexOf('optionc') : headers.indexOf('option_c');
    const optD = headers.indexOf('optiond') !== -1 ? headers.indexOf('optiond') : headers.indexOf('option_d');
    const ansIdx = headers.indexOf('answer');

    if (qIdx === -1 || optA === -1 || optB === -1 || ansIdx === -1) {
      return null;
    }

    const questions = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      const options = [cols[optA], cols[optB]];
      if (optC !== -1 && cols[optC]) options.push(cols[optC]);
      if (optD !== -1 && cols[optD]) options.push(cols[optD]);

      questions.push({
        question: cols[qIdx],
        options,
        answer: cols[ansIdx],
        module: cols[headers.indexOf('module')] || 'General'
      });
    }
    return questions;
  };

  const handleUpload = async () => {
    let questions = null;

    if (mode === 'file' && file) {
      const text = await file.text();
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'json') {
        try {
          questions = JSON.parse(text);
        } catch (e) {
          setStatus('error');
          setMessage('Invalid JSON format. Please check the file contents.');
          return;
        }
      } else if (ext === 'csv') {
        questions = parseCSV(text);
        if (!questions) {
          setStatus('error');
          setMessage('Invalid CSV format. Required columns: question, optionA, optionB, answer. Optional: optionC, optionD, module.');
          return;
        }
      } else {
        setStatus('error');
        setMessage('Unsupported file format. Use .json or .csv.');
        return;
      }
    } else if (mode === 'json' && jsonInput.trim()) {
      try {
        questions = JSON.parse(jsonInput.trim());
      } catch (e) {
        setStatus('error');
        setMessage('Invalid JSON format. Please check your input.');
        return;
      }
    } else {
      setStatus('error');
      setMessage('Please select a file or paste JSON data.');
      return;
    }

    const validation = validateQuestions(questions);
    if (!validation.valid) {
      setStatus('error');
      setMessage(validation.error);
      return;
    }

    setStatus('loading');
    setMessage(`Uploading ${validation.count} questions...`);

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/questions/bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentId,
            questions
          })
        });
        const data = await res.json();
        if (data.success) {
          setStatus('success');
          setMessage(`Successfully uploaded ${data.count || validation.count} questions.`);
          setResults(data);
          addActivityLog('Staff', 'staff', 'BULK_UPLOAD', `Uploaded ${validation.count} questions via bulk upload.`);
          if (onComplete) onComplete(data);
        } else {
          setStatus('error');
          setMessage(data.message || 'Upload failed on server.');
        }
      } catch (e) {
        setStatus('error');
        setMessage('Network error during upload. Check connection and try again.');
      }
    } else {
      // Offline: store in localStorage
      const existing = JSON.parse(localStorage.getItem('codegate_v2_bulk_questions') || '[]');
      const newQuestions = questions.map((q, i) => ({
        ...q,
        id: `BULK-${Date.now()}-${i}`,
        assessmentId,
        uploadedAt: new Date().toISOString()
      }));
      localStorage.setItem('codegate_v2_bulk_questions', JSON.stringify([...existing, ...newQuestions]));
      setStatus('success');
      setMessage(`Offline: ${validation.count} questions saved to local storage.`);
      setResults({ count: validation.count, offline: true });
      addActivityLog('Staff', 'staff', 'BULK_UPLOAD', `Offline bulk upload: ${validation.count} questions saved locally.`);
      if (onComplete) onComplete({ count: validation.count, offline: true });
    }
  };

  const resetForm = () => {
    setFile(null);
    setJsonInput('');
    setStatus(null);
    setMessage('');
    setResults(null);
  };

  const acceptedFormats = '.json,.csv';

  return (
    <div className="bulk-upload-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Upload size={18} color="var(--primary-blue)" />
        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Bulk Question Upload</h3>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
        <button
          className={`bulk-mode-btn ${mode === 'file' ? 'active' : ''}`}
          onClick={() => setMode('file')}
        >
          <FileText size={14} /> Upload File
        </button>
        <button
          className={`bulk-mode-btn ${mode === 'json' ? 'active' : ''}`}
          onClick={() => setMode('json')}
        >
          <Upload size={14} /> Paste JSON
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label className="cyber-label">Assessment ID</label>
        <input
          type="text"
          className="cyber-input"
          value={assessmentId}
          onChange={(e) => setAssessmentId(e.target.value)}
          placeholder="e.g. ASM001"
          style={{ maxWidth: '200px' }}
        />
      </div>

      {mode === 'file' ? (
        <div
          className="bulk-drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dropped = e.dataTransfer.files[0];
            if (dropped && (dropped.name.endsWith('.json') || dropped.name.endsWith('.csv'))) {
              setFile(dropped);
              setStatus(null);
              setMessage('');
            }
          }}
        >
          <input
            type="file"
            accept={acceptedFormats}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="bulk-file-input"
          />
          <label htmlFor="bulk-file-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Upload size={32} color="var(--primary-blue)" />
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {file ? file.name : 'Click or drag a .json or .csv file here'}
            </span>
            {file && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            )}
          </label>
        </div>
      ) : (
        <div>
          <textarea
            className="cyber-input"
            rows={10}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`[\n  {\n    "question": "What is 2+2?",\n    "options": ["3", "4", "5", "6"],\n    "answer": "4",\n    "module": "Module 1"\n  }\n]`}
            style={{ width: '100%', fontFamily: 'var(--font-code)', fontSize: '13px', resize: 'vertical' }}
          />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Paste a JSON array of question objects. Each needs: question, options[], answer, optional: module.
          </p>
        </div>
      )}

      {message && (
        <div className={`bulk-status ${status === 'success' ? 'bulk-status-success' : status === 'error' ? 'bulk-status-error' : 'bulk-status-loading'}`}>
          {status === 'success' ? <CheckCircle size={16} /> : status === 'error' ? <AlertCircle size={16} /> : <Upload size={16} />}
          <span>{message}</span>
          {(status === 'success' || status === 'error') && (
            <button onClick={resetForm} className="bulk-dismiss-btn"><X size={14} /></button>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          className="btn-neon"
          onClick={handleUpload}
          disabled={status === 'loading'}
          style={{ opacity: status === 'loading' ? 0.6 : 1 }}
        >
          {status === 'loading' ? 'Uploading...' : 'Upload Questions'}
        </button>
        {(status === 'success' || status === 'error') && (
          <button className="btn-cyber-outline" onClick={resetForm}>
            Upload Another Batch
          </button>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(15,23,42,0.5)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>File Format Guide</h4>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
          <strong>JSON format:</strong>
          <pre style={{ background: '#010409', padding: '8px', borderRadius: '4px', margin: '4px 0', fontSize: '11px' }}>
{`[
  {
    "question": "What is a variable?",
    "options": ["A named memory location", "A function", "A loop", "A class"],
    "answer": "A named memory location",
    "module": "Module 1"
  }
]`}
          </pre>
          <strong>CSV format:</strong>
          <pre style={{ background: '#010409', padding: '8px', borderRadius: '4px', margin: '4px 0', fontSize: '11px' }}>
{`question,optionA,optionB,optionC,optionD,answer,module
"What is a variable?","A named location","A function","A loop","A class","A named location","Module 1"`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
