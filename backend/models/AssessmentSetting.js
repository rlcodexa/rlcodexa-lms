const mongoose = require('mongoose');

const assessmentSettingSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  shuffleQuestions: { type: Boolean, default: false },
  showResults: { type: Boolean, default: true },
  allowTabSwitch: { type: Boolean, default: false },
  maxAttempts: { type: Number, default: 1 },
  passingScore: { type: Number, default: 40 }, // percentage
  autoSubmit: { type: Boolean, default: true }, // auto submit on time expiry
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssessmentSetting', assessmentSettingSchema, 'assessmentSettings');
