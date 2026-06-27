import React from 'react';
import { CheckCircle, ArrowLeft, Brain } from 'lucide-react';

const GroupCard = React.memo(({ g, done, onSelect }) => (
  <div
    className={`glass-panel aptitude-card${done ? ' completed' : ''}`}
    style={{
      borderTop: `3px solid ${done ? '#10b981' : 'var(--primary-blue)'}`,
    }}
    onClick={() => { if (!done) onSelect(g); }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{g.title}</h3>
      {done ? (
        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
          <CheckCircle size={14} /> Done
        </span>
      ) : (
        <span style={{ color: 'var(--primary-blue)', fontSize: '12px' }}>{g.questions.length} Qs</span>
      )}
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
      5 multiple choice questions
    </p>
  </div>
));
GroupCard.displayName = 'GroupCard';

const GroupSelection = React.memo(({ subModule, onSelectGroup, onBack, isGroupComplete }) => {
  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Brain size={12} style={{ marginRight: '4px' }} /> {subModule.title}
          </div>
          <h1 className="page-title">
            {subModule.title} <span>Modules</span>
          </h1>
        </div>
        <button className="btn-cyber-outline" onClick={onBack} style={{ padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back to Sub-Modules
        </button>
      </div>
      <div className="aptitude-group-grid">
        {subModule.groups.map(g => (
          <GroupCard key={g.id} g={g} done={isGroupComplete ? isGroupComplete(g.id) : false} onSelect={onSelectGroup} />
        ))}
      </div>
    </div>
  );
});

GroupSelection.displayName = 'GroupSelection';
export default GroupSelection;
