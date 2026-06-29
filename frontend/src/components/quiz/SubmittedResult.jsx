import React from 'react';
import { CheckCircle } from 'lucide-react';

const SubmittedResult = React.memo(({ score, headerTitle, onBack, onBackToTopics, isGroup }) => {
  return (
    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
      <div className="aptitude-score-circle" style={{
        background: score >= 60 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
        border: `1px solid ${score >= 60 ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
      }}>
        <CheckCircle size={36} color={score >= 60 ? '#10b981' : '#f59e0b'} />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Assessment Submitted!</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '8px' }}>
        {headerTitle}
      </p>
      <div className="aptitude-score-value" style={{ color: score >= 60 ? '#10b981' : '#f59e0b' }}>
        {score}%
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
        Score saved to your record. Points added to your profile.
      </p>
      <div className="aptitude-submitted-actions">
        <button className="btn-cyber-outline" onClick={onBack} style={{ padding: '10px 20px' }}>
          Back to {isGroup ? 'Modules' : 'Sub-Modules'}
        </button>
        <button className="btn-neon" onClick={onBackToTopics} style={{ padding: '10px 20px' }}>
          Back to Module Selection
        </button>
      </div>
    </div>
  );
});

SubmittedResult.displayName = 'SubmittedResult';
export default SubmittedResult;
