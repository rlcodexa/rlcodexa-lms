const express = require('express');
const router = express.Router();
const College = require('../models/College');
const Department = require('../models/Department');
const Batch = require('../models/Batch');
const Section = require('../models/Section');
const Semester = require('../models/Semester');
const Module = require('../models/Module');
const User = require('../models/User');
const { StudentProfile, TrainerProfile, HodProfile } = require('../models/Profile');
const Assessment = require('../models/Assessment');
const { ActivityLog, SecurityViolation } = require('../models/Log');
const { Analytics } = require('../models/Metric');
const StudentModule = require('../models/StudentModule');

// ============================================================
//  COLLEGE MANAGEMENT
// ============================================================

// @route   GET /api/admin/colleges
router.get('/colleges', async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching colleges." });
  }
});

// @route   POST /api/admin/colleges
router.post('/colleges', async (req, res) => {
  const { collegeId, collegeName, location } = req.body;
  try {
    const exists = await College.findOne({ collegeId });
    if (exists) {
      return res.status(400).json({ success: false, message: "College ID already exists." });
    }
    const college = await College.create({ collegeId, collegeName, location, status: 'active' });
    res.json({ success: true, college });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating college." });
  }
});

// @route   DELETE /api/admin/colleges/:collegeId
router.delete('/colleges/:collegeId', async (req, res) => {
  const { collegeId } = req.params;
  try {
    await College.deleteOne({ collegeId });
    res.json({ success: true, message: "College deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting college." });
  }
});

// ============================================================
//  DEPARTMENT MANAGEMENT
// ============================================================

// @route   GET /api/admin/departments
router.get('/departments', async (req, res) => {
  try {
    const { collegeId } = req.query;
    const filter = collegeId ? { collegeId } : {};
    const departments = await Department.find(filter).sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching departments." });
  }
});

