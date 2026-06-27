const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Quiz', 'Coding', 'Mixed'], required: true },
  duration: { type: Number, default: 30 }, // in minutes
  totalMarks: { type: Number, default: 100 },
  moduleId: { type: String, default: '' },
  collegeId: { type: String, default: '' },
  departmentId: { type: String, default: '' },
  batchId: { type: String, default: '' },
  createdBy: { type: String, required: true }, // trainerId
  status: { type: String, enum: ['active', 'inactive', 'draft'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema, 'assessments');
