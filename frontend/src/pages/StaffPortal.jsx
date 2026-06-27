import React, { useContext, useState, useEffect } from 'react';
import { AssessmentContext, API_BASE_URL } from '../context/AssessmentContext';
import BulkUpload from '../components/BulkUpload';
import { Users, Plus, FileText, ClipboardList, Code2, CheckCircle2, Upload } from 'lucide-react';

const StaffPortal = () => {
  const { students, departments, isOnline } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedDept, setSelectedDept] = useState(departments[0]);

  // Filter students based on role and selected department
  const filteredStudents = students.filter(s => s.department === selectedDept);

  // Submissions State
  const [submissions, setSubmissions] = useState([]);
  const [assessments, setAssessments] = useState([]);

  // Add Question States
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('');
  const [quizQ, setQuizQ] = useState('');
  const [quizOptA, setQuizOptA] = useState('');
  const [quizOptB, setQuizOptB] = useState('');
  const [quizOptC, setQuizOptC] = useState('');
  const [quizOptD, setQuizOptD] = useState('');
  const [quizAns, setQuizAns] = useState('');

  // Add Coding Question States
  const [codeTitle, setCodeTitle] = useState('');
  const [codeDesc, setCodeDesc] = useState('');
  const [codeDiff, setCodeDiff] = useState('Easy');
  const [codeLang, setCodeLang] = useState('JavaScript');
  const [tcInput, setTcInput] = useState('');
  const [tcOutput, setTcOutput] = useState('');

  // Mock Fallbacks
  const mockSubmissions = [
    { id: "SUB001", type: "Quiz", studentId: "STU02", studentName: "Aditi Patel", department: "Information Technology", title: "Java Fundamentals Quiz", score: 100, details: "Scored 100%", submittedAt: new Date().toISOString() }
  ];

  const fetchAssessments = async () => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/assessments`);
        const data = await res.json();
        setAssessments(data.filter(a => a.type === 'Quiz'));
        if (data.length > 0) setSelectedAssessmentId(data[0].assessmentId);
      } catch (e) { console.error(e); }
    }
  };

  const fetchSubmissions = async () => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/submissions`);
        const data = await res.json();
        setSubmissions(data);
      } catch (e) { console.error(e); }
    } else {
      setSubmissions(mockSubmissions);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchAssessments();
  }, [isOnline]);

  // Quiz Question submission
  const handleAddQuizQuestion = async (e) => {
    e.preventDefault();
    if (!selectedAssessmentId || !quizQ || !quizOptA || !quizOptB || !quizAns) {
      return alert("Please fill in the question, first two options, and correct answer.");
    }

    const options = [quizOptA, quizOptB];
    if (quizOptC) options.push(quizOptC);
    if (quizOptD) options.push(quizOptD);

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/questions/quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentId: selectedAssessmentId,
            question: quizQ,
            options,
            answer: quizAns
          })
        });
        const data = await res.json();
        if (data.success) {
          alert("MCQ Question added successfully!");
          setQuizQ(''); setQuizOptA(''); setQuizOptB(''); setQuizOptC(''); setQuizOptD(''); setQuizAns('');
        }
      } catch (e) { alert("Error connecting to server."); }
    } else {
      alert("Offline Sandbox: Question saved to mock state (will not persist to DB).");
      setQuizQ(''); setQuizOptA(''); setQuizOptB(''); setQuizOptC(''); setQuizOptD(''); setQuizAns('');
    }
  };

  // Coding Question submission
  const handleAddCodingQuestion = async (e) => {
    e.preventDefault();
    if (!codeTitle || !codeDesc || !tcInput || !tcOutput) {
      return alert("Please enter title, description, and at least one test case.");
    }

    if (isOnline) {
      try {
        const res = await fetch('http://localhost:5000/api/trainer/questions/coding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: codeTitle,
            description: codeDesc,
            difficulty: codeDiff,
            language: [codeLang],
            testCases: [{ input: tcInput, output: tcOutput }]
          })
        });
        const data = await res.json();
        if (data.success) {
          alert("Coding Sandbox Question added successfully!");
          setCodeTitle(''); setCodeDesc(''); setTcInput(''); setTcOutput('');
        }
      } catch (e) { alert("Error connecting to server."); }
    } else {
      alert("Offline Sandbox: Coding question added to mock state.");
      setCodeTitle(''); setCodeDesc(''); setTcInput(''); setTcOutput('');
    }
  };

  const renderDirectory = () => (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Syllabus Student Directory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Manage enrollment whitelist and evaluate academic level metrics.</p>
        </div>
        <select 
          className="cyber-select" 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{ width: '260px' }}
        >
          {departments.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Registered</th>
              <th>Quiz Status</th>
              <th>Coding Status</th>
              <th>Points Balance</th>
              <th>Developer Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={idx}>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{student.id}</td>
                <td style={{ fontWeight: '500' }}>{student.name}</td>
                <td>
                  <span style={{ color: student.registered ? '#10b981' : 'var(--text-muted)', display: 'flex', gap: '4px', alignItems: 'center', fontSize: '13px' }}>
                    <CheckCircle2 size={14} /> {student.registered ? 'Active' : 'Unregistered'}
                  </span>
                </td>
                <td>
                  {student.completedQuiz ? (
                    <span className="cyber-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Completed ({student.quizScore}%)</span>
                  ) : <span style={{ color: 'var(--text-muted)' }}>Pending</span>}
                </td>
                <td>
                  {student.completedCoding ? (
                    <span className="cyber-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Completed ({student.codingScore}%)</span>
                  ) : <span style={{ color: 'var(--text-muted)' }}>Pending</span>}
                </td>
                <td style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>{student.points} pts</td>
                <td>
                  <span className="cyber-badge" style={{ fontSize: '10px', background: 'rgba(0,191,255,0.05)', borderColor: 'rgba(0,191,255,0.2)' }}>
                    {student.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAddQuiz = () => (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Upload MCQ Quiz Question</h2>
      <form onSubmit={handleAddQuizQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
        <div>
          <label className="cyber-label">Select Associated Quiz Assessment</label>
          <select className="cyber-select" value={selectedAssessmentId} onChange={(e) => setSelectedAssessmentId(e.target.value)}>
            {assessments.map((a, i) => (
              <option key={i} value={a.assessmentId}>{a.title} ({a.assessmentId})</option>
            ))}
            {assessments.length === 0 && (
              <option value="ASM001">Java Fundamentals Quiz (ASM001)</option>
            )}
          </select>
        </div>

        <div>
          <label className="cyber-label">Question Text</label>
          <input type="text" placeholder="e.g. What does JVM stand for?" className="cyber-input" value={quizQ} onChange={(e) => setQuizQ(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label className="cyber-label">Option A</label>
            <input type="text" className="cyber-input" value={quizOptA} onChange={(e) => setQuizOptA(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Option B</label>
            <input type="text" className="cyber-input" value={quizOptB} onChange={(e) => setQuizOptB(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Option C</label>
            <input type="text" className="cyber-input" value={quizOptC} onChange={(e) => setQuizOptC(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Option D</label>
            <input type="text" className="cyber-input" value={quizOptD} onChange={(e) => setQuizOptD(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="cyber-label">Correct Answer (Write exact text matching the option)</label>
          <input type="text" placeholder="e.g. Java Virtual Machine" className="cyber-input" value={quizAns} onChange={(e) => setQuizAns(e.target.value)} />
        </div>

        <button type="submit" className="btn-neon" style={{ marginTop: '10px' }}>Upload Question</button>
      </form>
    </div>
  );

  const renderAddCoding = () => (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Upload Coding Challenge Problem</h2>
      <form onSubmit={handleAddCodingQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
        <div>
          <label className="cyber-label">Challenge Title</label>
          <input type="text" placeholder="e.g. Fibonacci Numbers" className="cyber-input" value={codeTitle} onChange={(e) => setCodeTitle(e.target.value)} />
        </div>

        <div>
          <label className="cyber-label">Problem Description</label>
          <textarea rows={4} placeholder="Write instructions, constraints, and inputs..." className="cyber-input" style={{ fontFamily: 'var(--font-cyber)', resize: 'vertical' }} value={codeDesc} onChange={(e) => setCodeDesc(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label className="cyber-label">Difficulty</label>
            <select className="cyber-select" value={codeDiff} onChange={(e) => setCodeDiff(e.target.value)}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="cyber-label">Primary Language Sandbox</label>
            <select className="cyber-select" value={codeLang} onChange={(e) => setCodeLang(e.target.value)}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label className="cyber-label">Test Case Input</label>
            <input type="text" placeholder="e.g. 5" className="cyber-input" value={tcInput} onChange={(e) => setTcInput(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Expected Output</label>
            <input type="text" placeholder="e.g. 5" className="cyber-input" value={tcOutput} onChange={(e) => setTcOutput(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn-neon" style={{ marginTop: '10px' }}>Publish Problem</button>
      </form>
    </div>
  );

  const renderEvaluations = () => (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Submitted Academic Assessments</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Review and verify student compiler outputs and quiz scores.</p>
      
      <div style={{ overflowX: 'auto' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Submitted Time</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Task</th>
              <th>Category</th>
              <th>Score / Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={idx}>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>
                  {new Date(sub.submittedAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{sub.studentId}</td>
                <td style={{ fontWeight: '500' }}>{sub.studentName}</td>
                <td style={{ fontWeight: '500' }}>{sub.title}</td>
                <td>
                  <span className="cyber-badge" style={{ borderColor: sub.type === 'Quiz' ? 'var(--primary-blue)' : 'var(--secondary-cyan)', color: sub.type === 'Quiz' ? 'var(--primary-blue)' : 'var(--secondary-cyan)', background: 'transparent' }}>
                    {sub.type}
                  </span>
                </td>
                <td style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>{sub.details}</td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No student submissions logged yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <ClipboardList size={12} style={{ marginRight: '4px' }} /> ACADEMIC INSTRUCTOR PORTAL
          </div>
          <h1 className="page-title">
            Trainer <span>{activeTab.toUpperCase()} View</span>
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('directory')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'directory' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Student Cohorts
        </button>
        <button onClick={() => setActiveTab('addquiz')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'addquiz' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Add MCQ Question
        </button>
        <button onClick={() => setActiveTab('addcoding')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'addcoding' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Add Coding Task
        </button>
        <button onClick={() => setActiveTab('evals')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'evals' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Evaluate Submissions
        </button>
        <button onClick={() => setActiveTab('bulk')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'bulk' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Bulk Upload
        </button>
      </div>

      {activeTab === 'directory' && renderDirectory()}
      {activeTab === 'addquiz' && renderAddQuiz()}
      {activeTab === 'addcoding' && renderAddCoding()}
      {activeTab === 'evals' && renderEvaluations()}
      {activeTab === 'bulk' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <BulkUpload />
        </div>
      )}
    </div>
  );
};

export default StaffPortal;
