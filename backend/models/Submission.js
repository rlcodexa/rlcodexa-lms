const mongoose = require('mongoose');

// Quiz Submissions Schema
const quizSubmissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

// Coding Submissions Schema
const codingSubmissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  codingQuestionId: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, default: "" },
  passedTestCases: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = {
  QuizSubmission: mongoose.model('QuizSubmission', quizSubmissionSchema, 'quizSubmissions'),
  CodingSubmission: mongoose.model('CodingSubmission', codingSubmissionSchema, 'codingSubmissions')
};
