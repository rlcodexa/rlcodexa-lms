const mongoose = require('mongoose');

const assessmentSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: { type: String, enum: ['started', 'submitted', 'expired', 'abandoned'], default: 'started' },
  tabSwitchCount: { type: Number, default: 0 },
  ipAddress: { type: String, default: '' }
});

assessmentSessionSchema.index({ studentId: 1, assessmentId: 1 });

module.exports = mongoose.model('AssessmentSession', assessmentSessionSchema, 'assessmentSessions');
