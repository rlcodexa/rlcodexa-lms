const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { StudentProfile, TrainerProfile } = require('../models/Profile');
const { QuizSubmission, CodingSubmission } = require('../models/Submission');
const { SecurityViolation } = require('../models/Log');
const AssessmentResult = require('../models/AssessmentResult');
const StudentProgress = require('../models/StudentProgress');
const StudentModule = require('../models/StudentModule');
const Module = require('../models/Module');
const Assessment = require('../models/Assessment');

// ============================================================
//  DEPARTMENT STUDENTS
// ============================================================

// @route   GET /api/hod/students
// @desc    Get all students in HOD's department
router.get('/students', async (req, res) => {
  const { department, departmentId } = req.query;

  if (!department && !departmentId) {
    return res.status(400).json({ success: false, message: "Department query parameter is required." });
  }

  try {
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    else if (department) filter.department = department;

    const profiles = await StudentProfile.find(filter);
    const studentsList = [];

    for (let p of profiles) {
      const user = await User.findOne({ userId: p.userId });
      if (user) {
        const quizSub = await QuizSubmission.findOne({ studentId: p.studentId }).sort({ submittedAt: -1 });
        const codingSub = await CodingSubmission.findOne({ studentId: p.studentId }).sort({ submittedAt: -1 });

        studentsList.push({
          id: p.studentId,
          name: user.name,
          email: user.email,
          department: p.department,
          status: user.status,
          registered: user.status === 'active' && user.password !== 'waiting_registration',
          points: p.points,
          level: p.level,
          completedAssessments: p.completedAssessments,
          batchId: p.batchId,
          sectionId: p.sectionId,
          quizScore: quizSub ? quizSub.score : 0,
          codingScore: codingSub ? codingSub.score : 0,
          completedQuiz: !!quizSub,
          completedCoding: !!codingSub
        });
      }
    }

    res.json(studentsList);
  } catch (error) {
    console.error("HOD students error:", error);
    res.status(500).json({ success: false, message: "Error fetching department students." });
  }
});

// ============================================================
//  DEPARTMENT TRAINERS
// ============================================================

// @route   GET /api/hod/trainers
// @desc    Get all trainers in HOD's department/college
router.get('/trainers', async (req, res) => {
  const { department, departmentId, collegeId } = req.query;

  try {
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    else if (department) filter.department = department;
    if (collegeId) filter.collegeId = collegeId;

    const trainerProfiles = await TrainerProfile.find(filter);
    const trainersList = [];

    for (let tp of trainerProfiles) {
      const user = await User.findOne({ userId: tp.userId });
      if (user) {
        trainersList.push({
          trainerId: tp.trainerId,
          userId: tp.userId,
          name: user.name,
          email: user.email,
          specialization: tp.specialization,
          experience: tp.experience,
          college: tp.college,
          department: tp.department,
          status: tp.status
        });
      }
    }

    res.json(trainersList);
  } catch (error) {
    console.error("HOD trainers error:", error);
    res.status(500).json({ success: false, message: "Error fetching trainers." });
  }
});

// ============================================================
//  PERFORMANCE REPORTS
// ============================================================

// @route   GET /api/hod/reports
router.get('/reports', async (req, res) => {
  const { department, departmentId } = req.query;

  if (!department && !departmentId) {
    return res.status(400).json({ success: false, message: "Department query parameter is required." });
  }

  try {
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    else if (department) filter.department = department;

    const profiles = await StudentProfile.find(filter);
    
    let registeredCount = 0;
    let totalQuizScore = 0;
    let totalCodingScore = 0;
    let quizCount = 0;
    let codingCount = 0;
    
    const studentsReport = [];

    for (let p of profiles) {
      const user = await User.findOne({ userId: p.userId });
      if (user && user.status === 'active' && user.password !== 'waiting_registration') {
        registeredCount++;
        
        const quizSub = await QuizSubmission.findOne({ studentId: p.studentId }).sort({ submittedAt: -1 });
        const codingSub = await CodingSubmission.findOne({ studentId: p.studentId }).sort({ submittedAt: -1 });
        
        const qScore = quizSub ? quizSub.score : 0;
        const cScore = codingSub ? codingSub.score : 0;

        if (quizSub) { totalQuizScore += qScore; quizCount++; }
        if (codingSub) { totalCodingScore += cScore; codingCount++; }

        studentsReport.push({
          id: p.studentId,
          name: user.name,
          email: user.email,
          points: p.points,
          level: p.level,
          completedAssessments: p.completedAssessments,
          quizScore: qScore,
          codingScore: cScore,
          completedQuiz: !!quizSub,
          completedCoding: !!codingSub
        });
      }
    }

    const avgQuiz = quizCount > 0 ? Math.round(totalQuizScore / quizCount) : 0;
    const avgCoding = codingCount > 0 ? Math.round(totalCodingScore / codingCount) : 0;

    res.json({ registeredCount, avgQuiz, avgCoding, students: studentsReport });
  } catch (error) {
    console.error("HOD reports error:", error);
    res.status(500).json({ success: false, message: "Error compiling department reports." });
  }
});

