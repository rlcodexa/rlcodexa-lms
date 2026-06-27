const mongoose = require('mongoose');

const assessmentScheduleSchema = new mongoose.Schema({
  scheduleId: { type: String, required: true, unique: true },
  assessmentId: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g. "10:00"
  endTime: { type: String, required: true },   // e.g. "11:00"
  batchId: { type: String, default: '' },
  sectionId: { type: String, default: '' },
  departmentId: { type: String, default: '' },
  collegeId: { type: String, default: '' },
  createdBy: { type: String, default: '' }, // trainerId
  status: { type: String, enum: ['scheduled', 'active', 'completed', 'cancelled'], default: 'scheduled' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssessmentSchedule', assessmentScheduleSchema, 'assessmentSchedules');
