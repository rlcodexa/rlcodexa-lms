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
  );
};

export default Aptitude;
