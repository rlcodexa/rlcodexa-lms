import React, { createContext, useState, useEffect } from 'react';

export const API_BASE_URL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000/api'
  : 'https://rlcodexabackend-1.onrender.com/api';

export const AssessmentContext = createContext();

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication Engineering",
  "BCA"
];

// Seed whitelisted 50 students (fallback data)
const INITIAL_STUDENT_WHITELIST = [];
const firstNames = ["Aarav", "Aditi", "Vikram", "Kavya", "Rahul", "Priyanka", "Sanjay", "Meera", "Rohan", "Sneha", "Arjun", "Divya", "Kartik", "Ananya", "Varun", "Shruti", "Siddharth", "Neha", "Manoj", "Deepa", "Harish", "Shweta", "Alok", "Riya", "Nikhil", "Tanu", "Pavan", "Kriti", "Vivek", "Pooja", "Aakash", "Ishani", "Raman", "Komal", "Dev", "Swati", "Raj", "Nisha", "Gaurav", "Preeti", "Rishi", "Anjali", "Suresh", "Ritu", "Amit", "Kiran", "Vijay", "Jyoti", "Pranav", "Megha"];
const lastNames = ["Sharma", "Patel", "Singh", "Nair", "Verma", "Rao", "Gupta", "Krishnan", "Das", "Reddy", "Bose", "Joshi", "Iyer", "Sen", "Malhotra", "Mishra", "Pillai", "Balan", "Choudhury", "Nair", "Das", "Roy", "Prasad", "Menon", "Jha", "Pandey", "Saxena", "Trivedi", "Kapoor", "Bhatt", "Dubey", "Grover", "Mehta", "Deshmukh", "Kulkarni", "Joshi", "Pillai", "Shetty", "Rao", "Nair", "Iyer", "Verma"];

for (let i = 1; i <= 50; i++) {
  const fIdx = (i - 1) % firstNames.length;
  const lIdx = (i - 1) % lastNames.length;
  const deptIdx = (i - 1) % DEPARTMENTS.length;
  const name = `${firstNames[fIdx]} ${lastNames[lIdx]}`;
  const id = `CG-2026-${i < 10 ? '0' + i : i}`;
  const email = `${firstNames[fIdx].toLowerCase()}.${lastNames[lIdx].toLowerCase()}@codegate.edu`;

  const isRegistered = i > 1 && i <= 10;
  const isCompleted = isRegistered && i % 2 === 0;

  let points = 0;
  let quizScore = 0;
  let codingScore = 0;
  let completedQuiz = false;
  let completedCoding = false;
  let infractionCount = 0;
  let infractionLogs = [];

  if (isRegistered) {
    points = 40 + (i * 15) % 120;
    if (isCompleted) {
      completedQuiz = true;
      completedCoding = true;
      quizScore = 70 + (i * 4) % 31;
      codingScore = i % 3 === 0 ? 100 : (i % 3 === 1 ? 66 : 33);
      points += quizScore + codingScore;
      infractionCount = i % 4 === 0 ? 1 : 0;
      if (infractionCount > 0) {
        infractionLogs.push({ time: "11:20", type: "Tab Switch", desc: "Switched tab during coding test" });
      }
    }
  }

  INITIAL_STUDENT_WHITELIST.push({
    id,
    name,
    email,
    department: DEPARTMENTS[deptIdx],
    registered: isRegistered,
    password: isRegistered ? "password123" : "",
    completedQuiz,
    quizScore,
    completedCoding,
    codingScore,
    testCasesPassed: isCompleted ? (codingScore === 100 ? 3 : (codingScore === 66 ? 2 : 1)) : 0,
    points,
    level: "Novice",
    dailyStreakBonusAdded: false,
    infractionCount,
    infractionLogs,
    loginLogs: isRegistered ? [`2026-06-15 09:${30 + i}:02 - Session Authenticated`] : [],
    weeklyCertIssued: isCompleted && (quizScore + codingScore > 140)
  });
}

