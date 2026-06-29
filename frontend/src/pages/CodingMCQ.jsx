import React, { useState, useContext, useEffect } from 'react';
import { AssessmentContext } from '../context/AssessmentContext';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Code2, BookOpen, ArrowLeft } from 'lucide-react';

export const CODING_TOPICS = [
  {
    id: 'data-structures',
    title: 'Data Structures',
    icon: '🗃️',
    subModules: [
      {
        id: 'ds-arrays',
        title: 'Arrays & Strings',
        questions: [
          { q: 'Array index in most languages starts from:', options: ['0', '1', '-1', 'Depends'], answer: 0 },
          { q: 'Time complexity of accessing an array element by index:', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], answer: 0 },
          { q: 'Which is NOT a type of array operation?', options: ['Transposition', 'Traversal', 'Insertion', 'Deletion'], answer: 0 },
          { q: 'String in C is terminated by:', options: ['\\0', '\\n', '\\t', '\\r'], answer: 0 },
          { q: 'What does strlen("hello") return?', options: ['5', '6', '4', '7'], answer: 0 }
        ]
      },
      {
        id: 'ds-linkedlist',
        title: 'Linked Lists',
        questions: [
          { q: 'A linked list node contains:', options: ['Data + pointer', 'Data only', 'Pointer only', 'Index + data'], answer: 0 },
          { q: 'Singly linked list vs array - advantage:', options: ['Dynamic size', 'Faster access', 'Less memory', 'Cache friendly'], answer: 0 },
          { q: 'To reverse a linked list iteratively, how many pointers needed?', options: ['3', '2', '1', '4'], answer: 0 },
          { q: 'In doubly linked list, each node has:', options: ['2 pointers', '1 pointer', '3 pointers', '0 pointers'], answer: 0 },
          { q: 'Detecting a cycle in linked list uses which algorithm?', options: ["Floyd's Cycle", 'Binary Search', 'Merge Sort', 'Dijkstra'], answer: 0 }
        ]
      },
      {
        id: 'ds-trees',
        title: 'Trees & Graphs',
        questions: [
          { q: 'A binary tree node can have at most how many children?', options: ['2', '1', '3', 'Unlimited'], answer: 0 },
          { q: 'In-order traversal of BST gives:', options: ['Sorted order', 'Reverse order', 'Random', 'Level order'], answer: 0 },
          { q: 'Max nodes in a binary tree of height h:', options: ['2ʰ⁺¹ - 1', '2ʰ - 1', '2ʰ⁺¹', '2ʰ'], answer: 0 },
          { q: 'DFS uses which data structure?', options: ['Stack', 'Queue', 'Array', 'Linked list'], answer: 0 },
          { q: 'BFS uses which data structure?', options: ['Queue', 'Stack', 'Tree', 'Heap'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    icon: '⚡',
    subModules: [
      {
        id: 'algo-sorting',
        title: 'Sorting Algorithms',
        questions: [
          { q: 'Best time complexity of Quick Sort:', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], answer: 0 },
          { q: 'Which sort is NOT comparison-based?', options: ['Counting Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'], answer: 0 },
          { q: 'Merge Sort has space complexity of:', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], answer: 0 },
          { q: 'Insertion Sort best case time:', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], answer: 0 },
          { q: 'Which algorithm is used in Arrays.sort() in Java?', options: ['Dual-Pivot QuickSort', 'Merge Sort', 'Heap Sort', 'Tim Sort'], answer: 0 }
        ]
      },
      {
        id: 'algo-search',
        title: 'Searching & Recursion',
        questions: [
          { q: 'Binary search requires the array to be:', options: ['Sorted', 'Unsorted', 'Any order', 'Random'], answer: 0 },
          { q: 'Time complexity of binary search:', options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'], answer: 0 },
          { q: 'Fibonacci series uses which paradigm?', options: ['Recursion', 'Iteration only', 'Both Recursion & Iteration', 'Neither'], answer: 2 },
          { q: 'Which is NOT an algorithmic paradigm?', options: ['Backward Tracking', 'Divide & Conquer', 'Greedy', 'Dynamic Programming'], answer: 0 },
          { q: 'Tower of Hanoi has time complexity:', options: ['O(2ⁿ)', 'O(n²)', 'O(n log n)', 'O(n)'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    icon: '🧩',
    subModules: [
      {
        id: 'oop-basics',
        title: 'OOP Basics',
        questions: [
          { q: 'Which is NOT a pillar of OOP?', options: ['Compilation', 'Encapsulation', 'Inheritance', 'Polymorphism'], answer: 0 },
          { q: 'Binding data and methods together is called:', options: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'], answer: 0 },
          { q: 'A class is a:', options: ['Blueprint', 'Object', 'Function', 'Variable'], answer: 0 },
          { q: 'Which keyword is used for inheritance in Java?', options: ['extends', 'implements', 'inherits', 'super'], answer: 0 },
          { q: 'What is method overloading?', options: ['Same name, different params', 'Same name, same params', 'Different name, different class', 'Same return type only'], answer: 0 }
        ]
      },
      {
        id: 'oop-advanced',
        title: 'Advanced OOP',
        questions: [
          { q: 'Method overriding uses:', options: ['Runtime polymorphism', 'Compile-time polymorphism', 'Static binding', 'Early binding'], answer: 0 },
          { q: 'Abstract class can contain:', options: ['Both abstract and concrete methods', 'Only abstract methods', 'Only concrete methods', 'Neither'], answer: 0 },
          { q: 'Which access modifier is most restrictive?', options: ['private', 'public', 'protected', 'default'], answer: 0 },
          { q: 'Interface in Java 8+ can have:', options: ['Default and static methods', 'Only abstract methods', 'Only concrete methods', 'No methods'], answer: 0 },
          { q: 'Multiple inheritance in Java is achieved via:', options: ['Interfaces', 'Abstract classes', 'Concrete classes', 'Packages'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'dbms',
    title: 'Database Management Systems',
    icon: '🗄️',
    subModules: [
      {
        id: 'dbms-sql',
        title: 'SQL Basics',
        questions: [
          { q: 'SQL stands for:', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Structured Question Language'], answer: 0 },
          { q: 'Which command retrieves data?', options: ['SELECT', 'GET', 'FETCH', 'RETRIEVE'], answer: 0 },
          { q: 'DELETE vs TRUNCATE — which is DDL?', options: ['TRUNCATE', 'DELETE', 'Both', 'Neither'], answer: 0 },
          { q: 'Which clause filters groups?', options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'], answer: 0 },
          { q: 'A PRIMARY KEY is:', options: ['Unique + NOT NULL', 'Unique', 'NOT NULL', 'Indexed'], answer: 0 }
        ]
      },
      {
        id: 'dbms-normalization',
        title: 'Normalization & Design',
        questions: [
          { q: '1NF requires:', options: ['Atomic values', 'No transitive dependency', 'No partial dependency', 'All keys defined'], answer: 0 },
          { q: 'Removing partial dependency achieves:', options: ['2NF', '1NF', '3NF', 'BCNF'], answer: 0 },
          { q: 'A table in 3NF is also in:', options: ['2NF', '1NF', 'BCNF', 'All of the above'], answer: 0 },
          { q: 'ACID stands for:', options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Integrity, Data', 'Atomic, Consistent, Isolated, Durable', 'None'], answer: 0 },
          { q: 'Which join returns matching rows from both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: '💻',
    subModules: [
      {
        id: 'os-process',
        title: 'Process Management',
        questions: [
          { q: 'A process is:', options: ['Program in execution', 'Program on disk', 'Thread', 'File'], answer: 0 },
          { q: 'Round Robin scheduling uses:', options: ['Time quantum', 'Priority', 'FCFS', 'SJF'], answer: 0 },
          { q: 'Deadlock prevention ensures:', options: ['At least one condition never holds', 'All conditions hold', 'No circular wait', 'Preemption'], answer: 0 },
          { q: 'Semaphore is used for:', options: ['Process synchronization', 'Memory management', 'File management', 'I/O management'], answer: 0 },
          { q: 'Which is NOT a process state?', options: ['Compiling', 'Running', 'Ready', 'Waiting'], answer: 0 }
        ]
      },
      {
        id: 'os-memory',
        title: 'Memory Management',
        questions: [
          { q: 'Paging eliminates:', options: ['External fragmentation', 'Internal fragmentation', 'Both', 'Neither'], answer: 0 },
          { q: 'LRU is a:', options: ['Page replacement algorithm', 'CPU scheduler', 'Disk scheduler', 'Memory allocator'], answer: 0 },
          { q: 'Virtual memory uses:', options: ['Paging + Swapping', 'Only Paging', 'Only Swapping', 'Segmentation'], answer: 0 },
          { q: 'TLB stands for:', options: ['Translation Lookaside Buffer', 'Table Lookup Buffer', 'Translation Local Buffer', 'Transfer Lookup Buffer'], answer: 0 },
          { q: 'Thrashing occurs when:', options: ['High page fault rate', 'Low CPU utilization', 'Enough memory', 'Fast disk'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'networks',
    title: 'Computer Networks',
    icon: '🌐',
    subModules: [
      {
        id: 'net-basics',
        title: 'Network Basics',
        questions: [
          { q: 'OSI model has how many layers?', options: ['7', '5', '4', '6'], answer: 0 },
          { q: 'IP address is at which layer?', options: ['Network', 'Transport', 'Application', 'Data Link'], answer: 0 },
          { q: 'TCP is:', options: ['Connection-oriented', 'Connectionless', 'Both', 'Neither'], answer: 0 },
          { q: 'HTTP runs on port:', options: ['80', '443', '21', '25'], answer: 0 },
          { q: 'Which is a private IP range?', options: ['192.168.0.0', '8.8.8.8', '1.1.1.1', '172.32.0.0'], answer: 0 }
        ]
      },
      {
        id: 'net-protocols',
        title: 'Protocols & Security',
        questions: [
          { q: 'DNS translates:', options: ['Domain to IP', 'IP to MAC', 'MAC to IP', 'Port to service'], answer: 0 },
          { q: 'HTTPS uses which protocol?', options: ['TLS/SSL', 'HTTP', 'FTP', 'SMTP'], answer: 0 },
          { q: 'DHCP assigns:', options: ['IP addresses dynamically', 'Domain names', 'Routes', 'MAC addresses'], answer: 0 },
          { q: 'Firewall operates at:', options: ['Network & Transport', 'Application only', 'Physical only', 'Session only'], answer: 0 },
          { q: 'SMTP is used for:', options: ['Email sending', 'File transfer', 'Web browsing', 'Remote login'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: '🌍',
    subModules: [
      {
        id: 'web-frontend',
        title: 'Frontend Technologies',
        questions: [
          { q: 'HTML stands for:', options: ['HyperText Markup Language', 'HighText Markup Language', 'HyperText Model Language', 'None'], answer: 0 },
          { q: 'Which is used for styling?', options: ['CSS', 'HTML', 'JavaScript', 'SQL'], answer: 0 },
          { q: 'React is a:', options: ['JavaScript library', 'CSS framework', 'Database', 'Server'], answer: 0 },
          { q: 'What does the DOM stand for?', options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Dynamic Object Model'], answer: 0 },
          { q: 'AJAX stands for:', options: ['Asynchronous JavaScript and XML', 'Advanced JavaScript and XML', 'Asynchronous JSON and XML', 'All JavaScript and XML'], answer: 0 }
        ]
      },
      {
        id: 'web-backend',
        title: 'Backend & APIs',
        questions: [
          { q: 'Node.js is:', options: ['JavaScript runtime', 'CSS framework', 'Database', 'Browser'], answer: 0 },
          { q: 'REST API uses which HTTP methods?', options: ['GET, POST, PUT, DELETE', 'READ, WRITE, UPDATE, DELETE', 'FETCH, SEND, UPDATE, REMOVE', 'All of the above'], answer: 0 },
          { q: 'JWT stands for:', options: ['JSON Web Token', 'JavaScript Web Token', 'Java Web Tool', 'JSON Web Tool'], answer: 0 },
          { q: 'MongoDB is a:', options: ['NoSQL database', 'SQL database', 'File system', 'Cache'], answer: 0 },
          { q: 'Express.js is a:', options: ['Web framework for Node.js', 'Database', 'Frontend library', 'Testing tool'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    icon: '📝',
    subModules: [
      {
        id: 'pl-basics',
        title: 'Language Fundamentals',
        questions: [
          { q: 'Which language is statically typed?', options: ['Java', 'Python', 'JavaScript', 'Ruby'], answer: 0 },
          { q: 'Python uses ___ for indentation:', options: ['Whitespace', 'Braces', 'Keywords', 'Semicolons'], answer: 0 },
          { q: 'Which is NOT a JavaScript data type?', options: ['Float', 'String', 'Number', 'Boolean'], answer: 0 },
          { q: 'C++ was developed by:', options: ['Bjarne Stroustrup', 'Dennis Ritchie', 'James Gosling', 'Guido van Rossum'], answer: 0 },
          { q: 'Java bytecode runs on:', options: ['JVM', 'JRE', 'JDK', 'JIT'], answer: 0 }
        ]
      },
      {
        id: 'pl-paradigms',
        title: 'Paradigms & Features',
        questions: [
          { q: 'Python supports:', options: ['Multiple paradigms', 'Only OOP', 'Only functional', 'Only procedural'], answer: 0 },
          { q: 'Garbage collection is:', options: ['Automatic memory management', 'Manual memory free', 'Code cleanup', 'File deletion'], answer: 0 },
          { q: 'Which is a functional language?', options: ['Haskell', 'Java', 'C++', 'Python'], answer: 0 },
          { q: 'TypeScript adds ___ to JavaScript:', options: ['Static typing', 'Dynamic typing', 'No typing', 'Weak typing'], answer: 0 },
          { q: 'Rust is known for:', options: ['Memory safety without GC', 'Dynamic typing', 'Interpreted speed', 'No compilation'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'software-eng',
    title: 'Software Engineering',
    icon: '🛠️',
    subModules: [
      {
        id: 'se-methodology',
        title: 'Methodologies',
        questions: [
          { q: 'Agile emphasizes:', options: ['Iterative development', 'Waterfall', 'Big design upfront', 'Documentation over code'], answer: 0 },
          { q: 'Scrum sprint duration is typically:', options: ['2-4 weeks', '1 day', '6 months', '1 year'], answer: 0 },
          { q: 'Which is NOT an SDLC phase?', options: ['Compilation', 'Requirements', 'Design', 'Testing'], answer: 0 },
          { q: 'CI/CD stands for:', options: ['Continuous Integration/Continuous Deployment', 'Code Integration/Code Deployment', 'Continuous Iteration/Continuous Delivery', 'Compile Integrate/Compile Deploy'], answer: 0 },
          { q: 'Version control tracks:', options: ['Changes to code over time', 'Only the final code', 'Compilation errors', 'Test results'], answer: 0 }
        ]
      },
      {
        id: 'se-testing',
        title: 'Testing & Quality',
        questions: [
          { q: 'Unit testing tests:', options: ['Individual components', 'Whole system', 'UI only', 'Performance'], answer: 0 },
          { q: 'TDD stands for:', options: ['Test-Driven Development', 'Technical Design Document', 'Test Data Definition', 'Total Development Duration'], answer: 0 },
          { q: 'Which test checks integration?', options: ['Integration test', 'Unit test', 'System test', 'Acceptance test'], answer: 0 },
          { q: 'Code review is part of:', options: ['Quality assurance', 'Development only', 'Deployment', 'Requirements'], answer: 0 },
          { q: 'Mutation testing tests:', options: ['Test suite quality', 'Code performance', 'UI responsiveness', 'Database speed'], answer: 0 }
        ]
      }
    ]
  },
  {
    id: 'version-control',
    title: 'Version Control',
    icon: '🔀',
    subModules: [
      {
        id: 'vc-git',
        title: 'Git Basics',
        questions: [
          { q: 'Git was created by:', options: ['Linus Torvalds', 'Richard Stallman', 'Bill Gates', 'Ken Thompson'], answer: 0 },
          { q: 'Which command stages changes?', options: ['git add', 'git commit', 'git push', 'git pull'], answer: 0 },
          { q: 'git commit creates:', options: ['A snapshot', 'A branch', 'A tag', 'A remote'], answer: 0 },
          { q: 'To create a new branch: git ___ branch-name:', options: ['branch', 'checkout -b', 'switch', 'All of the above'], answer: 3 },
          { q: 'git merge combines:', options: ['Two branches', 'Two commits', 'Two remotes', 'Two repositories'], answer: 0 }
        ]
      },
      {
        id: 'vc-workflow',
        title: 'Workflows & Collaboration',
        questions: [
          { q: 'A pull request is:', options: ['Request to merge changes', 'Download from remote', 'Upload to remote', 'Delete branch'], answer: 0 },
          { q: 'git rebase vs merge — rebase:', options: ['Rewrites commit history', 'Creates merge commit', 'Deletes commits', 'Clones repo'], answer: 0 },
          { q: 'Git flow uses which main branches?', options: ['main + develop', 'master + release', 'Only main', 'develop + feature'], answer: 0 },
          { q: 'git stash does:', options: ['Temporarily saves changes', 'Deletes changes', 'Pushes to remote', 'Creates branch'], answer: 0 },
          { q: 'A fork is:', options: ['A personal copy of a repo', 'A branch', 'A commit', 'A tag'], answer: 0 }
        ]
      }
    ]
  }
];

const CodingMCQ = ({ setCurrentPage }) => {
  const { currentUser, saveAssessmentResult, isModuleCompleted, addActivityLog } = useContext(AssessmentContext);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    addActivityLog(currentUser?.name || 'Student', 'student', 'CODING_MCQ_START', 'Opened Coding Fundamentals MCQ hub.');
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
    saveAssessmentResult('coding_mcq', selectedSubModule.id, pct);
  };

  const handleBackToModules = () => {
    setSelectedSubModule(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedSubModule(null);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  // Topic selection view
  if (!selectedTopic) {
    return (
      <div>
        <button className="btn-cyber-outline" onClick={handleBackToTopics} style={{ marginBottom: '16px',  padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back to Topics
          </button>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Code2 size={12} style={{ marginRight: '4px' }} /> CODING FUNDAMENTALS MCQ
            </div>
            <h1 className="page-title">
              Coding <span>Topics</span>
            </h1>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Select a topic to begin. Each topic has 2 sub-modules with 5 questions each.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {CODING_TOPICS.map(topic => {
            const completed = topic.subModules.every(sm => isModuleCompleted('coding_mcq', sm.id));
            return (
              <div
                key={topic.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${completed ? '#10b981' : 'var(--secondary-cyan)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedTopic(topic)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{topic.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                  {topic.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>{topic.subModules.length} sub-modules</span>
                  {completed && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> Complete</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Sub-module selection view
  if (!selectedSubModule) {
    return (
      <div>
        <div className="page-header" style={{ marginBottom: '20px' }}>
          <div>
            <div className="cyber-badge" style={{ marginBottom: '8px' }}>
              <Code2 size={12} style={{ marginRight: '4px' }} /> {selectedTopic.icon} {selectedTopic.title}
            </div>
            <h1 className="page-title">
              {selectedTopic.title} <span>Sub-Modules</span>
            </h1>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {selectedTopic.subModules.map(sm => {
            const done = isModuleCompleted('coding_mcq', sm.id);
            return (
              <div
                key={sm.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderTop: `3px solid ${done ? '#10b981' : 'var(--primary-blue)'}`,
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
                    <span style={{ color: 'var(--primary-blue)', fontSize: '12px' }}>{sm.questions.length} Qs</span>
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
  const questions = selectedSubModule.questions;
  const currentQuestion = questions[currentIdx];
  const progressPct = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div>
      <button className="btn-cyber-outline" onClick={handleBackToModules} style={{ marginBottom: '16px',  padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back
        </button>
        <div className="page-header" style={{ marginBottom: '16px' }}>
          <div>
          <div className="cyber-badge" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} style={{ marginRight: '4px' }} /> {selectedTopic.title} / {selectedSubModule.title}
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
            {selectedSubModule.title} — {selectedTopic.title}
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
              Back to Topic Selection
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
              <div className="progress-bar-fill" style={{ width: `${progressPct}%`, background: 'var(--secondary-cyan)' }}></div>
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
                    border: `1px solid ${isSelected ? 'var(--secondary-cyan)' : 'var(--border-color)'}`,
                    background: isSelected ? 'rgba(6,182,212,0.08)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--secondary-cyan)' : 'var(--border-color)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 'bold',
                      color: isSelected ? '#fff' : 'var(--text-muted)',
                      background: isSelected ? 'var(--secondary-cyan)' : 'transparent'
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

export default CodingMCQ;