// @route   POST /api/admin/departments
router.post('/departments', async (req, res) => {
  const { departmentId, departmentName, collegeId } = req.body;
  try {
    if (!departmentId || !departmentName || !collegeId) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const exists = await Department.findOne({ departmentId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Department ID already exists." });
    }
    const dept = await Department.create({ departmentId, departmentName, collegeId, status: 'active' });
    res.json({ success: true, department: dept });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating department." });
  }
});

// @route   DELETE /api/admin/departments/:departmentId
router.delete('/departments/:departmentId', async (req, res) => {
  try {
    await Department.deleteOne({ departmentId: req.params.departmentId });
    res.json({ success: true, message: "Department deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting department." });
  }
});

// ============================================================
//  BATCH MANAGEMENT
// ============================================================

// @route   GET /api/admin/batches
router.get('/batches', async (req, res) => {
  try {
    const { collegeId, departmentId } = req.query;
    const filter = {};
    if (collegeId) filter.collegeId = collegeId;
    if (departmentId) filter.departmentId = departmentId;
    const batches = await Batch.find(filter).sort({ createdAt: -1 });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching batches." });
  }
});

// @route   POST /api/admin/batches
router.post('/batches', async (req, res) => {
  const { batchId, batchName, departmentId, collegeId, academicYear } = req.body;
  try {
    if (!batchId || !batchName || !departmentId || !collegeId || !academicYear) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const exists = await Batch.findOne({ batchId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Batch ID already exists." });
    }
    const batch = await Batch.create({ batchId, batchName, departmentId, collegeId, academicYear });
    res.json({ success: true, batch });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating batch." });
  }
});

// @route   DELETE /api/admin/batches/:batchId
router.delete('/batches/:batchId', async (req, res) => {
  try {
    await Batch.deleteOne({ batchId: req.params.batchId });
    res.json({ success: true, message: "Batch deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting batch." });
  }
});

// ============================================================
//  SECTION MANAGEMENT
// ============================================================

// @route   GET /api/admin/sections
router.get('/sections', async (req, res) => {
  try {
    const { batchId, collegeId } = req.query;
    const filter = {};
    if (batchId) filter.batchId = batchId;
    if (collegeId) filter.collegeId = collegeId;
    const sections = await Section.find(filter).sort({ sectionName: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sections." });
  }
});

// @route   POST /api/admin/sections
router.post('/sections', async (req, res) => {
  const { sectionId, sectionName, batchId, departmentId, collegeId } = req.body;
  try {
    if (!sectionId || !sectionName || !batchId || !departmentId || !collegeId) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const exists = await Section.findOne({ sectionId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Section ID already exists." });
    }
    const section = await Section.create({ sectionId, sectionName, batchId, departmentId, collegeId });
    res.json({ success: true, section });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating section." });
  }
});

// @route   DELETE /api/admin/sections/:sectionId
router.delete('/sections/:sectionId', async (req, res) => {
  try {
    await Section.deleteOne({ sectionId: req.params.sectionId });
    res.json({ success: true, message: "Section deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting section." });
  }
});

// ============================================================
//  SEMESTER MANAGEMENT
// ============================================================

// @route   GET /api/admin/semesters
router.get('/semesters', async (req, res) => {
  try {
    const { batchId, collegeId } = req.query;
    const filter = {};
    if (batchId) filter.batchId = batchId;
    if (collegeId) filter.collegeId = collegeId;
    const semesters = await Semester.find(filter).sort({ semesterNumber: 1 });
    res.json(semesters);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching semesters." });
  }
});

// @route   POST /api/admin/semesters
router.post('/semesters', async (req, res) => {
  const { semesterId, semesterNumber, semesterName, batchId, collegeId, startDate, endDate } = req.body;
  try {
    if (!semesterId || !semesterNumber || !semesterName || !batchId || !collegeId) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const exists = await Semester.findOne({ semesterId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Semester ID already exists." });
    }
    const semester = await Semester.create({
      semesterId, semesterNumber: Number(semesterNumber), semesterName, batchId, collegeId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
    res.json({ success: true, semester });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating semester." });
  }
});

// @route   DELETE /api/admin/semesters/:semesterId
router.delete('/semesters/:semesterId', async (req, res) => {
  try {
    await Semester.deleteOne({ semesterId: req.params.semesterId });
    res.json({ success: true, message: "Semester deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting semester." });
  }
});

// ============================================================
//  MODULE MANAGEMENT
// ============================================================

// @route   GET /api/admin/modules
router.get('/modules', async (req, res) => {
  try {
    const { collegeId, departmentId } = req.query;
    const filter = {};
    if (collegeId) filter.collegeId = collegeId;
    if (departmentId) filter.departmentId = departmentId;
    const modules = await Module.find(filter).sort({ createdAt: -1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching modules." });
  }
});

// @route   POST /api/admin/modules
router.post('/modules', async (req, res) => {
  const { moduleId, moduleName, description, departmentId, collegeId, semesterId, totalTopics, createdBy } = req.body;
  try {
    if (!moduleId || !moduleName) {
      return res.status(400).json({ success: false, message: "Module ID and name are required." });
    }
    const exists = await Module.findOne({ moduleId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Module ID already exists." });
    }
    const mod = await Module.create({
      moduleId, moduleName, description: description || '',
      departmentId: departmentId || '', collegeId: collegeId || '',
      semesterId: semesterId || '', totalTopics: Number(totalTopics || 0),
      createdBy: createdBy || ''
    });
    res.json({ success: true, module: mod });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating module." });
  }
});

// @route   DELETE /api/admin/modules/:moduleId
router.delete('/modules/:moduleId', async (req, res) => {
  try {
    await Module.deleteOne({ moduleId: req.params.moduleId });
    res.json({ success: true, message: "Module deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting module." });
  }
});

// ============================================================
//  STAFF MANAGEMENT (HOD & TRAINER)
// ============================================================

// @route   GET /api/admin/staff
router.get('/staff', async (req, res) => {
  try {
    const staffUsers = await User.find({ role: { $in: ['hod', 'trainer'] } });
    const formattedStaff = [];
    
    for (let u of staffUsers) {
      let details = {};
      if (u.role === 'hod') {
        details = await HodProfile.findOne({ userId: u.userId }) || {};
      } else {
        details = await TrainerProfile.findOne({ userId: u.userId }) || {};
      }
      formattedStaff.push({
        userId: u.userId,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        phone: u.phone,
        collegeId: u.collegeId,
        details
      });
    }
    res.json(formattedStaff);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching staff." });
  }
});

// @route   POST /api/admin/staff
router.post('/staff', async (req, res) => {
  const { name, email, password, role, phone, department, departmentId, college, collegeId, specialization, experience } = req.body;
  try {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const userId = 'USR' + Math.floor(1000 + Math.random() * 9000);
    const user = await User.create({
      userId, name, email: email.toLowerCase(), password, role, phone,
      collegeId: collegeId || '', status: 'active'
    });

    if (role === 'hod') {
      const hodId = 'HOD' + Math.floor(100 + Math.random() * 900);
      await HodProfile.create({
        hodId, userId,
        department: department || '',
        departmentId: departmentId || '',
        college: college || '',
        collegeId: collegeId || ''
      });
    } else if (role === 'trainer') {
      const trainerId = 'TR' + Math.floor(100 + Math.random() * 900);
      await TrainerProfile.create({
        trainerId, userId,
        college: college || '',
        collegeId: collegeId || '',
        department: department || '',
        departmentId: departmentId || '',
        specialization: Array.isArray(specialization) ? specialization : [specialization],
        experience: Number(experience || 0),
        status: 'active'
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Staff creation error:", error);
    res.status(500).json({ success: false, message: "Error creating staff user." });
  }
});

// @route   DELETE /api/admin/staff/:userId
router.delete('/staff/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if (user) {
      if (user.role === 'hod') {
        await HodProfile.deleteOne({ userId });
      } else if (user.role === 'trainer') {
        await TrainerProfile.deleteOne({ userId });
      }
      await User.deleteOne({ userId });
    }
    res.json({ success: true, message: "Staff deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting staff." });
  }
});

// ============================================================
//  STUDENT MANAGEMENT
// ============================================================

// @route   GET /api/admin/students
router.get('/students', async (req, res) => {
  try {
    const profiles = await StudentProfile.find();
    const studentsList = [];
    
    const { QuizSubmission, CodingSubmission } = require('../models/Submission');
    const { SecurityViolation, LoginHistory } = require('../models/Log');
    const { Certificate } = require('../models/Metric');

    for (let p of profiles) {
      const user = await User.findOne({ userId: p.userId });
      if (user) {
        const quizSub = await QuizSubmission.findOne({ studentId: p.studentId }).sort({ submittedAt: -1 });
        const codingSub = await CodingSubmission.findOne({ studentId: p.studentId }).sort({ submittedAt: -1 });
        const violations = await SecurityViolation.find({ studentId: p.studentId }).sort({ createdAt: -1 });
        const logins = await LoginHistory.find({ userId: p.userId }).sort({ loginTime: -1 });
        const cert = await Certificate.findOne({ studentId: p.studentId });
        
        studentsList.push({
          id: p.studentId,
          name: user.name,
          email: user.email,
          department: p.department,
          departmentId: p.departmentId,
          status: user.status,
          registered: user.status === 'active' && user.password !== 'waiting_registration',
          password: user.password !== 'waiting_registration' ? user.password : "",
          completedQuiz: !!quizSub,
          quizScore: quizSub ? quizSub.score : 0,
          completedCoding: !!codingSub,
          codingScore: codingSub ? codingSub.score : 0,
          testCasesPassed: codingSub ? codingSub.passedTestCases : 0,
          points: p.points,
          level: p.level,
          completedAssessments: p.completedAssessments,
          registerNo: p.registerNo,
          year: p.year,
          semester: p.semester,
          semesterId: p.semesterId,
          college: p.college,
          collegeId: p.collegeId,
          batchId: p.batchId,
          sectionId: p.sectionId,
          infractionCount: violations.length,
          infractionLogs: violations.map(v => ({
            time: v.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: v.type,
            desc: `Violation logged automatically by proctor.`
          })),
          loginLogs: logins.map(l => `${l.loginTime.toLocaleString()} - Session Authenticated`),
          weeklyCertIssued: !!cert
        });
      }
    }
    
    res.json(studentsList);
  } catch (error) {
    console.error("Error fetching student list:", error);
    res.status(500).json({ success: false, message: "Error fetching student database." });
  }
});

// @route   POST /api/admin/students/whitelist
router.post('/students/whitelist', async (req, res) => {
  const { rollNo, name, email, department, departmentId, college, collegeId, batchId, sectionId, semesterId } = req.body;
  try {
    const exists = await StudentProfile.findOne({ studentId: rollNo.toUpperCase() });
    if (exists) {
      return res.status(400).json({ success: false, message: "Student slot with this ID already exists in the whitelist." });
    }

    const userId = 'USR' + Math.floor(1000 + Math.random() * 9000);
    
    await User.create({
      userId, role: 'student', name,
      email: email.toLowerCase(),
      password: 'waiting_registration',
      collegeId: collegeId || '',
      status: 'inactive'
    });

    const profile = await StudentProfile.create({
      studentId: rollNo.toUpperCase(),
      userId,
      registerNo: rollNo.toUpperCase(),
      department: department || "Computer Science & Engineering",
      departmentId: departmentId || '',
      year: "3",
      semester: "6",
      semesterId: semesterId || '',
      college: college || "ABC Engineering College",
      collegeId: collegeId || '',
      batchId: batchId || '',
      sectionId: sectionId || '',
      level: "Beginner",
      points: 0,
      completedAssessments: 0
    });

    res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding student whitelist slot." });
  }
});

// @route   POST /api/admin/students/assign
// @desc    Assign batch, section, semester to a student
router.post('/students/assign', async (req, res) => {
  const { studentId, batchId, sectionId, semesterId } = req.body;
  try {
    const profile = await StudentProfile.findOne({ studentId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Student profile not found." });
    }
    if (batchId) profile.batchId = batchId;
    if (sectionId) profile.sectionId = sectionId;
    if (semesterId) profile.semesterId = semesterId;
    await profile.save();
    res.json({ success: true, message: "Student assignment updated.", profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error assigning student." });
  }
});

// @route   POST /api/admin/students/approve
router.post('/students/approve', async (req, res) => {
  const { studentId } = req.body;
  try {
    const profile = await StudentProfile.findOne({ studentId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Student profile not found." });
    }
    const user = await User.findOne({ userId: profile.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "Associated user registry not found." });
    }
    user.status = 'active';
    await user.save();

    await ActivityLog.create({
      userId: user.userId,
      role: 'admin',
      action: 'APPROVE_STUDENT',
      details: `Approved and activated student: ${profile.studentId} (${user.name})`
    });

    res.json({ success: true, message: "Student approved and activated successfully." });
  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ success: false, message: "Error approving student." });
  }
});

// @route   DELETE /api/admin/students/:studentId
router.delete('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const profile = await StudentProfile.findOne({ studentId });
    if (profile) {
      await User.deleteOne({ userId: profile.userId });
      await StudentProfile.deleteOne({ studentId });
    }
    res.json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting student." });
  }
});

// ============================================================
//  SYSTEM LOGS & ANALYTICS
// ============================================================

// @route   GET /api/admin/syslogs
router.get('/syslogs', async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(50);
    const formattedLogs = logs.map(l => ({
      time: l.timestamp.toLocaleTimeString(),
      user: l.userId,
      role: l.role || 'system',
      action: l.action,
      details: l.details
    }));
    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching activity logs." });
  }
});

// @route   GET /api/admin/analytics
router.get('/analytics', async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: 'student', status: 'active' });
    const trainerCount = await User.countDocuments({ role: 'trainer' });
    const hodCount = await User.countDocuments({ role: 'hod' });
    const assessmentCount = await Assessment.countDocuments({});
    const collegeCount = await College.countDocuments({});
    const departmentCount = await Department.countDocuments({});
    const moduleCount = await Module.countDocuments({});
    
    const students = await StudentProfile.find();
    const completedAssessmentsCount = students.reduce((sum, s) => sum + (s.completedAssessments || 0), 0);

    res.json({
      totalStudents: studentCount,
      totalTrainers: trainerCount,
      totalHods: hodCount,
      totalAssessments: assessmentCount,
      totalColleges: collegeCount,
      totalDepartments: departmentCount,
      totalModules: moduleCount,
      completedAssessments: completedAssessmentsCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching analytics counters." });
  }
});

// @route   POST /api/admin/reset
router.post('/reset', async (req, res) => {
  try {
    const { exec } = require('child_process');
    exec('node seed.js', { cwd: __dirname + '/..' }, (err, stdout, stderr) => {
      if (err) {
        console.error("Database reset error:", err);
        return res.status(500).json({ success: false, message: "Failed to reset database." });
      }
      res.json({ success: true, message: "Database successfully flushed and re-seeded." });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during reset." });
  }
});

module.exports = router;
