import React, { useState, useContext } from 'react';
import { AssessmentContext, API_BASE_URL } from '../context/AssessmentContext';
import { Upload, FileText, CheckCircle, AlertCircle, X, HelpCircle, Code2 } from 'lucide-react';
import './BulkUpload.css';

const BulkUpload = ({ onComplete }) => {
  const { isOnline, addActivityLog } = useContext(AssessmentContext);
  const [uploadType, setUploadType] = useState('mcq'); // 'mcq' | 'coding'
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

  const validateQuestions = (questions, type) => {
    if (!Array.isArray(questions) || questions.length === 0) {
      return { valid: false, error: 'File must contain a non-empty array of questions.' };
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (type === 'coding') {
        if (!q.title || !(q.desc || q.description)) {
          return { valid: false, error: `Coding Challenge ${i + 1} is missing required fields (title, desc/description).` };
        }
      } else {
        if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length < 2 || !q.answer) {
          return { valid: false, error: `Question ${i + 1} is missing required fields (question, options[], answer).` };
        }
      }
    }
    return { valid: true, count: questions.length };
  };

  const parseCSVRow = (row) => {
    const result = [];
    let inQuotes = false;
    let entry = '';
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(entry.trim());
        entry = '';
      } else {
        entry += char;
      }
    }
    result.push(entry.trim());
    return result;
  };

  const parseCSV = (text, type) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return null;

    const headers = parseCSVRow(lines[0]).map(h => h.toLowerCase().replace(/^["']|["']$/g, ''));

    if (type === 'coding') {
      const titleIdx = headers.indexOf('title');
      const descIdx = headers.indexOf('desc') !== -1 ? headers.indexOf('desc') : headers.indexOf('description');
      const diffIdx = headers.indexOf('difficulty');
      const langIdx = headers.indexOf('language');
      const inputIdx = headers.indexOf('inputexample') !== -1 ? headers.indexOf('inputexample') : headers.indexOf('input_example');
      const outputIdx = headers.indexOf('outputexample') !== -1 ? headers.indexOf('outputexample') : headers.indexOf('output_example');
      const constraintsIdx = headers.indexOf('constraints');
      const tempPyIdx = headers.indexOf('template_python');
      const tempJavaIdx = headers.indexOf('template_java');
      const tempJsIdx = headers.indexOf('template_javascript');
      const tempSqlIdx = headers.indexOf('template_sql');
      const verifyIdx = headers.indexOf('verify_keyword') !== -1 ? headers.indexOf('verify_keyword') : headers.indexOf('verifykeyword');

      if (titleIdx === -1 || descIdx === -1) {
        return null;
      }

      const questions = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVRow(lines[i]);
        if (cols.length <= Math.max(titleIdx, descIdx)) continue;

        const constraintsVal = cols[constraintsIdx]
          ? cols[constraintsIdx].split(/[;|]/).map(c => c.trim().replace(/^["']|["']$/g, ''))
          : [];

        const templates = {};
        if (tempPyIdx !== -1 && cols[tempPyIdx]) templates.python = cols[tempPyIdx].replace(/\\n/g, '\n').replace(/^["']|["']$/g, '');
        if (tempJavaIdx !== -1 && cols[tempJavaIdx]) templates.java = cols[tempJavaIdx].replace(/\\n/g, '\n').replace(/^["']|["']$/g, '');
        if (tempJsIdx !== -1 && cols[tempJsIdx]) templates.javascript = cols[tempJsIdx].replace(/\\n/g, '\n').replace(/^["']|["']$/g, '');
        if (tempSqlIdx !== -1 && cols[tempSqlIdx]) templates.sql = cols[tempSqlIdx].replace(/\\n/g, '\n').replace(/^["']|["']$/g, '');

        questions.push({
          title: cols[titleIdx].replace(/^["']|["']$/g, ''),
          desc: cols[descIdx].replace(/^["']|["']$/g, ''),
          difficulty: diffIdx !== -1 && cols[diffIdx] ? cols[diffIdx].replace(/^["']|["']$/g, '') : 'Easy',
          language: langIdx !== -1 && cols[langIdx] ? cols[langIdx].replace(/^["']|["']$/g, '') : 'JavaScript',
          inputExample: inputIdx !== -1 && cols[inputIdx] ? cols[inputIdx].replace(/^["']|["']$/g, '') : '',
          outputExample: outputIdx !== -1 && cols[outputIdx] ? cols[outputIdx].replace(/^["']|["']$/g, '') : '',
          constraints: constraintsVal,
          templates: Object.keys(templates).length > 0 ? templates : null,
          verifyKeyword: verifyIdx !== -1 && cols[verifyIdx] ? cols[verifyIdx].replace(/^["']|["']$/g, '') : ''
        });
      }
      return questions;
    } else {
      // MCQ
      const qIdx = headers.indexOf('question');
      const optA = headers.indexOf('optiona') !== -1 ? headers.indexOf('optiona') : headers.indexOf('option_a');
      const optB = headers.indexOf('optionb') !== -1 ? headers.indexOf('optionb') : headers.indexOf('option_b');
      const optC = headers.indexOf('optionc') !== -1 ? headers.indexOf('optionc') : headers.indexOf('option_c');
      const optD = headers.indexOf('optiond') !== -1 ? headers.indexOf('optiond') : headers.indexOf('option_d');
      const ansIdx = headers.indexOf('answer');
      const modIdx = headers.indexOf('module');

      if (qIdx === -1 || optA === -1 || optB === -1 || ansIdx === -1) {
        return null;
      }

      const questions = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVRow(lines[i]);
        if (cols.length <= Math.max(qIdx, optA, optB, ansIdx)) continue;

        const options = [cols[optA].replace(/^["']|["']$/g, ''), cols[optB].replace(/^["']|["']$/g, '')];
        if (optC !== -1 && cols[optC]) options.push(cols[optC].replace(/^["']|["']$/g, ''));
        if (optD !== -1 && cols[optD]) options.push(cols[optD].replace(/^["']|["']$/g, ''));

        questions.push({
          question: cols[qIdx].replace(/^["']|["']$/g, ''),
          options,
          answer: cols[ansIdx].replace(/^["']|["']$/g, ''),
          module: modIdx !== -1 && cols[modIdx] ? cols[modIdx].replace(/^["']|["']$/g, '') : 'General'
        });
      }
      return questions;
    }
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
        questions = parseCSV(text, uploadType);
        if (!questions) {
          setStatus('error');
          if (uploadType === 'coding') {
            setMessage('Invalid CSV format. Required columns: title, desc/description. Optional: difficulty, language, inputExample, outputExample, constraints, template_python, template_java, template_javascript, template_sql, verify_keyword.');
          } else {
            setMessage('Invalid CSV format. Required columns: question, optionA, optionB, answer. Optional: optionC, optionD, module.');
          }
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

    const validation = validateQuestions(questions, uploadType);
    if (!validation.valid) {
      setStatus('error');
      setMessage(validation.error);
      return;
    }

    setStatus('loading');
    setMessage(`Uploading ${validation.count} ${uploadType.toUpperCase()} entries...`);

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/questions/bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentId,
            type: uploadType,
            questions
          })
        });
        const data = await res.json();
        if (data.success) {
          setStatus('success');
          setMessage(`Successfully uploaded ${data.count || validation.count} questions.`);
          setResults(data);
          addActivityLog('Staff', 'staff', 'BULK_UPLOAD', `Uploaded ${validation.count} ${uploadType} items via bulk upload.`);
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
      // Offline fallback: save to localStorage
      const existing = JSON.parse(localStorage.getItem('codegate_v2_bulk_questions') || '[]');
      const newQuestions = questions.map((q, i) => ({
        ...q,
        id: `BULK-${Date.now()}-${i}`,
        type: uploadType,
        assessmentId,
        uploadedAt: new Date().toISOString()
      }));
      localStorage.setItem('codegate_v2_bulk_questions', JSON.stringify([...existing, ...newQuestions]));
      setStatus('success');
      setMessage(`Offline Sandbox: ${validation.count} questions saved to local storage.`);
      setResults({ count: validation.count, offline: true });
      addActivityLog('Staff', 'staff', 'BULK_UPLOAD', `Offline bulk upload: ${validation.count} ${uploadType} items saved locally.`);
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

  const mcqPlaceholder = `[\n  {\n    "question": "What is a variable?",\n    "options": ["A named location", "A function", "A loop", "A class"],\n    "answer": "A named location",\n    "module": "Module 1"\n  }\n]`;

  const codingPlaceholder = `[\n  {\n    "title": "Reverse Array",\n    "desc": "Write a function that reverses an array in-place.",\n    "difficulty": "Easy",\n    "language": "Python",\n    "inputExample": "[1, 2, 3]",\n    "outputExample": "[3, 2, 1]",\n    "constraints": ["1 <= length <= 100"]\n  }\n]`;

  return (
    <div className="bulk-upload-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Upload size={18} color="var(--primary-blue)" />
        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Bulk Upload Centre</h3>
      </div>

      {/* Upload Type Tabs */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
        <button
          className={`bulk-mode-btn ${uploadType === 'mcq' ? 'active' : ''}`}
          onClick={() => { setUploadType('mcq'); resetForm(); }}
          style={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <HelpCircle size={14} /> MCQ Questions
        </button>
        <button
          className={`bulk-mode-btn ${uploadType === 'coding' ? 'active' : ''}`}
          onClick={() => { setUploadType('coding'); resetForm(); }}
          style={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <Code2 size={14} /> Coding Tasks
        </button>
      </div>

      {/* Mode selectors */}
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
        <label className="cyber-label">Associated Assessment ID</label>
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
              {file ? file.name : `Click or drag a .json or .csv ${uploadType.toUpperCase()} file here`}
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
            placeholder={uploadType === 'coding' ? codingPlaceholder : mcqPlaceholder}
            style={{ width: '100%', fontFamily: 'var(--font-code)', fontSize: '13px', resize: 'vertical' }}
          />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            {uploadType === 'coding'
              ? 'Paste a JSON array of coding question objects. Required fields: title, desc. Optional: difficulty, language, inputExample, outputExample, constraints.'
              : 'Paste a JSON array of MCQ question objects. Required fields: question, options[] (array), answer. Optional: module.'}
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
          {status === 'loading' ? 'Uploading...' : `Upload ${uploadType === 'coding' ? 'Coding Tasks' : 'MCQs'}`}
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
          {uploadType === 'coding' ? (
            <>
              <strong>JSON Format:</strong>
              <pre style={{ background: '#010409', padding: '8px', borderRadius: '4px', margin: '4px 0', fontSize: '11px', overflowX: 'auto' }}>
{`[
  {
    "title": "Fibonacci Range",
    "desc": "Return the first n Fibonacci numbers as a list.",
    "difficulty": "Easy",
    "language": "Python",
    "inputExample": "5",
    "outputExample": "[0, 1, 1, 2, 3]",
    "constraints": ["n >= 1", "n <= 30"]
  }
]`}
              </pre>
              <strong>CSV Format:</strong>
              <p style={{ margin: '4px 0', fontSize: '11px', color: 'var(--text-muted)' }}>
                Header row: <code>title,desc,difficulty,language,inputExample,outputExample,constraints</code>
              </p>
              <pre style={{ background: '#010409', padding: '8px', borderRadius: '4px', margin: '4px 0', fontSize: '11px', overflowX: 'auto' }}>
{`title,desc,difficulty,language,inputExample,outputExample,constraints
"Fibonacci Range","Return first n Fibonacci numbers","Easy","Python","5","[0, 1, 1, 2, 3]","n >= 1; n <= 30"`}
              </pre>
            </>
          ) : (
            <>
              <strong>JSON Format:</strong>
              <pre style={{ background: '#010409', padding: '8px', borderRadius: '4px', margin: '4px 0', fontSize: '11px', overflowX: 'auto' }}>
{`[
  {
    "question": "What is a variable?",
    "options": ["A named memory location", "A function", "A loop", "A class"],
    "answer": "A named memory location",
    "module": "Module 1"
  }
]`}
              </pre>
              <strong>CSV Format:</strong>
              <p style={{ margin: '4px 0', fontSize: '11px', color: 'var(--text-muted)' }}>
                Header row: <code>question,optionA,optionB,optionC,optionD,answer,module</code>
              </p>
              <pre style={{ background: '#010409', padding: '8px', borderRadius: '4px', margin: '4px 0', fontSize: '11px', overflowX: 'auto' }}>
{`question,optionA,optionB,optionC,optionD,answer,module
"What is a variable?","A named location","A function","A loop","A class","A named location","Module 1"`}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
