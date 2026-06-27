const mongoose = require('mongoose');

const studentProgressSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  moduleId: { type: String, required: true },
  completedTopics: { type: Number, default: 0 },
  totalTopics: { type: Number, default: 0 },
  progressPercentage: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

studentProgressSchema.index({ studentId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model('StudentProgress', studentProgressSchema, 'studentProgress');
