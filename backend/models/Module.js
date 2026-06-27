const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleId: { type: String, required: true, unique: true },
  moduleName: { type: String, required: true },
  description: { type: String, default: '' },
  departmentId: { type: String, default: '' },
  collegeId: { type: String, default: '' },
  semesterId: { type: String, default: '' },
  totalTopics: { type: Number, default: 0 },
  createdBy: { type: String, default: '' }, // trainerId
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Module', moduleSchema, 'modules');
