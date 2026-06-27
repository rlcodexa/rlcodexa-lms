const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  evaluationId: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  quizMarks: { type: Number, default: 0 },
  codingMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
  maxMarks: { type: Number, default: 100 },
  remarks: { type: String, default: '' },
  evaluatedBy: { type: String, default: 'system' }, // trainerId or 'system' for auto
  evaluatedAt: { type: Date, default: Date.now }
});

evaluationSchema.index({ studentId: 1, assessmentId: 1 }, { unique: true });

module.exports = mongoose.model('Evaluation', evaluationSchema, 'evaluations');
