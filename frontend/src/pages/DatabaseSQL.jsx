import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Database, BookOpen, ArrowLeft } from 'lucide-react';

const DB_MODULES = [
  {
    id: 'sql-basics',
    title: 'SQL Basics',
    icon: '📝',
    subModules: [
      {
        id: 'sql-select',
        title: 'SELECT & WHERE',
        questions: [
          { q: 'Which SQL clause is used to retrieve data from a table?', options: ['SELECT', 'GET', 'FETCH', 'RETRIEVE'], answer: 0 },
          { q: 'Which clause filters rows in SQL?', options: ['WHERE', 'HAVING', 'FILTER', 'IF'], answer: 0 },
          { q: 'What does SELECT * FROM employees do?', options: ['Selects all columns and rows', 'Selects first column', 'Selects row count', 'Deletes table'], answer: 0 },
          { q: 'Which operator checks for pattern matching?', options: ['LIKE', 'MATCH', 'CONTAINS', 'IN'], answer: 0 },
          { q: 'What is the correct ORDER BY default sort?', options: ['ASC', 'DESC', 'SORT', 'ORDER'], answer: 0 }
        ]
      },
      {
        id: 'sql-aggregate',
        title: 'Aggregate Functions',
        questions: [
          { q: 'Which function returns the number of rows?', options: ['COUNT', 'SUM', 'TOTAL', 'LEN'], answer: 0 },
          { q: 'AVG function returns the:', options: ['Average value', 'Sum', 'Count', 'Maximum'], answer: 0 },
          { q: 'Which clause is used with aggregate functions?', options: ['GROUP BY', 'ORDER BY', 'HAVING', 'WHERE'], answer: 0 },
          { q: 'What does MAX() return for a column of strings?', options: ['Highest alphabetical', 'Longest string', 'First string', 'Last string'], answer: 0 },
          { q: 'Which function ignores NULL values?', options: ['All aggregate functions', 'COUNT(*)', 'Only SUM', 'Only AVG'], answer: 0 }
        ]
      },
      {
        id: 'sql-grouping',
        title: 'GROUP BY & HAVING',
        questions: [
          { q: 'GROUP BY is used with:', options: ['Aggregate functions', 'WHERE clause', 'JOINs', 'Subqueries'], answer: 0 },
          { q: 'HAVING clause filters:', options: ['Groups after GROUP BY', 'Rows before GROUP BY', 'Both rows and groups', 'Only tables'], answer: 0 },
          { q: 'Can WHERE and HAVING be used together?', options: ['Yes', 'No', 'Only in MySQL', 'Only in Oracle'], answer: 0 },
          { q: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept shows:', options: ['Count per department', 'Total employees', 'Department names', 'All employees'], answer: 0 },
          { q: 'HAVING COUNT(*) > 5 filters:', options: ['Groups with more than 5 rows', 'Rows with value > 5', 'Departments with id > 5', 'Employees older than 5'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'data-manipulation',
    title: 'Data Manipulation',
    icon: '✏️',
    subModules: [
      {
        id: 'dml-insert',
        title: 'INSERT & UPDATE',
        questions: [
          { q: 'Which statement adds new rows to a table?', options: ['INSERT INTO', 'ADD ROW', 'CREATE ROW', 'APPEND'], answer: 0 },
          { q: 'UPDATE statement modifies:', options: ['Existing rows', 'Table structure', 'Column types', 'Indexes'], answer: 0 },
          { q: 'Without WHERE clause, UPDATE affects:', options: ['All rows', 'First row', 'Last row', 'No rows'], answer: 0 },
          { q: 'INSERT INTO t VALUES (1,2) requires:', options: ['Values for all columns', 'Values for some columns', 'Only primary key', 'No values'], answer: 0 },
          { q: 'Which is correct syntax?', options: ['UPDATE t SET col=1 WHERE id=5', 'UPDATE t WHERE id=5 SET col=1', 'UPDATE t SET col=1 HAVING id=5', 'UPDATE t SET col=1 IF id=5'], answer: 0 }
        ]
      },
      {
        id: 'dml-delete',
        title: 'DELETE & TRUNCATE',
        questions: [
          { q: 'DELETE FROM t removes:', options: ['Rows based on WHERE', 'All rows unconditionally', 'Table structure', 'Only null rows'], answer: 0 },
          { q: 'TRUNCATE vs DELETE:', options: ['TRUNCATE is faster', 'DELETE is faster', 'Both same speed', 'TRUNCATE can use WHERE'], answer: 0 },
          { q: 'Can DELETE be rolled back?', options: ['Yes', 'No', 'Only in PostgreSQL', 'Only with DDL'], answer: 0 },
          { q: 'TRUNCATE is a:', options: ['DDL statement', 'DML statement', 'DCL statement', 'TCL statement'], answer: 0 },
          { q: 'Which preserves table structure?', options: ['Both DELETE and TRUNCATE', 'Only DELETE', 'Only TRUNCATE', 'Neither'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'joins',
    title: 'Joins',
    icon: '🔗',
    subModules: [
      {
        id: 'join-inner',
        title: 'INNER & LEFT JOIN',
        questions: [
          { q: 'INNER JOIN returns:', options: ['Matching rows from both tables', 'All rows from left table', 'All rows from both tables', 'Non-matching rows'], answer: 0 },
          { q: 'LEFT JOIN returns:', options: ['All left table rows + matched right', 'All right table rows', 'Only matching rows', 'All rows from both'], answer: 0 },
          { q: 'RIGHT JOIN is opposite of:', options: ['LEFT JOIN', 'INNER JOIN', 'FULL JOIN', 'CROSS JOIN'], answer: 0 },
          { q: 'Which join returns all rows from both tables?', options: ['FULL OUTER JOIN', 'INNER JOIN', 'LEFT JOIN', 'CROSS JOIN'], answer: 0 },
          { q: 'CROSS JOIN produces:', options: ['Cartesian product', 'Matching rows', 'All left rows', 'Distinct rows'], answer: 0 }
        ]
      },
      {
        id: 'join-advanced',
        title: 'Self & Natural Joins',
        questions: [
          { q: 'A self join uses:', options: ['Table aliases', 'Two different tables', 'No join condition', 'Only primary keys'], answer: 0 },
          { q: 'NATURAL JOIN joins on:', options: ['Columns with same name', 'Primary key only', 'Foreign key only', 'All columns'], answer: 0 },
          { q: 'Which join is most efficient?', options: ['INNER JOIN', 'FULL JOIN', 'LEFT JOIN', 'CROSS JOIN'], answer: 0 },
          { q: 'When using LEFT JOIN, unmatched right columns are:', options: ['NULL', 'Empty string', 'Zero', 'Deleted'], answer: 0 },
          { q: 'A table can join with itself using:', options: ['Self join with aliases', 'Self join is not allowed', 'Only via subquery', 'Only via UNION'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'subqueries',
    title: 'Subqueries & Set Ops',
    icon: '🔄',
    subModules: [
      {
        id: 'subq-basics',
        title: 'Subqueries',
        questions: [
          { q: 'A subquery is:', options: ['Query inside another query', 'A query after main query', 'A stored procedure', 'A view'], answer: 0 },
          { q: 'IN operator with subquery checks:', options: ['If value is in subquery result', 'If subquery exists', 'If value is NULL', 'If value is unique'], answer: 0 },
          { q: 'EXISTS returns true if:', options: ['Subquery returns any rows', 'Subquery returns NULL', 'Subquery returns 1', 'Subquery has no rows'], answer: 0 },
          { q: 'Scalar subquery returns:', options: ['Single value', 'Multiple rows', 'Multiple columns', 'Entire table'], answer: 0 },
          { q: 'Correlated subquery references:', options: ['Outer query columns', 'Only inner query', 'No tables', 'System variables'], answer: 0 }
        ]
      },
      {
        id: 'set-ops',
        title: 'UNION & INTERSECT',
        questions: [
          { q: 'UNION removes:', options: ['Duplicate rows', 'NULL values', 'First column', 'Table names'], answer: 0 },
          { q: 'UNION ALL does:', options: ['Keeps duplicates', 'Removes duplicates', 'Sorts results', 'Removes NULLs'], answer: 0 },
          { q: 'INTERSECT returns:', options: ['Common rows in both queries', 'All rows from first', 'All rows from second', 'Rows not in second'], answer: 0 },
          { q: 'EXCEPT/MINUS returns:', options: ['Rows in first but not second', 'Rows in both', 'All rows combined', 'Rows not in either'], answer: 0 },
          { q: 'Set operations require:', options: ['Same number of columns', 'Same table', 'Same database', 'Same indexes'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'normalization',
    title: 'Normalization & Design',
    icon: '📐',
    subModules: [
      {
        id: 'norm-basics',
        title: '1NF, 2NF, 3NF',
        questions: [
          { q: '1NF requires:', options: ['Atomic columns', 'No duplicate rows', 'Primary key', 'Foreign key'], answer: 0 },
          { q: '2NF requires 1NF and:', options: ['No partial dependency', 'No transitive dependency', 'Boyce-Codd', 'All keys composite'], answer: 0 },
          { q: '3NF requires 2NF and:', options: ['No transitive dependency', 'No partial dependency', 'All keys unique', 'Single primary key'], answer: 0 },
          { q: 'Boyce-Codd Normal Form is:', options: ['Stricter than 3NF', 'Same as 1NF', 'Less strict than 3NF', 'Same as 2NF'], answer: 0 },
          { q: 'Denormalization improves:', options: ['Read performance', 'Write performance', 'Data integrity', 'Storage efficiency'], answer: 0 }
        ]
      },
      {
        id: 'norm-keys',
        title: 'Keys & Constraints',
        questions: [
          { q: 'Primary key is:', options: ['Unique and not null', 'Unique only', 'Not null only', 'Optional'], answer: 0 },
          { q: 'Foreign key references:', options: ['Primary key of another table', 'Any column', 'Unique constraint', 'Index'], answer: 0 },
          { q: 'Which constraint ensures unique values?', options: ['UNIQUE', 'PRIMARY KEY', 'Foreign key both', 'CHECK'], answer: 0 },
          { q: 'CHECK constraint validates:', options: ['Column values', 'Table names', 'Column names', 'Index names'], answer: 0 },
          { q: 'Composite key is:', options: ['Multiple columns as key', 'Single column key', 'Foreign key only', 'Index only'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'indexes-performance',
    title: 'Indexes & Performance',
    icon: '⚡',
    subModules: [
      {
        id: 'index-basics',
        title: 'Index Types',
        questions: [
          { q: 'Indexes speed up:', options: ['SELECT queries', 'INSERT operations', 'UPDATE operations', 'DELETE operations'], answer: 0 },
          { q: 'Clustered index determines:', options: ['Physical order of data', 'Logical order', 'Only sorting', 'No ordering'], answer: 0 },
          { q: 'How many clustered indexes per table?', options: ['One', 'Multiple', 'None', 'Up to five'], answer: 0 },
          { q: 'Non-clustered index stores:', options: ['Pointer to data', 'Copy of data', 'Table structure', 'No data'], answer: 0 },
          { q: 'Composite index is on:', options: ['Multiple columns', 'Single column', 'All columns', 'Indexed views'], answer: 0 }
        ]
      },
      {
        id: 'query-opt',
        title: 'Query Optimization',
        questions: [
          { q: 'EXPLAIN command shows:', options: ['Query execution plan', 'Query result', 'Table structure', 'Index definitions'], answer: 0 },
          { q: 'Which scan is fastest on indexed column?', options: ['Index seek', 'Table scan', 'Index scan', 'Clustered scan'], answer: 0 },
          { q: 'Avoid SELECT * because:', options: ['Unnecessary columns retrieved', 'It is slower syntax', 'It breaks queries', 'It cannot use WHERE'], answer: 0 },
          { q: 'Covering index includes:', options: ['All columns in query', 'Only primary key', 'Only foreign keys', 'Only one column'], answer: 0 },
          { q: 'Which hurts index performance?', options: ['Functions on indexed column', 'Using WHERE clause', 'Small result sets', 'Proper data types'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'advanced-sql',
    title: 'Advanced SQL',
    icon: '🚀',
    subModules: [
      {
        id: 'views-procedures',
        title: 'Views & Stored Procedures',
        questions: [
          { q: 'A view is a:', options: ['Virtual table', 'Physical table', 'Temporary table', 'Index'], answer: 0 },
          { q: 'Stored procedure is:', options: ['Precompiled SQL code', 'A view', 'A trigger', 'A constraint'], answer: 0 },
          { q: 'CREATE OR REPLACE VIEW:', options: ['Updates existing view', 'Creates table', 'Deletes view', 'Modifies data'], answer: 0 },
          { q: 'Procedures can have:', options: ['Input and output parameters', 'Only input', 'Only output', 'No parameters'], answer: 0 },
          { q: 'View vs table difference:', options: ['View does not store data', 'View stores data', 'Both are same', 'View is faster'], answer: 0 }
        ]
      },
      {
        id: 'transactions',
        title: 'Transactions & ACID',
        questions: [
          { q: 'ACID stands for:', options: ['Atomicity, Consistency, Isolation, Durability', 'Atomic, Consistent, Isolated, Durable', 'Access, Control, Input, Data', 'All Columns In Database'], answer: 0 },
          { q: 'COMMIT saves:', options: ['All changes in transaction', 'Only last change', 'No changes', 'Schema changes'], answer: 0 },
          { q: 'ROLLBACK undoes:', options: ['All changes since last COMMIT', 'Only last statement', 'All transactions ever', 'Table structure'], answer: 0 },
          { q: 'Isolation level controls:', options: ['How transactions see each other', 'Query speed', 'Index usage', 'Data types'], answer: 0 },
          { q: 'Dirty read reads:', options: ['Uncommitted data', 'Committed data', 'Old data', 'Indexed data'], answer: 0 }
        ]
      }
    ]
  }
];

const DatabaseSQL = ({ setCurrentPage }) => {
  const { currentUser, saveAssessmentResult, isModuleCompleted, addActivityLog } = useContext(AssessmentContext);

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    addActivityLog(currentUser?.name || 'Student', 'student', 'DB_SQL_START', 'Opened Database & SQL Assessment.');
  }, []);

  const handleSelectAnswer = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [`${selectedSubModule.id}-${qIdx}`]: optIdx
    }));
  };

  const handleSubmit = () => {
    if (!selectedSubModule) return;
    const questions = selectedSubModule.questions;
    let correct = 0;
    questions.forEach((q, idx) => {
      const key = `${selectedSubModule.id}-${idx}`;
      if (selectedAnswers[key] === q.answer) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    saveAssessmentResult('database-sql', selectedSubModule.id, pct);
  };

  const handleBackToModules = () => {
    setSelectedSubModule(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleBackToTopics = () => {
    setSelectedModule(null);
    setSelectedSubModule(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  if (!selectedModule) {
    return (
      <div>
        <button
          onClick={() => setCurrentPage('quizhub')}
          className="btn-neon"
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            marginBottom: '16px',
            borderColor: 'var(--primary-blue)',
            color: '#fff'
          }}
        >
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back to Quiz Hub
        </button>
        <button className="btn-cyber-outline" onClick={handleBackToTopics} style={{ marginBottom: '16px',  padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Modules
          </button>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Database size={12} style={{ marginRight: '4px' }} /> DATABASE & SQL ASSESSMENT
            </div>
            <h1 className="page-title">
              Database & <span>SQL</span>
            </h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Select a module to begin. Each module has 2-3 sub-modules with 5 questions each.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {DB_MODULES.map(mod => {
            const completed = mod.subModules.every(sm => isModuleCompleted('database-sql', sm.id));
            return (
              <div
                key={mod.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${completed ? '#10b981' : 'var(--primary-blue)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedModule(mod)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{mod.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                  {mod.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>{mod.subModules.length} sub-modules</span>
                  {completed && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Complete</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!selectedSubModule) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Database size={12} style={{ marginRight: '4px' }} /> {selectedModule.icon} {selectedModule.title}
            </div>
            <h1 className="page-title">
              {selectedModule.title} <span>Sub-Modules</span>
            </h1>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {selectedModule.subModules.map(sm => {
            const done = isModuleCompleted('database-sql', sm.id);
            return (
              <div
                key={sm.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${done ? '#10b981' : 'var(--secondary-cyan)'}`,
                  opacity: done ? 0.7 : 1,
                  cursor: done ? 'default' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => { if (!done) setSelectedSubModule(sm); }}
                onMouseEnter={(e) => { if (!done) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{sm.title}</h3>
                  {done ? (
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                      <CheckCircle size={14} /> Done
                    </span>
                  ) : (
                    <span style={{ color: 'var(--secondary-cyan)', fontSize: '12px' }}>{sm.questions.length} Qs</span>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  5 multiple choice questions • Score tracked
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const questions = selectedSubModule.questions;
  const currentQuestion = questions[currentIdx];
  const progressPct = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div>
      <button className="btn-cyber-outline" onClick={handleBackToModules} style={{ marginBottom: '16px',  padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back
        </button>
        <div className="page-header" style={{ marginBottom: '16px' }}>
          <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} style={{ marginRight: '4px' }} /> {selectedModule.title} / {selectedSubModule.title}
          </div>
          <h1 className="page-title" style={{ fontSize: '22px' }}>
            {selectedSubModule.title}
          </h1>
        </div>
        </div>

      {submitted ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: score >= 60 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
            border: `1px solid ${score >= 60 ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle size={36} color={score >= 60 ? '#10b981' : '#f59e0b'} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Assessment Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '8px' }}>
            {selectedSubModule.title} — {selectedModule.title}
          </p>
          <div style={{ fontSize: '42px', fontWeight: '800', color: score >= 60 ? '#10b981' : '#f59e0b', margin: '16px 0' }}>
            {score}%
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Score saved to your record. Points added to your profile.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-cyber-outline" onClick={handleBackToModules} style={{ padding: '10px 20px' }}>
              Back to Sub-Modules
            </button>
            <button className="btn-neon" onClick={handleBackToTopics} style={{ padding: '10px 20px' }}>
              Back to Module Selection
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
              <span>Progress</span>
              <span>Question {currentIdx + 1} of {questions.length}</span>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPct}%`, background: 'var(--primary-blue)' }}></div>
            </div>
          </div>

          <div style={{ minHeight: '80px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '600', lineHeight: '1.6' }}>
              {currentQuestion.q}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQuestion.options.map((opt, oi) => {
              const isSelected = selectedAnswers[`${selectedSubModule.id}-${currentIdx}`] === oi;
              return (
                <div
                  key={oi}
                  className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectAnswer(currentIdx, oi)}
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
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <button
              className="btn-cyber-outline"
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {currentIdx === questions.length - 1 ? (
              <button className="btn-neon" onClick={handleSubmit} style={{ padding: '10px 24px', fontSize: '14px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                Submit Assessment <Send size={16} />
              </button>
            ) : (
              <button
                className="btn-neon"
                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseSQL;
