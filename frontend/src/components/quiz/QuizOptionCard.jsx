import React from 'react';

const QuizOptionCard = React.memo(({ opt, oi, isSelected, onSelect }) => (
  <div
    className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(oi)}
    style={{
      padding: '14px 18px',
      cursor: 'pointer',
      borderRadius: '8px',
      border: `1px solid ${isSelected ? 'var(--primary-blue)' : 'var(--border-color)'}`,
      background: isSelected ? 'rgba(0,191,255,0.08)' : 'transparent',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        border: `2px solid ${isSelected ? 'var(--primary-blue)' : 'var(--border-color)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 'bold',
        color: isSelected ? '#fff' : 'var(--text-muted)',
        background: isSelected ? 'var(--primary-blue)' : 'transparent'
      }}>
        {String.fromCharCode(65 + oi)}
      </div>
      <span style={{ fontSize: '15px', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{opt}</span>
    </div>
  </div>
));

QuizOptionCard.displayName = 'QuizOptionCard';
export default QuizOptionCard;
