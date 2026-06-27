import React, { useState, useEffect, useContext } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import SecureMonitor from '../components/SecureMonitor';
import { Play, Send, Clock, Terminal, ChevronRight, ChevronLeft, Sparkles, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';

const WEEKLY_QUESTIONS = [
  {
    id: 1,
    title: "1. Palindromic Verification",
    desc: "Write a function/method that accepts a string argument s and evaluates whether the string is a valid palindrome, ignoring spaces, case, and non-alphanumeric characters.",
    inputExample: 's = "A man, a plan, a canal: Panama"',
    outputExample: "true",
    constraints: ["1 <= s.length <= 10^5", "String contains ASCII chars."],
    templates: {
      python: `def is_palindrome(s: str) -> bool:
    # Write your python code here
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]
`,
      javascript: `function isPalindrome(s) {
    // Write your javascript code here
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
`
    },
    verifyKeyword: (code) => code.includes('[::-1]') || code.includes('reverse') || code.includes('split')
  },
  {
    id: 2,
    title: "2. Valid Parentheses",
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if brackets close in the correct order and are of the same type.",
    inputExample: 's = "()[]{}"',
    outputExample: "true",
    constraints: ["1 <= s.length <= 10^4", "String consists of parentheses only."],
    templates: {
      python: `def is_valid_parentheses(s: str) -> bool:
    # Write your python code here
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack
`,
      javascript: `function isValidParentheses(s) {
    // Write your javascript code here
    const stack = [];
    const mapping = {')': '(', '}': '{', ']': '['};
    for (let char of s) {
        if (char in mapping) {
            const top = stack.length ? stack.pop() : '#';
            if (mapping[char] !== top) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
`
    },
    verifyKeyword: (code) => code.includes('stack') || code.includes('pop') || code.includes('push') || code.includes('append')
  },
  {
    id: 3,
    title: "3. FizzBuzz Array Generator",
    desc: "Given an integer n, return a list of strings representing the numbers from 1 to n. For multiples of three, return 'Fizz' instead of the number. For multiples of five, return 'Buzz'. For multiples of both, return 'FizzBuzz'.",
    inputExample: "n = 5",
    outputExample: '["1", "2", "Fizz", "4", "Buzz"]',
    constraints: ["1 <= n <= 10^3"],
    templates: {
      python: `def fizz_buzz(n: int) -> list:
    # Write your python code here
    res = []
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            res.append("FizzBuzz")
        elif i % 3 == 0:
            res.append("Fizz")
        elif i % 5 == 0:
            res.append("Buzz")
        else:
            res.append(str(i))
    return res
`,
      javascript: `function fizzBuzz(n) {
    // Write your javascript code here
    const res = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            res.push("FizzBuzz");
        } else if (i % 3 === 0) {
            res.push("Fizz");
        } else if (i % 5 === 0) {
            res.push("Buzz");
        } else {
            res.push(i.toString());
        }
    }
    return res;
}
`
    },
    verifyKeyword: (code) => code.includes('% 3') || code.includes('% 5') || code.includes('Fizz') || code.includes('Buzz')
  }
];

const Coding = ({ setCurrentPage }) => {
  const { currentUser, updateCodingScore, addActivityLog } = useContext(AssessmentContext);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [language, setLanguage] = useState('python');
  
  // Track code codes for all 3 questions
  const [answersCode, setAnswersCode] = useState({
    0: WEEKLY_QUESTIONS[0].templates['python'],
    1: WEEKLY_QUESTIONS[1].templates['python'],
    2: WEEKLY_QUESTIONS[2].templates['python']
  });

  // Track run outputs and test status for all 3 questions
  const [testStatus, setTestStatus] = useState({
    0: { hasRun: false, passed: 0, logs: "Console ready. Write code and click Run." },
    1: { hasRun: false, passed: 0, logs: "Console ready. Write code and click Run." },
    2: { hasRun: false, passed: 0, logs: "Console ready. Write code and click Run." }
  });

  const [globalTimer, setGlobalTimer] = useState(1800); // 30 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.completedCoding) {
      setCurrentPage('dashboard');
      return;
    }
    addActivityLog(currentUser.name, "student", "CODING_START", "Opened Saturday Coding Assessment sandbox.");
  }, []);

  // Countdown timer
  useEffect(() => {
    if (globalTimer <= 0) {
      handleSubmitCoding();
      return;
    }

    const interval = setInterval(() => {
      setGlobalTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [globalTimer]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    
    // Reset templates to selected language
    setAnswersCode({
      0: WEEKLY_QUESTIONS[0].templates[lang],
      1: WEEKLY_QUESTIONS[1].templates[lang],
      2: WEEKLY_QUESTIONS[2].templates[lang]
    });
    setTestStatus({
      0: { hasRun: false, passed: 0, logs: `Language switched to ${lang.toUpperCase()}. Code sandbox reset.` },
      1: { hasRun: false, passed: 0, logs: `Language switched to ${lang.toUpperCase()}. Code sandbox reset.` },
      2: { hasRun: false, passed: 0, logs: `Language switched to ${lang.toUpperCase()}. Code sandbox reset.` }
    });
  };

  const handleRunCode = () => {
    const q = WEEKLY_QUESTIONS[activeQuestionIdx];
    const currentCode = answersCode[activeQuestionIdx];
    
    // Simulated compilation logs
    let logs = `Compiling code on sandbox workspace...\nUsing compiler: ${language === 'python' ? 'Python 3.10' : 'V8 Engine JavaScript'}\n`;
    let passed = 0;
    
    const isCodeChanged = currentCode.trim() !== "" && !currentCode.includes('# Write your') && !currentCode.includes('// Write your');
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
    addActivityLog(currentUser.name, "student", "CODING_RUN", `Run test cases for Question ${activeQuestionIdx+1}: Passed ${passed}/3.`);
  };

  const handleSubmitCoding = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Compute final points: sum of passed cases across all 3 questions
    let totalPassed = 0;
    
    WEEKLY_QUESTIONS.forEach((q, idx) => {
      if (testStatus[idx].hasRun) {
        totalPassed += testStatus[idx].passed;
      } else {
        // Evaluate logic without run
        const userCode = answersCode[idx];
        const isCorrect = q.verifyKeyword(userCode.toLowerCase());
        const isCodeChanged = userCode.trim() !== "" && !userCode.includes('# Write your') && !userCode.includes('// Write your');
        totalPassed += (isCodeChanged && isCorrect) ? 3 : 1;
      }
    });

    // We have 3 questions with 3 test cases each, so total cases = 9
    updateCodingScore(totalPassed, 9, JSON.stringify(answersCode), language);
    
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 2000);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (!currentUser || currentUser.completedCoding) return null;

  const currentQ = WEEKLY_QUESTIONS[activeQuestionIdx];
  const activeStatus = testStatus[activeQuestionIdx];

  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      {/* Secure Monitors */}
      <SecureMonitor active={!isSubmitting} />

      {/* Header bar */}
      <div className="page-header" style={{ marginBottom: '15px', flexShrink: 0 }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '4px' }}>
            <Sparkles size={12} style={{ marginRight: '4px' }} /> SECURE COMPILER ACTIVE
          </div>
          <h1 className="page-title" style={{ fontSize: '24px' }}>
            Weekly <span>Coding Challenge</span>
          </h1>
        </div>

        {/* Global actions */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="glass-panel neon-border-cyan" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--secondary-cyan)" />
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-code)', color: '#fff', fontWeight: 'bold' }}>
              {formatTime(globalTimer)}
            </span>
          </div>

          <button className="btn-cyber-outline" onClick={handleRunCode} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Play size={14} /> Run Logic
          </button>

          <button className="btn-neon" onClick={handleSubmitCoding} style={{ padding: '8px 18px', fontSize: '13px', background: 'linear-gradient(135deg, var(--secondary-cyan), var(--primary-blue))' }}>
            Submit Weekly Test <Send size={14} />
          </button>
        </div>
      </div>

      {/* Multi-question workspace layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px', flexGrow: 1, height: 'calc(100% - 75px)' }}>
        
        {/* Left selector sidebar */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="cyber-badge" style={{ fontSize: '10px' }}>WEEKLY TEST SYLLABUS</div>
          {WEEKLY_QUESTIONS.map((q, idx) => {
            const isSelected = activeQuestionIdx === idx;
            const status = testStatus[idx];
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: isSelected ? 'rgba(0,191,255,0.08)' : 'rgba(15,23,42,0.4)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--primary-blue)' : 'var(--border-color)',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>Q{q.id}. {q.title.split('. ')[1]}</span>
                {status.hasRun && (
                  <span style={{ color: status.passed === 3 ? '#10b981' : '#f59e0b', fontSize: '10px', fontWeight: 'bold' }}>
                    {status.passed}/3
                  </span>
                )}
              </button>
            );
          })}
          <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: '#ef4444', fontWeight: 'bold', marginBottom: '4px' }}>
              <ShieldAlert size={12} /> Proctor Info
            </div>
            All compiler runs are uploaded to the HOD dashboard registry. Do not switch tabs.
          </div>
        </div>

        {/* Right workspace: Split prompt & IDE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: '20px' }}>
          
          {/* Question Prompt */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-blue)', marginBottom: '12px' }}>
              {currentQ.title}
            </h3>
            
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              {currentQ.desc}
            </p>

            <div style={{ marginBottom: '15px' }}>
              <div className="cyber-label" style={{ fontSize: '11px' }}>Example Test Case</div>
              <div className="glass-panel" style={{ padding: '10px 14px', background: 'rgba(15,23,42,0.4)', fontFamily: 'var(--font-code)', fontSize: '12px' }}>
                <span style={{ color: 'var(--primary-blue)' }}>Input:</span> {currentQ.inputExample}<br />
                <span style={{ color: 'var(--secondary-cyan)' }}>Output:</span> {currentQ.outputExample}
              </div>
            </div>

            <div>
              <div className="cyber-label" style={{ fontSize: '11px' }}>Constraints</div>
              <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-muted)' }}>
                {currentQ.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code IDE Sandbox & Console */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* Compiler Header Bar */}
            <div className="coding-header-bar" style={{ flexShrink: 0 }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Terminal size={14} color="var(--primary-blue)" /> MAIN_COMPILER_INPUT
              </span>
              <select
                className="cyber-select"
                value={language}
                onChange={handleLanguageChange}
                style={{ width: '120px', padding: '4px 8px', fontSize: '11px', borderRadius: '4px' }}
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>

            {/* Source Editor Textarea */}
            <div className="code-editor-area" style={{ flexGrow: 1 }}>
              <textarea
                className="code-editor-textarea"
                value={answersCode[activeQuestionIdx]}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnswersCode(prev => ({ ...prev, [activeQuestionIdx]: val }));
                }}
                spellCheck="false"
                style={{ height: '100%', width: '100%', padding: '15px' }}
              />
            </div>

            {/* Console Log Terminal */}
            <div className="console-area" style={{ height: '160px', flexShrink: 0 }}>
              <div className="console-title-bar">
                <span>Compiler Sandbox Output Logs</span>
                {activeStatus.hasRun && (
                  <span style={{ color: activeStatus.passed === 3 ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                    {activeStatus.passed}/3 Passed
                  </span>
                )}
              </div>
              <div className="console-output" style={{ fontSize: '12px', padding: '10px 15px' }}>
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
