const mongoose = require('mongoose');

const studentModuleSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  moduleId: { type: String, required: true },
  assignedBy: { type: String, default: '' }, // trainerId who assigned
  assignedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['assigned', 'in-progress', 'completed'], default: 'assigned' }
});

// Compound index to prevent duplicate assignments
studentModuleSchema.index({ studentId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model('StudentModule', studentModuleSchema, 'studentModules');
