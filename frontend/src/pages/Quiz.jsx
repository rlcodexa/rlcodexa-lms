import React, { useState, useEffect, useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import SecureMonitor from '../components/SecureMonitor';
import { Clock, ShieldCheck, ChevronRight, ChevronLeft, Send, Sparkles, AlertTriangle } from 'lucide-react';

const FALLBACK_QUESTIONS = [
  {
    id: 1,
    question: "Which cryptographic protocol is primarily used for establishing a secure, encrypted shell connection between a client and a remote server?",
    options: [
      { key: "A", text: "Secure Shell (SSH)" },
      { key: "B", text: "Hypertext Transfer Protocol (HTTP)" },
      { key: "C", text: "File Transfer Protocol (FTP)" },
      { key: "D", text: "Simple Mail Transfer Protocol (SMTP)" }
    ],
    answer: "A"
  },
  {
    id: 2,
    question: "In Artificial Intelligence and Machine Learning, which mathematical algorithm is used to calculate gradient updates for weight adjustment in deep neural networks?",
    options: [
      { key: "A", text: "Backpropagation" },
      { key: "B", text: "Bubble Sort" },
      { key: "C", text: "Linear Search" },
      { key: "D", text: "Asymmetric Hashing" }
    ],
    answer: "A"
  },
  {
    id: 3,
    question: "Which transaction property set ensures database transactions are processed reliably, guaranteeing Atomicity, Consistency, Isolation, and Durability?",
    options: [
      { key: "A", text: "ACID Properties" },
      { key: "B", text: "CRUD Operations" },
      { key: "C", text: "BASE Philosophy" },
      { key: "D", text: "REST Conventions" }
    ],
    answer: "A"
  },
  {
    id: 4,
    question: "What type of cyber security threat involves intercepting active communications between two endpoints to eavesdrop on private keys or inject corrupt payload data?",
    options: [
      { key: "A", text: "Man-in-the-Middle (MitM) Attack" },
      { key: "B", text: "Distributed Denial of Service (DDoS)" },
      { key: "C", text: "SQL Code Injection" },
      { key: "D", text: "Social Engineering Phishing" }
    ],
    answer: "A"
  },
  {
    id: 5,
    question: "In computer algorithms, what is the asymptotic worst-case time complexity of searching a target key in a sorted array containing N records using Binary Search?",
    options: [
      { key: "A", text: "O(log N)" },
      { key: "B", text: "O(N)" },
      { key: "C", text: "O(N log N)" },
      { key: "D", text: "O(1)" }
    ],
    answer: "A"
  }
];

const Quiz = ({ setCurrentPage }) => {
  const { currentUser, updateQuizScore, addActivityLog, isOnline } = useContext(AssessmentContext);
  const [questions, setQuestions] = useState(FALLBACK_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [globalTimer, setGlobalTimer] = useState(600); // 10 minutes
  const [minTimer, setMinTimer] = useState(10); // 10 seconds min timer
  const [quizFinished, setQuizFinished] = useState(false);

  // Load questions from database if online
  useEffect(() => {
    const fetchQuestions = async () => {
      if (isOnline) {
        try {
          const res = await fetch(`http://localhost:5000/api/student/questions/quiz/ASM001`);
          const data = await res.json();
          if (data && data.length > 0) {
            const formatted = data.map((q, idx) => ({
              id: q.questionNo || idx + 1,
              question: q.question,
              options: q.options.map((opt, i) => ({
                key: String.fromCharCode(65 + i), // A, B, C, D
                text: opt
              })),
              answer: String.fromCharCode(65 + q.options.indexOf(q.answer)) || "A",
              rawAnswer: q.answer,
              module: q.module || "Module 1"
            }));
            setQuestions(formatted);
          }
        } catch (error) {
          console.error("Failed to fetch quiz questions:", error);
        }
      }
    };

    fetchQuestions();
    addActivityLog(currentUser?.name || "Student", "student", "QUIZ_START", "Opened Daily Quiz terminal.");
  }, [isOnline]);

  useEffect(() => {
    if (!currentUser || currentUser.completedQuiz) {
      setCurrentPage('dashboard');
    }
  }, []);

  // Global countdown
  useEffect(() => {
    if (globalTimer <= 0) {
      handleSubmitQuiz();
      return;
    }
    const interval = setInterval(() => {
      setGlobalTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [globalTimer]);

  // Question minimum timer lock
  useEffect(() => {
    setMinTimer(10);
  }, [currentIdx]);

  useEffect(() => {
    if (minTimer <= 0) return;
    const timeout = setTimeout(() => {
      setMinTimer(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [minTimer, currentIdx]);

  const handleSelectOption = (optionKey) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionKey
    }));
  };

  const handleNext = () => {
    if (minTimer > 0) return;
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (quizFinished) return;
    setQuizFinished(true);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      const selectedKey = selectedAnswers[idx];
      const selectedOption = q.options.find(o => o.key === selectedKey);
      const selectedText = selectedOption ? selectedOption.text : "";

      if (q.rawAnswer) {
        if (selectedText === q.rawAnswer) {
          correctCount++;
        }
      } else {
        if (selectedKey === q.answer) {
          correctCount++;
        }
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    updateQuizScore(finalScore);

    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 2000);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (!currentUser || currentUser.completedQuiz) return null;

  const currentQuestion = questions[currentIdx];
  const progressPercentage = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 60px)' }}>
      <SecureMonitor active={!quizFinished} />

      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <Sparkles size={12} style={{ marginRight: '4px' }} /> SECURE GATEWAY ACTIVE
          </div>
          <h1 className="page-title">
            Daily <span>Quiz Test</span>
          </h1>
        </div>

        <div className="glass-panel neon-border-cyan" style={{
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.9)',
          boxShadow: globalTimer < 120 ? '0 0 15px rgba(239, 68, 68, 0.3)' : 'var(--glow-shadow)'
        }}>
          <Clock size={20} color={globalTimer < 120 ? "#ef4444" : "var(--secondary-cyan)"} />
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Test Timer</div>
            <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-code)', color: globalTimer < 120 ? "#ef4444" : "#fff" }}>
              {formatTime(globalTimer)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>ACADEMIC COMPLIANCE RATIO</span>
          <span>Question {currentIdx + 1} of {questions.length}</span>
        </div>
        <div className="progress-track" style={{ height: '6px' }}>
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%`, background: 'var(--secondary-cyan)' }}></div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '30px', position: 'relative' }}>
        {quizFinished ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <ShieldCheck size={32} color="#10b981" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Compiling Scores...</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Autosaving answer matrices and uploading integrity warning logs...
            </p>
          </div>
        ) : (
          <div>
            <div style={{ minHeight: '90px' }}>
              <span style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 'bold', fontFamily: 'var(--font-code)' }}>
                Q{currentQuestion.id} // {currentQuestion.module?.toUpperCase() || 'MODULE 1'}
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px', lineHeight: '1.5' }}>
                {currentQuestion.question}
              </h2>
            </div>

            <div className="quiz-option-container">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswers[currentIdx] === opt.key;
                return (
                  <div
                    key={opt.key}
                    className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(opt.key)}
                  >
                    <div className="quiz-option-indicator">
                      {isSelected && <div className="quiz-indicator-dot"></div>}
                    </div>
                    <div style={{ fontSize: '15px', color: isSelected ? '#fff' : 'var(--text-muted)', fontWeight: isSelected ? '600' : '400' }}>
                      <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold', marginRight: '8px', fontFamily: 'var(--font-code)' }}>{opt.key}.</span>
                      {opt.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {minTimer > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '12px', background: 'rgba(245,158,11,0.05)', padding: '8px 12px', borderRadius: '4px', marginBottom: '15px', width: 'fit-content' }}>
                <AlertTriangle size={14} />
                <span>Minimum analysis lock active: You must spend {minTimer}s more on this question.</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <button
                className="btn-cyber-outline"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                <ChevronLeft size={16} /> Prev Question
              </button>

              {currentIdx === questions.length - 1 ? (
                <button
                  className="btn-neon"
                  onClick={handleSubmitQuiz}
                  disabled={minTimer > 0}
                  style={{ padding: '10px 24px', fontSize: '14px', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
                >
                  {minTimer > 0 ? `Submit (${minTimer}s)` : 'Submit Quiz'} <Send size={16} />
                </button>
              ) : (
                <button
                  className="btn-neon"
                  onClick={handleNext}
                  disabled={minTimer > 0}
                  style={{ padding: '10px 24px', fontSize: '14px' }}
                >
                  {minTimer > 0 ? `Next (${minTimer}s)` : 'Next Question'} <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ marginTop: '20px', padding: '16px 20px', display: 'flex', gap: '15px', alignItems: 'center', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' }}>
        <ShieldCheck size={20} color="var(--primary-blue)" />
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          <b>Security Safeguard:</b> Page copy-paste is disabled. Navigation or tab minimizing constitutes an exam violation, logging an infraction score penalty automatically.
        </div>
      </div>
    </div>
  );
};

export default Quiz;