// ============================================================
//  ASSESSMENT REPORTS
// ============================================================

// @route   GET /api/hod/assessment-reports
// @desc    Get assessment results breakdown for the department
router.get('/assessment-reports', async (req, res) => {
  const { department, departmentId } = req.query;

  try {
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    else if (department) filter.department = department;

    const profiles = await StudentProfile.find(filter);
    const studentIds = profiles.map(p => p.studentId);

    const results = await AssessmentResult.find({ studentId: { $in: studentIds } }).sort({ generatedAt: -1 });

    const enriched = [];
    for (let r of results) {
      const profile = profiles.find(p => p.studentId === r.studentId);
      const user = profile ? await User.findOne({ userId: profile.userId }) : null;
      const assessment = await Assessment.findOne({ assessmentId: r.assessmentId });
      const mod = r.moduleId ? await Module.findOne({ moduleId: r.moduleId }) : null;

      enriched.push({
        ...r.toObject(),
        studentName: user ? user.name : 'Unknown',
        assessmentTitle: assessment ? assessment.title : 'Unknown',
        moduleName: mod ? mod.moduleName : 'N/A'
      });
    }

    res.json(enriched);
  } catch (error) {
    console.error("HOD assessment reports error:", error);
    res.status(500).json({ success: false, message: "Error fetching assessment reports." });
  }
});

// ============================================================
//  PROGRESS TRACKING
// ============================================================

// @route   GET /api/hod/progress
// @desc    Get student progress across modules
router.get('/progress', async (req, res) => {
  const { department, departmentId } = req.query;

  try {
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    else if (department) filter.department = department;

    const profiles = await StudentProfile.find(filter);
    const progressList = [];

    for (let p of profiles) {
      const user = await User.findOne({ userId: p.userId });
      if (user && user.status === 'active' && user.password !== 'waiting_registration') {
        const modules = await StudentModule.find({ studentId: p.studentId });
        const moduleDetails = [];

        for (let m of modules) {
          const mod = await Module.findOne({ moduleId: m.moduleId });
          const progress = await StudentProgress.findOne({ studentId: p.studentId, moduleId: m.moduleId });

          moduleDetails.push({
            moduleId: m.moduleId,
            moduleName: mod ? mod.moduleName : 'Unknown',
            status: m.status,
            progressPercentage: progress ? progress.progressPercentage : 0
          });
        }

        progressList.push({
          studentId: p.studentId,
          name: user.name,
          department: p.department,
          points: p.points,
          level: p.level,
          modules: moduleDetails,
          totalModules: modules.length,
          completedModules: modules.filter(m => m.status === 'completed').length
        });
      }
    }

    res.json(progressList);
  } catch (error) {
    console.error("HOD progress error:", error);
    res.status(500).json({ success: false, message: "Error fetching progress data." });
  }
});

// ============================================================
//  SECURITY INFRACTIONS
// ============================================================

// @route   GET /api/hod/infractions
router.get('/infractions', async (req, res) => {
  const { department, departmentId } = req.query;

  if (!department && !departmentId) {
    return res.status(400).json({ success: false, message: "Department query parameter is required." });
  }

  try {
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    else if (department) filter.department = department;

    const profiles = await StudentProfile.find(filter);
    const studentIds = profiles.map(p => p.studentId);
    
    const violations = await SecurityViolation.find({ studentId: { $in: studentIds } }).sort({ createdAt: -1 });
    
    const formattedViolations = [];
    for (let v of violations) {
      const profile = profiles.find(p => p.studentId === v.studentId);
      const user = await User.findOne({ userId: profile.userId });
      
      formattedViolations.push({
        rollNo: v.studentId,
        name: user ? user.name : "Unknown Student",
        time: v.createdAt.toLocaleTimeString(),
        type: v.type,
        desc: `Violation logged on ${v.createdAt.toLocaleDateString()}`
      });
    }

    res.json(formattedViolations);
  } catch (error) {
    console.error("HOD infractions error:", error);
    res.status(500).json({ success: false, message: "Error fetching security infractions." });
  }
});

module.exports = router;
