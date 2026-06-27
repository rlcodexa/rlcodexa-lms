# Aptitude.jsx Refactor — E2E Plan

## Goals
1. **Split** the monolithic 814-line Aptitude.jsx into maintainable chunks
2. **Extract styles** from inline to a proper CSS file
3. **Create custom hooks** for state management and quiz navigation
4. **Performance optimize** with `useCallback`, `React.memo`, and `useMemo`
5. **Zero behavioral change** — all features, flows, and completion tracking must work identically

---

## Phase 1: Extract Data to `src/data/aptitudeModules.js`

Move the `APTITUDE_MODULES` constant out of the component. Keeps the data layer separate from the UI layer.

## Phase 2: Extract Styles to `src/styles/Aptitude.css`

Move all repeated inline style patterns to CSS classes. This is the lowest priority — many styles are dynamic (color values derived from state), so we keep those inline but consolidate static boilerplate.

## Phase 3: Create Custom Hooks

### `src/hooks/useAssessment.js`
Manages:
- `selectedModule`, `selectedSubModule`, `selectedGroup`
- `currentIdx`, `selectedAnswers`, `submitted`, `score`
- Navigation handlers: `handleBackToModules`, `handleBackToTopics`, `handleBackToSubModules`
- Derived: `activeQuestions`, `completionId`
- Completion logic: `isSubModuleComplete`, `subModuleQsCount`

### `src/hooks/useQuizNavigation.js`
Manages:
- `handleSelectAnswer` — answer selection with group-aware key prefix
- `handleSubmit` — score calculation with completion awareness
- `handleNext`, `handlePrev` — question navigation

Keeps the quiz-taking logic separate from the UI tree.

## Phase 4: Create Components

### `<ModuleSelection />`
- Props: `modules`, `onSelectModule`, `isModuleComplete`
- Renders the module grid with icons, completion badges
- Memoized with `React.memo`

### `<SubModuleSelection />`  
- Props: `module`, `onSelectSubModule`, `onBack`, `isSubModuleComplete`, `subModuleQsCount`
- Renders sub-module grid with completion status
- Handles both regular sub-modules and group-based sub-modules

### `<GroupSelection />`
- Props: `subModule`, `onSelectGroup`, `onBack`, `isGroupComplete`
- Renders module 1/2/3 selection for Basics & Properties pattern

### `<QuestionView />`
- Props: `activeQuestions`, `currentIdx`, `selectedAnswers`, `onSelectAnswer`, `onSubmit`, `onNext`, `onPrev`, `onBack`, `submitted`, `score`, `headerTitle`, `headerBadge`
- Renders the progress bar, question, options, and nav buttons
- Memoized — re-renders only when answers/idx change

### `<SubmittedResult />`
- Props: `score`, `headerTitle`, `onBack`, `onBackToTopics`
- Pure presentation of score result

## Phase 5: Performance Optimizations

- `React.memo` on all leaf components (Option cards, buttons)
- `useCallback` on all handlers passed as props to prevent child re-renders
- `useMemo` for derived values (activeQuestions, completionId, headerTitle)
- Lazy-load the data module (already static, but import only when needed)

## Phase 6: Integration

Aptitude.jsx becomes a thin orchestrator:
1. Import data, hooks, components
2. Compose the component tree based on state
3. Pass handlers down

---

## File Changes Summary

| File | Action |
|---|---|
| `src/pages/Aptitude.jsx` | **REWRITE** — thin orchestrator (was 814 lines → ~60 lines) |
| `src/data/aptitudeModules.js` | **CREATE** — APTITUDE_MODULES constant |
| `src/styles/Aptitude.css` | **CREATE** — consolidated styles |
| `src/hooks/useAssessment.js` | **CREATE** — assessment state management |
| `src/hooks/useQuizNavigation.js` | **CREATE** — quiz navigation logic |
| `src/components/quiz/ModuleSelection.jsx` | **CREATE** |
| `src/components/quiz/SubModuleSelection.jsx` | **CREATE** |
| `src/components/quiz/GroupSelection.jsx` | **CREATE** |
| `src/components/quiz/QuestionView.jsx` | **CREATE** |
| `src/components/quiz/SubmittedResult.jsx` | **CREATE** |
| `src/components/quiz/QuizOptionCard.jsx` | **CREATE** |

## Rollback

Backup of current Aptitude.jsx will be saved as `src/pages/Aptitude.jsx.bak` before changes.
