const mongoose = require('mongoose');

// Student Profile Schema
const studentProfileSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  registerNo: { type: String, required: true },
  department: { type: String, required: true },
  departmentId: { type: String, default: '' },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  semesterId: { type: String, default: '' },
  college: { type: String, required: true },
  collegeId: { type: String, default: '' },
  batchId: { type: String, default: '' },
  sectionId: { type: String, default: '' },
  profileImage: { type: String, default: "" },
  level: { type: String, default: "Beginner" },
  points: { type: Number, default: 0 },
  completedAssessments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Trainer Profile Schema
const trainerProfileSchema = new mongoose.Schema({
  trainerId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  college: { type: String, required: true },
  collegeId: { type: String, default: '' },
  department: { type: String, default: '' },
  departmentId: { type: String, default: '' },
  specialization: [{ type: String }],
  experience: { type: Number, default: 0 },
  status: { type: String, default: "active" }
});

// HOD Profile Schema
const hodProfileSchema = new mongoose.Schema({
  hodId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  department: { type: String, required: true },
  departmentId: { type: String, default: '' },
  college: { type: String, required: true },
  collegeId: { type: String, default: '' }
});

// Admin Profile Schema
const adminProfileSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  permissions: [{ type: String }]
});

module.exports = {
  StudentProfile: mongoose.model('StudentProfile', studentProfileSchema, 'studentProfiles'),
  TrainerProfile: mongoose.model('TrainerProfile', trainerProfileSchema, 'trainerProfiles'),
  HodProfile: mongoose.model('HodProfile', hodProfileSchema, 'hodProfiles'),
  AdminProfile: mongoose.model('AdminProfile', adminProfileSchema, 'adminProfiles')
};
