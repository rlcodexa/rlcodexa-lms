# CodeGate LMS — Backend API

This is the Node.js / Express backend service for the CodeGate Learning Management System (LMS). It connects to MongoDB via Mongoose and serves the API for HODs, Trainers, Admins, and Students.

---

## 🛠️ Tech Stack & Architecture

- **Runtime**: Node.js (CommonJS modules)
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose ODM
- **Environment**: Configured via dotenv (`.env` file)

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
Navigate to the `backend` directory and install the dependencies:
```bash
cd backend
npm install
```

### 3. Environment Setup
Create or edit the `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>
```

### 4. Running the App

| Command | Action | Description |
|---------|--------|-------------|
| `npm run dev` | **Development Mode** | Starts the backend using `nodemon` for auto-restarts on code changes. |
| `npm start` | **Production Mode** | Starts the backend using the standard node runner. |
| `npm run seed` | **Database Seed** | Flushes and seeds MongoDB with default test profiles, whitelist data, and core modules. |

---

## 📂 Project Structure

```text
backend/
├── models/         # Mongoose Schemas (User, Profiles, Achievements, etc.)
├── routes/         # API Endpoint Routers (Auth, Admin, HOD, Trainer, Student)
├── .env            # Environment Configuration
├── package.json    # Dependencies and scripts
├── seed.js         # Database seeder script
└── server.js       # Main server entrypoint
```

---

## 🌐 API Routes

- **Authentication**: `/api/auth` (User registration, whitelists, and plain-text login comparisons)
- **Admin Actions**: `/api/admin` (Syllabus, colleges, department settings, logs, and resets)
- **Trainer/Staff**: `/api/trainer` (Manage student module locks/unlocks, evaluations, and custom MCQs)
- **HOD Portal**: `/api/hod` (Analytics, activity monitors, and student infractions tracking)
- **Student Portal**: `/api/student` (Retrieve challenges, sandbox compilers, and quiz submits)
- **System Health**: `/api/health` (Simple uptime and database status checks)

---

## 🔧 Troubleshooting Connection Issues

If you see a `querySrv ECONNREFUSED` error when starting nodemon:
1. **DNS Restrictions**: Your network/DNS provider might be blocking SRV records used by MongoDB Atlas. Change your DNS servers to Google (`8.8.8.8`) or Cloudflare (`1.1.1.1`).
2. **Local Fallback**: If you have MongoDB installed locally, you can change your `.env` connection string to use localhost:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/rl_codexa_assessment
   ```
