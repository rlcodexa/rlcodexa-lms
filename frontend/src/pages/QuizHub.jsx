import React, { useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { Brain, Code2, Database, Monitor, ArrowRight, Trophy, Zap, BookOpen, Lock } from 'lucide-react';

const QuizHub = ({ setCurrentPage }) => {
  const { currentUser } = useContext(AssessmentContext);

  if (!currentUser) return null;

  const assessments = [
    {
      id: 'aptitude',
      title: 'Aptitude Assessment',
      description: 'Test your quantitative aptitude across 11 modules — Number System, Percentage, Time & Work, and more.',
      icon: Brain,
      color: 'var(--primary-blue)',
      gradient: 'linear-gradient(135deg, rgba(0,191,255,0.15), rgba(6,182,212,0.05))',
      borderColor: 'rgba(0,191,255,0.3)',
      badge: '11 Modules',
      action: 'Start Aptitude'
    },
    {
      id: 'coding-mcq',
      title: 'Coding Fundamentals MCQ',
      description: 'Master programming concepts across 10 topics — Data Structures, OOP, DBMS, Networks, and more.',
      icon: Code2,
      color: 'var(--secondary-cyan)',
      gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.05))',
      borderColor: 'rgba(6,182,212,0.3)',
      badge: '10 Topics',
      action: 'Start Coding MCQ'
    },
    {
      id: 'database-sql',
      title: 'Database & SQL',
      description: 'Master SQL queries, joins, normalization, indexing, transactions, and database design concepts.',
      icon: Database,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.05))',
      borderColor: 'rgba(245,158,11,0.3)',
      badge: '7 Modules',
      action: 'Start Database & SQL'
    },
    {
      id: 'computer-fundamentals',
      title: 'Computer Fundamentals',
      description: 'Learn hardware, operating systems, memory, networks, number systems, architecture, and software concepts.',
      icon: Monitor,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.05))',
      borderColor: 'rgba(16,185,129,0.3)',
      badge: '7 Modules',
      action: 'Start Computer Fundamentals'
    }
  ];

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="btn-cyber-outline" 
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back
          </button>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <BookOpen size={12} style={{ marginRight: '4px' }} /> ASSESSMENT HUB
            </div>
            <h1 className="page-title" style={{ margin: 0 }}>
              Quiz <span>& Assessment Center</span>
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <Zap size={16} color="var(--primary-blue)" />
          <span>Points: <b style={{ color: '#fff' }}>{currentUser.points}</b></span>
          <Trophy size={16} color="var(--secondary-cyan)" />
          <span>Level: <b style={{ color: 'var(--secondary-cyan)' }}>{currentUser.level}</b></span>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
        Select an assessment type below. Each module has multiple sub-modules with 5 MCQs each.
        Complete all sub-modules to earn points and improve your standing on the leaderboard.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {assessments.map(item => {
          const Icon = item.icon;
          // Student role has free access to practice. Assessment role is locked down to trainer assignments.
          const isUnlocked = currentUser.role !== 'assessment' || (currentUser.unlockedModules && currentUser.unlockedModules.includes(item.id));

          return (
            <div
              key={item.id}
              className={`glass-panel ${isUnlocked ? 'glowing' : ''}`}
              style={{
                padding: '28px',
                borderTop: `3px solid ${isUnlocked ? item.color : '#475569'}`,
                background: isUnlocked ? item.gradient : 'rgba(30, 41, 59, 0.4)',
                borderColor: isUnlocked ? item.borderColor : 'rgba(71, 85, 105, 0.3)',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                opacity: isUnlocked ? 1 : 0.6,
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                if (isUnlocked) {
                  setCurrentPage(item.id);
                }
              }}
              onMouseEnter={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 0 30px ${item.borderColor}`;
                }
              }}
              onMouseLeave={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--glow-shadow)';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: `rgba(0,0,0,0.3)`,
                  border: `1px solid ${isUnlocked ? item.borderColor : '#475569'}`,
                  color: isUnlocked ? item.color : '#94a3b8'
                }}>
                  {isUnlocked ? <Icon size={28} /> : <Lock size={28} />}
                </div>
                <span className="cyber-badge" style={{
                  background: `rgba(0,0,0,0.3)`,
                  borderColor: isUnlocked ? item.borderColor : '#475569',
                  color: isUnlocked ? item.color : '#94a3b8',
                  fontSize: '11px'
                }}>
                  {isUnlocked ? item.badge : 'Locked'}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: isUnlocked ? '#fff' : '#94a3b8' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                {item.description}
              </p>

              <button
                className={isUnlocked ? "btn-neon" : "btn-cyber-outline"}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  color: isUnlocked ? '#fff' : '#94a3b8',
                  background: isUnlocked ? `linear-gradient(135deg, ${item.color}, ${item.color}88)` : 'transparent',
                  borderColor: isUnlocked ? item.borderColor : '#475569',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isUnlocked) {
                    setCurrentPage(item.id);
                  }
                }}
                disabled={!isUnlocked}
              >
                {isUnlocked ? (
                  <>
                    {item.action} <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </>
                ) : (
                  <>
                    Locked by Trainer <Lock size={14} style={{ marginLeft: '8px' }} />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizHub;
