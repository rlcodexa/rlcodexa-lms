import React, { useContext, useState, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { Compass, ShieldCheck } from 'lucide-react';

const HodPortal = () => {
  const { students, departments, isOnline } = useContext(AssessmentContext);
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [mode, setMode] = useState('analytics'); // 'analytics' or 'infractions'

  // HOD States from API
  const [reportData, setReportData] = useState({
    registeredCount: 0,
    avgQuiz: 0,
    avgCoding: 0,
    students: []
  });
  const [infractions, setInfractions] = useState([]);

  // Fetch report cards from backend
  const fetchHodData = async () => {
    if (isOnline) {
      try {
        // Fetch reports
        const repRes = await fetch(`http://localhost:5000/api/hod/reports?department=${encodeURIComponent(selectedDept)}`);
        const repData = await repRes.json();
        setReportData(repData);

        // Fetch infractions
        const infRes = await fetch(`http://localhost:5000/api/hod/infractions?department=${encodeURIComponent(selectedDept)}`);
        const infData = await infRes.json();
        setInfractions(infData);
      } catch (error) {
        console.error("Error fetching HOD data:", error);
      }
    } else {
      // Local fallback calculation
      const deptStudents = students.filter(s => s.department === selectedDept && s.registered);
      const count = deptStudents.length;
      const avgQuiz = count > 0 
        ? Math.round(deptStudents.reduce((sum, s) => sum + (s.quizScore || 0), 0) / count) 
        : 0;
      const avgCoding = count > 0 
        ? Math.round(deptStudents.reduce((sum, s) => sum + (s.codingScore || 0), 0) / count) 
        : 0;

      // Compile student list
      const studentsReport = deptStudents.map(s => ({
        id: s.id,
        name: s.name,
        points: s.points,
        level: s.level,
        completedQuiz: s.completedQuiz,
        completedCoding: s.completedCoding
      }));

      setReportData({
        registeredCount: count,
        avgQuiz,
        avgCoding,
        students: studentsReport
      });

      // Infractions aggregation
      const allInfractions = [];
      deptStudents.forEach(s => {
        if (s.infractionLogs) {
          s.infractionLogs.forEach(log => {
            allInfractions.push({
              rollNo: s.id,
              name: s.name,
              time: log.time,
              type: log.type,
              desc: log.desc
            });
          });
        }
      });
      setInfractions(allInfractions);
    }
  };

  useEffect(() => {
    fetchHodData();
  }, [selectedDept, students, isOnline]);

  const renderAnalytics = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Selection Bar */}
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>Department Selector</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Monitor metrics in real time.</span>
          </div>
          <select
            className="cyber-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ width: '280px' }}
          >
            {departments.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="glass-panel stat-card">
            <div className="stat-label">Enrolled Student Cohort</div>
            <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>{reportData.registeredCount} active</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Registered in whitelist database.</p>
          </div>
          
          <div className="glass-panel stat-card">
            <div className="stat-label">Department Average (Quiz)</div>
            <div className="stat-value" style={{ color: 'var(--secondary-cyan)' }}>{reportData.avgQuiz}% accuracy</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Based on daily test scores.</p>
          </div>

          <div className="glass-panel stat-card">
            <div className="stat-label">Department Average (Coding)</div>
            <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>{reportData.avgCoding}% accuracy</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Based on Saturday Sandbox runs.</p>
          </div>
        </div>

        {/* Student standings list */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Cohort Student Level Standings</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Points Balance</th>
                  <th>Developer Level</th>
                  <th>Quiz Status</th>
                  <th>Coding Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.students.map((student, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px' }}>{student.id}</td>
                    <td style={{ fontWeight: '500' }}>{student.name}</td>
                    <td style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>{student.points} pts</td>
                    <td>
                      <span className="cyber-badge" style={{ fontSize: '10px' }}>
                        {student.level}
                      </span>
                    </td>
                    <td>
                      {student.completedQuiz ? (
                        <span className="cyber-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 6px', fontSize: '11px' }}>Completed</span>
                      ) : <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Pending</span>}
                    </td>
                    <td>
                      {student.completedCoding ? (
                        <span className="cyber-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 6px', fontSize: '11px' }}>Completed</span>
                      ) : <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Pending</span>}
                    </td>
                  </tr>
                ))}
                {reportData.registeredCount === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No registered students in this department yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  };

  const renderInfractions = () => {
    return (
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>AI secure Proctor Infraction Logs</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
              Tracks tab changes, clipboard bypass alerts, and window size modifications.
            </p>
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

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="leaderboard-table">
            <thead>
              <tr style={{ background: '#0a0f1d' }}>
                <th>Time Logged</th>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Violation Type</th>
                <th>Auditor description</th>
              </tr>
            </thead>
            <tbody>
              {infractions.map((inf, idx) => (
                <tr key={idx} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.02)' }}>
                  <td style={{ fontFamily: 'var(--font-code)', fontSize: '12px' }}>{inf.time}</td>
                  <td style={{ fontFamily: 'var(--font-code)', fontSize: '12px' }}>{inf.rollNo}</td>
                  <td style={{ fontWeight: '500', color: '#fff' }}>{inf.name}</td>
                  <td style={{ fontWeight: 'bold' }}>{inf.type}</td>
                  <td style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{inf.desc}</td>
                </tr>
              ))}
              {infractions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#10b981', fontWeight: '500', padding: '30px' }}>
                    ✔ Academic compliance verified. Zero security infractions logged in this department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Compass size={12} style={{ marginRight: '4px' }} /> DEPARTMENT ADMINISTRATION CENTER
          </div>
          <h1 className="page-title">
            HOD <span>{mode === 'analytics' ? 'Analytics Board' : 'Proctor Auditor'}</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setMode('analytics')} className="btn-cyber-outline" style={{ background: mode === 'analytics' ? 'rgba(0,191,255,0.1)' : 'transparent', padding: '8px 16px', fontSize: '12px' }}>
            Analytics
          </button>
          <button onClick={() => setMode('infractions')} className="btn-cyber-outline" style={{ background: mode === 'infractions' ? 'rgba(0,191,255,0.1)' : 'transparent', padding: '8px 16px', fontSize: '12px' }}>
            Security Flags
          </button>
        </div>
      </div>

      {mode === 'analytics' ? renderAnalytics() : renderInfractions()}
    </div>
  );
};

export default HodPortal;
