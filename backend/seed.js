const mongoose = require('mongoose');
const College = require('./models/College');
const Department = require('./models/Department');
const Batch = require('./models/Batch');
const Section = require('./models/Section');
const Semester = require('./models/Semester');
const Module = require('./models/Module');
const StudentModule = require('./models/StudentModule');
const StudentProgress = require('./models/StudentProgress');
const StudentAttendance = require('./models/StudentAttendance');
const AssessmentSchedule = require('./models/AssessmentSchedule');
const AssessmentSetting = require('./models/AssessmentSetting');
const AssessmentSession = require('./models/AssessmentSession');
const QuestionAttempt = require('./models/QuestionAttempt');
const Evaluation = require('./models/Evaluation');
const AssessmentResult = require('./models/AssessmentResult');
const User = require('./models/User');
const { StudentProfile, TrainerProfile, HodProfile, AdminProfile } = require('./models/Profile');
const Assessment = require('./models/Assessment');
const { QuizQuestion, CodingQuestion } = require('./models/Question');
const { QuizSubmission, CodingSubmission } = require('./models/Submission');
const { LoginHistory, ActivityLog, SecurityViolation } = require('./models/Log');
const { Performance, Certificate, Notification, Leaderboard, Analytics } = require('./models/Metric');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sathyapriyakandhappan_db_user:BYNJOHmrERhZVgmK@sabdb.rio6amj.mongodb.net/rl_codexa_assessment';

const DEPARTMENT_NAMES = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication Engineering",
  "BCA"
];

