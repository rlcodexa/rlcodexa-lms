import React, { useContext, useState, useEffect } from 'react';
import { AssessmentContext, API_BASE_URL } from '../context/AssessmentContext';
import BulkUpload from '../components/BulkUpload';
import { Users, Plus, FileText, ClipboardList, Code2, CheckCircle2, Upload, BookOpen, HelpCircle } from 'lucide-react';

const StaffPortal = ({ mode }) => {
  const { students, departments, isOnline, currentUser } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState(mode || 'directory');
  const [selectedDept, setSelectedDept] = useState(
    currentUser?.department || (departments[0]?.departmentName || '')
  );

  // Sync selectedDept if it is empty and departments loads
  useEffect(() => {
    if (!selectedDept && departments && departments.length > 0) {
      const trainerDept = currentUser?.department;
      if (trainerDept && departments.some(d => d.departmentName === trainerDept)) {
        setSelectedDept(trainerDept);
      } else {
        setSelectedDept(departments[0].departmentName);
      }
    }
  }, [departments, currentUser, selectedDept]);

  // Sync activeTab when mode changes from sidebar/dashboard clicks
  useEffect(() => {
    if (mode) {
      setActiveTab(mode);
    }
  }, [mode]);

  // Answer Keys states
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [codingQuestions, setCodingQuestions] = useState([]);
  const [keysLoading, setKeysLoading] = useState(false);
  const [activeKeySubTab, setActiveKeySubTab] = useState('mcq');
import { Users, Plus, FileText, ClipboardList, Code2, CheckCircle2, Upload, Lock, Unlock } from 'lucide-react';

const StaffPortal = () => {
  const { students, departments, modules, isOnline, fetchBackendData } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedDept, setSelectedDept] = useState(departments[0]);

  const handleToggleModule = async (studentId, moduleId, isCurrentlyUnlocked) => {
    const endpoint = isCurrentlyUnlocked ? 'lock' : 'unlock';
    try {
      const res = await fetch(`${API_BASE_URL}/trainer/students/${studentId}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId })
      });
      const data = await res.json();
      if (data.success) {
        if (fetchBackendData) {
          await fetchBackendData();
        }
      }
    } catch (e) {
      console.error("Error toggling module access:", e);
    }
  };

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
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [codeModule, setCodeModule] = useState('Module 1');
  const [customModule, setCustomModule] = useState('');

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

  const loadAnswerKeys = async () => {
    setKeysLoading(true);
    if (isOnline) {
      try {
        const codRes = await fetch(`${API_BASE_URL}/student/questions/coding`);
        const codData = await codRes.json();
        setCodingQuestions(Array.isArray(codData) ? codData : []);

        const quizRes = await fetch(`${API_BASE_URL}/student/questions/quiz/${selectedAssessmentId || 'ASM001'}`);
        const quizData = await quizRes.json();
        setMcqQuestions(Array.isArray(quizData) ? quizData : []);
      } catch (e) {
        console.error("Error loading answer keys:", e);
      }
    } else {
      // Offline fallback: parse codingModules and localStorage bulk questions
      const offlineCoding = [];
      try {
        const { CODING_LANGUAGES } = await import('../data/codingModules');
        CODING_LANGUAGES.forEach(langObj => {
          if (langObj.modules) {
            langObj.modules.forEach(mod => {
              if (mod.subModules) {
                mod.subModules.forEach(sub => {
                  if (sub.questions) {
                    sub.questions.forEach(q => {
                      if (!offlineCoding.some(item => item.title === q.title)) {
                        offlineCoding.push({
                          codingQuestionId: q.id,
                          title: q.title,
                          description: q.desc,
                          difficulty: 'Sandbox',
                          language: [langObj.title],
                          testCases: q.inputExample ? [{ input: q.inputExample, output: q.outputExample }] : [],
                          module: mod.title
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      } catch (err) {
        console.error("Error loading offline coding modules:", err);
      }

      const localBulk = JSON.parse(localStorage.getItem('codegate_v2_bulk_questions') || '[]');
      const bulkCoding = localBulk.filter(q => q.type === 'coding');
      const bulkMcq = localBulk.filter(q => q.type === 'mcq' || !q.type);

      setCodingQuestions([...offlineCoding, ...bulkCoding]);

      const mockMcqs = [
        { question: "Which of the following is NOT a primitive data type in Java?", options: ["int", "double", "String", "boolean"], answer: "String", module: "Java Fundamentals" },
        { question: "What is the size of an int data type in Java?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], answer: "32 bits", module: "Java Fundamentals" },
        { question: "Which operator is used to compare two values in Java?", options: ["=", "==", "equals", "match"], answer: "==", module: "Operators" },
        { question: "What does the 'break' statement do in a loop?", options: ["Skips one iteration", "Exits the loop", "Restarts the loop", "Throws an exception"], answer: "Exits the loop", module: "Control Flow" }
      ];
      setMcqQuestions([...mockMcqs, ...bulkMcq]);
    }
    setKeysLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'keys') {
      loadAnswerKeys();
    }
  }, [activeTab, selectedAssessmentId, isOnline]);

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
    const validTestCases = testCases.filter(tc => tc.input.trim() !== '' && tc.output.trim() !== '');
    if (!codeTitle || !codeDesc || validTestCases.length === 0) {
      return alert("Please enter title, description, and at least one valid test case.");
    }

    const selectedModule = codeModule === 'Other' ? customModule : codeModule;

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
            testCases: validTestCases,
            module: selectedModule
          })
        });
        const data = await res.json();
        if (data.success) {
          alert("Coding Sandbox Question added successfully!");
          setCodeTitle(''); setCodeDesc(''); setTestCases([{ input: '', output: '' }]); setCustomModule('');
        }
      } catch (e) { alert("Error connecting to server."); }
    } else {
      alert(`Offline Sandbox: Coding question added under ${selectedModule} to mock state.`);
      setCodeTitle(''); setCodeDesc(''); setTestCases([{ input: '', output: '' }]); setCustomModule('');
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
            <option key={i} value={d.departmentName}>{d.departmentName}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Registered</th>
              <th>Quiz Status</th>
              <th>Coding Status</th>
              <th>Points Balance</th>
              <th>Developer Level</th>
              <th>Module Access</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: student.isOnline ? '#10b981' : '#64748b',
                      boxShadow: student.isOnline ? '0 0 8px #10b981' : 'none',
                      marginRight: '6px'
                    }}></span>
                    <span style={{ fontSize: '12px', color: student.isOnline ? '#10b981' : 'var(--text-muted)' }}>
                      {student.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{student.id}</td>
                <td style={{ fontWeight: '500' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0,191,255,0.1)',
                      border: '1px solid rgba(0,191,255,0.3)',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img 
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent((student.level || 'Novice') + '-' + student.name)}`}
                        alt="Avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <span>{student.name}</span>
                  </div>
                </td>
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
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                      { id: 'aptitude', label: 'APT' },
                      { id: 'coding-mcq', label: 'MCQ' },
                      { id: 'database-sql', label: 'SQL' },
                      { id: 'computer-fundamentals', label: 'FND' }
                    ].map(mod => {
                      const isUnlocked = student.unlockedModules && student.unlockedModules.includes(mod.id);
                      return (
                        <button
                          key={mod.id}
                          onClick={() => handleToggleModule(student.id, mod.id, isUnlocked)}
                          className="cyber-badge"
                          style={{
                            padding: '3px 6px',
                            fontSize: '10px',
                            cursor: 'pointer',
                            background: isUnlocked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                            borderColor: isUnlocked ? '#10b981' : '#ef4444',
                            color: isUnlocked ? '#10b981' : '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          {isUnlocked ? <Unlock size={10} /> : <Lock size={10} />}
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
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
      <form onSubmit={handleAddCodingQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
          <div>
            <label className="cyber-label">Challenge Title</label>
            <input type="text" placeholder="e.g. Fibonacci Numbers" className="cyber-input" value={codeTitle} onChange={(e) => setCodeTitle(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Module Selection</label>
            <select className="cyber-select" value={codeModule} onChange={(e) => setCodeModule(e.target.value)}>
              {modules?.length > 0 ? modules.map(m => (
                <option key={m.moduleId || m.moduleName} value={m.moduleName}>{m.moduleName}</option>
              )) : (
                <>
                  <option value="Module 1">Module 1</option>
                  <option value="Module 2">Module 2</option>
                  <option value="Module 3">Module 3</option>
                </>
              )}
              <option value="Other">Other (Manual Entry)</option>
            </select>
          </div>
        </div>

        {codeModule === 'Other' && (
          <div>
            <label className="cyber-label">Custom Module Name</label>
            <input type="text" placeholder="e.g. Advanced Python" className="cyber-input" value={customModule} onChange={(e) => setCustomModule(e.target.value)} />
          </div>
        )}

        <div>
          <label className="cyber-label">Problem Description</label>
          <textarea rows={6} placeholder="Write instructions, constraints, and inputs..." className="cyber-input" style={{ fontFamily: 'var(--font-cyber)', resize: 'vertical' }} value={codeDesc} onChange={(e) => setCodeDesc(e.target.value)} />
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

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <label className="cyber-label" style={{ margin: 0 }}>Test Cases</label>
            <button 
              type="button" 
              onClick={() => setTestCases([...testCases, { input: '', output: '' }])}
              className="btn-cyber-outline"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              + Add Test Case
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {testCases.map((tc, index) => (
              <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label className="cyber-label" style={{ fontSize: '11px' }}>Input {index + 1}</label>
                  <textarea rows={2} placeholder="e.g. 5" className="cyber-input" value={tc.input} onChange={(e) => {
                    const newTc = [...testCases];
                    newTc[index].input = e.target.value;
                    setTestCases(newTc);
                  }} style={{ resize: 'vertical' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="cyber-label" style={{ fontSize: '11px' }}>Expected Output {index + 1}</label>
                  <textarea rows={2} placeholder="e.g. 120" className="cyber-input" value={tc.output} onChange={(e) => {
                    const newTc = [...testCases];
                    newTc[index].output = e.target.value;
                    setTestCases(newTc);
                  }} style={{ resize: 'vertical' }} />
                </div>
                {testCases.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => {
                      const newTc = testCases.filter((_, i) => i !== index);
                      setTestCases(newTc);
                    }}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '8px', borderRadius: '6px', cursor: 'pointer', marginTop: '22px' }}
                    title="Remove Test Case"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-neon" style={{ marginTop: '20px', padding: '14px', fontSize: '16px' }}>Publish Coding Problem</button>
      </form>
    </div>
  );

  const renderAnswerKeys = () => {
    return (
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Teaching Answer Key Explorer</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Verify quiz questions and coding sandbox structures.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setActiveKeySubTab('mcq')}
              className={`bulk-mode-btn ${activeKeySubTab === 'mcq' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <HelpCircle size={14} /> MCQ Questions
            </button>
            <button
              onClick={() => setActiveKeySubTab('coding')}
              className={`bulk-mode-btn ${activeKeySubTab === 'coding' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Code2 size={14} /> Coding Sandbox
            </button>
          </div>
        </div>

        {activeKeySubTab === 'mcq' ? (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Filter Assessment:</span>
              <select 
                className="cyber-select" 
                value={selectedAssessmentId} 
                onChange={(e) => setSelectedAssessmentId(e.target.value)}
                style={{ width: '220px' }}
              >
                <option value="ASM001">Java Quiz (ASM001)</option>
                <option value="ASM002">Aptitude Quiz (ASM002)</option>
                <option value="ASM003">SQL Database Quiz (ASM003)</option>
              </select>
            </div>

            {keysLoading ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Querying MCQ Schema...</p>
            ) : mcqQuestions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No MCQ questions found for this assessment.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mcqQuestions.map((q, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'rgba(15,23,42,0.4)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-start' }}>
                      <h4 style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>Q{idx + 1}: {q.question}</h4>
                      <span className="cyber-badge" style={{ fontSize: '10px' }}>{q.module || 'General'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = opt === q.answer;
                        return (
                          <div 
                            key={oIdx} 
                            style={{ 
                              padding: '10px 12px', 
                              borderRadius: '6px', 
                              fontSize: '13px',
                              background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                              border: `1px solid ${isCorrect ? '#10b981' : 'var(--border-color)'}`,
                              color: isCorrect ? '#10b981' : 'var(--text-muted)',
                              fontWeight: isCorrect ? 'bold' : 'normal'
                            }}
                          >
                            <span style={{ marginRight: '6px' }}>{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                            {isCorrect && ' ✓'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {keysLoading ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Querying Coding Schema...</p>
            ) : codingQuestions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No coding challenges found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {codingQuestions.map((q, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'rgba(15,23,42,0.4)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-start' }}>
                      <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: '#fff' }}>{q.title}</h4>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span className="cyber-badge" style={{ 
                          borderColor: q.difficulty === 'Easy' ? '#10b981' : q.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
                          color: q.difficulty === 'Easy' ? '#10b981' : q.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
                          background: 'transparent'
                        }}>
                          {q.difficulty}
                        </span>
                        <span className="cyber-badge">{q.module || 'Sandbox Track'}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>{q.description}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <div>
                        <strong style={{ fontSize: '12px', color: '#fff' }}>Sandbox Languages:</strong>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                          {(Array.isArray(q.language) ? q.language : [q.language]).map((lang, lIdx) => (
                            <span key={lIdx} className="cyber-badge" style={{ fontSize: '10px' }}>{lang}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong style={{ fontSize: '12px', color: '#fff' }}>Sample Test Case:</strong>
                        <div style={{ fontSize: '11px', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginTop: '4px', background: '#010409', padding: '6px', borderRadius: '4px' }}>
                          <div>Input: {q.testCases?.[0]?.input || 'None'}</div>
                          <div>Output: {q.testCases?.[0]?.output || 'None'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
        <button onClick={() => setActiveTab('keys')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'keys' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Teaching Answer Key
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
      {activeTab === 'keys' && renderAnswerKeys()}
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
