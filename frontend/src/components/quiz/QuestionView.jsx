import React from 'react';
import { ChevronLeft, ChevronRight, Send, BookOpen, ArrowLeft } from 'lucide-react';
import QuizOptionCard from './QuizOptionCard';
import SubmittedResult from './SubmittedResult';

const QuestionView = React.memo(({
  selectedModule,
  selectedSubModule,
  selectedGroup,
  activeQuestions,
  currentIdx,
  currentQuestion,
  progressPct,
  selectedAnswers,
  completionId,
  submitted,
  score,
  onSelectAnswer,
  onSubmit,
  onNext,
  onPrev,
  onBack,
  onBackToTopics
}) => {
  const headerTitle = selectedGroup ? selectedGroup.title : selectedSubModule.title;
  const headerBadge = selectedGroup
    ? `${selectedModule.title} / ${selectedSubModule.title} / ${selectedGroup.title}`
    : `${selectedModule.title} / ${selectedSubModule.title}`;

  if (submitted) {
    return (
      <SubmittedResult
        score={score}
        headerTitle={headerTitle}
        onBack={onBack}
        onBackToTopics={onBackToTopics}
        isGroup={!!selectedGroup}
      />
    );
  }

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '16px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} style={{ marginRight: '4px' }} /> {headerBadge}
          </div>
          <h1 className="page-title" style={{ fontSize: '22px' }}>
            {headerTitle}
          </h1>
        </div>
        <button className="btn-cyber-outline" onClick={onBack} style={{ padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '28px' }}>
        <div className="aptitude-progress-section">
          <div className="aptitude-progress-label">
            <span>Progress</span>
            <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className="progress-bar-fill" style={{ width: `${progressPct}%`, background: 'var(--primary-blue)' }}></div>
          </div>
        </div>

        <div style={{ minHeight: '80px', marginBottom: '20px' }}>
          <h3 className="aptitude-question-text">
            {currentQuestion.q}
          </h3>
        </div>

        <div className="aptitude-options-section">
          {currentQuestion.options.map((opt, oi) => {
            const isSelected = selectedAnswers[`${completionId}-${currentIdx}`] === oi;
            return (
              <QuizOptionCard
                key={oi}
                opt={opt}
                oi={oi}
                isSelected={isSelected}
                onSelect={(optIdx) => onSelectAnswer(currentIdx, optIdx)}
              />
            );
          })}
        </div>

        <div className="aptitude-nav-section">
          <button
            className="btn-cyber-outline"
            onClick={onPrev}
            disabled={currentIdx === 0}
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {currentIdx === activeQuestions.length - 1 ? (
            <button className="btn-neon" onClick={onSubmit} style={{ padding: '10px 24px', fontSize: '14px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              Submit Assessment <Send size={16} />
            </button>
          ) : (
            <button
              className="btn-neon"
              onClick={onNext}
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

QuestionView.displayName = 'QuestionView';
export default QuestionView;
