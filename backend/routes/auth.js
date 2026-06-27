const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { StudentProfile } = require('../models/Profile');
const { LoginHistory, ActivityLog } = require('../models/Log');

// Helper function to calculate level based on points
const calculateLevel = (points) => {
  if (points < 50) return "Novice";
  if (points < 100) return "Apprentice";
  if (points < 180) return "Specialist";
  if (points < 250) return "Expert";
  return "AI Architect";
};

// @route   POST /api/auth/register
// @desc    Register a student from the whitelist
router.post('/register', async (req, res) => {
  const { rollNo, name, email, department, password } = req.body;

  try {
    if (!rollNo || !name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all details." });
    }

    // Find profile in the whitelist by studentId (e.g. STU01) or registerNo (e.g. 22BCA001) or rollNo
    const profile = await StudentProfile.findOne({
      $or: [
        { studentId: rollNo.toUpperCase() },
        { registerNo: rollNo.toUpperCase() },
        { studentId: rollNo.replace('CG-2026-', 'STU') } // support frontend roll number matching
      ]
    });

    if (!profile) {
      return res.status(403).json({ success: false, message: "Whitelist Denied: Roll Number is not pre-seeded in College whitelist." });
    }

    // Find user associated with this profile
    const user = await User.findOne({ userId: profile.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "Associated user registry not found." });
    }

    if (user.status === 'active' && user.password !== 'waiting_registration') {
      return res.status(400).json({ success: false, message: "Role conflict: Student is already registered. Go to Login page." });
    }

    // Update user details
    user.name = name;
    user.email = email.toLowerCase();
    user.password = password; // In a production app, we would hash this
    user.status = 'active';
    await user.save();

    // Initialize student profile
    profile.points = 20; // Starting registration points
    profile.department = department || profile.department;
    profile.level = calculateLevel(profile.points);
    await profile.save();

    // Log activity
    await ActivityLog.create({
      userId: user.userId,
      role: 'student',
      action: 'REGISTRATION',
      details: `Registered Whitelist ID: ${rollNo}`
    });

    return res.json({
      success: true,
      message: `Registration successful! Whitelisted student ${name} is authorized.`,
      student: {
        id: profile.studentId,
        name: user.name,
        email: user.email,
        department: profile.department,
        points: profile.points,
        level: profile.level
      }
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
});

// @route   POST /api/auth/login
// @desc    Login a user (student, trainer, hod, admin)
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Please enter all credentials." });
    }

    const emailLower = email.trim().toLowerCase();
    
    // Find user by email and role
    const user = await User.findOne({ email: emailLower, role: role });
    if (!user) {
      return res.status(400).json({ success: false, message: `Access denied. Invalid credentials for role ${role.toUpperCase()}.` });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Incorrect password." });
    }

    if (user.status === 'pending') {
      return res.status(400).json({ success: false, message: "Account registration is pending admin approval." });
    }

    if (user.status !== 'active') {
      return res.status(400).json({ success: false, message: "Account is inactive or pending registration." });
    }

    let payload = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role
    };

    let rewardAdded = false;

    // Student daily streak reward
    if (role === 'student') {
      const profile = await StudentProfile.findOne({ userId: user.userId });
      if (!profile) {
        return res.status(404).json({ success: false, message: "Student profile not found." });
      }

      // Check if logged in today
      const startOfDay = new Date();
      startOfDay.setHours(0,0,0,0);
      
      const endOfDay = new Date();
      endOfDay.setHours(23,59,59,999);

      const todayLogin = await LoginHistory.findOne({
        userId: user.userId,
        loginTime: { $gte: startOfDay, $lte: endOfDay }
      });

      if (!todayLogin) {
        rewardAdded = true;
        // Award points
        profile.points += 20;
        profile.level = calculateLevel(profile.points);
        await profile.save();

        // Create history log
        await LoginHistory.create({
          userId: user.userId,
          pointsAwarded: 20
        });

        // Log activity
        await ActivityLog.create({
          userId: user.userId,
          role: 'student',
          action: 'LOGIN',
          details: 'Logged in successfully. Earned +20 login points.'
        });
      } else {
        // Log simple login
        await ActivityLog.create({
          userId: user.userId,
          role: 'student',
          action: 'LOGIN',
          details: 'Logged in successfully.'
        });
      }

      payload = {
        ...payload,
        id: profile.studentId, // frontend compatibility
        studentId: profile.studentId,
        registerNo: profile.registerNo,
        department: profile.department,
        year: profile.year,
        semester: profile.semester,
        college: profile.college,
        points: profile.points,
        level: profile.level,
        completedAssessments: profile.completedAssessments
      };

    } else {
      // Log non-student login
      await ActivityLog.create({
        userId: user.userId,
        role: user.role,
        action: 'LOGIN',
        details: `Role terminal authorized: ${user.role.toUpperCase()}`
      });
    }

    return res.json({
      success: true,
      user: payload,
      rewardAdded
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
});

// @route   POST /api/auth/register-direct
// @desc    Direct register an individual student (no whitelist)
router.post('/register-direct', async (req, res) => {
  const { rollNo, name, email, department, college, password } = req.body;

  try {
    if (!rollNo || !name || !email || !college || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all required details." });
    }

    const emailLower = email.toLowerCase();
    const rollUpper = rollNo.toUpperCase();

    // Check if user already exists with this email
    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    // Check if student profile already exists with this roll number
    const profileExists = await StudentProfile.findOne({
      $or: [
        { studentId: rollUpper },
        { registerNo: rollUpper }
      ]
    });
    if (profileExists) {
      return res.status(400).json({ success: false, message: "Student Roll/Register Number is already registered." });
    }

    // Create a new User
    const userId = 'USR' + Math.floor(1000 + Math.random() * 9000);
    const user = await User.create({
      userId,
      role: 'student',
      name,
      email: emailLower,
      password,
      status: 'pending'
    });

    // Determine level based on initial points (starting at 20)
    const points = 20;
    const level = calculateLevel(points);

    // Create StudentProfile directly
    const profile = await StudentProfile.create({
      studentId: rollUpper,
      userId,
      registerNo: rollUpper,
      department: department || "Computer Science & Engineering",
      year: "3",
      semester: "6",
      college,
      level,
      points,
      completedAssessments: 0
    });

    // Log activity
    await ActivityLog.create({
      userId: user.userId,
      role: 'student',
      action: 'REGISTRATION',
      details: `Directly registered student ID: ${rollUpper} under College: ${college}`
    });

    return res.json({
      success: true,
      message: `Registration successful! Student ${name} is authorized.`,
      student: {
        id: profile.studentId,
        name: user.name,
        email: user.email,
        department: profile.department,
        points: profile.points,
        level: profile.level
      }
    });

  } catch (error) {
    console.error("Direct Register error:", error);
    res.status(500).json({ success: false, message: "Server error during direct registration." });
  }
});

module.exports = router;
