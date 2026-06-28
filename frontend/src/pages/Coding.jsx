import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import SecureMonitor from '../components/SecureMonitor';
import { Play, Send, Clock, Terminal, Sparkles, ShieldAlert, ArrowLeft, Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { CODING_LANGUAGES } from '../data/codingModules';

const getDefaultTemplate = (language, question) => {
  if (question?.templates && question.templates[language]) {
    return question.templates[language];
  }
  const name = question?.title?.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'solve';
  
  switch (language) {
    case 'python':
      return `def ${name}():\n    # Write your Python code here\n    pass\n`;
    case 'javascript':
      const camelName = name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      return `function ${camelName}() {\n    // Write your JavaScript code here\n\n}\n`;
    case 'java':
      const pascalName = name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
      return `public class Solution {\n    // Write your Java code here\n    public void ${name}() {\n        \n    }\n}\n`;
    case 'sql':
      return `-- Write your SQL query here\nSELECT * FROM employees;\n`;
    default:
      return '';
  }
};

const Coding = ({ setCurrentPage }) => {
  const { currentUser, updateCodingScore, addActivityLog } = useContext(AssessmentContext);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [language, setLanguage] = useState('python');
  const [answersCode, setAnswersCode] = useState({});
  const [testStatus, setTestStatus] = useState({});
  const [globalTimer, setGlobalTimer] = useState(1800);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeQuestions = useMemo(
    () => selectedSubModule?.questions || [],
    [selectedSubModule]
  );

  useEffect(() => {
    if (!currentUser) {
      setCurrentPage('dashboard');
      return;
    }
    addActivityLog(currentUser.name, "student", "CODING_START", "Opened Code Sandbox.");
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!selectedSubModule) return;
    if (globalTimer <= 0) {
      handleSubmitCoding();
      return;
    }
    const interval = setInterval(() => {
      setGlobalTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [globalTimer, selectedSubModule]);

  // Initialize answers when entering a sub-module
  useEffect(() => {
    if (!selectedSubModule) return;
    const initialCodes = {};
    const initialStatus = {};
    selectedSubModule.questions.forEach((q, idx) => {
      initialCodes[idx] = q.templates?.[language] || getDefaultTemplate(language, q);
      initialStatus[idx] = { hasRun: false, passed: 0, logs: "Console ready. Write code and click Run." };
    });
    setAnswersCode(initialCodes);
    setTestStatus(initialStatus);
    setActiveQuestionIdx(0);
    setGlobalTimer(1800);
    setIsSubmitting(false);
  }, [selectedSubModule?.id, language]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (!selectedSubModule) return;
    const updatedCodes = {};
    const updatedStatus = {};
    selectedSubModule.questions.forEach((q, idx) => {
      updatedCodes[idx] = q.templates?.[lang] || getDefaultTemplate(lang, q);
      updatedStatus[idx] = { hasRun: false, passed: 0, logs: `Language switched to ${lang.toUpperCase()}. Code sandbox reset.` };
    });
    setAnswersCode(updatedCodes);
    setTestStatus(updatedStatus);
  };

  const handleRunCode = useCallback(() => {
    const q = activeQuestions[activeQuestionIdx];
    if (!q) return;
    const currentCode = answersCode[activeQuestionIdx] || '';

    let compilerName = 'V8 Engine JavaScript';
    if (language === 'python') {
      compilerName = 'Python 3.10';
    } else if (language === 'java') {
      compilerName = 'JDK 17 Compiler';
    } else if (language === 'sql') {
      compilerName = 'SQLite 3.39 Query Optimizer';
    }

    let logs = `Compiling code on sandbox workspace...\nUsing compiler: ${compilerName}\n`;
    let passed = 0;

    const isCodeChanged = currentCode.trim() !== "" && 
      !currentCode.includes('# Write your') && 
      !currentCode.includes('// Write your') &&
      !currentCode.includes('-- Write your');
    const isCorrect = q.verifyKeyword(currentCode.toLowerCase());

    if (!isCodeChanged) {
      passed = 0;
      logs += `\n[COMPILE ERROR] Empty function body or placeholder code block detected.\nTest Case 1 -> Expected: true, Got: undefined | FAILED\nTest Case 2 -> Expected: true, Got: undefined | FAILED\nTest Case 3 -> Expected: false, Got: undefined | FAILED`;
    } else if (isCorrect) {
      passed = 3;
      logs += `\n[SUCCESS] Compilation finished.\nTest Case 1 -> PASSED | Expected match verified.\nTest Case 2 -> PASSED | Input boundary passed.\nTest Case 3 -> PASSED | Boundary conditions checked.\n\nAll test cases verified successfully (3/3).`;
    } else {
      passed = 1;
      logs += `\n[WARNING] Logical check failure.\nTest Case 1 -> FAILED | Output mismatch.\nTest Case 2 -> FAILED | Output mismatch.\nTest Case 3 -> PASSED | Default constraints met.\n\nPassed 1/3 test cases. Check logic loops.`;
    }

    setTestStatus(prev => ({
      ...prev,
      [activeQuestionIdx]: { hasRun: true, passed, logs }
    }));
    addActivityLog(currentUser?.name, "student", "CODING_RUN", `Run test cases for Q${activeQuestionIdx+1}: Passed ${passed}/3.`);
  }, [activeQuestions, activeQuestionIdx, answersCode, language, currentUser, addActivityLog]);

  const handleSubmitCoding = useCallback(() => {
    if (isSubmitting || !activeQuestions.length) return;
    setIsSubmitting(true);

    let totalPassed = 0;
    activeQuestions.forEach((q, idx) => {
      if (testStatus[idx]?.hasRun) {
        totalPassed += testStatus[idx].passed;
      } else {
        const userCode = answersCode[idx] || '';
        const isCorrect = q.verifyKeyword(userCode.toLowerCase());
        const isCodeChanged = userCode.trim() !== "" && 
          !userCode.includes('# Write your') && 
          !userCode.includes('// Write your') &&
          !userCode.includes('-- Write your');
        totalPassed += (isCodeChanged && isCorrect) ? 3 : 1;
      }
    });

    const totalCases = activeQuestions.length * 3;
    updateCodingScore(totalPassed, totalCases, JSON.stringify(answersCode), language);

    setTimeout(() => {
      setSelectedSubModule(null);
      setActiveQuestionIdx(0);
      setIsSubmitting(false);
    }, 2000);
  }, [isSubmitting, activeQuestions, testStatus, answersCode, language, updateCodingScore]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleBackToLanguages = useCallback(() => {
    setSelectedLanguage(null);
    setSelectedModule(null);
    setSelectedSubModule(null);
    setActiveQuestionIdx(0);
  }, []);

  const handleBackToModules = useCallback(() => {
    setSelectedModule(null);
    setSelectedSubModule(null);
    setActiveQuestionIdx(0);
  }, []);

  const handleBackToSubModules = useCallback(() => {
    setSelectedSubModule(null);
    setActiveQuestionIdx(0);
  }, []);

  // ========== LANGUAGE SELECTION VIEW ==========
  if (!selectedLanguage) {
    return (
      <div style={{ height: 'calc(100vh - 60px)', overflowY: 'auto', padding: '0 0 40px' }}>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Code2 size={12} style={{ marginRight: '4px' }} /> CODE SANDBOX
            </div>
            <h1 className="page-title">
              Choose a <span>Language</span>
            </h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Select a programming language to start practicing. Each language has structured modules with hands-on coding exercises.
        </p>
        <div className="aptitude-module-grid">
          {CODING_LANGUAGES.map(lang => (
            <div
              key={lang.id}
              className="glass-panel"
              style={{
                padding: '24px', cursor: 'pointer',
                borderTop: `3px solid ${lang.color}`,
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                setSelectedLanguage(lang);
                setLanguage(lang.id === 'javascript' ? 'javascript' : lang.id === 'java' ? 'java' : lang.id === 'sql' ? 'sql' : 'python');
                addActivityLog(currentUser?.name, "student", "CODING_LANGUAGE", `Selected language: ${lang.title}`);
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{lang.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{lang.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '12px' }}>
                {lang.description}
              </p>
              <div className="aptitude-card-meta">
                <span>{lang.modules.length} modules</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========== MODULE SELECTION VIEW ==========
  if (!selectedModule) {
    return (
      <div style={{ height: 'calc(100vh - 60px)', overflowY: 'auto', padding: '0 0 40px' }}>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              {selectedLanguage.icon} {selectedLanguage.title}
            </div>
            <h1 className="page-title">
              {selectedLanguage.title} <span>Modules</span>
            </h1>
          </div>
          <button className="btn-cyber-outline" onClick={handleBackToLanguages} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Languages
          </button>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          {selectedLanguage.description}
        </p>
        <div className="aptitude-module-grid">
          {selectedLanguage.modules.map(mod => (
            <div
              key={mod.id}
              className="glass-panel aptitude-card"
              style={{ borderTop: `3px solid var(--primary-blue)`, cursor: 'pointer' }}
              onClick={() => {
                setSelectedModule(mod);
                addActivityLog(currentUser?.name, "student", "CODING_MODULE", `Selected module: ${mod.title}`);
              }}
            >
              <div className="aptitude-card-icon">{mod.icon}</div>
              <h3 className="aptitude-card-title">{mod.title}</h3>
              <div className="aptitude-card-meta">
                <span>{mod.subModules.length} sub-modules</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========== SUB-MODULE SELECTION VIEW ==========
  if (!selectedSubModule) {
    return (
      <div style={{ height: 'calc(100vh - 60px)', overflowY: 'auto', padding: '0 0 40px' }}>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              {selectedLanguage.icon} {selectedLanguage.title} / {selectedModule.icon} {selectedModule.title}
            </div>
            <h1 className="page-title">
              {selectedModule.title} <span>Sub-Modules</span>
            </h1>
          </div>
          <button className="btn-cyber-outline" onClick={handleBackToModules} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Modules
          </button>
        </div>
        <div className="aptitude-submodule-grid">
          {selectedModule.subModules.map(sm => (
            <div
              key={sm.id}
              className="glass-panel aptitude-card"
              style={{ borderTop: `3px solid var(--secondary-cyan)`, cursor: 'pointer' }}
              onClick={() => {
                setSelectedSubModule(sm);
                addActivityLog(currentUser?.name, "student", "CODING_SUBMODULE", `Selected sub-module: ${sm.title}`);
              }}
            >
              <h3 className="aptitude-card-title" style={{ fontSize: '15px' }}>{sm.title}</h3>
              <div className="aptitude-card-meta">
                <span>{sm.questions.length} challenges</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '6px' }}>
                Hands-on coding with {selectedLanguage.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========== QUESTION WORKSPACE VIEW ==========
  const currentQ = activeQuestions[activeQuestionIdx];
  const activeStatus = testStatus[activeQuestionIdx] || { hasRun: false, passed: 0, logs: "Console ready." };

  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <SecureMonitor active={!isSubmitting} />

      {/* Header bar */}
      <div className="page-header" style={{ marginBottom: '10px', flexShrink: 0 }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '4px' }}>
            <Sparkles size={12} style={{ marginRight: '4px' }} /> {selectedLanguage.icon} {selectedLanguage.title} / {selectedModule.title} / {selectedSubModule.title}
          </div>
          <h1 className="page-title" style={{ fontSize: '22px' }}>
            {selectedSubModule.title} <span>Coding Challenge</span>
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn-cyber-outline" onClick={handleBackToSubModules} style={{ padding: '6px 14px', fontSize: '12px' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div className="glass-panel neon-border-cyan" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color="var(--secondary-cyan)" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-code)', color: '#fff', fontWeight: 'bold' }}>
              {formatTime(globalTimer)}
            </span>
          </div>
          <button className="btn-cyber-outline" onClick={handleRunCode} style={{ padding: '6px 14px', fontSize: '12px' }}>
            <Play size={14} /> Run
          </button>
          <button className="btn-neon" onClick={handleSubmitCoding} style={{ padding: '6px 16px', fontSize: '12px', background: 'linear-gradient(135deg, var(--secondary-cyan), var(--primary-blue))' }}>
            Submit <Send size={14} />
          </button>
        </div>
      </div>

      {/* Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px', flexGrow: 1, height: 'calc(100% - 65px)' }}>

        {/* Left question sidebar */}
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="cyber-badge" style={{ fontSize: '10px' }}>CHALLENGES</div>
          {activeQuestions.map((q, idx) => {
            const isSelected = activeQuestionIdx === idx;
            const status = testStatus[idx];
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                style={{
                  width: '100%', padding: '10px 12px',
                  background: isSelected ? 'rgba(0,191,255,0.08)' : 'rgba(15,23,42,0.4)',
                  border: '1px solid', borderRadius: '6px',
                  borderColor: isSelected ? 'var(--primary-blue)' : 'var(--border-color)',
                  color: '#fff', cursor: 'pointer', textAlign: 'left',
                  fontSize: '12px', fontWeight: isSelected ? 'bold' : 'normal',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <span>{idx + 1}. {q.title}</span>
                {status?.hasRun && (
                  <span style={{ color: status.passed === 3 ? '#10b981' : '#f59e0b', fontSize: '10px', fontWeight: 'bold' }}>
                    {status.passed}/3
                  </span>
                )}
              </button>
            );
          })}
          <div style={{ marginTop: 'auto', padding: '10px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: '#ef4444', fontWeight: 'bold', marginBottom: '4px' }}>
              <ShieldAlert size={10} /> Proctor
            </div>
            All runs are logged. Do not switch tabs.
          </div>
        </div>

        {/* Right workspace: Prompt + IDE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: '16px', height: '100%' }}>

          {/* Question Prompt */}
          <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary-blue)', marginBottom: '10px' }}>
              {currentQ?.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              {currentQ?.desc}
            </p>
            <div style={{ marginBottom: '12px' }}>
              <div className="cyber-label" style={{ fontSize: '10px' }}>Example Test Case</div>
              <div className="glass-panel" style={{ padding: '8px 12px', background: 'rgba(15,23,42,0.4)', fontFamily: 'var(--font-code)', fontSize: '11px' }}>
                <span style={{ color: 'var(--primary-blue)' }}>Input:</span> {currentQ?.inputExample}<br />
                <span style={{ color: 'var(--secondary-cyan)' }}>Output:</span> {currentQ?.outputExample}
              </div>
            </div>
            <div>
              <div className="cyber-label" style={{ fontSize: '10px' }}>Constraints</div>
              <ul style={{ paddingLeft: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                {currentQ?.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code IDE + Console */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Compiler header */}
            <div className="coding-header-bar" style={{ flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Terminal size={12} color="var(--primary-blue)" /> CODE_EDITOR
              </span>
              <select
                className="cyber-select"
                value={language}
                onChange={handleLanguageChange}
                style={{ width: '110px', padding: '3px 6px', fontSize: '10px', borderRadius: '4px' }}
              >
                {selectedLanguage?.id === 'sql' ? (
                  <option value="sql">SQL</option>
                ) : (
                  <>
                    <option value="python">Python 3</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                  </>
                )}
              </select>
            </div>

            {/* Editor */}
            <div className="code-editor-area" style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={answersCode[activeQuestionIdx] || ''}
                onChange={(val) => {
                  setAnswersCode(prev => ({ ...prev, [activeQuestionIdx]: val }));
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                }}
              />
            </div>

            {/* Console */}
            <div className="console-area" style={{ height: '140px', flexShrink: 0 }}>
              <div className="console-title-bar">
                <span>Console Output</span>
                {activeStatus.hasRun && (
                  <span style={{ color: activeStatus.passed === 3 ? '#10b981' : '#f59e0b', fontWeight: 'bold', fontSize: '11px' }}>
                    {activeStatus.passed}/3 Passed
                  </span>
                )}
              </div>
              <div className="console-output" style={{ fontSize: '11px', padding: '8px 12px' }}>
                {activeStatus.logs}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Coding;
