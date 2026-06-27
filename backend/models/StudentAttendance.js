const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], default: 'present' },
  loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema, 'studentAttendance');
