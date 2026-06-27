import { useCallback } from 'react';

/**
 * Manages quiz navigation: answer selection, submission, next/prev.
 * Extracted from useAssessment for separation of concerns.
 */
export function useQuizNavigation({
  activeQuestions,
  completionId,
  selectedAnswers,
  setSelectedAnswers,
  setCurrentIdx,
  setSubmitted,
  setScore,
  saveAssessmentResult,
}) {
  const handleSelectAnswer = useCallback((qIdx, optIdx) => {
    setSubmitted(false);
    setSelectedAnswers(prev => ({
      ...prev,
      [`${completionId}-${qIdx}`]: optIdx
    }));
  }, [completionId, setSubmitted, setSelectedAnswers]);

  const handleSubmit = useCallback(() => {
    if (!activeQuestions.length) return;
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      const key = `${completionId}-${idx}`;
      if (selectedAnswers[key] === q.answer) correct++;
    });
    const pct = Math.round((correct / activeQuestions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    saveAssessmentResult('aptitude', completionId, pct);
  }, [activeQuestions, completionId, selectedAnswers, saveAssessmentResult, setScore, setSubmitted]);

  const handleNext = useCallback(() => {
    setCurrentIdx(prev => Math.min(activeQuestions.length - 1, prev + 1));
  }, [activeQuestions.length, setCurrentIdx]);

  const handlePrev = useCallback(() => {
    setCurrentIdx(prev => Math.max(0, prev - 1));
  }, [setCurrentIdx]);

  return { handleSelectAnswer, handleSubmit, handleNext, handlePrev };
}
