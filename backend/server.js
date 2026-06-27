const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sathyapriyakandhappan_db_user:BYNJOHmrERhZVgmK@sabdb.rio6amj.mongodb.net/rl_codexa_assessment';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const hodRoutes = require('./routes/hod');
const trainerRoutes = require('./routes/trainer');
const studentRoutes = require('./routes/student');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/student', studentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Connect to MongoDB & Start Server
console.log("Connecting to MongoDB at:", MONGODB_URI);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully.");
    app.listen(PORT, () => {
      console.log(`Express server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB Database Connection Error:", err);
    process.exit(1);
  });
