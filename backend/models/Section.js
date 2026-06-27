const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: true, unique: true },
  sectionName: { type: String, required: true }, // e.g. "A", "B"
  batchId: { type: String, required: true },
  departmentId: { type: String, required: true },
  collegeId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Section', sectionSchema, 'sections');
