import React, { useContext, useState, useEffect } from 'react';
import { AssessmentContext, API_BASE_URL } from '../context/AssessmentContext';
import { 
  ShieldAlert, 
  Terminal, 
  CheckCircle2, 
  Plus, 
  Building, 
  Users, 
  BookOpen, 
  Database,
  Cpu,
  CheckCircle
} from 'lucide-react';

const AdminPortal = () => {
  const { students, colleges, departments, batches, modules, setColleges, activityLogs, resetAllData, isOnline, refreshData, approveStudent, deleteStudent, deleteStaff, deleteCollege } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState('whitelist');
  const [filterType, setFilterType] = useState('all');

  // College States (colleges is read from context)
  const [newClgId, setNewClgId] = useState('');
  const [newClgName, setNewClgName] = useState('');
  const [newClgLoc, setNewClgLoc] = useState('');

  // Staff State
  const [staff, setStaff] = useState([]);
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPass, setStaffPass] = useState('staff123');
  const [staffRole, setStaffRole] = useState('trainer');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffDept, setStaffDept] = useState('Computer Science & Engineering');
  const [staffSpec, setStaffSpec] = useState('Java');
  const [staffExp, setStaffExp] = useState(3);
  const [staffCollege, setStaffCollege] = useState('');
  const [selectedHubCollege, setSelectedHubCollege] = useState('');

  // Assessments State
  const [assessments, setAssessments] = useState([]);
  const [assTitle, setAssTitle] = useState('');
  const [assType, setAssType] = useState('Quiz');
  const [assDuration, setAssDuration] = useState(30);
  const [assMarks, setAssMarks] = useState(100);

  // Whitelist Form State
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [whitelistCollege, setWhitelistCollege] = useState('');

  useEffect(() => {
    if (colleges && colleges.length > 0) {
      if (!staffCollege) setStaffCollege(colleges[0].collegeName);
      if (!whitelistCollege) setWhitelistCollege(colleges[0].collegeName);
      if (!selectedHubCollege) setSelectedHubCollege(colleges[0].collegeName);
    }
  }, [colleges]);

  // Add Question States
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('');
  const [quizQ, setQuizQ] = useState('');
  const [quizOptA, setQuizOptA] = useState('');
  const [quizOptB, setQuizOptB] = useState('');
  const [quizOptC, setQuizOptC] = useState('');
  const [quizOptD, setQuizOptD] = useState('');
  const [quizAns, setQuizAns] = useState('');
  const [qModule, setQModule] = useState('Module 1');

  // Add Coding Question States
  const [codeTitle, setCodeTitle] = useState('');
  const [codeDesc, setCodeDesc] = useState('');
  const [codeDiff, setCodeDiff] = useState('Easy');
  const [codeLang, setCodeLang] = useState('JavaScript');
  const [tcInput, setTcInput] = useState('');
  const [tcOutput, setTcOutput] = useState('');
  const [codeModule, setCodeModule] = useState('Module 1');

  // Mock fallbacks
  const mockColleges = [
    { collegeId: "CLG001", collegeName: "ABC Engineering College", location: "Coimbatore", status: "active", createdAt: new Date().toISOString() }
  ];
  const mockStaff = [
    { userId: "USR020", name: "Dr. Raman Saxena (HOD)", email: "hod.cse@codegate.edu", role: "hod", status: "active", phone: "9876543211", details: { department: "Computer Science & Engineering" } },
    { userId: "USR010", name: "Prof. Tanu Mishra (Trainer)", email: "staff@codegate.edu", role: "trainer", status: "active", phone: "9876543212", details: { specialization: ["Java", "Python"] } }
  ];
  const mockAssessments = [
    { assessmentId: "ASM001", title: "Java Fundamentals Quiz", type: "Quiz", duration: 30, totalMarks: 100, status: "active" },
    { assessmentId: "ASM002", title: "Reverse String Challenge", type: "Coding", duration: 30, totalMarks: 100, status: "active" }
  ];

  // Fetch functions for active API connection
  const fetchColleges = async () => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/colleges`);
        const data = await res.json();
        setColleges(data);
      } catch (e) { console.error(e); }
    } else {
      setColleges(mockColleges);
    }
  };

  const fetchStaff = async () => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/staff`);
        const data = await res.json();
        setStaff(data);
      } catch (e) { console.error(e); }
    } else {
      setStaff(mockStaff);
    }
  };

  const fetchAssessments = async () => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/assessments`);
        const data = await res.json();
        setAssessments(data);
        const quizAss = data.filter(a => a.type === 'Quiz');
        if (quizAss.length > 0) {
          setSelectedAssessmentId(quizAss[0].assessmentId);
        }
      } catch (e) { console.error(e); }
    } else {
      setAssessments(mockAssessments);
      setSelectedAssessmentId('ASM001');
    }
  };

  useEffect(() => {
    fetchColleges();
    fetchStaff();
    fetchAssessments();
  }, [isOnline]);

  const filteredStudents = students.filter(s => {
    if (filterType === 'registered') return s.registered;
    if (filterType === 'unregistered') return !s.registered;
    if (filterType === 'flagged') return s.infractionCount > 0;
    return true;
  });

  // College Creation
  const handleCreateCollege = async (e) => {
    e.preventDefault();
    if (!newClgId || !newClgName || !newClgLoc) return alert("Fill in all college fields.");

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/colleges`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: newClgId, collegeName: newClgName, location: newClgLoc })
        });
        const data = await res.json();
        if (data.success) {
          alert("College created successfully!");
          fetchColleges();
          setNewClgId(''); setNewClgName(''); setNewClgLoc('');
        } else {
          alert(data.message);
        }
      } catch (error) { alert("Error connecting to server."); }
    } else {
      setColleges([...colleges, { collegeId: newClgId, collegeName: newClgName, location: newClgLoc, status: 'active', createdAt: new Date() }]);
      alert("College added to offline sandbox state.");
      setNewClgId(''); setNewClgName(''); setNewClgLoc('');
    }
  };

  // Staff Creation
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!staffName || !staffEmail || !staffPass) return alert("Fill in name, email, and password.");

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/staff`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: staffName,
            email: staffEmail,
            password: staffPass,
            role: staffRole,
            phone: staffPhone,
            department: staffDept,
            college: staffCollege || (colleges[0]?.collegeName || "ABC Engineering College"),
            specialization: staffSpec,
            experience: staffExp
          })
        });
        const data = await res.json();
        if (data.success) {
          alert(`Staff user (${staffRole}) created successfully!`);
          fetchStaff();
          setStaffName(''); setStaffEmail(''); setStaffPhone('');
        } else {
          alert(data.message);
        }
      } catch (error) { alert("Error connecting to server."); }
    } else {
      setStaff([...staff, { 
        userId: 'USR' + Math.floor(1000 + Math.random()*9000), 
        name: staffName, 
        email: staffEmail, 
        role: staffRole, 
        status: 'active', 
        phone: staffPhone, 
        details: { 
          department: staffDept, 
          specialization: [staffSpec],
          college: staffCollege || (colleges[0]?.collegeName || "ABC Engineering College")
        } 
      }]);
      alert("Staff user added to offline sandbox state.");
      setStaffName(''); setStaffEmail(''); setStaffPhone('');
    }
  };

  // Assessment Creation
  const handleCreateAssessment = async (e) => {
    e.preventDefault();
    if (!assTitle) return alert("Fill in assessment title.");

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/trainer/assessments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: assTitle, type: assType, duration: assDuration, totalMarks: assMarks, createdBy: "TR001" })
        });
        const data = await res.json();
        if (data.success) {
          alert("Assessment created successfully!");
          fetchAssessments();
          setAssTitle('');
        } else {
          alert(data.message);
        }
      } catch (error) { alert("Error connecting to server."); }
    } else {
      setAssessments([...assessments, { assessmentId: 'ASM' + Math.floor(100+Math.random()*900), title: assTitle, type: assType, duration: assDuration, totalMarks: assMarks, status: 'active' }]);
      alert("Assessment header added to offline sandbox state.");
      setAssTitle('');
    }
  };

  // MCQ Question submission
  const handleAddQuizQuestion = async (e) => {
    e.preventDefault();
    if (!selectedAssessmentId || !quizQ || !quizOptA || !quizOptB || !quizAns) {
      return alert("Please fill in the question, first two options, correct answer, and module.");
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
            answer: quizAns,
            module: qModule
          })
        });
        const data = await res.json();
        if (data.success) {
          alert("MCQ Question added successfully!");
          setQuizQ(''); setQuizOptA(''); setQuizOptB(''); setQuizOptC(''); setQuizOptD(''); setQuizAns('');
        }
      } catch (e) { alert("Error connecting to server."); }
    } else {
      alert(`Offline Sandbox: Question saved under ${qModule} (mock state).`);
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
        const res = await fetch(`${API_BASE_URL}/trainer/questions/coding`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: codeTitle,
            description: codeDesc,
            difficulty: codeDiff,
            language: [codeLang],
            testCases: [{ input: tcInput, output: tcOutput }],
            module: codeModule
          })
        });
        const data = await res.json();
        if (data.success) {
          alert("Coding Sandbox Question added successfully!");
          setCodeTitle(''); setCodeDesc(''); setTcInput(''); setTcOutput('');
        }
      } catch (e) { alert("Error connecting to server."); }
    } else {
      alert(`Offline Sandbox: Coding question added under ${codeModule} (mock state).`);
      setCodeTitle(''); setCodeDesc(''); setTcInput(''); setTcOutput('');
    }
  };

  // Whitelist Slot Injection
  const handleCreateWhitelistSlot = async (e) => {
    e.preventDefault();
    if (!newId || !newName) return alert("Please enter both ID and Name.");

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/students/whitelist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rollNo: newId,
            name: newName,
            email: newEmail || `${newName.toLowerCase().replace(' ', '.')}@codegate.edu`,
            college: whitelistCollege || (colleges[0]?.collegeName || "ABC Engineering College")
          })
        });
        const data = await res.json();
        if (data.success) {
          alert(`Successfully whitelisted student slot: ${newId}`);
          refreshData();
          setNewId(''); setNewName(''); setNewEmail('');
        } else {
          alert(data.message);
        }
      } catch (error) { alert("Error connecting to server."); }
    } else {
      students.push({
        id: newId.toUpperCase(),
        name: newName,
        email: newEmail || `${newName.toLowerCase().replace(' ', '.')}@codegate.edu`,
        department: "Computer Science & Engineering",
        college: whitelistCollege || (colleges[0]?.collegeName || "ABC Engineering College"),
        registered: false,
        password: "",
        completedQuiz: false,
        quizScore: 0,
        completedCoding: false,
        codingScore: 0,
        testCasesPassed: 0,
        points: 0,
        level: "Novice",
        dailyStreakBonusAdded: false,
        infractionCount: 0,
        infractionLogs: [],
        loginLogs: [],
        weeklyCertIssued: false
      });
      alert(`Offline whitelist slot injected successfully: ${newId}`);
      setNewId(''); setNewName(''); setNewEmail('');
    }
  };

  const renderWhitelist = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Plus size={16} color="var(--primary-blue)" /> Whitelist Student Registration Injection
        </h3>
        <form onSubmit={handleCreateWhitelistSlot} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label className="cyber-label">Roll Number</label>
            <input type="text" placeholder="e.g. CG-2026-51" className="cyber-input" value={newId} onChange={(e) => setNewId(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Full Name</label>
            <input type="text" placeholder="e.g. Priyan Bose" className="cyber-input" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Institutional Email</label>
            <input type="email" placeholder="e.g. priyan.b@codegate.edu" className="cyber-input" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">College Selection</label>
            <select className="cyber-select" value={whitelistCollege} onChange={(e) => setWhitelistCollege(e.target.value)}>
              {colleges.map((c, idx) => (
                <option key={idx} value={c.collegeName}>{c.collegeName}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-neon" style={{ padding: '10px' }}>Add Whitelist Slot</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Registry Database Cohorts</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Manage registration credentials and profiles.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setFilterType('all')} style={{ background: filterType === 'all' ? 'rgba(0,191,255,0.1)' : 'transparent', borderColor: filterType === 'all' ? 'var(--primary-blue)' : 'var(--border-color)', color: filterType === 'all' ? '#fff' : 'var(--text-muted)', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', border: '1px solid', borderRadius: '4px' }}>All Slots</button>
            <button onClick={() => setFilterType('registered')} style={{ background: filterType === 'registered' ? 'rgba(0,191,255,0.1)' : 'transparent', borderColor: filterType === 'registered' ? 'var(--primary-blue)' : 'var(--border-color)', color: filterType === 'registered' ? '#fff' : 'var(--text-muted)', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', border: '1px solid', borderRadius: '4px' }}>Registered</button>
            <button onClick={() => setFilterType('unregistered')} style={{ background: filterType === 'unregistered' ? 'rgba(0,191,255,0.1)' : 'transparent', borderColor: filterType === 'unregistered' ? 'var(--primary-blue)' : 'var(--border-color)', color: filterType === 'unregistered' ? '#fff' : 'var(--text-muted)', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', border: '1px solid', borderRadius: '4px' }}>Unregistered</button>
            <button onClick={() => setFilterType('flagged')} style={{ background: filterType === 'flagged' ? 'rgba(239,68,68,0.1)' : 'transparent', borderColor: filterType === 'flagged' ? '#ef4444' : 'var(--border-color)', color: filterType === 'flagged' ? '#ef4444' : 'var(--text-muted)', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', border: '1px solid', borderRadius: '4px' }}>Flagged</button>
          </div>
        </div>

        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Registered</th>
                <th>Quiz Status</th>
                <th>Coding Status</th>
                <th>Security Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{student.id}</td>
                  <td style={{ fontWeight: '500' }}>{student.name}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{student.department}</td>
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
                  <td style={{ color: student.infractionCount > 0 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                    {Math.max(0, 100 - (student.infractionCount * 25))}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderColleges = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Plus size={16} color="var(--primary-blue)" /> Register College Cohort
        </h3>
        <form onSubmit={handleCreateCollege} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label className="cyber-label">College ID</label>
            <input type="text" placeholder="e.g. CLG001" className="cyber-input" value={newClgId} onChange={(e) => setNewClgId(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">College Name</label>
            <input type="text" placeholder="e.g. ABC College" className="cyber-input" value={newClgName} onChange={(e) => setNewClgName(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Location</label>
            <input type="text" placeholder="e.g. Coimbatore" className="cyber-input" value={newClgLoc} onChange={(e) => setNewClgLoc(e.target.value)} />
          </div>
          <button type="submit" className="btn-neon" style={{ padding: '10px' }}>Register College</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Registered College Database</h3>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>College ID</th>
              <th>College Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((c, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{c.collegeId}</td>
                <td style={{ fontWeight: '500' }}>{c.collegeName}</td>
                <td style={{ color: 'var(--text-muted)' }}>{c.location}</td>
                <td style={{ color: '#10b981' }}>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Plus size={16} color="var(--primary-blue)" /> Create Staff Administrator (HOD / Trainer)
        </h3>
        <form onSubmit={handleCreateStaff} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label className="cyber-label">Role</label>
            <select className="cyber-select" value={staffRole} onChange={(e) => setStaffRole(e.target.value)}>
              <option value="trainer">Trainer (Staff)</option>
              <option value="hod">HOD (Department Head)</option>
            </select>
          </div>
          <div>
            <label className="cyber-label">Full Name</label>
            <input type="text" placeholder="e.g. Dr. Saxena" className="cyber-input" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Email</label>
            <input type="email" placeholder="staff@codegate.edu" className="cyber-input" value={staffEmail} onChange={(e) => setStaffEmail(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Password</label>
            <input type="password" placeholder="staff123" className="cyber-input" value={staffPass} onChange={(e) => setStaffPass(e.target.value)} />
          </div>
          {staffRole === 'hod' ? (
            <div>
              <label className="cyber-label">Department</label>
              <input type="text" className="cyber-input" value={staffDept} onChange={(e) => setStaffDept(e.target.value)} />
            </div>
          ) : (
            <>
              <div>
                <label className="cyber-label">Specialization</label>
                <input type="text" placeholder="e.g. Python, Java" className="cyber-input" value={staffSpec} onChange={(e) => setStaffSpec(e.target.value)} />
              </div>
              <div>
                <label className="cyber-label">Experience (Years)</label>
                <input type="number" className="cyber-input" value={staffExp} onChange={(e) => setStaffExp(e.target.value)} />
              </div>
            </>
          )}
          <div>
            <label className="cyber-label">College Selection</label>
            <select className="cyber-select" value={staffCollege} onChange={(e) => setStaffCollege(e.target.value)}>
              {colleges.map((c, idx) => (
                <option key={idx} value={c.collegeName}>{c.collegeName}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-neon" style={{ padding: '10px' }}>Create User Account</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Registered Academic Administration</h3>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{s.userId}</td>
                <td style={{ fontWeight: '500' }}>{s.name}</td>
                <td style={{ color: 'var(--text-muted)' }}>{s.email}</td>
                <td>
                  <span className="cyber-badge" style={{ borderColor: s.role === 'hod' ? '#10b981' : '#f59e0b', color: s.role === 'hod' ? '#10b981' : '#f59e0b', background: 'transparent' }}>
                    {s.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {s.role === 'hod' 
                    ? `College: ${s.details?.college || 'ABC College'} | Dept: ${s.details?.department || 'CSE'}` 
                    : `College: ${s.details?.college || 'ABC College'} | Spec: ${s.details?.specialization?.join(', ') || 'General'}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAssessments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Plus size={16} color="var(--primary-blue)" /> Create New Assessment Entry
        </h3>
        <form onSubmit={handleCreateAssessment} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          <div>
            <label className="cyber-label">Title</label>
            <input type="text" placeholder="e.g. JavaScript Arrays" className="cyber-input" value={assTitle} onChange={(e) => setAssTitle(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Type</label>
            <select className="cyber-select" value={assType} onChange={(e) => setAssType(e.target.value)}>
              <option value="Quiz">Quiz MCQ</option>
              <option value="Coding">Coding Sandbox Challenge</option>
            </select>
          </div>
          <div>
            <label className="cyber-label">Duration (Minutes)</label>
            <input type="number" className="cyber-input" value={assDuration} onChange={(e) => setAssDuration(e.target.value)} />
          </div>
          <div>
            <label className="cyber-label">Total Marks</label>
            <input type="number" className="cyber-input" value={assMarks} onChange={(e) => setAssMarks(e.target.value)} />
          </div>
          <button type="submit" className="btn-neon" style={{ padding: '10px' }}>Generate Assessment</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Assessment Registries</h3>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Assessment ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Total Marks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{a.assessmentId}</td>
                <td style={{ fontWeight: '600' }}>{a.title}</td>
                <td>
                  <span className="cyber-badge" style={{ borderColor: a.type === 'Quiz' ? 'var(--primary-blue)' : 'var(--secondary-cyan)', color: a.type === 'Quiz' ? 'var(--primary-blue)' : 'var(--secondary-cyan)', background: 'transparent' }}>
                    {a.type}
                  </span>
                </td>
                <td>{a.duration} mins</td>
                <td>{a.totalMarks} marks</td>
                <td style={{ color: '#10b981' }}>{a.status || 'active'}</td>
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
            {assessments.filter(a => a.type === 'Quiz').map((a, i) => (
              <option key={i} value={a.assessmentId}>{a.title} ({a.assessmentId})</option>
            ))}
            {assessments.filter(a => a.type === 'Quiz').length === 0 && (
              <option value="ASM001">Java Fundamentals Quiz (ASM001)</option>
            )}
          </select>
        </div>

        <div>
          <label className="cyber-label">Select Module</label>
          <select className="cyber-select" value={qModule} onChange={(e) => setQModule(e.target.value)}>
            <option value="Module 1">Module 1</option>
            <option value="Module 2">Module 2</option>
            <option value="Module 3">Module 3</option>
            <option value="Module 4">Module 4</option>
            <option value="Module 5">Module 5</option>
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
          <label className="cyber-label">Select Module</label>
          <select className="cyber-select" value={codeModule} onChange={(e) => setCodeModule(e.target.value)}>
            <option value="Module 1">Module 1</option>
            <option value="Module 2">Module 2</option>
            <option value="Module 3">Module 3</option>
            <option value="Module 4">Module 4</option>
            <option value="Module 5">Module 5</option>
          </select>
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

  const renderLogs = () => (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Terminal size={18} color="var(--primary-blue)" /> Realtime Syslog Activity Audit Trail
      </h3>
      <div style={{
        background: '#010409', border: '1px solid var(--border-color)', borderRadius: '8px',
        padding: '20px', fontFamily: 'var(--font-code)', fontSize: '13px', color: '#c9d1d9',
        maxHeight: '450px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px'
      }}>
        {activityLogs.map((log, index) => (
          <div key={index} style={{ borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
            <span style={{ color: '#8b949e' }}>[{log.time}]</span>{' '}
            <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>{log.role?.toUpperCase()}</span>{' '}
            <span style={{ color: '#58a6ff' }}>({log.user})</span>{' '}
            <span style={{ color: '#ff7b72', fontWeight: 'bold' }}>[{log.action}]</span>{' '}
            <span style={{ color: '#e6edf3' }}>- {log.details}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPendingApprovals = () => {
    const pendingStudents = students.filter(s => s.status === 'pending');
    return (
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Pending Student Registrations</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Verify self-registered student applications and authorize their workspaces.</p>
        {pendingStudents.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No pending student registrations.
          </div>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingStudents.map(s => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{s.id}</td>
                  <td style={{ fontWeight: '500' }}>{s.name}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{s.email}</td>
                  <td>{s.college}</td>
                  <td>{s.department}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={async () => {
                          const res = await approveStudent(s.id);
                          if (res.success) {
                            alert(`Approved student ${s.name}`);
                          } else {
                            alert(res.message);
                          }
                        }}
                        className="btn-neon"
                        style={{ padding: '6px 12px', fontSize: '11px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: 'none' }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Reject and delete registration for ${s.name}?`)) {
                            const res = await deleteStudent(s.id);
                            if (res.success) {
                              alert(`Rejected student ${s.name}`);
                            } else {
                              alert(res.message);
                            }
                          }
                        }}
                        style={{ padding: '6px 12px', fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const renderCollegeHub = () => {
    const currentCollege = colleges.find(c => c.collegeName === selectedHubCollege);
    const collegeStaff = staff.filter(s => s.details?.college === selectedHubCollege);
    const collegeStudents = students.filter(s => s.college === selectedHubCollege);

    const hod = collegeStaff.find(s => s.role === 'hod');
    const trainers = collegeStaff.filter(s => s.role === 'trainer');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>College Directory & Tenant Hub</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Select an organization to manage its HODs, Trainers, and Student cohort.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label className="cyber-label" style={{ marginBottom: 0 }}>Active College:</label>
            <select
              className="cyber-select"
              style={{ width: '250px' }}
              value={selectedHubCollege}
              onChange={(e) => setSelectedHubCollege(e.target.value)}
            >
              {colleges.map((c, idx) => (
                <option key={idx} value={c.collegeName}>{c.collegeName}</option>
              ))}
            </select>
            {currentCollege && (
              <button
                onClick={async () => {
                  if (confirm(`Are you sure you want to delete college "${selectedHubCollege}"? this will not delete associated staff/students but they will lose their college association.`)) {
                    const res = await deleteCollege(currentCollege.collegeId);
                    if (res.success) {
                      alert("College record deleted.");
                      if (colleges.length > 1) {
                        const remaining = colleges.filter(c => c.collegeId !== currentCollege.collegeId);
                        setSelectedHubCollege(remaining[0].collegeName);
                      }
                    }
                  }
                }}
                style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Delete College
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* HOD Section */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>HOD (Department Head)</h4>
              {!hod && (
                <button 
                  onClick={() => {
                    setStaffRole('hod');
                    setStaffCollege(selectedHubCollege);
                    setActiveTab('staff');
                  }}
                  className="btn-cyber-outline" 
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  + Add HOD
                </button>
              )}
            </div>
            {hod ? (
              <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: '600', fontSize: '15px' }}>{hod.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0' }}>{hod.email}</div>
                <div style={{ fontSize: '12px', color: 'var(--secondary-cyan)' }}>Dept: {hod.details?.department || 'CSE'}</div>
                <button
                  onClick={async () => {
                     if (confirm(`Remove HOD ${hod.name}?`)) {
                       await deleteStaff(hod.userId);
                       fetchStaff();
                     }
                  }}
                  style={{ marginTop: '10px', padding: '4px 8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                >
                  Remove HOD
                </button>
              </div>
            ) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                No HOD registered for this college.
              </div>
            )}
          </div>

          {/* Trainers Section */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>Trainers & Instructors</h4>
              <button 
                onClick={() => {
                  setStaffRole('trainer');
                  setStaffCollege(selectedHubCollege);
                  setActiveTab('staff');
                }}
                className="btn-cyber-outline" 
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                + Add Trainer
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {trainers.map((t, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{t.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{t.email}</div>
                    <div style={{ fontSize: '11px', color: 'var(--secondary-cyan)' }}>Exp: {t.details?.experience || 0} Years | Spec: {t.details?.specialization?.join(', ')}</div>
                  </div>
                  <button
                    onClick={async () => {
                       if (confirm(`Remove trainer ${t.name}?`)) {
                         await deleteStaff(t.userId);
                         fetchStaff();
                       }
                    }}
                    style={{ padding: '4px 8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {trainers.length === 0 && (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No trainers registered.
                </div>
              )}
            </div>
          </div>

          {/* Students Section */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>Student Cohort ({collegeStudents.length})</h4>
              <button 
                onClick={() => {
                  setWhitelistCollege(selectedHubCollege);
                  setActiveTab('whitelist');
                }}
                className="btn-cyber-outline" 
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                + Whitelist Student
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {collegeStudents.map((s, idx) => (
                <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{s.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{s.email} | {s.id}</div>
                    <div style={{ fontSize: '11px', color: s.registered ? '#10b981' : 'var(--text-muted)' }}>
                      {s.registered ? 'Status: Active' : (s.status === 'pending' ? 'Status: Pending' : 'Status: Whitelisted')}
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                       if (confirm(`Remove student profile for ${s.name}?`)) {
                         await deleteStudent(s.id);
                         refreshData();
                       }
                    }}
                    style={{ padding: '4px 8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {collegeStudents.length === 0 && (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No students whitelisted/registered.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Cpu size={12} style={{ marginRight: '4px' }} /> COLLEGE CONTROL TERMINAL
          </div>
          <h1 className="page-title">
            Admin <span>{activeTab.toUpperCase()} Manager</span>
          </h1>
        </div>
        <button 
          className="btn-neon" 
          onClick={() => {
            if (confirm("Flush all database logs and records back to initial states?")) {
              resetAllData();
            }
          }}
          style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: 'none' }}
        >
          Reset Database
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('whitelist')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'whitelist' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Whitelist Control
        </button>
        <button onClick={() => setActiveTab('collegehub')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'collegehub' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          College Hub
        </button>
        <button onClick={() => setActiveTab('pending_approvals')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'pending_approvals' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Pending Approvals
        </button>
        <button onClick={() => setActiveTab('colleges')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'colleges' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Colleges Database
        </button>
        <button onClick={() => setActiveTab('departments')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'departments' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Departments
        </button>
        <button onClick={() => setActiveTab('batches')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'batches' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Batches
        </button>
        <button onClick={() => setActiveTab('modules')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'modules' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Learning Modules
        </button>
        <button onClick={() => setActiveTab('staff')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'staff' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Staff Accounts
        </button>
        <button onClick={() => setActiveTab('assessments')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'assessments' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Assessments Header
        </button>
        <button onClick={() => setActiveTab('addquiz')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'addquiz' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Add MCQ Question
        </button>
        <button onClick={() => setActiveTab('addcoding')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'addcoding' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Add Coding Task
        </button>
        <button onClick={() => setActiveTab('syslogs')} className="btn-cyber-outline" style={{ padding: '8px 16px', fontSize: '13px', background: activeTab === 'syslogs' ? 'rgba(0, 191, 255, 0.1)' : 'transparent' }}>
          Realtime Syslogs
        </button>
      </div>

      {activeTab === 'whitelist' && renderWhitelist()}
      {activeTab === 'collegehub' && renderCollegeHub()}
      {activeTab === 'pending_approvals' && renderPendingApprovals()}
      {activeTab === 'colleges' && renderColleges()}
      
      {activeTab === 'departments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Departments Database</h3>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Department Name</th>
                  <th>College ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departments && departments.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{d.departmentId}</td>
                    <td style={{ fontWeight: '500' }}>{d.departmentName}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{d.collegeId}</td>
                    <td style={{ color: '#10b981' }}>{d.status || 'active'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Batches Database</h3>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Batch Name</th>
                  <th>Academic Year</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {batches && batches.map((b, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{b.batchId}</td>
                    <td style={{ fontWeight: '500' }}>{b.batchName}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{b.academicYear}</td>
                    <td>{b.departmentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'modules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Learning Modules Database</h3>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Module Name</th>
                  <th>Topics</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {modules && modules.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{m.moduleId}</td>
                    <td style={{ fontWeight: '500' }}>{m.moduleName}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{m.totalTopics} topics</td>
                    <td>{m.departmentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'staff' && renderStaff()}
      {activeTab === 'assessments' && renderAssessments()}
      {activeTab === 'addquiz' && renderAddQuiz()}
      {activeTab === 'addcoding' && renderAddCoding()}
      {activeTab === 'syslogs' && renderLogs()}
    </div>
  );
};

export default AdminPortal;
