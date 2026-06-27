import React from 'react';
import { CheckCircle } from 'lucide-react';

const ModuleSelection = React.memo(({ modules, onSelectModule, isModuleComplete }) => {
  return (
    <div className="aptitude-module-grid">
      {modules.map(mod => {
        const completed = isModuleComplete(mod);
        return (
          <div
            key={mod.id}
            className={`glass-panel aptitude-card${completed ? ' completed' : ''}`}
            style={{
              borderTop: `3px solid ${completed ? '#10b981' : 'var(--primary-blue)'}`,
            }}
            onClick={() => onSelectModule(mod)}
          >
            <div className="aptitude-card-icon">{mod.icon}</div>
            <h3 className="aptitude-card-title">
              {mod.title}
            </h3>
            <div className="aptitude-card-meta">
              <span>{mod.subModules.length} sub-modules</span>
              {completed && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Complete</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
});

ModuleSelection.displayName = 'ModuleSelection';
export default ModuleSelection;