const ROLES_DATABASE = {
  admin: { email: "admin@codegate.edu", name: "Dr. Alok Sen (Admin Controller)", password: "admin123", role: "admin" },
  staff: { email: "staff@codegate.edu", name: "Prof. Tanu Mishra (Course Instructor)", password: "staff123", role: "staff", department: "Computer Science & Engineering" },
  hod: { email: "hod.cse@codegate.edu", name: "Dr. Raman Saxena (CSE Department HOD)", password: "hod123", role: "hod", department: "Computer Science & Engineering" }
};

export const AssessmentProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentDay, setCurrentDay] = useState('Monday-Friday');
  const [securityOverlay, setSecurityOverlay] = useState(null);

  // Fallback states for offline mode
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('codegate_v2_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_WHITELIST;
  });

  const [colleges, setColleges] = useState(() => {
    const saved = localStorage.getItem('codegate_v2_colleges');
    return saved ? JSON.parse(saved) : [
      { collegeId: "CLG001", collegeName: "ABC Engineering College", location: "Coimbatore", status: "active", createdAt: new Date().toISOString() }
    ];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('codegate_v2_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = localStorage.getItem('codegate_v2_activity_logs');
    return saved ? JSON.parse(saved) : [
      { time: "16:54:00", user: "System Monitor", role: "system", action: "GATE_INITIALIZATION", details: "CodeGate security environment launched." }
    ];
  });

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [modules, setModules] = useState([]);

  // Sync offline states to local storage
  useEffect(() => {
    if (!isOnline) {
      localStorage.setItem('codegate_v2_students', JSON.stringify(students));
    }
  }, [students, isOnline]);

  useEffect(() => {
    if (!isOnline) {
      localStorage.setItem('codegate_v2_colleges', JSON.stringify(colleges));
    }
  }, [colleges, isOnline]);

  useEffect(() => {
    localStorage.setItem('codegate_v2_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (!isOnline) {
      localStorage.setItem('codegate_v2_activity_logs', JSON.stringify(activityLogs));
    }
  }, [activityLogs, isOnline]);

  // Check backend server status
  const checkStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      const data = await res.json();
      if (data.status === 'online') {
        setIsOnline(true);
        return true;
      }
      setIsOnline(false);
      return false;
    } catch (e) {
      setIsOnline(false);
      return false;
    }
  };

  // Fetch data from Express backend
  const fetchBackendData = async () => {
    try {
      const studentsRes = await fetch(`${API_BASE_URL}/admin/students`);
      const studentsData = await studentsRes.json();
      setStudents(studentsData);

      const logsRes = await fetch(`${API_BASE_URL}/admin/syslogs`);
      const logsData = await logsRes.json();
      setActivityLogs(logsData);

      const collegesRes = await fetch(`${API_BASE_URL}/admin/colleges`);
      const collegesData = await collegesRes.json();
      setColleges(collegesData);

      const deptRes = await fetch(`${API_BASE_URL}/admin/departments`);
      setDepartments(await deptRes.json());

      const batchRes = await fetch(`${API_BASE_URL}/admin/batches`);
      setBatches(await batchRes.json());

      const secRes = await fetch(`${API_BASE_URL}/admin/sections`);
      setSections(await secRes.json());

      const semRes = await fetch(`${API_BASE_URL}/admin/semesters`);
      setSemesters(await semRes.json());

      const modRes = await fetch(`${API_BASE_URL}/admin/modules`);
      setModules(await modRes.json());
    } catch (error) {
      console.error("Error loading backend data:", error);
    }
  };

  useEffect(() => {
    checkStatus().then(online => {
      if (online) {
        fetchBackendData();
      }
    });

    // Setup a health check polling interval
    const interval = setInterval(async () => {
      const online = await checkStatus();
      if (online) {
        fetchBackendData();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const calculateLevel = (points) => {
    if (points < 50) return "Novice";
    if (points < 100) return "Apprentice";
    if (points < 180) return "Specialist";
    if (points < 250) return "Expert";
    return "AI Architect";
  };

  const addActivityLog = async (user, role, action, details) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (isOnline) {
      // In online mode, the backend automatically generates logs for key actions
      // But we can trigger a manual fetch to refresh logs
      await fetchBackendData();
    } else {
      setActivityLogs(prev => [
        { time: timeStr, user, role, action, details },
        ...prev.slice(0, 49)
      ]);
    }
  };

  const registerStudent = async (rollNo, name, email, department, password) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rollNo, name, email, department, password })
        });
        const data = await res.json();
        if (data.success) {
          await fetchBackendData();
          return { success: true, student: data.student };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return { success: false, message: "Network error during backend registration." };
      }
    } else {
      // Offline fallback
      const targetIdx = students.findIndex(s => s.id.toUpperCase() === rollNo.toUpperCase());
      if (targetIdx === -1) {
        return { success: false, message: "Whitelist Denied: Roll Number is not pre-seeded in College whitelist." };
      }
      if (students[targetIdx].registered) {
        return { success: false, message: "Role conflict: Student is already registered. Go to Login page." };
      }

      const updatedStudents = [...students];
      updatedStudents[targetIdx] = {
        ...updatedStudents[targetIdx],
        name: name || updatedStudents[targetIdx].name,
        email: email.toLowerCase() || updatedStudents[targetIdx].email,
        department: department || updatedStudents[targetIdx].department,
        password,
        registered: true,
        points: 20
      };

      setStudents(updatedStudents);
      addActivityLog(name, "student", "REGISTRATION", `Registered Whitelist ID: ${rollNo}`);
      return { success: true, student: updatedStudents[targetIdx] };
    }
  };

  const registerDirectStudent = async (rollNo, name, email, college, department, password) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/register-direct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rollNo, name, email, college, department, password })
        });
        const data = await res.json();
        if (data.success) {
          await fetchBackendData();
          return { success: true, student: data.student };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return { success: false, message: "Network error during direct registration." };
      }
    } else {
      // Offline fallback
      const exists = students.some(s => s.id.toUpperCase() === rollNo.toUpperCase());
      if (exists) {
        return { success: false, message: "Student Roll/Register Number is already registered." };
      }

      const newStudent = {
        id: rollNo.toUpperCase(),
        name,
        email: email.toLowerCase(),
        department: department || "Computer Science & Engineering",
        college: college || "ABC Engineering College",
        registered: false,
        status: 'pending',
        password,
        completedQuiz: false,
        quizScore: 0,
        completedCoding: false,
        codingScore: 0,
        testCasesPassed: 0,
        points: 20,
        level: "Novice",
        dailyStreakBonusAdded: false,
        infractionCount: 0,
        infractionLogs: [],
        loginLogs: [],
        weeklyCertIssued: false
      };

      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      addActivityLog(name, "student", "REGISTRATION", `Directly registered student ID: ${rollNo} under College: ${college}`);
      return { success: true, student: newStudent };
    }
  };

  const loginStudent = async (email, password, role) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role: role === 'staff' ? 'trainer' : role })
        });
        const data = await res.json();
        if (data.success) {
          // Adjust role string for frontend compatibility if role is 'trainer'
          const sessionUser = {
            ...data.user,
            role: data.user.role === 'trainer' ? 'staff' : data.user.role
          };
          setCurrentUser(sessionUser);
          await fetchBackendData();
          return { success: true, user: sessionUser, rewardAdded: data.rewardAdded };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return { success: false, message: "Connection to Express server failed." };
      }
    } else {
      // Offline fallback
      const emailLower = email.toLowerCase();
      if (role === 'student') {
        const targetIdx = students.findIndex(s => s.email.toLowerCase() === emailLower && s.registered);
        if (targetIdx === -1) {
          return { success: false, message: "Invalid email or student not registered yet." };
        }

        const student = students[targetIdx];
        if (student.password !== password) {
          return { success: false, message: "Incorrect password." };
        }

        let pointsBonus = 0;
        let streakMsg = "";
        const updatedStudents = [...students];

        if (!student.dailyStreakBonusAdded) {
          pointsBonus = 20;
          updatedStudents[targetIdx].points += pointsBonus;
          updatedStudents[targetIdx].dailyStreakBonusAdded = true;
          streakMsg = " | Daily Login Reward (+20 pts)";
        }

        const logMsg = `${new Date().toLocaleString()} - Session Authenticated${streakMsg}`;
        updatedStudents[targetIdx].loginLogs = [logMsg, ...updatedStudents[targetIdx].loginLogs];
        updatedStudents[targetIdx].level = calculateLevel(updatedStudents[targetIdx].points);

        setStudents(updatedStudents);

        const sessionUser = {
          ...updatedStudents[targetIdx],
          role: "student"
        };

        setCurrentUser(sessionUser);
        addActivityLog(student.name, "student", "LOGIN", `Logged in successfully.${pointsBonus > 0 ? ' Earned +20 login points.' : ''}`);
        return { success: true, user: sessionUser, rewardAdded: pointsBonus > 0 };
      } else {
        const account = ROLES_DATABASE[role];
        if (!account || account.email !== emailLower) {
          return { success: false, message: `Access denied. Invalid credentials for role ${role.toUpperCase()}.` };
        }
        if (account.password !== password) {
          return { success: false, message: "Incorrect password." };
        }

        const sessionUser = { ...account };
        setCurrentUser(sessionUser);
        addActivityLog(account.name, role, "LOGIN", `Role terminal authorized: ${role.toUpperCase()}`);
        return { success: true, user: sessionUser };
      }
    }
  };

  const logoutStudent = () => {
    if (currentUser) {
      addActivityLog(currentUser.name, currentUser.role, "LOGOUT", `Logged out from session.`);
    }
    setCurrentUser(null);
  };

  const updateQuizScore = async (score) => {
    if (!currentUser || currentUser.role !== 'student') return;

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/student/submissions/quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: currentUser.id,
            assessmentId: "ASM001",
            score: score
          })
        });
        const data = await res.json();
        if (data.success) {
          // Update currentUser points & level
          setCurrentUser(prev => ({
            ...prev,
            points: data.points,
            level: data.level,
            completedQuiz: true,
            quizScore: score,
            completedAssessments: prev.completedAssessments + 1
          }));
          await fetchBackendData();
        }
      } catch (error) {
        console.error("Quiz submission error:", error);
      }
    } else {
      // Offline fallback
      const updatedStudents = students.map(s => {
        if (s.id === currentUser.id) {
          const addedPoints = Math.round(score * 0.5);
          const finalPoints = s.points + addedPoints;
          const completeFlag = currentDay === 'Saturday' ? s.completedQuiz : true;

          return {
            ...s,
            completedQuiz: completeFlag,
            quizScore: score,
            points: finalPoints,
            level: calculateLevel(finalPoints),
            completedAssessments: s.completedAssessments + 1
          };
        }
        return s;
      });

      setStudents(updatedStudents);
      const updatedUser = updatedStudents.find(s => s.id === currentUser.id);
      setCurrentUser({ ...updatedUser, role: 'student' });
      addActivityLog(currentUser.name, "student", "QUIZ_SUBMIT", `Quiz completed. Scored: ${score}%`);
    }
  };

  const updateCodingScore = async (passedCases, totalCases, code, language) => {
    if (!currentUser || currentUser.role !== 'student') return;

    const score = Math.round((passedCases / totalCases) * 100);

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/student/submissions/coding`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: currentUser.id,
            codingQuestionId: "CQ001",
            language,
            code,
            passedTestCases: passedCases,
            totalTestCases: totalCases
          })
        });
        const data = await res.json();
        if (data.success) {
          setCurrentUser(prev => ({
            ...prev,
            points: data.points,
            level: data.level,
            completedCoding: true,
            codingScore: score,
            testCasesPassed: passedCases,
            completedAssessments: prev.completedAssessments + 1,
            weeklyCertIssued: data.weeklyCertIssued || prev.weeklyCertIssued
          }));
          await fetchBackendData();
        }
      } catch (error) {
        console.error("Coding submission error:", error);
      }
    } else {
      // Offline fallback
      const updatedStudents = students.map(s => {
        if (s.id === currentUser.id) {
          const addedPoints = Math.round(score * 1.5);
          const finalPoints = s.points + addedPoints;
          const certIssued = finalPoints > 140;

          return {
            ...s,
            completedCoding: true,
            codingScore: score,
            testCasesPassed: passedCases,
            points: finalPoints,
            level: calculateLevel(finalPoints),
            completedAssessments: s.completedAssessments + 1,
            weeklyCertIssued: certIssued
          };
        }
        return s;
      });

      setStudents(updatedStudents);
      const updatedUser = updatedStudents.find(s => s.id === currentUser.id);
      setCurrentUser({ ...updatedUser, role: 'student' });
      addActivityLog(currentUser.name, "student", "CODING_SUBMIT", `Coding assessment submitted. Test cases: ${passedCases}/${totalCases}`);
    }
  };

  const addInfraction = async (type, desc) => {
    if (!currentUser) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (isOnline) {
      try {
        await fetch(`${API_BASE_URL}/student/infractions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: currentUser.id || "USR_UNKNOWN",
            assessmentId: "ASM001",
            type,
            desc
          })
        });
        await fetchBackendData();
      } catch (error) {
        console.error("Infraction log error:", error);
      }
    } else {
      // Offline fallback
      if (currentUser.role === 'student') {
        const updatedStudents = students.map(s => {
          if (s.id === currentUser.id) {
            const updatedLogs = [{ time: timeStr, type, desc }, ...s.infractionLogs];
            return {
              ...s,
              infractionCount: s.infractionCount + 1,
              infractionLogs: updatedLogs
            };
          }
          return s;
        });
        setStudents(updatedStudents);
        const updatedUser = updatedStudents.find(s => s.id === currentUser.id);
        setCurrentUser({ ...updatedUser, role: 'student' });
      }
      addActivityLog(currentUser.name, currentUser.role, "INFRACTION", `Security Warning: ${type} - ${desc}`);
    }

    setSecurityOverlay({ type, message: desc });
  };

  const clearSecurityOverlay = () => {
    setSecurityOverlay(null);
  };

  const resetAllData = async () => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/reset`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          setCurrentUser(null);
          await fetchBackendData();
          alert("Database successfully reset to default whitelist states.");
        }
      } catch (error) {
        alert("Failed to reset database on MongoDB server.");
      }
    } else {
      // Offline fallback
      localStorage.removeItem('codegate_v2_students');
      localStorage.removeItem('codegate_v2_user');
      localStorage.removeItem('codegate_v2_activity_logs');

      setStudents(INITIAL_STUDENT_WHITELIST.map(s => {
        const idNum = parseInt(s.id.split('-').pop());
        const isRegistered = idNum > 1 && idNum <= 10;
        const isCompleted = isRegistered && idNum % 2 === 0;

        let points = 0;
        let quizScore = 0;
        let codingScore = 0;
        let completedQuiz = false;
        let completedCoding = false;

        if (isRegistered) {
          points = 40 + (idNum * 15) % 120;
          if (isCompleted) {
            completedQuiz = true;
            completedCoding = true;
            quizScore = 70 + (idNum * 4) % 31;
            codingScore = idNum % 3 === 0 ? 100 : (idNum % 3 === 1 ? 66 : 33);
            points += quizScore + codingScore;
          }
        }

        return {
          ...s,
          registered: isRegistered,
          password: isRegistered ? "password123" : "",
          completedQuiz,
          quizScore,
          completedCoding,
          codingScore,
          testCasesPassed: isCompleted ? (codingScore === 100 ? 3 : (codingScore === 66 ? 2 : 1)) : 0,
          points,
          level: calculateLevel(points),
          dailyStreakBonusAdded: false,
          infractionCount: 0,
          infractionLogs: [],
          loginLogs: isRegistered ? [`2026-06-15 09:${30 + idNum}:02 - Session Authenticated`] : [],
          weeklyCertIssued: isCompleted && (quizScore + codingScore > 140)
        };
      }));
      setCurrentUser(null);
      setActivityLogs([
        { time: "16:54:00", user: "System Monitor", role: "system", action: "RESET_COMPLETE", details: "Database parameters flushed back to default whitelist streaking." }
      ]);
    }
  };

  const approveStudent = async (studentId) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/students/approve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId })
        });
        const data = await res.json();
        if (data.success) {
          await fetchBackendData();
          return { success: true };
        }
        return { success: false, message: data.message };
      } catch (e) {
        return { success: false, message: "Network error during approval." };
      }
    } else {
      setStudents(prev => prev.map(s => {
        if (s.id.toUpperCase() === studentId.toUpperCase()) {
          return { ...s, registered: true, status: 'active' };
        }
        return s;
      }));
      addActivityLog("Admin Controller", "admin", "APPROVE_STUDENT", `Approved and activated student: ${studentId}`);
      return { success: true };
    }
  };

  const deleteStudent = async (studentId) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/students/${studentId}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          await fetchBackendData();
          return { success: true };
        }
        return { success: false, message: data.message };
      } catch (e) {
        return { success: false, message: "Network error during student deletion." };
      }
    } else {
      setStudents(prev => prev.filter(s => s.id.toUpperCase() !== studentId.toUpperCase()));
      addActivityLog("Admin Controller", "admin", "DELETE_STUDENT", `Deleted student: ${studentId}`);
      return { success: true };
    }
  };

  const deleteStaff = async (userId) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/staff/${userId}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          await fetchBackendData();
          return { success: true };
        }
        return { success: false, message: data.message };
      } catch (e) {
        return { success: false, message: "Network error during staff deletion." };
      }
    } else {
      addActivityLog("Admin Controller", "admin", "DELETE_STAFF", `Deleted staff account: ${userId}`);
      return { success: true };
    }
  };

  const deleteCollege = async (collegeId) => {
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/colleges/${collegeId}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          await fetchBackendData();
          return { success: true };
        }
        return { success: false, message: data.message };
      } catch (e) {
        return { success: false, message: "Network error during college deletion." };
      }
    } else {
      setColleges(prev => prev.filter(c => c.collegeId !== collegeId));
      addActivityLog("Admin Controller", "admin", "DELETE_COLLEGE", `Deleted college record: ${collegeId}`);
      return { success: true };
    }
  };

  return (
    <AssessmentContext.Provider value={{
      students,
      colleges,
      setColleges,
      currentUser,
      currentDay,
      setCurrentDay,
      departments: departments.length > 0 ? departments : DEPARTMENTS.map(d => ({ departmentName: d, departmentId: d })),
      setDepartments,
      batches,
      setBatches,
      sections,
      setSections,
      semesters,
      setSemesters,
      modules,
      setModules,
      activityLogs,
      securityOverlay,
      isOnline,
      registerStudent,
      registerDirectStudent,
      loginStudent,
      logoutStudent,
      updateQuizScore,
      updateCodingScore,
      addInfraction,
      clearSecurityOverlay,
      resetAllData,
      calculateLevel,
      addActivityLog,
      approveStudent,
      deleteStudent,
      deleteStaff,
      deleteCollege,
      refreshData: fetchBackendData
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};
