import React, { useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { Brain, Code2, Database, Monitor, ArrowRight, Trophy, Zap, BookOpen } from 'lucide-react';

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
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} style={{ marginRight: '4px' }} /> ASSESSMENT HUB
          </div>
          <h1 className="page-title">
            Quiz <span>& Assessment Center</span>
          </h1>
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

          return (
            <div
              key={item.id}
              className="glass-panel glowing"
              style={{
                padding: '28px',
                borderTop: `3px solid ${item.color}`,
                background: item.gradient,
                borderColor: item.borderColor,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setCurrentPage(item.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 0 30px ${item.borderColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--glow-shadow)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: `rgba(0,0,0,0.3)`,
                  border: `1px solid ${item.borderColor}`,
                  color: item.color
                }}>
                  <Icon size={28} />
                </div>
                <span className="cyber-badge" style={{
                  background: `rgba(0,0,0,0.3)`,
                  borderColor: item.borderColor,
                  color: item.color,
                  fontSize: '11px'
                }}>
                  {item.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                {item.description}
              </p>

              <button
                className="btn-neon"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '14px',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                  borderColor: item.borderColor
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage(item.id);
                }}
              >
                {item.action} <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizHub;
