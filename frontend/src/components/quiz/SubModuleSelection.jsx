import React from 'react';
import { CheckCircle, ArrowLeft, Brain } from 'lucide-react';

const SubModuleCard = React.memo(({ sm, done, onSelect }) => (
  <div
    className={`glass-panel aptitude-card${done ? ' completed' : ''}`}
    style={{
      borderTop: `3px solid ${done ? '#10b981' : 'var(--secondary-cyan)'}`,
    }}
    onClick={() => { if (!done) onSelect(sm); }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{sm.title}</h3>
      {done ? (
        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
          <CheckCircle size={14} /> Done
        </span>
      ) : (
        <span style={{ color: 'var(--secondary-cyan)', fontSize: '12px' }}>{sm.groups ? `${sm.groups.length} modules` : `${sm.questions.length} Qs`}</span>
      )}
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
      {sm.groups ? `${sm.groups.length} modules • Score tracked` : '5 multiple choice questions • Score tracked'}
    </p>
  </div>
));
SubModuleCard.displayName = 'SubModuleCard';

const SubModuleSelection = React.memo(({ module, onSelectSubModule, onBack, isSubModuleComplete, subModuleQsCount }) => {
  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Brain size={12} style={{ marginRight: '4px' }} /> {module.icon} {module.title}
          </div>
          <h1 className="page-title">
            {module.title} <span>Sub-Modules</span>
          </h1>
        </div>
        <button className="btn-cyber-outline" onClick={onBack} style={{ padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back to Modules
        </button>
      </div>
      <div className="aptitude-submodule-grid">
        {module.subModules.map(sm => {
          const done = isSubModuleComplete(sm);
          return (
            <SubModuleCard key={sm.id} sm={sm} done={done} onSelect={onSelectSubModule} />
          );
        })}
      </div>
    </div>
  );
});

SubModuleSelection.displayName = 'SubModuleSelection';
export default SubModuleSelection;
