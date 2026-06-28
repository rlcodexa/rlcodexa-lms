import React, { createContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const API_BASE_URL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000/api'
  : 'https://rlcodexabackendlast.onrender.com/api';

export const AssessmentContext = createContext();

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication Engineering",
  "BCA"
]; const playSuccessSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playNote = (frequency, startTime, duration) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.08, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    playNote(523.25, audioCtx.currentTime, 0.15);
    playNote(659.25, audioCtx.currentTime + 0.1, 0.15);
    playNote(783.99, audioCtx.currentTime + 0.2, 0.4);
  } catch (e) {
    console.error("Audio Context error:", e);
  }
};
export const AssessmentProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState('Monday-Friday');
  const [securityOverlay, setSecurityOverlay] = useState(null);

  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [activityLogs, setActivityLogs] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState({});

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

      // Sync current student user with the refreshed database state
      setCurrentUser(prev => {
        if (prev && prev.role === 'student') {
          const fresh = studentsData.find(s => s.id === (prev.id || prev.studentId));
          if (fresh) {
            return { ...prev, ...fresh, role: 'student' };
          }
        }
        return prev;
      });

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
        fetchBackendData().finally(() => setGlobalLoading(false));
      } else {
        setGlobalLoading(false);
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
        const backendRole = role === 'assessment' ? 'student' : (role === 'staff' ? 'trainer' : role);
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role: backendRole })
        });
        const data = await res.json();
        if (data.success) {
          // Adjust role string for frontend compatibility
          let sessionRole = data.user.role;
          if (sessionRole === 'trainer') sessionRole = 'staff';
          if (role === 'assessment') sessionRole = 'assessment';

          const sessionUser = {
            ...data.user,
            role: sessionRole
          };
          setCurrentUser(sessionUser);
          localStorage.setItem('currentUser', JSON.stringify(sessionUser));
          await fetchBackendData();
          return { success: true, user: sessionUser, rewardAdded: data.rewardAdded };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return { success: false, message: "Connection to Express server failed." };
      }
    } else {
      return { success: false, message: "Database connection failed. Cannot log in." };
    }
  };

  const logoutStudent = async () => {
    if (currentUser) {
      if (isOnline) {
        try {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser.userId || (currentUser.role === 'student' ? currentUser.studentId : currentUser.id) })
          });
        } catch (e) {
          console.error('Logout error', e);
        }
      }
      addActivityLog(currentUser.name, currentUser.role, "LOGOUT", `Logged out from session.`);
    }
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
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
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          playSuccessSound();
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

  // Save assessment results (Aptitude/CodingMCQ) and track completion per module
  const saveAssessmentResult = async (type, moduleId, score) => {
    if (!currentUser || currentUser.role !== 'student') return;

    const scoreKey = type === 'aptitude' ? 'quizScore' : 'codingScore';
    const completedKey = type === 'aptitude' ? 'completedQuiz' : 'completedCoding';

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/student/submissions/quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: currentUser.id,
            assessmentId: type === 'aptitude' ? 'ASM_APT' : 'ASM_CODING',
            score: score
          })
        });
        const data = await res.json();
        if (data.success) {
          setCurrentUser(prev => ({
            ...prev,
            points: data.points || prev.points,
            level: data.level || prev.level,
            quizScore: type === 'aptitude' ? (prev.quizScore || 0) + score : prev.quizScore,
            codingScore: type === 'coding_mcq' ? (prev.codingScore || 0) + score : prev.codingScore
          }));
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          playSuccessSound();
          await fetchBackendData();
        }
      } catch (error) {
        console.error("Assessment submission error:", error);
      }
    } else {
      // Offline fallback
      const addedPoints = Math.round(score * 0.5);
      const updatedStudents = students.map(s => {
        if (s.id === currentUser.id) {
          const newScore = type === 'aptitude'
            ? (s.quizScore || 0) + score
            : (s.codingScore || 0) + score;
          const finalPoints = s.points + addedPoints;
          return {
            ...s,
            [scoreKey]: newScore,
            [completedKey]: true,
            points: finalPoints,
            level: calculateLevel(finalPoints)
          };
        }
        return s;
      });

      setStudents(updatedStudents);
      const updatedUser = updatedStudents.find(s => s.id === currentUser.id);
      setCurrentUser({ ...updatedUser, role: 'student' });

      // Track module completion
      const modKey = `${type}_${moduleId}`;
      const updatedModules = { ...completedModules, [modKey]: { completed: true, score, date: new Date().toISOString() } };
      setCompletedModules(updatedModules);

      addActivityLog(currentUser.name, "student", `${type.toUpperCase()}_SUBMIT`, `${type === 'aptitude' ? 'Aptitude' : 'Coding MCQ'} completed. Module: ${moduleId}, Score: ${score}%`);
    }
  };

  const isModuleCompleted = (type, moduleId) => {
    return !!completedModules[`${type}_${moduleId}`];
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
      localStorage.removeItem('codegate_v2_completed_modules');

      setCompletedModules({});
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
      globalLoading,
      setGlobalLoading,
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
      refreshData: fetchBackendData,
      completedModules,
      saveAssessmentResult,
      isModuleCompleted
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};
