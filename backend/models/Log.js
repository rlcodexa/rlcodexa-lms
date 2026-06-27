const mongoose = require('mongoose');

// Login History Schema
const loginHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
  pointsAwarded: { type: Number, default: 0 }
});

// Activity Logs Schema
const activityLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String },
  action: { type: String, required: true },
  details: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// Security Violations Schema
const securityViolationSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  assessmentId: { type: String },
  type: { type: String, required: true }, // e.g. "Tab Switch"
  count: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  LoginHistory: mongoose.model('LoginHistory', loginHistorySchema, 'loginHistory'),
  ActivityLog: mongoose.model('ActivityLog', activityLogSchema, 'activityLogs'),
  SecurityViolation: mongoose.model('SecurityViolation', securityViolationSchema, 'securityViolations')
};
