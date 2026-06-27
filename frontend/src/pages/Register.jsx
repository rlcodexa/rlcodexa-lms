import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { User, Mail, ShieldAlert, Cpu, Award, Lock, BookOpen } from 'lucide-react';

const Register = ({ setCurrentPage }) => {
  const { registerStudent, registerDirectStudent, departments, colleges, students } = useContext(AssessmentContext);
  
  const [regType, setRegType] = useState('whitelist'); // 'whitelist' or 'direct'
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(departments[0]);
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (colleges && colleges.length > 0 && !college) {
      setCollege(colleges[0].collegeName);
    }
  }, [colleges, college]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!rollNo || !name || !email || !password) {
      setError('Please fill in all details.');
      return;
    }

    let res;
    if (regType === 'whitelist') {
      res = await registerStudent(rollNo.trim(), name.trim(), email.trim(), department, password);
    } else {
      if (!college) {
        setError('Please select a college.');
        return;
      }
      res = await registerDirectStudent(rollNo.trim(), name.trim(), email.trim(), college, department, password);
    }

    if (res.success) {
      setSuccess(res.message || `Registration successful! Student ${name} is authorized.`);
      setTimeout(() => {
        setCurrentPage('login');
      }, 2500);
    } else {
      setError(res.message);
    }
  };

  // List first 5 unregistered roll numbers to help the demo user
  const unregistered = students.filter(s => !s.registered).slice(0, 4);

  return (
    <div className="auth-container">
      {/* Side Illustration Panel */}
      <div className="auth-hero-panel">
        <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-cyan))' }}></div>
          <span style={{ fontSize: '18px', fontWeight: '800', tracking: '1px' }}>CODEGATE</span>
        </div>
        
        <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto 0' }}>
          {/* Cyber Vector Circle Illustration */}
          <div className="glow-vector" style={{ marginBottom: '40px' }}>
            <div className="vector-circle-outer"></div>
            <div className="vector-circle-inner"></div>
            <div className="vector-core">
              <Cpu size={40} color="#000" />
            </div>
            {/* Tech details */}
            <div style={{ position: 'absolute', top: '15%', left: '5%', color: 'var(--primary-blue)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>SYS.VER_2.6</div>
            <div style={{ position: 'absolute', bottom: '15%', right: '5%', color: 'var(--secondary-cyan)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>SECURE_PASS</div>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px', color: '#fff' }}>
            {regType === 'whitelist' ? 'AI-Secured Whitelist Entrance' : 'Direct Admissions Registry'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
            {regType === 'whitelist' 
              ? 'Verify your academic enrollment status. Registration is restricted exclusively to the pre-seeded college students in the whitelisting registry.'
              : 'Direct registration gateway for individual/independent student cohorts. Select your college and enter your credentials to initialize your assessment workspace.'}
          </p>

          {/* Quick Demo Helper (Only for whitelist mode) */}
          {regType === 'whitelist' && unregistered.length > 0 && (
            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--secondary-cyan)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={14} /> Demo Assistance (Unregistered Slots)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {unregistered.map(u => (
                  <button 
                    key={u.id}
                    onClick={() => {
                      setRollNo(u.id);
                      setName(u.name);
                      setEmail(u.email);
                      setDepartment(u.department);
                    }}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      color: 'var(--primary-blue)',
                      fontSize: '11px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-code)'
                    }}
                    title="Click to auto-fill this whitelisted student for quick testing"
                  >
                    {u.id} ({u.name.split(' ')[0]})
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>
                * Select a code above to auto-fill whitelisted details for immediate testing!
              </div>
            </div>
          )}

          {regType === 'direct' && (
            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0, 191, 255, 0.05)', borderColor: 'rgba(0, 191, 255, 0.2)', textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} /> Direct Student Registration
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Type in your registration roll number, name, institutional email, and select your specific college from the list. Your student credentials will be committed directly to our MongoDB database.
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', bottom: '24px', color: 'var(--text-muted)', fontSize: '12px' }}>
          CodeGate Assessment Systems © 2026. All rights reserved.
        </div>
      </div>

      {/* Register Form Panel */}
      <div className="auth-panel">
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div className="cyber-badge" style={{ marginBottom: '15px' }}>
            Registration Gate
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '10px' }}>
            Verify Identity
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
            Enter your student credentials to register into the CodeGate cohort.
          </p>

          {/* Cyber Tab Toggle */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '25px', background: 'rgba(15, 23, 42, 0.4)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => {
                setRegType('whitelist');
                setError('');
                setSuccess('');
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '6px',
                background: regType === 'whitelist' ? 'linear-gradient(135deg, rgba(0, 191, 255, 0.15), rgba(6, 182, 212, 0.15))' : 'transparent',
                border: regType === 'whitelist' ? '1px solid rgba(0, 191, 255, 0.3)' : '1px solid transparent',
                color: regType === 'whitelist' ? '#fff' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-cyber)',
                boxShadow: regType === 'whitelist' ? '0 0 10px rgba(0, 191, 255, 0.05)' : 'none'
              }}
            >
              Whitelist Entrance
            </button>
            <button
              type="button"
              onClick={() => {
                setRegType('direct');
                setError('');
                setSuccess('');
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '6px',
                background: regType === 'direct' ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(0, 191, 255, 0.15))' : 'transparent',
                border: regType === 'direct' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                color: regType === 'direct' ? '#fff' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-cyber)',
                boxShadow: regType === 'direct' ? '0 0 10px rgba(6, 182, 212, 0.05)' : 'none'
              }}
            >
              Direct Admissions
            </button>
          </div>

          {error && (
            <div className="glass-panel" style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="glass-panel" style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <div>{success}</div>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="cyber-label">
                {regType === 'whitelist' ? 'Student Whitelist ID (Roll Number)' : 'Roll Number / Student ID'}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder={regType === 'whitelist' ? 'e.g. CG-2026-01' : 'e.g. 22BCA099'}
                  className="cyber-input"
                  style={{ textTransform: 'uppercase' }}
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="cyber-label">Student Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="cyber-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="cyber-label">Institutional Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="name@institution.edu"
                  className="cyber-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {regType === 'direct' && (
              <div>
                <label className="cyber-label">College Selection</label>
                <select 
                  className="cyber-select"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                >
                  {colleges.map((c, index) => (
                    <option key={index} value={c.collegeName}>{c.collegeName}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="cyber-label">Department</label>
              <select 
                className="cyber-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="cyber-label">Access Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="cyber-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-neon" style={{ width: '100%', marginTop: '10px' }}>
              {regType === 'whitelist' ? 'Register & Request Access' : 'Register Direct Admission'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
            Already verified your whitelist ID?{' '}
            <button 
              onClick={() => setCurrentPage('login')} 
              style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-cyber)' }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
