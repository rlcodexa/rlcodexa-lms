const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { StudentProfile } = require('../models/Profile');
const Assessment = require('../models/Assessment');
const { QuizQuestion, CodingQuestion } = require('../models/Question');
const { QuizSubmission, CodingSubmission } = require('../models/Submission');
const { SecurityViolation, ActivityLog } = require('../models/Log');
const { Performance, Certificate, Notification, Leaderboard } = require('../models/Metric');
const StudentModule = require('../models/StudentModule');
const StudentProgress = require('../models/StudentProgress');
const StudentAttendance = require('../models/StudentAttendance');
const AssessmentSession = require('../models/AssessmentSession');
const AssessmentResult = require('../models/AssessmentResult');
const QuestionAttempt = require('../models/QuestionAttempt');
const Evaluation = require('../models/Evaluation');
const Module = require('../models/Module');

const calculateLevel = (points) => {
  if (points < 50) return "Novice";
  if (points < 100) return "Apprentice";
  if (points < 180) return "Specialist";
  if (points < 250) return "Expert";
  return "AI Architect";
};

// ============================================================
//  LEADERBOARD
// ============================================================

// @route   GET /api/student/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const profiles = await StudentProfile.find().sort({ points: -1 });
    const formattedLeaderboard = [];
    
    let rank = 1;
    for (let p of profiles) {
      const user = await User.findOne({ userId: p.userId });
      if (user && user.status === 'active' && user.password !== 'waiting_registration') {
        formattedLeaderboard.push({
          studentId: p.studentId,
          name: user.name,
          department: p.department,
          points: p.points,
          level: p.level,
          rank: rank++
        });
      }
    }
    
    res.json(formattedLeaderboard);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching leaderboard." });
  }
});

// ============================================================
//  ASSIGNED MODULES
// ============================================================

// @route   GET /api/student/modules
// @desc    Get modules assigned to this student
router.get('/modules', async (req, res) => {
  const { studentId } = req.query;
  try {
    if (!studentId) {
      return res.status(400).json({ success: false, message: "Student ID is required." });
    }

    const assignments = await StudentModule.find({ studentId });
    const modulesData = [];

    for (let a of assignments) {
      const mod = await Module.findOne({ moduleId: a.moduleId });
      const progress = await StudentProgress.findOne({ studentId, moduleId: a.moduleId });
      
      // Count assessments linked to this module
      const assessmentCount = await Assessment.countDocuments({ moduleId: a.moduleId, status: 'active' });
      
      // Check completed results for this module
      const results = await AssessmentResult.find({ studentId, moduleId: a.moduleId });

      modulesData.push({
        moduleId: a.moduleId,
        moduleName: mod ? mod.moduleName : 'Unknown',
        description: mod ? mod.description : '',
        status: a.status,
        assignedAt: a.assignedAt,
        totalTopics: mod ? mod.totalTopics : 0,
        completedTopics: progress ? progress.completedTopics : 0,
        progressPercentage: progress ? progress.progressPercentage : 0,
        assessmentCount,
        completedAssessments: results.length,
        passedAssessments: results.filter(r => r.status === 'pass').length
      });
    }

    res.json(modulesData);
  } catch (error) {
    console.error("Student modules error:", error);
    res.status(500).json({ success: false, message: "Error fetching assigned modules." });
  }
});

// ============================================================
//  ASSESSMENTS
// ============================================================

