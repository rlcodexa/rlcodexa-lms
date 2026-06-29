const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const AssessmentSchedule = require('../models/AssessmentSchedule');
const AssessmentSetting = require('../models/AssessmentSetting');
const Module = require('../models/Module');
const StudentModule = require('../models/StudentModule');
const Evaluation = require('../models/Evaluation');
const AssessmentResult = require('../models/AssessmentResult');
const { QuizQuestion, CodingQuestion } = require('../models/Question');
const { QuizSubmission, CodingSubmission } = require('../models/Submission');
const { StudentProfile } = require('../models/Profile');
const User = require('../models/User');

// ============================================================
//  ASSESSMENT MANAGEMENT
// ============================================================

// @route   GET /api/trainer/assessments
router.get('/assessments', async (req, res) => {
  try {
    const { moduleId, collegeId } = req.query;
    const filter = {};
    if (moduleId) filter.moduleId = moduleId;
    if (collegeId) filter.collegeId = collegeId;
    const assessments = await Assessment.find(filter).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching assessments." });
  }
});

// @route   POST /api/trainer/assessments
router.post('/assessments', async (req, res) => {
  const { title, type, duration, totalMarks, createdBy, moduleId, collegeId, departmentId, batchId } = req.body;
  try {
    const assessmentId = 'ASM' + Math.floor(100 + Math.random() * 900);
    const assessment = await Assessment.create({
      assessmentId, title, type,
      duration: Number(duration || 30),
      totalMarks: Number(totalMarks || 100),
      createdBy: createdBy || "TR001",
      moduleId: moduleId || '',
      collegeId: collegeId || '',
      departmentId: departmentId || '',
      batchId: batchId || '',
      status: 'active'
    });
    res.json({ success: true, assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating assessment header." });
  }
});

// ============================================================
//  ASSESSMENT SCHEDULING
// ============================================================

// @route   GET /api/trainer/schedules
router.get('/schedules', async (req, res) => {
  try {
    const { collegeId, departmentId } = req.query;
    const filter = {};
    if (collegeId) filter.collegeId = collegeId;
    if (departmentId) filter.departmentId = departmentId;
    const schedules = await AssessmentSchedule.find(filter).sort({ scheduledDate: -1 });

    // Enrich with assessment title
    const enriched = [];
    for (let s of schedules) {
      const assessment = await Assessment.findOne({ assessmentId: s.assessmentId });
      enriched.push({
        ...s.toObject(),
        assessmentTitle: assessment ? assessment.title : 'Unknown',
        assessmentType: assessment ? assessment.type : 'Unknown'
      });
    }
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching schedules." });
  }
});

// @route   POST /api/trainer/schedules
router.post('/schedules', async (req, res) => {
  const { assessmentId, scheduledDate, startTime, endTime, batchId, sectionId, departmentId, collegeId, createdBy } = req.body;
  try {
    if (!assessmentId || !scheduledDate || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "Assessment, date, and times are required." });
    }
    const scheduleId = 'SCH' + Math.floor(100 + Math.random() * 900);
    const schedule = await AssessmentSchedule.create({
      scheduleId, assessmentId,
      scheduledDate: new Date(scheduledDate),
      startTime, endTime,
      batchId: batchId || '',
      sectionId: sectionId || '',
      departmentId: departmentId || '',
      collegeId: collegeId || '',
      createdBy: createdBy || '',
      status: 'scheduled'
    });
    res.json({ success: true, schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error scheduling assessment." });
  }
});

// @route   DELETE /api/trainer/schedules/:scheduleId
router.delete('/schedules/:scheduleId', async (req, res) => {
  try {
    await AssessmentSchedule.deleteOne({ scheduleId: req.params.scheduleId });
    res.json({ success: true, message: "Schedule deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting schedule." });
  }
});

// ============================================================
//  MODULE ASSIGNMENT
// ============================================================

// @route   GET /api/trainer/modules
router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching modules." });
  }
});

// @route   POST /api/trainer/modules/assign
// @desc    Assign a module to students (by batch or individual)
router.post('/modules/assign', async (req, res) => {
  const { moduleId, studentIds, batchId, assignedBy } = req.body;
  try {
    if (!moduleId) {
      return res.status(400).json({ success: false, message: "Module ID is required." });
    }

    let targetStudentIds = studentIds || [];

    // If batchId provided, assign to all students in that batch
    if (batchId && (!studentIds || studentIds.length === 0)) {
      const profiles = await StudentProfile.find({ batchId });
      targetStudentIds = profiles.map(p => p.studentId);
    }

    if (targetStudentIds.length === 0) {
      return res.status(400).json({ success: false, message: "No students to assign." });
    }

    let assignedCount = 0;
    for (let sid of targetStudentIds) {
      try {
        await StudentModule.create({
          studentId: sid,
          moduleId,
          assignedBy: assignedBy || '',
          status: 'assigned'
        });
        assignedCount++;
      } catch (e) {
        // Skip duplicates
        if (e.code !== 11000) console.error(e);
      }
    }

    res.json({ success: true, message: `Module assigned to ${assignedCount} students.`, assignedCount });
  } catch (error) {
    console.error("Module assign error:", error);
    res.status(500).json({ success: false, message: "Error assigning module." });
  }
});

