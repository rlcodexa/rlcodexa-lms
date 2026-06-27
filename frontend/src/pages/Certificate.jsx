import React, { useContext, useRef } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { Award, ShieldCheck, Printer, ArrowLeft, Terminal } from 'lucide-react';

const Certificate = () => {
  const { currentUser } = useContext(AssessmentContext);
  const certRef = useRef();

  if (!currentUser || !currentUser.weeklyCertIssued) {
    return (
      <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
        <Award size={48} color="var(--text-muted)" style={{ marginBottom: '15px' }} />
        <h3>Certificate Locked</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }}>
          Weekly assessment certificate is generated upon scoring &gt;140 total points. Complete quizzes and coding tests to unlock.
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Simulated secure hash for blockchain verification
  const verificationHash = `CG-${currentUser.id}-SHA256-${currentUser.points}-${currentUser.level.toUpperCase().replace(' ', '_')}`;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header print-hide">
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Award size={12} style={{ marginRight: '4px' }} /> VERIFIED ACADEMIC ACHIEVEMENT
          </div>
          <h1 className="page-title">
            Honorary <span>Certificate</span>
          </h1>
        </div>

        <button className="btn-neon" onClick={handlePrint}>
          <Printer size={16} /> Print Certificate
        </button>
      </div>

      {/* Certificate Container */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div 
          ref={certRef}
          className="glass-panel neon-border-blue"
          style={{
            maxWidth: '800px',
            width: '100%',
            background: 'linear-gradient(135deg, #090f1d 0%, #030817 100%)',
            borderWidth: '2px',
            padding: '50px 60px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--glow-shadow-intense)',
            borderRadius: '16px',
            textAlign: 'center'
          }}
        >
          {/* Certificate visual borders */}
          <div style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '20px',
            right: '20px',
            border: '1px solid rgba(0, 191, 255, 0.15)',
            borderRadius: '10px',
            pointerEvents: 'none'
          }}></div>

          <div style={{
            position: 'absolute',
            top: '25px',
            bottom: '25px',
            left: '25px',
            right: '25px',
            border: '2px dashed rgba(6, 182, 212, 0.15)',
            borderRadius: '8px',
            pointerEvents: 'none'
          }}></div>

          {/* Certificate Content */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(0, 191, 255, 0.1)',
              border: '1px solid rgba(0, 191, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 191, 255, 0.2)'
            }}>
              <Award size={36} color="var(--primary-blue)" />
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-cyber)', fontSize: '13px', color: 'var(--secondary-cyan)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '800', marginBottom: '10px' }}>
            Certificate of Accomplishment
          </h2>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '30px' }}>
            CodeGate Assessment Systems Whitelist Registry
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '15px', italic: 'true', marginBottom: '20px' }}>
            This credentials token certifies that
          </p>

          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.2)', marginBottom: '15px', fontFamily: 'var(--font-cyber)' }}>
            {currentUser.name}
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '500px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
            has successfully registered, authenticated daily, and completed the secure college technical assessments, verifying mastery in computational logic and theoretical computer science.
          </p>

          <div style={{ display: 'flex', justify: 'center', gap: '30px', margin: '30px 0', flexWrap: 'wrap' }}>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '6px', background: 'rgba(15,23,42,0.6)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Academic Level</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary-blue)' }}>{currentUser.level}</div>
            </div>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '6px', background: 'rgba(15,23,42,0.6)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Session Score</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--secondary-cyan)' }}>{currentUser.points} points</div>
            </div>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '6px', background: 'rgba(15,23,42,0.6)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Department</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{currentUser.department}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>Prof. Tanu Mishra</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Lead Course Instructor</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>Date Issued: {todayStr}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '11px', fontWeight: 'bold', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '4px' }}>
                <ShieldCheck size={12} /> SECURE VERIFIED
              </div>
              <div style={{ fontSize: '9px', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', wordBreak: 'break-all', maxWidth: '280px' }}>
                Hash: {verificationHash}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
