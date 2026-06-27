const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  semesterId: { type: String, required: true, unique: true },
  semesterNumber: { type: Number, required: true }, // e.g. 1, 2, 3...
  semesterName: { type: String, required: true }, // e.g. "Semester 6"
  batchId: { type: String, required: true },
  collegeId: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'inactive', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Semester', semesterSchema, 'semesters');
