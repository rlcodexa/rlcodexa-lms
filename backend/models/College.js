const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  collegeId: { type: String, required: true, unique: true },
  collegeName: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('College', collegeSchema, 'colleges');
