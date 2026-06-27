import React, { useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { Award, ShieldAlert, CheckCircle, Clock, Zap, Target, BookOpen, Star } from 'lucide-react';

const Evaluation = () => {
  const { currentStudent, students } = useContext(AssessmentContext);

  if (!currentStudent) return null;

  // Calculate scores
  const qScore = currentStudent.completedQuiz ? currentStudent.quizScore : 0;
  const cScore = currentStudent.completedCoding ? currentStudent.codingScore : 0;
  const totalScore = qScore + cScore;

  // Compile Leaderboard: sort registered students by total score descending
  // Pre-seeded students also have scores.
  const leaderboard = [...students]
    .filter(s => s.registered)
    .map(s => {
      const qs = s.completedQuiz ? s.quizScore : 0;
      const cs = s.completedCoding ? s.codingScore : 0;
      return {
        ...s,
        total: qs + cs
      };
    })
    .sort((a, b) => b.total - a.total);

  // Find current student's rank
  const myRankIdx = leaderboard.findIndex(s => s.id === currentStudent.id);
  const myRank = myRankIdx !== -1 ? myRankIdx + 1 : 'N/A';

  // Infraction status color
  const getInfractionColor = (count) => {
    if (count === 0) return '#10b981';
    if (count < 3) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Award size={12} style={{ marginRight: '4px' }} /> ACADEMIC PERFORMANCE SUMMARY
          </div>
          <h1 className="page-title">
            Evaluation <span>& Results</span>
          </h1>
        </div>
      </div>

      {/* Overview Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        {/* Score Breakdown Widget */}
        <div className="glass-panel glowing neon-border-blue" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={16} /> Performance Gradebook
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Theoretical Quiz</span>
                <span style={{ fontWeight: 'bold', color: qScore > 0 ? '#10b981' : 'var(--text-muted)' }}>
                  {currentStudent.completedQuiz ? `${qScore}/100 pts` : 'NOT TAKEN'}
                </span>
              </div>
              <div className="custom-progress-bar" style={{ height: '8px' }}>
                <div className="custom-progress-fill" style={{ width: `${qScore}%`, background: 'linear-gradient(90deg, var(--primary-blue), var(--secondary-cyan))' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Coding Sandbox</span>
                <span style={{ fontWeight: 'bold', color: cScore > 0 ? '#10b981' : 'var(--text-muted)' }}>
                  {currentStudent.completedCoding ? `${cScore}/100 pts` : 'NOT TAKEN'}
                </span>
              </div>
              <div className="custom-progress-bar" style={{ height: '8px' }}>
                <div className="custom-progress-fill" style={{ width: `${cScore}%`, background: 'linear-gradient(90deg, var(--secondary-cyan), var(--primary-blue))' }}></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>Cumulative Score:</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-blue)' }}>{totalScore}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '4px' }}>/200</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Metrics Widget */}
        <div className="glass-panel glowing neon-border-cyan" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--secondary-cyan)', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} /> Secure Exam Audit
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Honor Score</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: currentStudent.infractionCount === 0 ? '#10b981' : (currentStudent.infractionCount < 3 ? '#f59e0b' : '#ef4444') }}>
                  {currentStudent.infractionCount === 0 ? 'INTEGRITY A+' : (currentStudent.infractionCount < 3 ? 'WARNING STATUS' : 'FLAGGED TERMINATED')}
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800' }}>
                {Math.max(0, 100 - (currentStudent.infractionCount * 25))}%
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>INFRACTION LOGS</div>
              {currentStudent.infractionLogs.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0' }}>
                  <CheckCircle size={14} /> Zero warning notifications registered.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '90px', overflowY: 'auto' }}>
                  {currentStudent.infractionLogs.map((log, index) => (
                    <div key={index} style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', padding: '4px 8px', borderRadius: '4px', borderLeft: '2px solid #ef4444' }}>
                      <span>[{log.time}] {log.type}</span>
                      <span>{log.desc.substring(0, 25)}...</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Leaderboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {/* Whitelist Leaderboard */}
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="var(--primary-blue)" /> Whitelist Cohort Standings (Top 10)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '15px' }}>
            Ranked out of the 50 students eligible on CodeGate whitelist. Only registered students who completed assessments are listed.
          </p>

          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Quiz</th>
                <th>Coding</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(0, 10).map((student, index) => {
                const isMe = student.id === currentStudent.id;
                const rankNum = index + 1;
                
                return (
                  <tr key={student.id} className={isMe ? 'leaderboard-row-active' : ''}>
                    <td>
                      <span className={`leaderboard-rank rank-${rankNum <= 3 ? rankNum : ''}`}>
                        {rankNum === 1 ? '🏆 1' : (rankNum === 2 ? '🥈 2' : (rankNum === 3 ? '🥉 3' : rankNum))}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-code)', fontSize: '13px', color: isMe ? 'var(--primary-blue)' : 'var(--text-muted)' }}>
                      {student.id}
                    </td>
                    <td style={{ fontWeight: isMe ? '600' : '400' }}>
                      {student.name} {isMe && <span style={{ fontSize: '10px', color: 'var(--secondary-cyan)', marginLeft: '4px' }}>(You)</span>}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{student.department}</td>
                    <td>{student.completedQuiz ? `${student.quizScore}` : '-'}</td>
                    <td>{student.completedCoding ? `${student.codingScore}` : '-'}</td>
                    <td style={{ fontWeight: 'bold', color: isMe ? 'var(--primary-blue)' : '#fff' }}>
                      {student.total} / 200
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Skill Analytics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '10px' }}>
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(0,191,255,0.1)', color: 'var(--primary-blue)' }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Speed Index</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Optimal (12m elapsed)</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(6,182,212,0.1)', color: 'var(--secondary-cyan)' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Accuracy Ratio</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {totalScore > 0 ? `${Math.round((totalScore/200)*100)}% Match` : '0% Match'}
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
              <Star size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Core Aptitude</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {totalScore > 150 ? 'AI Architect' : (totalScore > 100 ? 'Systems Eng' : 'Aptitude Pending')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
