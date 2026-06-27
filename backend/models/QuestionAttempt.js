const mongoose = require('mongoose');

const questionAttemptSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  questionId: { type: String, required: true }, // quizQuestion _id or codingQuestionId
  questionType: { type: String, enum: ['quiz', 'coding'], required: true },
  assessmentId: { type: String, default: '' },
  selectedAnswer: { type: String, default: '' }, // for quiz
  codeSubmitted: { type: String, default: '' }, // for coding
  isCorrect: { type: Boolean, default: false },
  marksObtained: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 }, // in seconds
  attemptedAt: { type: Date, default: Date.now }
});

questionAttemptSchema.index({ studentId: 1, questionId: 1 });

module.exports = mongoose.model('QuestionAttempt', questionAttemptSchema, 'questionAttempts');