// @route   GET /api/student/assessments
router.get('/assessments', async (req, res) => {
  const { studentId } = req.query;
  try {
    const assessments = await Assessment.find({ status: 'active' });
    const assessmentsWithStatus = [];

    for (let ass of assessments) {
      let completed = false;
      let score = 0;

      if (ass.type === 'Quiz') {
        const sub = await QuizSubmission.findOne({ studentId, assessmentId: ass.assessmentId });
        if (sub) { completed = true; score = sub.score; }
      } else {
        const cq = await CodingQuestion.findOne({ assessmentId: ass.assessmentId });
        if (cq) {
          const sub = await CodingSubmission.findOne({ studentId, codingQuestionId: cq.codingQuestionId });
          if (sub) { completed = true; score = sub.score; }
        }
      }

      // Get module name
      const mod = ass.moduleId ? await Module.findOne({ moduleId: ass.moduleId }) : null;

      assessmentsWithStatus.push({
        assessmentId: ass.assessmentId,
        title: ass.title,
        type: ass.type,
        duration: ass.duration,
        totalMarks: ass.totalMarks,
        moduleId: ass.moduleId,
        moduleName: mod ? mod.moduleName : 'General',
        completed,
        score
      });
    }

    res.json(assessmentsWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving assessments." });
  }
});

// ============================================================
//  ASSESSMENT SESSION & ATTENDANCE
// ============================================================

// @route   POST /api/student/session/start
// @desc    Start an assessment session (auto-records attendance)
router.post('/session/start', async (req, res) => {
  const { studentId, assessmentId } = req.body;
  try {
    // Check if session already exists
    const existingSession = await AssessmentSession.findOne({ studentId, assessmentId, status: 'started' });
    if (existingSession) {
      return res.json({ success: true, session: existingSession, message: "Session already active." });
    }

    const sessionId = 'SES' + Math.floor(1000 + Math.random() * 9000);
    const session = await AssessmentSession.create({
      sessionId, studentId, assessmentId,
      startTime: new Date(),
      status: 'started'
    });

    // Auto-record attendance
    await StudentAttendance.create({
      studentId, assessmentId,
      date: new Date(),
      status: 'present',
      loginTime: new Date()
    });

    // Log activity
    const profile = await StudentProfile.findOne({ studentId });
    const user = profile ? await User.findOne({ userId: profile.userId }) : null;
    await ActivityLog.create({
      userId: user ? user.userId : studentId,
      role: 'student',
      action: 'SESSION_START',
      details: `Started assessment session: ${assessmentId}`
    });

    res.json({ success: true, session });
  } catch (error) {
    console.error("Session start error:", error);
    res.status(500).json({ success: false, message: "Error starting session." });
  }
});

// @route   POST /api/student/session/end
router.post('/session/end', async (req, res) => {
  const { sessionId, studentId, assessmentId } = req.body;
  try {
    const filter = sessionId ? { sessionId } : { studentId, assessmentId, status: 'started' };
    const session = await AssessmentSession.findOneAndUpdate(
      filter,
      { endTime: new Date(), status: 'submitted' },
      { new: true }
    );
    res.json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error ending session." });
  }
});

// ============================================================
//  QUESTIONS
// ============================================================

// @route   GET /api/student/questions/quiz/:assessmentId
router.get('/questions/quiz/:assessmentId', async (req, res) => {
  try {
    const questions = await QuizQuestion.find({ assessmentId: req.params.assessmentId }).sort({ questionNo: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving questions." });
  }
});

// @route   GET /api/student/questions/coding
router.get('/questions/coding', async (req, res) => {
  try {
    const { assessmentId } = req.query;
    const filter = assessmentId ? { assessmentId } : {};
    const codingQs = await CodingQuestion.find(filter);
    res.json(codingQs);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving coding questions." });
  }
});

// ============================================================
//  QUESTION ATTEMPTS
// ============================================================

// @route   POST /api/student/attempts
router.post('/attempts', async (req, res) => {
  const { studentId, questionId, questionType, assessmentId, selectedAnswer, codeSubmitted, isCorrect, marksObtained, timeTaken } = req.body;
  try {
    const attempt = await QuestionAttempt.create({
      studentId, questionId,
      questionType: questionType || 'quiz',
      assessmentId: assessmentId || '',
      selectedAnswer: selectedAnswer || '',
      codeSubmitted: codeSubmitted || '',
      isCorrect: isCorrect || false,
      marksObtained: Number(marksObtained) || 0,
      timeTaken: Number(timeTaken) || 0
    });
    res.json({ success: true, attempt });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error recording attempt." });
  }
});

// ============================================================
//  SUBMISSIONS
// ============================================================

// @route   POST /api/student/submissions/quiz
router.post('/submissions/quiz', async (req, res) => {
  const { studentId, assessmentId, score } = req.body;
  try {
    const existingSub = await QuizSubmission.findOne({ studentId, assessmentId });
    if (existingSub) {
      return res.status(400).json({ success: false, message: "Quiz already submitted." });
    }

    const sub = await QuizSubmission.create({ studentId, assessmentId, score });

    const profile = await StudentProfile.findOne({ studentId });
    if (profile) {
      const addedPoints = Math.round(score * 0.5);
      profile.points += addedPoints;
      profile.completedAssessments += 1;
      profile.level = calculateLevel(profile.points);
      await profile.save();

      if (profile.points > 140) {
        const certExists = await Certificate.findOne({ studentId });
        if (!certExists) {
          await Certificate.create({
            certificateId: 'CERT' + Math.floor(100 + Math.random() * 900),
            studentId,
            certificateName: "Assessment Completion",
            status: "issued"
          });
        }
      }

      await Performance.findOneAndUpdate(
        { studentId },
        { $inc: { quizzesCompleted: 1 }, $set: { averageScore: score, level: profile.level } },
        { upsert: true }
      );
      
      await Leaderboard.findOneAndUpdate(
        { studentId },
        { $set: { points: profile.points, updatedAt: new Date() } },
        { upsert: true }
      );

      // Auto-generate evaluation & result
      const assessment = await Assessment.findOne({ assessmentId });
      const evaluationId = 'EVL' + Math.floor(1000 + Math.random() * 9000);
      await Evaluation.findOneAndUpdate(
        { studentId, assessmentId },
        { evaluationId, quizMarks: score, totalMarks: score, maxMarks: 100, evaluatedBy: 'system', evaluatedAt: new Date() },
        { upsert: true }
      );

      const percentage = score;
      const grade = percentage >= 90 ? 'A' : percentage >= 75 ? 'B' : percentage >= 60 ? 'C' : percentage >= 40 ? 'D' : 'F';
      const resultId = 'RES' + Math.floor(1000 + Math.random() * 9000);
      await AssessmentResult.findOneAndUpdate(
        { studentId, assessmentId },
        { resultId, moduleId: assessment ? assessment.moduleId : '', totalScore: score, maxScore: 100, percentage, grade, status: percentage >= 40 ? 'pass' : 'fail', generatedAt: new Date() },
        { upsert: true }
      );

      // Update module progress
      if (assessment && assessment.moduleId) {
        await StudentModule.findOneAndUpdate(
          { studentId, moduleId: assessment.moduleId },
          { status: 'in-progress' }
        );
      }

      // End session
      await AssessmentSession.findOneAndUpdate(
        { studentId, assessmentId, status: 'started' },
        { endTime: new Date(), status: 'submitted' }
      );

      const user = await User.findOne({ userId: profile.userId });
      await ActivityLog.create({
        userId: user ? user.userId : studentId,
        role: 'student',
        action: 'QUIZ_SUBMIT',
        details: `Quiz completed. Scored: ${score}%`
      });
    }

    res.json({ success: true, submission: sub, points: profile ? profile.points : 0, level: profile ? profile.level : "Beginner" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error submitting quiz answers." });
  }
});

// @route   POST /api/student/submissions/coding
router.post('/submissions/coding', async (req, res) => {
  const { studentId, codingQuestionId, language, code, passedTestCases, totalTestCases } = req.body;
  try {
    const score = Math.round((passedTestCases / totalTestCases) * 100);

    const sub = await CodingSubmission.create({
      studentId, codingQuestionId, language, code,
      passedTestCases, totalTestCases, score
    });

    const profile = await StudentProfile.findOne({ studentId });
    let isCertIssued = false;

    if (profile) {
      const addedPoints = Math.round(score * 1.5);
      profile.points += addedPoints;
      profile.completedAssessments += 1;
      profile.level = calculateLevel(profile.points);
      await profile.save();

      if (profile.points > 140) {
        const certExists = await Certificate.findOne({ studentId });
        if (!certExists) {
          await Certificate.create({
            certificateId: 'CERT' + Math.floor(100 + Math.random() * 900),
            studentId,
            certificateName: "Assessment Completion",
            status: "issued"
          });
          isCertIssued = true;
        }
      }

      await Performance.findOneAndUpdate(
        { studentId },
        { $inc: { codingCompleted: 1 }, $set: { averageScore: score, level: profile.level } },
        { upsert: true }
      );

      await Leaderboard.findOneAndUpdate(
        { studentId },
        { $set: { points: profile.points, updatedAt: new Date() } },
        { upsert: true }
      );

      // Find linked assessment for result generation
      const codingQ = await CodingQuestion.findOne({ codingQuestionId });
      if (codingQ && codingQ.assessmentId) {
        const assessment = await Assessment.findOne({ assessmentId: codingQ.assessmentId });
        const evaluationId = 'EVL' + Math.floor(1000 + Math.random() * 9000);
        await Evaluation.findOneAndUpdate(
          { studentId, assessmentId: codingQ.assessmentId },
          { evaluationId, codingMarks: score, totalMarks: score, maxMarks: 100, evaluatedBy: 'system', evaluatedAt: new Date() },
          { upsert: true }
        );

        const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';
        const resultId = 'RES' + Math.floor(1000 + Math.random() * 9000);
        await AssessmentResult.findOneAndUpdate(
          { studentId, assessmentId: codingQ.assessmentId },
          { resultId, moduleId: assessment ? assessment.moduleId : '', totalScore: score, maxScore: 100, percentage: score, grade, status: score >= 40 ? 'pass' : 'fail', generatedAt: new Date() },
          { upsert: true }
        );

        if (assessment && assessment.moduleId) {
          await StudentModule.findOneAndUpdate(
            { studentId, moduleId: assessment.moduleId },
            { status: 'in-progress' }
          );
        }

        await AssessmentSession.findOneAndUpdate(
          { studentId, assessmentId: codingQ.assessmentId, status: 'started' },
          { endTime: new Date(), status: 'submitted' }
        );
      }

      const user = await User.findOne({ userId: profile.userId });
      await ActivityLog.create({
        userId: user ? user.userId : studentId,
        role: 'student',
        action: 'CODING_SUBMIT',
        details: `Coding sandbox submitted. Test cases passed: ${passedTestCases}/${totalTestCases}`
      });
    }

    res.json({
      success: true, submission: sub,
      points: profile ? profile.points : 0,
      level: profile ? profile.level : "Beginner",
      weeklyCertIssued: isCertIssued
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error submitting code compilation." });
  }
});

// ============================================================
//  RESULTS
// ============================================================

// @route   GET /api/student/results/:studentId
router.get('/results/:studentId', async (req, res) => {
  try {
    const results = await AssessmentResult.find({ studentId: req.params.studentId }).sort({ generatedAt: -1 });
    const enriched = [];

    for (let r of results) {
      const assessment = await Assessment.findOne({ assessmentId: r.assessmentId });
      const mod = r.moduleId ? await Module.findOne({ moduleId: r.moduleId }) : null;

      enriched.push({
        ...r.toObject(),
        assessmentTitle: assessment ? assessment.title : 'Unknown',
        assessmentType: assessment ? assessment.type : 'Unknown',
        moduleName: mod ? mod.moduleName : 'General'
      });
    }
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching results." });
  }
});

// ============================================================
//  INFRACTIONS & CERTIFICATES
// ============================================================

// @route   POST /api/student/infractions
router.post('/infractions', async (req, res) => {
  const { studentId, assessmentId, type, desc } = req.body;
  try {
    const violation = await SecurityViolation.create({
      studentId, assessmentId: assessmentId || "", type, count: 1
    });

    // Update session tab switch count
    await AssessmentSession.findOneAndUpdate(
      { studentId, assessmentId, status: 'started' },
      { $inc: { tabSwitchCount: 1 } }
    );

    const profile = await StudentProfile.findOne({ studentId });
    const user = profile ? await User.findOne({ userId: profile.userId }) : null;

    await ActivityLog.create({
      userId: user ? user.userId : studentId,
      role: 'student',
      action: 'INFRACTION',
      details: `Security Violation: ${type} - ${desc}`
    });

    res.json({ success: true, violation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging security violation." });
  }
});

// @route   GET /api/student/certificates/:studentId
router.get('/certificates/:studentId', async (req, res) => {
  try {
    const certs = await Certificate.find({ studentId: req.params.studentId });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving certificates." });
  }
});

module.exports = router;
