
import React, { useContext, useState } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { 
  HelpCircle, 
  Code2, 
  Clock, 
  ShieldAlert, 
  Award, 
  Cpu, 
  Sparkles,
  TrendingUp,
  UserCheck,
  Calendar,
  Users,
  CheckCircle,
  AlertTriangle,
  Database,
  RefreshCw,
  Terminal,
  BookOpen
} from 'lucide-react';

const Dashboard = ({ setCurrentPage }) => {
  const { 
    currentUser, 
    currentDay, 
    setCurrentDay, 
    students, 
    activityLogs, 
    resetAllData 
  } = useContext(AssessmentContext);

  if (!currentUser) return null;

  const getTimerMinutes = (secs) => Math.floor(secs / 60);

  // Student metrics
  const totalScore = (currentUser.completedQuiz ? currentUser.quizScore : 0) + 
                     (currentUser.completedCoding ? currentUser.codingScore : 0);
  const maxScore = 200;
  const performancePct = Math.round((totalScore / maxScore) * 100);

  // Department metrics for Staff/HOD/Admin
  const registeredStudents = students.filter(s => s.registered);
  const registeredCount = registeredStudents.length;
  const completedBothCount = registeredStudents.filter(s => s.completedQuiz && s.completedCoding).length;
  
  const avgQuiz = registeredCount > 0 
    ? Math.round(registeredStudents.reduce((sum, s) => sum + s.quizScore, 0) / registeredCount) 
    : 0;
  const avgCoding = registeredCount > 0 
    ? Math.round(registeredStudents.reduce((sum, s) => sum + s.codingScore, 0) / registeredCount) 
    : 0;

  const totalInfractions = registeredStudents.reduce((sum, s) => sum + s.infractionCount, 0);

  // Level counting for HOD
  const levelsCount = {
    Novice: registeredStudents.filter(s => s.level === 'Novice').length,
    Apprentice: registeredStudents.filter(s => s.level === 'Apprentice').length,
    Specialist: registeredStudents.filter(s => s.level === 'Specialist').length,
    Expert: registeredStudents.filter(s => s.level === 'Expert').length,
    'AI Architect': registeredStudents.filter(s => s.level === 'AI Architect').length,
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'AI Architect': return '#00BFFF';
      case 'Expert': return '#06B6D4';
      case 'Specialist': return '#38BDF8';
      case 'Apprentice': return '#a7f3d0';
      default: return '#94A3B8';
    }
  };

  // Rendering Student Dashboard
  const renderStudentDashboard = () => {
    return (
      <div>
        {/* Welcome Banner */}
        <div className="glass-panel glowing neon-border-blue" style={{ padding: '24px', position: 'relative', overflow: 'hidden', marginBottom: '25px' }}>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', color: 'rgba(0,191,255,0.05)', pointerEvents: 'none' }}>
            <Cpu size={180} />
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(0,191,255,0.1)',
              border: '1px solid rgba(0,191,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img 
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent((currentUser.level || 'Novice') + '-' + currentUser.name)}`}
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px' }}>
                System Authenticated: {currentUser.name}
              </h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '6px' }}>
                <span className="cyber-badge" style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--secondary-cyan)' }}>
                  Level: {currentUser.level}
                </span>
                <span className="cyber-badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                  Daily points streak (+20 added today)
                </span>
              </div>
            </div>

            {/* Quick Profile Points */}
            <div className="glass-panel" style={{ padding: '12px 18px', background: 'rgba(15, 23, 42, 0.9)', minWidth: '180px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Streaking Points</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-blue)' }}>{currentUser.points}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>pts earned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Controller: Day Selector */}
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} color="var(--primary-blue)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Demo Controls: Day Selector</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Toggle to switch exam formats for college presentation</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setCurrentDay('Monday-Friday')}
              className="btn-cyber-outline"
              style={{
                padding: '6px 16px', fontSize: '12px',
                background: currentDay === 'Monday-Friday' ? 'rgba(0,191,255,0.1)' : 'transparent',
                borderColor: currentDay === 'Monday-Friday' ? 'var(--primary-blue)' : 'var(--border-color)',
                color: currentDay === 'Monday-Friday' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Mon - Fri (Daily Quiz)
            </button>
            <button 
              onClick={() => setCurrentDay('Saturday')}
              className="btn-cyber-outline"
              style={{
                padding: '6px 16px', fontSize: '12px',
                background: currentDay === 'Saturday' ? 'rgba(6,182,212,0.1)' : 'transparent',
                borderColor: currentDay === 'Saturday' ? 'var(--secondary-cyan)' : 'var(--border-color)',
                color: currentDay === 'Saturday' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Saturday (Weekly Test)
            </button>
          </div>
        </div>

        {/* Active gate visualizer */}
        <h2 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={14} color="var(--secondary-cyan)" /> Active Syllabus Gates ({currentDay === 'Saturday' ? 'Saturday Special Assessment' : 'Daily Practice (Quiz & Coding)'})
        </h2>

        {currentDay === 'Monday-Friday' ? (
          <div className="assessment-grid">
            {/* Daily MCQ Gateway */}
            <div className="glass-panel glowing test-card" style={{ borderTop: '3px solid var(--primary-blue)' }}>
              <div className="test-card-header">
                <div>
                  <span className="cyber-badge" style={{ background: 'rgba(0,191,255,0.05)', borderColor: 'rgba(0,191,255,0.25)', color: 'var(--primary-blue)' }}>Daily test</span>
                  <h3 className="test-card-title">Computer Science & AI Fundamentals Quiz</h3>
                </div>
                <span className={`test-status-badge ${currentUser.completedQuiz ? 'status-completed' : 'status-active'}`}>
                  {currentUser.completedQuiz ? 'COMPLETED' : 'OPEN FOR PRACTICE'}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                Test your theoretical knowledge in cryptography, networks, database queries, and algorithms.
                Features one-by-one questions with a minimum timer of 10s per question.
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginBottom: '15px' }}>
                <div className="test-info-row"><Clock size={14} /> Duration: 10 mins</div>
                <div className="test-info-row"><ShieldAlert size={14} /> Fullscreen locks, tab switch penalties active</div>
              </div>
              <button 
                className="btn-neon" 
                onClick={() => setCurrentPage('quiz')}
                disabled={currentUser.completedQuiz || currentUser.role === 'assessment'}
                style={{ width: '100%', opacity: currentUser.role === 'assessment' ? 0.5 : 1, cursor: currentUser.role === 'assessment' ? 'not-allowed' : 'pointer' }}
              >
                {currentUser.role === 'assessment' ? 'Locked in Test Mode' : (currentUser.completedQuiz ? 'Daily Quiz Completed' : 'Launch Daily Test Terminal')}
              </button>
            </div>
            {/* Daily Coding Gateway */}
            <div className="glass-panel glowing test-card" style={{ borderTop: '3px solid var(--secondary-cyan)' }}>
              <div className="test-card-header">
                <div>
                  <span className="cyber-badge" style={{ background: 'rgba(6,182,212,0.05)', borderColor: 'rgba(6,182,212,0.25)', color: 'var(--secondary-cyan)' }}>Daily test</span>
                  <h3 className="test-card-title">Algorithmic Sandbox Challenge</h3>
                </div>
                <span className={`test-status-badge ${currentUser.completedCoding ? 'status-completed' : 'status-active'}`}>
                  {currentUser.completedCoding ? 'COMPLETED' : 'OPEN FOR PRACTICE'}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                Solve 1 daily algorithmic coding challenge inside the secure compiler. 
                Enhance logic building and earn practice points.
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginBottom: '15px' }}>
                <div className="test-info-row"><Clock size={14} /> Duration: 30 mins</div>
                <div className="test-info-row"><ShieldAlert size={14} /> Full copy-paste filters, focus tracking enabled</div>
              </div>
              <button 
                className="btn-neon" 
                onClick={() => setCurrentPage('coding')}
                disabled={currentUser.completedCoding || currentUser.role === 'assessment'}
                style={{ width: '100%', background: 'linear-gradient(135deg, var(--secondary-cyan), var(--primary-blue))', opacity: currentUser.role === 'assessment' ? 0.5 : 1, cursor: currentUser.role === 'assessment' ? 'not-allowed' : 'pointer' }}
              >
                {currentUser.role === 'assessment' ? 'Locked in Test Mode' : (currentUser.completedCoding ? 'Daily Coding Submitted' : 'Launch Coding Terminal')}
              </button>
            </div>
          </div>
        ) : (
          <div className="assessment-grid">
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textStyle: 'center' }}>
              <div style={{ padding: '16px', background: 'rgba(15,23,42,0.6)', borderRadius: '50%', marginBottom: '15px' }}>
                <Calendar size={40} color="var(--text-muted)" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px' }}>Daily Practice is Suspended on Weekends</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '280px' }}>
                Daily tests are closed on Saturdays. Focus on the main Weekly Saturday Assessment.
              </p>
            </div>

            {/* Saturday Assessment */}
            <div className="glass-panel glowing test-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="test-card-header">
                <div>
                  <span className="cyber-badge" style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.25)', color: '#f59e0b' }}>Weekly Assessment</span>
                  <h3 className="test-card-title">Comprehensive Saturday Evaluation</h3>
                </div>
                <span className={`test-status-badge ${currentUser.completedCoding ? 'status-completed' : 'status-active'}`}>
                  {currentUser.completedCoding ? 'COMPLETED' : 'ACTIVE INBOX'}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                Combined Quiz and Coding challenges evaluating your week's syllabus progress. 
                Earn up to 250 profile points. Certificate issued on pass.
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginBottom: '15px' }}>
                <div className="test-info-row"><Clock size={14} /> Duration: 60 mins</div>
                <div className="test-info-row"><ShieldAlert size={14} /> Maximum secure proctoring enabled</div>
              </div>
              <button 
                className="btn-neon" 
                onClick={() => setCurrentPage('coding')}
                disabled={currentUser.completedCoding || currentUser.role === 'assessment'}
                style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', opacity: currentUser.role === 'assessment' ? 0.5 : 1, cursor: currentUser.role === 'assessment' ? 'not-allowed' : 'pointer' }}
              >
                {currentUser.role === 'assessment' ? 'Locked in Test Mode' : (currentUser.completedCoding ? 'Weekly Assessment Submitted' : 'Launch Saturday Assessment')}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Rendering Staff Dashboard
  const renderStaffDashboard = () => {
    return (
      <div>
        <div className="glass-panel glowing neon-border-cyan" style={{ padding: '24px', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>Staff Console: {currentUser.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Department: {currentUser.department}. You can review whitelisted students and access teaching answer keys.
          </p>
        </div>

        <div className="stats-grid">
          <div className="glass-panel stat-card">
            <div className="stat-label">Registered Whitelist Students</div>
            <div className="stat-value">{registeredCount} / 50</div>
          </div>
          <div className="glass-panel stat-card">
            <div className="stat-label">Average Quiz Grade</div>
            <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>{avgQuiz}%</div>
          </div>
          <div className="glass-panel stat-card">
            <div className="stat-label">Average Coding Grade</div>
            <div className="stat-value" style={{ color: 'var(--secondary-cyan)' }}>{avgCoding}%</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '10px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Department Course Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button className="btn-cyber-outline" onClick={() => setCurrentPage('staff-directory')}>
                <Users size={16} /> View Whitelist Directory
              </button>
              <button className="btn-neon" onClick={() => setCurrentPage('staff-keys')}>
                <BookOpen size={16} /> View Answer Keys & Teach
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rendering HOD Dashboard
  const renderHodDashboard = () => {
    return (
      <div>
        <div className="glass-panel glowing neon-border-blue" style={{ padding: '24px', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>HOD Management Center: {currentUser.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Department Head for {currentUser.department}. Monitoring integrity streams and cohort levels.
          </p>
        </div>

        <div className="stats-grid">
          <div className="glass-panel stat-card">
            <div className="stat-label">Active Whitelist Users</div>
            <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>{registeredCount}/50</div>
          </div>
          <div className="glass-panel stat-card">
            <div className="stat-label">Total Integrity Warnings</div>
            <div className="stat-value" style={{ color: totalInfractions > 0 ? '#ef4444' : '#10b981' }}>{totalInfractions}</div>
          </div>
          <div className="glass-panel stat-card">
            <div className="stat-label">Average Department Rating</div>
            <div className="stat-value" style={{ color: 'var(--secondary-cyan)' }}>
              {registeredCount > 0 ? `${Math.round((avgQuiz + avgCoding) / 2)}%` : '0%'}
            </div>
          </div>
        </div>

        {/* Levels distribution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '10px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Department Student Skill Levels Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.keys(levelsCount).map(lvl => (
                <div key={lvl}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '500', color: getLevelColor(lvl) }}>{lvl}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{levelsCount[lvl]} students</span>
                  </div>
                  <div className="custom-progress-bar" style={{ height: '6px' }}>
                    <div className="custom-progress-fill" style={{ 
                      width: `${registeredCount > 0 ? (levelsCount[lvl]/registeredCount)*100 : 0}%`,
                      background: getLevelColor(lvl)
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rendering Admin Dashboard
  const renderAdminDashboard = () => {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Admin Command Center</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Global whitelist controller and syslog viewer.</p>
          </div>
          <button 
            className="btn-neon" 
            onClick={() => {
              if (confirm("Reset database parameters? All warnings, scores, streaks will be flushed.")) {
                resetAllData();
              }
            }}
            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: 'none' }}
          >
            <RefreshCw size={14} /> Full Database Reset
          </button>
        </div>

        <div className="stats-grid">
          <div className="glass-panel stat-card">
            <div className="stat-label">College Control Whitelist</div>
            <div className="stat-value">50 Student Slots</div>
          </div>
          <div className="glass-panel stat-card">
            <div className="stat-label">Portal Registered</div>
            <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>{registeredCount} active</div>
          </div>
          <div className="glass-panel stat-card">
            <div className="stat-label">Security Alerts Triggered</div>
            <div className="stat-value" style={{ color: totalInfractions > 0 ? '#ef4444' : '#10b981' }}>{totalInfractions}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginTop: '10px' }}>
          {/* Whitelist Operations */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>System Control Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn-cyber-outline" style={{ justifyContent: 'flex-start' }} onClick={() => setCurrentPage('admin-whitelist')}>
                <Database size={16} /> Manage Student Whitelist registry (50 slots)
              </button>
              <button className="btn-cyber-outline" style={{ justifyContent: 'flex-start' }} onClick={() => setCurrentPage('admin-logs')}>
                <Terminal size={16} /> Open Realtime syslog auditor
              </button>
            </div>
          </div>

          {/* Quick Syslogs */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Recent Activity Logs</h3>
            <div style={{ flexGrow: 1, maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activityLogs.slice(0, 4).map((log, i) => (
                <div key={i} style={{ fontSize: '11px', fontFamily: 'var(--font-code)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                  <span style={{ color: 'var(--primary-blue)' }}>[{log.time}]</span> <span style={{ color: 'var(--secondary-cyan)' }}>{log.action}</span> - {log.details}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboardByRole = () => {
    switch (currentUser.role) {
      case 'student': return renderStudentDashboard();
      case 'staff': return renderStaffDashboard();
      case 'hod': return renderHodDashboard();
      case 'admin': return renderAdminDashboard();
      default: return renderStudentDashboard();
    }
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="page-title">
            Assessment <span>Dashboard</span>
          </h1>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Session Authorized as: <b>{currentUser.name}</b>
        </div>
      </div>

      {renderDashboardByRole()}
    </div>
  );
};

export default Dashboard;
