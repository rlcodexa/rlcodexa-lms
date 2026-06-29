import React, { useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { Brain, ArrowLeft } from 'lucide-react';
import { APTITUDE_MODULES } from '../data/aptitudeModules';
import { useAssessment } from '../hooks/useAssessment';
import ModuleSelection from '../components/quiz/ModuleSelection';
import SubModuleSelection from '../components/quiz/SubModuleSelection';
import GroupSelection from '../components/quiz/GroupSelection';
import QuestionView from '../components/quiz/QuestionView';
import '../styles/Aptitude.css';

const Aptitude = ({ setCurrentPage }) => {
  const { addActivityLog } = useContext(AssessmentContext);

  const {
    selectedModule, setSelectedModule,
    selectedSubModule, setSelectedSubModule,
    selectedGroup, setSelectedGroup,
    currentIdx, setCurrentIdx,
    selectedAnswers,
    submitted,
    score,
    activeQuestions,
    completionId,
    isSubModuleComplete,
    subModuleQsCount,
    isModuleComplete,
    isGroupComplete,
    handleSelectAnswer,
    handleSubmit,
    handleNext,
    handlePrev,
    handleBackToModules,
    handleBackToTopics,
    handleBackToSubModules,
  } = useAssessment({ setCurrentPage, addActivityLog });

  // Module selection view
  if (!selectedModule) {
    return (
      <div>
        <button
          onClick={() => setCurrentPage('quizhub')}
          className="btn-neon"
          style={{ padding: '8px 16px', fontSize: '13px', marginBottom: '16px', borderColor: 'var(--primary-blue)', color: '#fff' }}
        >
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back to Quiz Hub
        </button>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Brain size={12} style={{ marginRight: '4px' }} /> APTITUDE ASSESSMENT
            </div>
            <h1 className="page-title">
              Aptitude <span>Modules</span>
            </h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Select a module to begin. Each module has sub-modules with 5 questions each.
        </p>
        <ModuleSelection
          modules={APTITUDE_MODULES}
          onSelectModule={setSelectedModule}
          isModuleComplete={isModuleComplete}
        />
      </div>
    );
  }

  // Sub-module selection view
  if (!selectedSubModule) {
    return (
      <SubModuleSelection
        module={selectedModule}
        onSelectSubModule={setSelectedSubModule}
        onBack={handleBackToTopics}
        isSubModuleComplete={isSubModuleComplete}
        subModuleQsCount={subModuleQsCount}
      />
    );
  }

  // Group selection view (for sub-modules with groups like Basics & Properties)
  if (selectedSubModule.groups && !selectedGroup) {
    return (
      <GroupSelection
        subModule={selectedSubModule}
        onSelectGroup={setSelectedGroup}
        onBack={handleBackToModules}
        isGroupComplete={isGroupComplete}
      />
      <div>
        <button 
          className="btn-cyber-outline" 
          onClick={handleBackToTopics} 
          style={{ padding: '8px 16px', fontSize: '13px', marginBottom: '16px' }}
        >
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back to Modules
        </button>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Brain size={12} style={{ marginRight: '4px' }} /> {selectedModule.icon} {selectedModule.title}
            </div>
            <h1 className="page-title">
              {selectedModule.title} <span>Sub-Modules</span>
            </h1>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {selectedModule.subModules.map(sm => {
            const done = isModuleCompleted('aptitude', sm.id);
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

  // Question view
  const currentQuestion = activeQuestions[currentIdx];
  const progressPct = ((currentIdx + 1) / activeQuestions.length) * 100;

  return (
    <QuestionView
      selectedModule={selectedModule}
      selectedSubModule={selectedSubModule}
      selectedGroup={selectedGroup}
      activeQuestions={activeQuestions}
      currentIdx={currentIdx}
      currentQuestion={currentQuestion}
      progressPct={progressPct}
      selectedAnswers={selectedAnswers}
      completionId={completionId}
      submitted={submitted}
      score={score}
      onSelectAnswer={handleSelectAnswer}
      onSubmit={handleSubmit}
      onNext={handleNext}
      onPrev={handlePrev}
      onBack={handleBackToModules}
      onBackToTopics={handleBackToTopics}
    />
    <div>
      <button 
        className="btn-cyber-outline" 
        onClick={handleBackToModules} 
        style={{ padding: '8px 16px', fontSize: '13px', marginBottom: '16px' }}
      >
        <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back
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

export default Aptitude;