const firstNames = ["Aarav", "Aditi", "Vikram", "Kavya", "Rahul", "Priyanka", "Sanjay", "Meera", "Rohan", "Sneha", "Arjun", "Divya", "Kartik", "Ananya", "Varun", "Shruti", "Siddharth", "Neha", "Manoj", "Deepa", "Harish", "Shweta", "Alok", "Riya", "Nikhil", "Tanu", "Pavan", "Kriti", "Vivek", "Pooja", "Aakash", "Ishani", "Raman", "Komal", "Dev", "Swati", "Raj", "Nisha", "Gaurav", "Preeti", "Rishi", "Anjali", "Suresh", "Ritu", "Amit", "Kiran", "Vijay", "Jyoti", "Pranav", "Megha"];
const lastNames = ["Sharma", "Patel", "Singh", "Nair", "Verma", "Rao", "Gupta", "Krishnan", "Das", "Reddy", "Bose", "Joshi", "Iyer", "Sen", "Malhotra", "Mishra", "Pillai", "Balan", "Choudhury", "Nair", "Das", "Roy", "Prasad", "Menon", "Jha", "Pandey", "Saxena", "Trivedi", "Kapoor", "Bhatt", "Dubey", "Grover", "Mehta", "Deshmukh", "Kulkarni", "Joshi", "Pillai", "Shetty", "Rao", "Nair", "Iyer", "Verma"];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully. Flushing existing database collections...");

    // Flush ALL collections
    await College.deleteMany({});
    await Department.deleteMany({});
    await Batch.deleteMany({});
    await Section.deleteMany({});
    await Semester.deleteMany({});
    await Module.deleteMany({});
    await StudentModule.deleteMany({});
    await StudentProgress.deleteMany({});
    await StudentAttendance.deleteMany({});
    await AssessmentSchedule.deleteMany({});
    await AssessmentSetting.deleteMany({});
    await AssessmentSession.deleteMany({});
    await QuestionAttempt.deleteMany({});
    await Evaluation.deleteMany({});
    await AssessmentResult.deleteMany({});
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await TrainerProfile.deleteMany({});
    await HodProfile.deleteMany({});
    await AdminProfile.deleteMany({});
    await Assessment.deleteMany({});
    await QuizQuestion.deleteMany({});
    await CodingQuestion.deleteMany({});
    await QuizSubmission.deleteMany({});
    await CodingSubmission.deleteMany({});
    await LoginHistory.deleteMany({});
    await ActivityLog.deleteMany({});
    await SecurityViolation.deleteMany({});
    await Performance.deleteMany({});
    await Certificate.deleteMany({});
    await Notification.deleteMany({});
    await Leaderboard.deleteMany({});
    await Analytics.deleteMany({});

    // ============================================================
    //  1. CREATE COLLEGE
    // ============================================================
    console.log("Creating default College...");
    const college = await College.create({
      collegeId: "CLG001",
      collegeName: "ABC Engineering College",
      location: "Coimbatore",
      status: "active"
    });

    // ============================================================
    //  2. CREATE DEPARTMENTS
    // ============================================================
    console.log("Creating departments...");
    const departments = [];
    for (let i = 0; i < DEPARTMENT_NAMES.length; i++) {
      const dept = await Department.create({
        departmentId: `DEPT${String(i + 1).padStart(3, '0')}`,
        departmentName: DEPARTMENT_NAMES[i],
        collegeId: college.collegeId,
        status: 'active'
      });
      departments.push(dept);
    }

    // ============================================================
    //  3. CREATE BATCHES
    // ============================================================
    console.log("Creating batches...");
    const batches = [];
    for (let dept of departments) {
      const batch1 = await Batch.create({
        batchId: `BAT-${dept.departmentId}-2023`,
        batchName: `${dept.departmentName} 2023-2027`,
        departmentId: dept.departmentId,
        collegeId: college.collegeId,
        academicYear: "2023-2027",
        status: 'active'
      });
      const batch2 = await Batch.create({
        batchId: `BAT-${dept.departmentId}-2024`,
        batchName: `${dept.departmentName} 2024-2028`,
        departmentId: dept.departmentId,
        collegeId: college.collegeId,
        academicYear: "2024-2028",
        status: 'active'
      });
      batches.push(batch1, batch2);
    }

    // ============================================================
    //  4. CREATE SECTIONS
    // ============================================================
    console.log("Creating sections...");
    const sections = [];
    for (let batch of batches) {
      for (let secName of ['A', 'B']) {
        const sec = await Section.create({
          sectionId: `SEC-${batch.batchId}-${secName}`,
          sectionName: secName,
          batchId: batch.batchId,
          departmentId: batch.departmentId,
          collegeId: college.collegeId
        });
        sections.push(sec);
      }
    }

    // ============================================================
    //  5. CREATE SEMESTERS
    // ============================================================
    console.log("Creating semesters...");
    const semesters = [];
    // Create semesters for the first batch of each department (2023 batch → currently in sem 5/6)
    for (let dept of departments) {
      const deptBatch = batches.find(b => b.departmentId === dept.departmentId && b.academicYear === '2023-2027');
      if (deptBatch) {
        const sem5 = await Semester.create({
          semesterId: `SEM-${deptBatch.batchId}-5`,
          semesterNumber: 5,
          semesterName: "Semester 5",
          batchId: deptBatch.batchId,
          collegeId: college.collegeId,
          startDate: new Date('2025-12-01'),
          endDate: new Date('2026-05-31'),
          status: 'completed'
        });
        const sem6 = await Semester.create({
          semesterId: `SEM-${deptBatch.batchId}-6`,
          semesterNumber: 6,
          semesterName: "Semester 6",
          batchId: deptBatch.batchId,
          collegeId: college.collegeId,
          startDate: new Date('2026-06-01'),
          endDate: new Date('2026-11-30'),
          status: 'active'
        });
        semesters.push(sem5, sem6);
      }
    }

    // ============================================================
    //  6. CREATE MODULES
    // ============================================================
    console.log("Creating learning modules...");
    const moduleData = [
      { moduleId: "MOD001", moduleName: "Java Fundamentals", description: "Core Java concepts including OOP, collections, and exception handling", totalTopics: 8 },
      { moduleId: "MOD002", moduleName: "Python Programming", description: "Python basics, data structures, and functional programming", totalTopics: 10 },
      { moduleId: "MOD003", moduleName: "Data Structures & Algorithms", description: "Arrays, linked lists, trees, graphs, sorting and searching algorithms", totalTopics: 12 },
      { moduleId: "MOD004", moduleName: "Web Development Basics", description: "HTML, CSS, JavaScript fundamentals and DOM manipulation", totalTopics: 8 },
      { moduleId: "MOD005", moduleName: "Database Management Systems", description: "SQL, normalization, transactions, and MongoDB basics", totalTopics: 6 }
    ];

    const modules = [];
    for (let m of moduleData) {
      const mod = await Module.create({
        ...m,
        departmentId: departments[0].departmentId,
        collegeId: college.collegeId,
        semesterId: semesters.length > 0 ? semesters[semesters.length - 1].semesterId : '',
        createdBy: 'TR001',
        status: 'active'
      });
      modules.push(mod);
    }

    // ============================================================
    //  7. CREATE ADMIN, HOD, TRAINER
    // ============================================================
    console.log("Creating Admin, HOD, and Trainer accounts...");

    // Admin
    const adminUser = await User.create({
      userId: "USR100", role: "admin",
      name: "Dr. Alok Sen (Admin)", email: "admin@codegate.edu",
      password: "admin123", phone: "9876543210",
      collegeId: college.collegeId, status: "active"
    });
    await AdminProfile.create({
      adminId: "ADM001", userId: adminUser.userId,
      permissions: ["manageColleges", "manageHods", "manageTrainers", "manageStudents", "manageAssessments", "viewAnalytics", "manageDepartments", "manageBatches", "manageSections", "manageSemesters", "manageModules"]
    });

    // HOD
    const hodUser = await User.create({
      userId: "USR020", role: "hod",
      name: "Dr. Raman Saxena (HOD)", email: "hod.cse@codegate.edu",
      password: "hod123", phone: "9876543211",
      collegeId: college.collegeId, status: "active"
    });
    await HodProfile.create({
      hodId: "HOD001", userId: hodUser.userId,
      department: departments[0].departmentName,
      departmentId: departments[0].departmentId,
      college: college.collegeName,
      collegeId: college.collegeId
    });

    // Trainer
    const trainerUser = await User.create({
      userId: "USR010", role: "trainer",
      name: "Prof. Tanu Mishra (Trainer)", email: "staff@codegate.edu",
      password: "staff123", phone: "9876543212",
      collegeId: college.collegeId, status: "active"
    });
    await TrainerProfile.create({
      trainerId: "TR001", userId: trainerUser.userId,
      college: college.collegeName, collegeId: college.collegeId,
      department: departments[0].departmentName, departmentId: departments[0].departmentId,
      specialization: ["Java", "Python", "MongoDB"], experience: 5, status: "active"
    });

    // ============================================================
    //  8. CREATE 50 STUDENTS
    // ============================================================
    console.log("Seeding 50 whitelisted students...");
    const defaultBatch = batches.find(b => b.departmentId === departments[0].departmentId && b.academicYear === '2023-2027');
    const defaultSection = sections.find(s => s.batchId === (defaultBatch ? defaultBatch.batchId : '') && s.sectionName === 'A');
    const defaultSemester = semesters.find(s => s.batchId === (defaultBatch ? defaultBatch.batchId : '') && s.semesterNumber === 6);

    for (let i = 1; i <= 50; i++) {
      const fIdx = (i - 1) % firstNames.length;
      const lIdx = (i - 1) % lastNames.length;
      const deptIdx = (i - 1) % DEPARTMENT_NAMES.length;
      const name = `${firstNames[fIdx]} ${lastNames[lIdx]}`;
      const rollNo = `CG-2026-${i < 10 ? '0' + i : i}`;
      const email = `${firstNames[fIdx].toLowerCase()}.${lastNames[lIdx].toLowerCase()}@codegate.edu`;
      const userId = `USR${100 + i}`;

      const isRegistered = i > 1 && i <= 10;
      const pass = isRegistered ? "password123" : "";
      const deptObj = departments[deptIdx];
      const studentBatch = batches.find(b => b.departmentId === deptObj.departmentId && b.academicYear === '2023-2027');
      const studentSection = sections.find(s => s.batchId === (studentBatch ? studentBatch.batchId : '') && s.sectionName === (i % 2 === 0 ? 'B' : 'A'));
      const studentSemester = semesters.find(s => s.batchId === (studentBatch ? studentBatch.batchId : '') && s.semesterNumber === 6);

      const studentUser = await User.create({
        userId, role: "student", name, email,
        password: pass || "waiting_registration",
        phone: `98765432${10 + i}`,
        collegeId: college.collegeId,
        status: isRegistered ? "active" : "inactive"
      });

      let points = 0;
      let completedAssessments = 0;
      let level = "Beginner";

      if (isRegistered) {
        points = 40 + (i * 15) % 120;
        completedAssessments = i % 2 === 0 ? 2 : 0;
        if (points >= 250) level = "AI Architect";
        else if (points >= 180) level = "Expert";
        else if (points >= 100) level = "Specialist";
        else if (points >= 50) level = "Apprentice";
      }

      await StudentProfile.create({
        studentId: `STU${i < 10 ? '0' + i : i}`,
        userId,
        registerNo: `22BCA${i < 10 ? '00' + i : '0' + i}`,
        department: DEPARTMENT_NAMES[deptIdx],
        departmentId: deptObj.departmentId,
        year: "3", semester: "6",
        semesterId: studentSemester ? studentSemester.semesterId : '',
        college: college.collegeName,
        collegeId: college.collegeId,
        batchId: studentBatch ? studentBatch.batchId : '',
        sectionId: studentSection ? studentSection.sectionId : '',
        profileImage: "", level, points, completedAssessments
      });

      if (isRegistered) {
        await Leaderboard.create({
          studentId: `STU${i < 10 ? '0' + i : i}`,
          points, rank: i, updatedAt: new Date()
        });
        await Performance.create({
          studentId: `STU${i < 10 ? '0' + i : i}`,
          quizzesCompleted: completedAssessments > 0 ? 1 : 0,
          codingCompleted: completedAssessments > 1 ? 1 : 0,
          averageScore: completedAssessments > 0 ? 80 + (i % 20) : 0,
          level, rank: i
        });
        await LoginHistory.create({
          userId, loginTime: new Date(Date.now() - 3600000), pointsAwarded: 20
        });

        // Assign modules to registered students
        for (let mod of modules) {
          await StudentModule.create({
            studentId: `STU${i < 10 ? '0' + i : i}`,
            moduleId: mod.moduleId,
            assignedBy: 'TR001',
            status: completedAssessments > 0 ? 'in-progress' : 'assigned'
          });
        }

        if (completedAssessments > 0 && points > 140) {
          await Certificate.create({
            certificateId: `CERT${i < 10 ? '0' + i : i}`,
            studentId: `STU${i < 10 ? '0' + i : i}`,
            certificateName: "Assessment Completion",
            issueDate: new Date(), status: "issued"
          });
        }
      }
    }

    // ============================================================
    //  9. CREATE ASSESSMENTS
    // ============================================================
    console.log("Creating default Assessments...");
    const assQuiz = await Assessment.create({
      assessmentId: "ASM001", title: "Java Fundamentals Quiz", type: "Quiz",
      duration: 30, totalMarks: 100, createdBy: "TR001",
      moduleId: "MOD001", collegeId: college.collegeId,
      departmentId: departments[0].departmentId, status: "active"
    });
    const assCoding = await Assessment.create({
      assessmentId: "ASM002", title: "Reverse String Challenge", type: "Coding",
      duration: 30, totalMarks: 100, createdBy: "TR001",
      moduleId: "MOD001", collegeId: college.collegeId,
      departmentId: departments[0].departmentId, status: "active"
    });

    // Assessment Settings
    await AssessmentSetting.create({
      assessmentId: "ASM001", shuffleQuestions: true, showResults: true,
      allowTabSwitch: false, maxAttempts: 1, passingScore: 40, autoSubmit: true
    });
    await AssessmentSetting.create({
      assessmentId: "ASM002", shuffleQuestions: false, showResults: true,
      allowTabSwitch: false, maxAttempts: 1, passingScore: 40, autoSubmit: true
    });

    // Assessment Schedules
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await AssessmentSchedule.create({
      scheduleId: "SCH001", assessmentId: "ASM001",
      scheduledDate: tomorrow, startTime: "10:00", endTime: "10:30",
      batchId: defaultBatch ? defaultBatch.batchId : '',
      departmentId: departments[0].departmentId,
      collegeId: college.collegeId,
      createdBy: "TR001", status: 'scheduled'
    });
    await AssessmentSchedule.create({
      scheduleId: "SCH002", assessmentId: "ASM002",
      scheduledDate: tomorrow, startTime: "11:00", endTime: "11:30",
      batchId: defaultBatch ? defaultBatch.batchId : '',
      departmentId: departments[0].departmentId,
      collegeId: college.collegeId,
      createdBy: "TR001", status: 'scheduled'
    });

    // ============================================================
    //  10. CREATE QUESTIONS
    // ============================================================
    console.log("Creating Quiz questions...");
    await QuizQuestion.create({ assessmentId: assQuiz.assessmentId, questionNo: 1, question: "What is Java?", options: ["Language", "Database", "Browser", "OS"], answer: "Language", module: "Module 1", moduleId: "MOD001" });
    await QuizQuestion.create({ assessmentId: assQuiz.assessmentId, questionNo: 2, question: "Which component is used to compile, debug and execute the Java programs?", options: ["JRE", "JIT", "JDK", "JVM"], answer: "JDK", module: "Module 1", moduleId: "MOD001" });
    await QuizQuestion.create({ assessmentId: assQuiz.assessmentId, questionNo: 3, question: "Which of these is not a feature of Java?", options: ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"], answer: "Use of pointers", module: "Module 1", moduleId: "MOD001" });

    console.log("Creating Coding questions...");
    await CodingQuestion.create({
      codingQuestionId: "CQ001", assessmentId: assCoding.assessmentId,
      title: "Reverse String", description: "Write a program that takes a string input and returns its reverse. Example: 'hello' -> 'olleh'.",
      difficulty: "Easy", language: ["Java", "Python", "JavaScript"],
      testCases: [{ input: "hello", output: "olleh" }, { input: "world", output: "dlrow" }],
      module: "Module 1", moduleId: "MOD001"
    });

    // ============================================================
    //  11. MOCK SUBMISSIONS & RESULTS
    // ============================================================
    console.log("Creating mock student submissions...");
    await QuizSubmission.create({ studentId: "STU02", assessmentId: assQuiz.assessmentId, score: 100, submittedAt: new Date() });
    await CodingSubmission.create({ studentId: "STU02", codingQuestionId: "CQ001", language: "JavaScript", code: "function reverse(s) { return s.split('').reverse().join(''); }", passedTestCases: 2, totalTestCases: 2, score: 100, submittedAt: new Date() });

    // Evaluations
    await Evaluation.create({ evaluationId: "EVL001", studentId: "STU02", assessmentId: "ASM001", quizMarks: 100, totalMarks: 100, maxMarks: 100, evaluatedBy: "system" });
    await Evaluation.create({ evaluationId: "EVL002", studentId: "STU02", assessmentId: "ASM002", codingMarks: 100, totalMarks: 100, maxMarks: 100, evaluatedBy: "system" });

    // Assessment Results
    await AssessmentResult.create({ resultId: "RES001", studentId: "STU02", assessmentId: "ASM001", moduleId: "MOD001", totalScore: 100, maxScore: 100, percentage: 100, grade: "A", status: "pass" });
    await AssessmentResult.create({ resultId: "RES002", studentId: "STU02", assessmentId: "ASM002", moduleId: "MOD001", totalScore: 100, maxScore: 100, percentage: 100, grade: "A", status: "pass" });

    // ============================================================
    //  12. ACTIVITY LOGS & ANALYTICS
    // ============================================================
    console.log("Creating system activity logs...");
    await ActivityLog.create({
      userId: "USR100", role: "admin", action: "DATABASE_INITIALIZATION",
      details: "Database successfully seeded with colleges, departments, batches, sections, semesters, modules, users, profiles, assessments, questions, and submissions."
    });

    console.log("Creating initial system analytics...");
    await Analytics.create({
      totalStudents: 50, totalTrainers: 1,
      totalAssessments: 2, completedAssessments: 2,
      generatedAt: new Date()
    });

    console.log("✅ Database seeded successfully!");
    console.log(`   • 1 College, ${departments.length} Departments, ${batches.length} Batches`);
    console.log(`   • ${sections.length} Sections, ${semesters.length} Semesters, ${modules.length} Modules`);
    console.log(`   • 1 Admin, 1 HOD, 1 Trainer, 50 Students`);
    console.log(`   • 2 Assessments, 3 Quiz Questions, 1 Coding Question`);
    console.log(`   • 2 Assessment Schedules, 2 Assessment Settings`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
