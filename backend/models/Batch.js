const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchId: { type: String, required: true, unique: true },
  batchName: { type: String, required: true },
  departmentId: { type: String, required: true },
  collegeId: { type: String, required: true },
  academicYear: { type: String, required: true }, // e.g. "2023-2027"
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Batch', batchSchema, 'batches');
