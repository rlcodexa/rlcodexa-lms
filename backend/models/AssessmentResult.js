const mongoose = require('mongoose');

const assessmentResultSchema = new mongoose.Schema({
  resultId: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  moduleId: { type: String, default: '' },
  totalScore: { type: Number, default: 0 },
  maxScore: { type: Number, default: 100 },
  percentage: { type: Number, default: 0 },
  grade: { type: String, default: '' }, // A, B, C, D, F
  status: { type: String, enum: ['pass', 'fail'], default: 'fail' },
  generatedAt: { type: Date, default: Date.now }
});

assessmentResultSchema.index({ studentId: 1, assessmentId: 1 }, { unique: true });

module.exports = mongoose.model('AssessmentResult', assessmentResultSchema, 'assessmentResults');
