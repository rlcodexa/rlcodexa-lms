import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { useQuizNavigation } from './useQuizNavigation';

export function useAssessment({ setCurrentPage, addActivityLog }) {
  const { currentUser, saveAssessmentResult, isModuleCompleted } = useContext(AssessmentContext);

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (addActivityLog && currentUser?.name) {
      addActivityLog(currentUser.name, 'student', 'APTITUDE_START', 'Opened Aptitude Assessment hub.');
    }
  }, []);

  const activeQuestions = useMemo(() =>
    selectedGroup
      ? selectedGroup.questions
      : (selectedSubModule?.questions || []),
    [selectedGroup, selectedSubModule]
  );

  const completionId = useMemo(() =>
    selectedGroup ? selectedGroup.id : (selectedSubModule?.id || ''),
    [selectedGroup, selectedSubModule]
  );

  const isSubModuleComplete = useCallback((sm) => {
    if (!isModuleCompleted) return false;
    if (sm.groups) {
      return sm.groups.every(g => isModuleCompleted('aptitude', g.id));
    }
    return isModuleCompleted('aptitude', sm.id);
  }, [isModuleCompleted]);

  const subModuleQsCount = useCallback((sm) => {
    if (sm.groups) {
      return sm.groups.reduce((sum, g) => sum + g.questions.length, 0);
    }
    return sm.questions.length;
  }, []);

  const isGroupComplete = useCallback((groupId) => {
    return isModuleCompleted ? isModuleCompleted('aptitude', groupId) : false;
  }, [isModuleCompleted]);

  const isModuleComplete = useCallback((mod) => {
    return mod.subModules.every(sm => {
      if (sm.groups) return sm.groups.every(g => isModuleCompleted('aptitude', g.id));
      return isModuleCompleted('aptitude', sm.id);
    });
  }, [isModuleCompleted]);

  const { handleSelectAnswer, handleSubmit, handleNext, handlePrev } = useQuizNavigation({
    activeQuestions,
    completionId,
    selectedAnswers,
    setSelectedAnswers,
    setCurrentIdx,
    setSubmitted,
    setScore,
    saveAssessmentResult,
  });

  const handleBackToModules = useCallback(() => {
    if (selectedGroup) {
      setSelectedGroup(null);
    } else {
      setSelectedSubModule(null);
    }
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  }, [selectedGroup]);

  const handleBackToTopics = useCallback(() => {
    setSelectedModule(null);
    setSelectedSubModule(null);
    setSelectedGroup(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  }, []);

  const handleBackToSubModules = useCallback(() => {
    setSelectedGroup(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  }, []);

  return {
    currentUser,
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
    isGroupComplete,
    isModuleComplete,
    handleSelectAnswer,
    handleSubmit,
    handleNext,
    handlePrev,
    handleBackToModules,
    handleBackToTopics,
    handleBackToSubModules,
  };
}