// @route   GET /api/trainer/modules/assignments
// @desc    Get all module assignments
router.get('/modules/assignments', async (req, res) => {
  try {
    const { moduleId } = req.query;
    const filter = moduleId ? { moduleId } : {};
    const assignments = await StudentModule.find(filter).sort({ assignedAt: -1 });

    const enriched = [];
    for (let a of assignments) {
      const profile = await StudentProfile.findOne({ studentId: a.studentId });
      const user = profile ? await User.findOne({ userId: profile.userId }) : null;
      const mod = await Module.findOne({ moduleId: a.moduleId });
      enriched.push({
        ...a.toObject(),
        studentName: user ? user.name : 'Unknown',
        department: profile ? profile.department : 'Unknown',
        moduleName: mod ? mod.moduleName : 'Unknown'
      });
    }
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching module assignments." });
  }
});

// ============================================================
//  QUESTION BANK
// ============================================================

// @route   POST /api/trainer/questions/quiz
router.post('/questions/quiz', async (req, res) => {
  const { assessmentId, questionNo, question, options, answer, module, moduleId } = req.body;
  try {
    const qNo = questionNo || (await QuizQuestion.countDocuments({ assessmentId })) + 1;
    const quizQ = await QuizQuestion.create({
      assessmentId, questionNo: qNo, question, options, answer,
      module: module || "Module 1",
      moduleId: moduleId || ''
    });
    res.json({ success: true, question: quizQ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding quiz question." });
  }
});

// @route   POST /api/trainer/questions/coding
router.post('/questions/coding', async (req, res) => {
  const { title, description, difficulty, language, testCases, assessmentId, module, moduleId } = req.body;
  try {
    const codingQuestionId = 'CQ' + Math.floor(100 + Math.random() * 900);
    const codingQ = await CodingQuestion.create({
      codingQuestionId,
      assessmentId: assessmentId || "",
      title, description,
      difficulty: difficulty || "Easy",
      language: Array.isArray(language) ? language : [language],
      testCases: testCases || [],
      module: module || "Module 1",
      moduleId: moduleId || ''
    });
    res.json({ success: true, question: codingQ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding coding question." });
  }
});

// ============================================================
//  VIEW ASSIGNED STUDENTS
// ============================================================

// @route   GET /api/trainer/students
// @desc    Get students visible to this trainer (by college/department)
router.get('/students', async (req, res) => {
  try {
    const { collegeId, departmentId, batchId } = req.query;
    const filter = {};
    if (collegeId) filter.collegeId = collegeId;
    if (departmentId) filter.departmentId = departmentId;
    if (batchId) filter.batchId = batchId;

    const profiles = await StudentProfile.find(filter);
    const studentsList = [];

    for (let p of profiles) {
      const user = await User.findOne({ userId: p.userId });
      if (user && user.status === 'active' && user.password !== 'waiting_registration') {
        studentsList.push({
          id: p.studentId,
          name: user.name,
          email: user.email,
          department: p.department,
          college: p.college,
          batchId: p.batchId,
          sectionId: p.sectionId,
          points: p.points,
          level: p.level,
          completedAssessments: p.completedAssessments
        });
      }
    }
    res.json(studentsList);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching students." });
  }
});

// ============================================================
//  SUBMISSIONS & EVALUATION
// ============================================================

// @route   GET /api/trainer/submissions
router.get('/submissions', async (req, res) => {
  try {
    const quizSubs = await QuizSubmission.find().sort({ submittedAt: -1 });
    const codingSubs = await CodingSubmission.find().sort({ submittedAt: -1 });
    
    const formattedSubs = [];
    
    for (let qs of quizSubs) {
      const profile = await StudentProfile.findOne({ studentId: qs.studentId });
      const user = profile ? await User.findOne({ userId: profile.userId }) : null;
      const ass = await Assessment.findOne({ assessmentId: qs.assessmentId });
      
      formattedSubs.push({
        id: qs._id,
        type: 'Quiz',
        studentId: qs.studentId,
        studentName: user ? user.name : "Unknown student",
        department: profile ? profile.department : "Unknown",
        title: ass ? ass.title : "Quiz Assessment",
        score: qs.score,
        details: `Scored ${qs.score}%`,
        submittedAt: qs.submittedAt
      });
    }

    for (let cs of codingSubs) {
      const profile = await StudentProfile.findOne({ studentId: cs.studentId });
      const user = profile ? await User.findOne({ userId: profile.userId }) : null;
      const cq = await CodingQuestion.findOne({ codingQuestionId: cs.codingQuestionId });

      formattedSubs.push({
        id: cs._id,
        type: 'Coding',
        studentId: cs.studentId,
        studentName: user ? user.name : "Unknown student",
        department: profile ? profile.department : "Unknown",
        title: cq ? cq.title : "Coding Sandbox",
        score: cs.score,
        details: `${cs.passedTestCases}/${cs.totalTestCases} test cases passed (${cs.language})`,
        code: cs.code,
        language: cs.language,
        submittedAt: cs.submittedAt
      });
    }

    formattedSubs.sort((a,b) => b.submittedAt - a.submittedAt);
    res.json(formattedSubs);
  } catch (error) {
    console.error("Submissions fetch error:", error);
    res.status(500).json({ success: false, message: "Error compiling submissions report." });
  }
});

// @route   POST /api/trainer/evaluate
// @desc    Trainer manually evaluates a coding submission
router.post('/evaluate', async (req, res) => {
  const { studentId, assessmentId, quizMarks, codingMarks, remarks, evaluatedBy } = req.body;
  try {
    const totalMarks = (Number(quizMarks) || 0) + (Number(codingMarks) || 0);
    const evaluationId = 'EVL' + Math.floor(100 + Math.random() * 900);

    const evaluation = await Evaluation.findOneAndUpdate(
      { studentId, assessmentId },
      {
        evaluationId,
        quizMarks: Number(quizMarks) || 0,
        codingMarks: Number(codingMarks) || 0,
        totalMarks,
        remarks: remarks || '',
        evaluatedBy: evaluatedBy || 'trainer',
        evaluatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    // Generate result
    const assessment = await Assessment.findOne({ assessmentId });
    const maxMarks = assessment ? assessment.totalMarks : 100;
    const percentage = Math.round((totalMarks / maxMarks) * 100);
    const grade = percentage >= 90 ? 'A' : percentage >= 75 ? 'B' : percentage >= 60 ? 'C' : percentage >= 40 ? 'D' : 'F';

    const resultId = 'RES' + Math.floor(100 + Math.random() * 900);
    await AssessmentResult.findOneAndUpdate(
      { studentId, assessmentId },
      {
        resultId,
        moduleId: assessment ? assessment.moduleId : '',
        totalScore: totalMarks,
        maxScore: maxMarks,
        percentage,
        grade,
        status: percentage >= 40 ? 'pass' : 'fail',
        generatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, evaluation, percentage, grade });
  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({ success: false, message: "Error evaluating submission." });
  }
});

// @route   GET /api/trainer/results
// @desc    Get all assessment results
router.get('/results', async (req, res) => {
  try {
    const results = await AssessmentResult.find().sort({ generatedAt: -1 });
    const enriched = [];

    for (let r of results) {
      const profile = await StudentProfile.findOne({ studentId: r.studentId });
      const user = profile ? await User.findOne({ userId: profile.userId }) : null;
      const assessment = await Assessment.findOne({ assessmentId: r.assessmentId });

      enriched.push({
        ...r.toObject(),
        studentName: user ? user.name : 'Unknown',
        department: profile ? profile.department : 'Unknown',
        assessmentTitle: assessment ? assessment.title : 'Unknown'
      });
    }
    res.json(enriched);
// @route   POST /api/trainer/questions/bulk
router.post('/questions/bulk', async (req, res) => {
  const { assessmentId, questions, type } = req.body;
  try {
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: "No questions provided." });
    }

    const createdQuestions = [];
    if (type === 'coding') {
      for (const q of questions) {
        const codingQuestionId = 'CQ' + Math.floor(100 + Math.random() * 900);
        const codingQ = await CodingQuestion.create({
          codingQuestionId,
          assessmentId: assessmentId || "",
          title: q.title,
          description: q.description || q.desc || "",
          difficulty: q.difficulty || "Easy",
          language: Array.isArray(q.language) ? q.language : [q.language || "JavaScript"],
          testCases: q.testCases || (q.inputExample ? [{ input: q.inputExample, output: q.outputExample || "" }] : []),
          module: q.module || "Module 1",
          moduleId: q.moduleId || ""
        });
        createdQuestions.push(codingQ);
      }
      return res.json({ success: true, count: createdQuestions.length, questions: createdQuestions });
    } else {
      // Default: MCQ
      let currentCount = await QuizQuestion.countDocuments({ assessmentId });
      for (const q of questions) {
        currentCount++;
        const quizQ = await QuizQuestion.create({
          assessmentId,
          questionNo: q.questionNo || currentCount,
          question: q.question,
          options: q.options,
          answer: q.answer,
          module: q.module || "Module 1",
          moduleId: q.moduleId || ""
        });
        createdQuestions.push(quizQ);
      }
      return res.json({ success: true, count: createdQuestions.length, questions: createdQuestions });
    }
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ success: false, message: "Error performing bulk upload." });
  }
});

module.exports = router;
