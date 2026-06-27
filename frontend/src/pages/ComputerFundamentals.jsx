import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Monitor, BookOpen, ArrowLeft } from 'lucide-react';

const CF_MODULES = [
  {
    id: 'computer-hardware',
    title: 'Computer Hardware',
    icon: '🖥️',
    subModules: [
      {
        id: 'hw-basics',
        title: 'Basic Hardware Components',
        questions: [
          { q: 'Which is the brain of the computer?', options: ['CPU', 'RAM', 'Hard Drive', 'GPU'], answer: 0 },
          { q: 'What does RAM stand for?', options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Readily Accessible Memory'], answer: 0 },
          { q: 'Which device stores data permanently?', options: ['Hard Drive', 'RAM', 'Cache', 'Register'], answer: 0 },
          { q: 'The motherboard connects:', options: ['All computer components', 'Only CPU and RAM', 'Only storage devices', 'Only peripherals'], answer: 0 },
          { q: 'GPU is primarily used for:', options: ['Graphics processing', 'Data storage', 'Network communication', 'Power supply'], answer: 0 }
        ]
      },
      {
        id: 'hw-peripherals',
        title: 'Input & Output Devices',
        questions: [
          { q: 'Which is an input device?', options: ['Keyboard', 'Monitor', 'Printer', 'Speaker'], answer: 0 },
          { q: 'Which is an output device?', options: ['Monitor', 'Mouse', 'Scanner', 'Microphone'], answer: 0 },
          { q: 'A touchscreen is:', options: ['Both input and output', 'Only input', 'Only output', 'Neither'], answer: 0 },
          { q: 'Which device converts analog to digital?', options: ['Scanner', 'Printer', 'Monitor', 'Speaker'], answer: 0 },
          { q: 'Projector is an:', options: ['Output device', 'Input device', 'Storage device', 'Processing device'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'operating-systems',
    title: 'Operating Systems',
    icon: '💻',
    subModules: [
      {
        id: 'os-basics',
        title: 'OS Fundamentals',
        questions: [
          { q: 'What is an operating system?', options: ['System software managing hardware', 'Application software', 'A programming language', 'A database'], answer: 0 },
          { q: 'Which is NOT an OS?', options: ['Microsoft Word', 'Linux', 'macOS', 'Windows'], answer: 0 },
          { q: 'The kernel is:', options: ['Core of the OS', 'A shell program', 'A file system', 'A device driver'], answer: 0 },
          { q: 'Which OS is open source?', options: ['Linux', 'Windows', 'macOS', 'iOS'], answer: 0 },
          { q: 'GUI stands for:', options: ['Graphical User Interface', 'General User Interface', 'Graphical Unified Interface', 'General Unified Input'], answer: 0 }
        ]
      },
      {
        id: 'os-functions',
        title: 'OS Functions',
        questions: [
          { q: 'Memory management handles:', options: ['Allocation of RAM', 'File storage', 'Network connections', 'User accounts'], answer: 0 },
          { q: 'Process scheduling is done by:', options: ['OS', 'BIOS', 'RAM', 'CPU cache'], answer: 0 },
          { q: 'Virtual memory uses:', options: ['Hard disk as RAM', 'RAM as cache', 'CPU as memory', 'Network as storage'], answer: 0 },
          { q: 'File system organizes:', options: ['Files and directories', 'Network packets', 'Memory addresses', 'CPU instructions'], answer: 0 },
          { q: 'Which is a file system?', options: ['NTFS', 'TCP', 'HTTP', 'USB'], answer: 0 }
        ]
      },
      {
        id: 'os-types',
        title: 'Types of OS',
        questions: [
          { q: 'Batch OS processes:', options: ['Jobs in batches', 'One job at a time', 'Real-time tasks', 'Network tasks'], answer: 0 },
          { q: 'Real-time OS is used in:', options: ['Embedded systems', 'Desktop computers', 'Servers', 'Mobile phones'], answer: 0 },
          { q: 'Time-sharing OS gives:', options: ['Each user a time slice', 'All resources to one user', 'No user interaction', 'Only batch processing'], answer: 0 },
          { q: 'Distributed OS manages:', options: ['Multiple networked computers', 'Single computer', 'Only storage', 'Only printers'], answer: 0 },
          { q: 'Multitasking means:', options: ['Running multiple programs', 'Multiple CPUs', 'Multiple users', 'Multiple monitors'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'memory-storage',
    title: 'Memory & Storage',
    icon: '💾',
    subModules: [
      {
        id: 'mem-types',
        title: 'Memory Types',
        questions: [
          { q: 'Volatile memory loses data when:', options: ['Power is turned off', 'File is deleted', 'System restarts', 'Data is copied'], answer: 0 },
          { q: 'ROM stands for:', options: ['Read Only Memory', 'Random Only Memory', 'Read Output Memory', 'Rapid Output Memory'], answer: 0 },
          { q: 'Cache memory is:', options: ['Fastest memory closest to CPU', 'Slowest memory', 'External storage', 'Network storage'], answer: 0 },
          { q: 'Which memory is non-volatile?', options: ['ROM', 'RAM', 'Cache', 'Register'], answer: 0 },
          { q: 'Memory hierarchy from fastest to slowest:', options: ['Register, Cache, RAM, HDD', 'HDD, RAM, Cache, Register', 'RAM, Cache, Register, HDD', 'Cache, Register, RAM, HDD'], answer: 0 }
        ]
      },
      {
        id: 'storage-devices',
        title: 'Storage Devices',
        questions: [
          { q: 'HDD uses:', options: ['Magnetic platters', 'Flash memory', 'Optical discs', 'Paper tape'], answer: 0 },
          { q: 'SSD is faster than HDD because:', options: ['No moving parts', 'Larger capacity', 'Lower cost', 'Magnetic technology'], answer: 0 },
          { q: 'Storage capacity is measured in:', options: ['Bytes', 'Hertz', 'Watts', 'Volts'], answer: 0 },
          { q: '1 GB equals:', options: ['1024 MB', '1000 MB', '1024 KB', '1000 KB'], answer: 0 },
          { q: 'Cloud storage stores data:', options: ['On remote servers', 'On local HDD', 'On RAM', 'On USB drive'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'computer-networks',
    title: 'Computer Networks',
    icon: '🌐',
    subModules: [
      {
        id: 'net-basics',
        title: 'Network Fundamentals',
        questions: [
          { q: 'LAN stands for:', options: ['Local Area Network', 'Large Area Network', 'Long Area Network', 'Logical Area Network'], answer: 0 },
          { q: 'WAN covers:', options: ['Large geographical area', 'Small office', 'Single room', 'Single building'], answer: 0 },
          { q: 'IP address is:', options: ['Unique identifier for devices', 'A web page address', 'An email address', 'A file path'], answer: 0 },
          { q: 'DNS translates:', options: ['Domain names to IPs', 'IPs to MAC addresses', 'Emails to domains', 'Files to packets'], answer: 0 },
          { q: 'Router connects:', options: ['Different networks', 'Devices in same network', 'Only computers', 'Only printers'], answer: 0 }
        ]
      },
      {
        id: 'net-protocols',
        title: 'Network Protocols',
        questions: [
          { q: 'HTTP stands for:', options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Text Protocol', 'HyperText Transmission Protocol'], answer: 0 },
          { q: 'TCP ensures:', options: ['Reliable data delivery', 'Fast data delivery', 'Data encryption', 'Data compression'], answer: 0 },
          { q: 'FTP is used for:', options: ['File transfer', 'Email', 'Web browsing', 'Remote login'], answer: 0 },
          { q: 'SMTP is used for:', options: ['Sending emails', 'Receiving emails', 'File transfer', 'Web browsing'], answer: 0 },
          { q: 'HTTPS adds:', options: ['Encryption to HTTP', 'Speed to HTTP', 'Compression to HTTP', 'Caching to HTTP'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'number-systems',
    title: 'Number Systems',
    icon: '🔢',
    subModules: [
      {
        id: 'ns-binary',
        title: 'Binary & Decimal',
        questions: [
          { q: 'Binary system uses base:', options: ['2', '8', '10', '16'], answer: 0 },
          { q: '1010 in binary equals:', options: ['10 in decimal', '5 in decimal', '12 in decimal', '8 in decimal'], answer: 0 },
          { q: 'Decimal 15 in binary is:', options: ['1111', '1010', '1100', '1001'], answer: 0 },
          { q: 'A bit is:', options: ['Single binary digit', '8 binary digits', '4 binary digits', '16 binary digits'], answer: 0 },
          { q: 'Nibble is:', options: ['4 bits', '8 bits', '2 bits', '16 bits'], answer: 0 }
        ]
      },
      {
        id: 'ns-hex',
        title: 'Hexadecimal & Octal',
        questions: [
          { q: 'Hexadecimal uses base:', options: ['16', '8', '10', '2'], answer: 0 },
          { q: 'FF in hex equals:', options: ['255 in decimal', '100 in decimal', '256 in decimal', '128 in decimal'], answer: 0 },
          { q: 'Octal system uses digits:', options: ['0-7', '0-9', '0-15', '1-8'], answer: 0 },
          { q: 'Hex digit A equals:', options: ['10 in decimal', '11 in decimal', '9 in decimal', '12 in decimal'], answer: 0 },
          { q: 'Convert 27 in decimal to hex:', options: ['1B', '1A', '2A', '1C'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'computer-architecture',
    title: 'Computer Architecture',
    icon: '🏗️',
    subModules: [
      {
        id: 'arch-basics',
        title: 'Architecture Basics',
        questions: [
          { q: 'Von Neumann architecture uses:', options: ['Single memory for data and instructions', 'Separate memory for data and instructions', 'No memory', 'Only cache memory'], answer: 0 },
          { q: 'Control Unit (CU) role is:', options: ['Directs operations of CPU', 'Performs calculations', 'Stores data', 'Manages files'], answer: 0 },
          { q: 'ALU performs:', options: ['Arithmetic and logical ops', 'Data storage', 'Program control', 'Memory management'], answer: 0 },
          { q: 'Clock speed is measured in:', options: ['Hertz', 'Bytes', 'Bits', 'Watts'], answer: 0 },
          { q: 'Pipeline architecture:', options: ['Processes multiple instructions', 'Processes one instruction', 'Stores multiple programs', 'Connects multiple CPUs'], answer: 0 }
        ]
      },
      {
        id: 'arch-registers',
        title: 'Registers & Buses',
        questions: [
          { q: 'Program Counter (PC) holds:', options: ['Address of next instruction', 'Current instruction', 'Computed result', 'Memory data'], answer: 0 },
          { q: 'Memory Address Register (MAR) stores:', options: ['Memory address to access', 'Data from memory', 'Instruction to execute', 'Computed result'], answer: 0 },
          { q: 'System bus consists of:', options: ['Data, address, and control buses', 'Only data bus', 'Only address bus', 'Data and address buses'], answer: 0 },
          { q: 'Data bus is:', options: ['Bidirectional', 'Unidirectional', 'Only input', 'Only output'], answer: 0 },
          { q: 'Address bus is:', options: ['Unidirectional', 'Bidirectional', 'Both ways', 'Not used in modern CPUs'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'software-concepts',
    title: 'Software Concepts',
    icon: '📦',
    subModules: [
      {
        id: 'sw-types',
        title: 'System & Application Software',
        questions: [
          { q: 'System software includes:', options: ['OS, drivers, utilities', 'Word processors, browsers', 'Games', 'Spreadsheets'], answer: 0 },
          { q: 'Compiler translates:', options: ['Source code to machine code', 'Machine code to source', 'Assembly to binary', 'Binary to source'], answer: 0 },
          { q: 'Interpreter translates:', options: ['Line by line', 'Entire program at once', 'Only errors', 'Only comments'], answer: 0 },
          { q: 'Assembler converts:', options: ['Assembly to machine code', 'High-level to assembly', 'Binary to assembly', 'C to Java'], answer: 0 },
          { q: 'Utility software example:', options: ['Antivirus', 'Word processor', 'Web browser', 'Game'], answer: 0 }
        ]
      },
      {
        id: 'sw-dev',
        title: 'Software Development',
        questions: [
          { q: 'SDLC stands for:', options: ['Software Development Life Cycle', 'System Design Life Cycle', 'Software Design Life Cycle', 'System Development Life Cycle'], answer: 0 },
          { q: 'First phase of SDLC is:', options: ['Requirement analysis', 'Coding', 'Testing', 'Deployment'], answer: 0 },
          { q: 'Agile methodology emphasizes:', options: ['Iterative development', 'Sequential phases', 'Heavy documentation', 'Fixed requirements'], answer: 0 },
          { q: 'Waterfall model is:', options: ['Sequential linear model', 'Iterative model', 'Spiral model', 'Prototype model'], answer: 0 },
          { q: 'Debugging is:', options: ['Finding and fixing errors', 'Writing code', 'Testing features', 'Deploying software'], answer: 0 }
        ]
      }
    ]
  }
];

const ComputerFundamentals = ({ setCurrentPage }) => {
  const { currentUser, saveAssessmentResult, isModuleCompleted, addActivityLog } = useContext(AssessmentContext);

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    addActivityLog(currentUser?.name || 'Student', 'student', 'CF_START', 'Opened Computer Fundamentals Assessment.');
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
    saveAssessmentResult('computer-fundamentals', selectedSubModule.id, pct);
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
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Monitor size={12} style={{ marginRight: '4px' }} /> COMPUTER FUNDAMENTALS ASSESSMENT
            </div>
            <h1 className="page-title">
              Computer <span>Fundamentals</span>
            </h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Select a module to begin. Each module has 2-3 sub-modules with 5 questions each.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {CF_MODULES.map(mod => {
            const completed = mod.subModules.every(sm => isModuleCompleted('computer-fundamentals', sm.id));
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
              <Monitor size={12} style={{ marginRight: '4px' }} /> {selectedModule.icon} {selectedModule.title}
            </div>
            <h1 className="page-title">
              {selectedModule.title} <span>Sub-Modules</span>
            </h1>
          </div>
          <button className="btn-cyber-outline" onClick={handleBackToTopics} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Modules
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {selectedModule.subModules.map(sm => {
            const done = isModuleCompleted('computer-fundamentals', sm.id);
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
      <div className="page-header" style={{ marginBottom: '16px' }}>
        <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} style={{ marginRight: '4px' }} /> {selectedModule.title} / {selectedSubModule.title}
          </div>
          <h1 className="page-title" style={{ fontSize: '22px' }}>
            {selectedSubModule.title}
          </h1>
        </div>
        <button className="btn-cyber-outline" onClick={handleBackToModules} style={{ padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back
        </button>
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

export default ComputerFundamentals;
