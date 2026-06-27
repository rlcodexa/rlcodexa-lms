const mongoose = require('mongoose');

// Performance Schema
const performanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  quizzesCompleted: { type: Number, default: 0 },
  codingCompleted: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  level: { type: String, default: "Beginner" },
  rank: { type: Number, default: 0 }
});

// Certificates Schema
const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  certificateName: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  status: { type: String, default: "issued" }
});

// Notifications Schema
const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  totalStudents: { type: Number, default: 0 },
  totalTrainers: { type: Number, default: 0 },
  totalAssessments: { type: Number, default: 0 },
  completedAssessments: { type: Number, default: 0 },
  generatedAt: { type: Date, default: Date.now }
});

module.exports = {
  Performance: mongoose.model('Performance', performanceSchema, 'performance'),
  Certificate: mongoose.model('Certificate', certificateSchema, 'certificates'),
  Notification: mongoose.model('Notification', notificationSchema, 'notifications'),
  Leaderboard: mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard'),
  Analytics: mongoose.model('Analytics', analyticsSchema, 'analytics')
};
