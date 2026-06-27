import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ShieldAlert, Cpu, Terminal, Key, Users, Award, Shield } from 'lucide-react';

const Login = ({ setCurrentPage }) => {
  const { loginStudent, students, addActivityLog } = useContext(AssessmentContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [streakPopup, setStreakPopup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    const res = loginStudent(email.trim(), password, role);

    if (res.success) {
      if (role === 'student' && res.rewardAdded) {
        setStreakPopup(true);
        setTimeout(() => {
          setStreakPopup(false);
          setCurrentPage('dashboard');
        }, 2500);
      } else {
        setCurrentPage('dashboard');
      }
    } else {
      setError(res.message);
    }
  };

  // Find a registered student for quick demo filling
  const demoStudent = students.find(s => s.registered) || { email: "aarav.sharma@codegate.edu", name: "Aarav" };

  return (
    <div className="auth-container">
      {/* Daily streak notification */}
      {streakPopup && (
        <div className="security-alert-overlay">
          <div className="security-alert-box" style={{ borderColor: 'var(--primary-blue)', boxShadow: 'var(--glow-shadow-intense)' }}>
            <div style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}><Award size={64} /></div>
            <h2 className="security-alert-title">DAILY LOG STREAK!</h2>
            <p className="security-alert-text" style={{ fontSize: '16px', color: '#fff' }}>
              Daily login verification logged successfully.
            </p>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--secondary-cyan)', margin: '15px 0' }}>
              +20 Points Added!
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Syncing level indicators with security protocol...
            </p>
          </div>
        </div>
      )}

      {/* Side Illustration Panel */}
      <div className="auth-hero-panel">
        <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-cyan))' }}></div>
          <span style={{ fontSize: '18px', fontWeight: '800', tracking: '1px' }}>CODEGATE</span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto 0' }}>
          {/* Cyber Vector Circle Illustration */}
          <div className="glow-vector" style={{ marginBottom: '30px' }}>
            <div className="vector-circle-outer"></div>
            <div className="vector-circle-inner" style={{ borderStyle: 'dotted' }}></div>
            <div className="vector-core" style={{ background: 'radial-gradient(circle, var(--secondary-cyan) 0%, transparent 70%)', boxShadow: '0 0 30px var(--secondary-cyan)' }}>
              <Key size={40} color="#000" />
            </div>
            <div style={{ position: 'absolute', top: '25%', right: '5%', color: 'var(--primary-blue)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>GATE_ACTIVE</div>
            <div style={{ position: 'absolute', bottom: '25%', left: '5%', color: 'var(--secondary-cyan)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>SECURE_SSL</div>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#fff' }}>
            College Secure Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
            Select your academic role and supply credentials. Integrity and activity metrics are monitored in real time.
          </p>

          {/* Quick Demo Selector */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0, 191, 255, 0.03)', borderColor: 'var(--border-color)', textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> PRESENTATION QUICK-LOGINS (Click to fill)
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button 
                onClick={() => {
                  setRole('student');
                  setEmail(demoStudent.email);
                  setPassword('password123');
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '6px',
                  color: '#fff', fontSize: '11px', padding: '8px', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: '6px', alignItems: 'center'
                }}
              >
                <Users size={12} color="var(--primary-blue)" /> Student (Aarav)
              </button>
              <button 
                onClick={() => {
                  setRole('staff');
                  setEmail('staff@codegate.edu');
                  setPassword('staff123');
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '6px',
                  color: '#fff', fontSize: '11px', padding: '8px', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: '6px', alignItems: 'center'
                }}
              >
                <Award size={12} color="#f59e0b" /> Staff (Instructor)
              </button>
              <button 
                onClick={() => {
                  setRole('hod');
                  setEmail('hod.cse@codegate.edu');
                  setPassword('hod123');
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '6px',
                  color: '#fff', fontSize: '11px', padding: '8px', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: '6px', alignItems: 'center'
                }}
              >
                <Cpu size={12} color="#10b981" /> HOD (Dept Head)
              </button>
              <button 
                onClick={() => {
                  setRole('admin');
                  setEmail('admin@codegate.edu');
                  setPassword('admin123');
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '6px',
                  color: '#fff', fontSize: '11px', padding: '8px', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: '6px', alignItems: 'center'
                }}
              >
                <Shield size={12} color="#ef4444" /> Admin (College Control)
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '24px', color: 'var(--text-muted)', fontSize: '12px' }}>
          CodeGate Security System © 2026. Whitelist restricted.
        </div>
      </div>

      {/* Login Form Panel */}
      <div className="auth-panel">
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div className="cyber-badge" style={{ marginBottom: '15px' }}>
            Authorization Shield
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '10px' }}>
            Portal Gateway
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '30px' }}>
            Select your portal type and provide credentials to authenticate.
          </p>

          {error && (
            <div className="glass-panel" style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="cyber-label">Select Workspace Role</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['student', 'staff', 'hod', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setError('');
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: role === r ? 'rgba(0, 191, 255, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid',
                      borderColor: role === r ? 'var(--primary-blue)' : 'var(--border-color)',
                      borderRadius: '6px',
                      color: role === r ? '#fff' : 'var(--text-muted)',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="cyber-label">Institutional Email</label>
              <input
                type="email"
                placeholder="name@codegate.edu"
                className="cyber-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="cyber-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="cyber-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-neon" style={{ width: '100%', marginTop: '10px' }}>
              Authenticate Terminal
            </button>
          </form>

          {role === 'student' && (
            <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
              First time logging in or not registered yet?{' '}
              <button 
                onClick={() => setCurrentPage('register')} 
                style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-cyber)' }}
              >
                Verify Whitelist
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
