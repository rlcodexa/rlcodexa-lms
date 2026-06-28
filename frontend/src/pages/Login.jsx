import React, { useState, useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ShieldAlert, Key, Users, Award, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Login = ({ setCurrentPage }) => {
  const { loginStudent } = useContext(AssessmentContext);
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
      if (res.rewardAdded) {
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

  return (
    <div className="auth-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top right, #020817, #000000)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glowing effects */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0 }}></div>

      {/* Daily streak notification */}
      {streakPopup && (
        <div className="security-alert-overlay" style={{ zIndex: 100 }}>
          <div className="security-alert-box" style={{ borderColor: 'var(--primary-blue)', boxShadow: 'var(--glow-shadow-intense)', background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)' }}>
            <div style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}><Award size={64} /></div>
            <h2 className="security-alert-title" style={{ fontSize: '24px', letterSpacing: '2px' }}>DAILY LOG STREAK!</h2>
            <p className="security-alert-text" style={{ fontSize: '16px', color: '#fff' }}>
              Authentication successful. Welcome back!
            </p>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--secondary-cyan)', margin: '20px 0', textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
              +20 Points Added!
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Syncing level indicators...
            </p>
          </div>
        </div>
      )}

      {/* Main Login Card */}
      <div style={{ display: 'flex', width: '1000px', height: '600px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden', backdropFilter: 'blur(20px)', zIndex: 10 }}>

        {/* Left Side: Brand & Visuals */}
        <div style={{ flex: '1', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(0,191,255,0.05) 0%, transparent 100%)', zIndex: 0 }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #00BFFF, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,191,255,0.4)' }}>
                <Key size={18} color="#000" />
              </div>
              <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '2px', color: '#fff' }}>CODEGATE</span>
            </div>

            <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Unlock Your<br />Coding Potential.
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', maxWidth: '80%' }}>
              Join the elite assessment platform. Practice, compete, and climb the leaderboard to prove your skills.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', WebkitBoxReflect: 'below 0px linear-gradient(transparent, transparent, rgba(0,0,0,0.2))' }}>
              <Users size={24} color="var(--primary-blue)" />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Over 10,000+ Students</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Actively learning & coding</div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{ flex: '1', padding: '50px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(2, 8, 23, 0.4)' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(0,191,255,0.1)', borderRadius: '20px', border: '1px solid rgba(0,191,255,0.2)', color: 'var(--primary-blue)', fontSize: '12px', fontWeight: '600', marginBottom: '20px' }}>
              <Sparkles size={14} /> Student Portal
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Enter your institutional credentials to access your dashboard.</p>
          </div>

          {error && (
            <div style={{ padding: '14px 16px', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', borderRadius: '4px', color: '#ef4444', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px', animation: 'fadeIn 0.3s ease' }}>
              <ShieldAlert size={18} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#fff', fontSize: '13px', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px' }}>Login As</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['student', 'assessment', 'staff', 'hod', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: role === r ? 'rgba(0,191,255,0.2)' : 'rgba(15, 23, 42, 0.6)',
                      border: `1px solid ${role === r ? 'var(--primary-blue)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '8px',
                      color: role === r ? '#fff' : 'var(--text-muted)',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {r === 'staff' ? 'Trainer' : r === 'hod' ? 'HOD' : r === 'assessment' ? 'Test Mode' : r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#fff', fontSize: '13px', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@codegate.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px 14px 44px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s ease' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>Password</label>
                <button type="button" onClick={() => alert("Password reset link has been sent to your email.")} style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px 14px 44px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s ease', letterSpacing: password ? '4px' : 'normal' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            <button type="submit" style={{ marginTop: '10px', padding: '16px', background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-cyan))', border: 'none', borderRadius: '12px', color: '#000', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', boxShadow: '0 10px 25px -5px rgba(0, 191, 255, 0.4)' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Sign In to Portal <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-muted)', fontSize: '14px' }}>
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('register')}
              style={{ background: 'none', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'var(--primary-blue)'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
