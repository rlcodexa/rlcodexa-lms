# CodeGate LMS — Agent Instructions

## Monorepo Layout

```
backend/         Express + MongoDB (CommonJS, Mongoose)
frontend/        React 19 + Vite 8 (ESM)
```

Each has its own `package.json`. No workspace tooling; run commands from each subdirectory.

## Dev Commands

| Action | Command |
|--------|---------|
| Run backend | `cd backend && npm run dev` (nodemon, hot-reload) |
| Run frontend | `cd frontend && npm run dev` (Vite dev server) |
| Seed DB | `cd backend && npm run seed` (flushes + recreates all data) |
| Lint frontend | `cd frontend && npm run lint` |
| Build frontend | `cd frontend && npm run build` |
| Build + preview | `cd frontend && npm run preview` |

No tests exist in either package. No typechecking (no TypeScript used).

## Architecture — Key Facts

### Backend (`localhost:5000`)
- **Auth**: Plain-text password comparison. No JWT, sessions, or hashing. Role-based (`admin`, `hod`, `trainer`, `student`).
- **Routes**: `/api/auth`, `/api/admin`, `/api/hod`, `/api/trainer`, `/api/student` — each a separate router file under `routes/`.
- **Models**: 22 Mongoose models in `models/`. `User.js` is the auth entity; profiles are separate (`StudentProfile`, `TrainerProfile`, `HodProfile`, `AdminProfile`).
- **DB**: MongoDB via Mongoose. Connection string in `backend/.env`. Hardcoded fallback in `server.js`.
- **Health check**: `GET /api/health`.
- **Startup**: Connects to MongoDB first, then starts listening. Exits on connection failure.

### Frontend (`Vite default port 5173`)
- **No router library**: Page switching is manual via `currentPage` state + `switch` in `App.jsx`. No URL-based routing.
- **State**: `AssessmentContext` (877 lines) is the single source of truth. Handles both online (fetch to backend) and offline (localStorage fallback) modes.
- **Backend detection**: Polls `GET /api/health` every 15s. Sets `isOnline` boolean which switches all data flows.
- **Architecture convention** (see `frontend/Rules.md` — mandatory for codegen):
  - Every component split into 3 files: `ComponentName.jsx` (UI only), `useComponentName.js` (hook), `ComponentNameStyle.js` (JS style objects).
  - Data flow: `JSX → Custom Hook → Service → Axios Instance → Backend`.
  - Service layer (`services/`) must be used; no direct fetch/Axios in JSX.
- **No CSS framework**: All styling is inline JS objects or custom CSS files (e.g. `Aptitude.css`). Uses `lucide-react` for icons.
- **Quiz/Aptitude modules**: The `Aptitude.jsx` refactor (E2E_REFACTOR_PLAN.md) extracted the pattern: `src/data/<module>.js`, `src/hooks/`, `src/components/quiz/`, `src/styles/`.

## Online/Offline Dual Mode

The entire frontend has two code paths for every data operation:
- **Online**: Fetches from Express backend, falls back to offline if backend unreachable.
- **Offline**: Uses localStorage-backed in-memory arrays (50 pre-seeded students in context).

When adding features, both paths must be implemented. The pattern is `if (isOnline) { ... } else { ... }` in every context method.

## Test Credentials (from seed)

| Role | Email | Password |
|------|-------|----------|
| Student | aarav.sharma@codegate.edu | password123 |
| Staff | staff@codegate.edu | staff123 |
| HOD | hod.cse@codegate.edu | hod123 |
| Admin | admin@codegate.edu | admin123 |

Students 2–10 (STU02–STU10) are pre-registered; students 11–50 require registration via whitelist.

## Conventions to Preserve

- **Response format**: All API responses use `{ success: boolean, message?: string, ...data }`.
- **Route style**: Inner `try/catch` with `500` fallback. Route functions are not extracted to controllers.
- **ID format**: Custom string IDs (e.g., `USR100`, `STU01`, `ASM001`) — no ObjectId exposure.
- **File limits** (from Rules.md): JSX ≤200 lines, Hook ≤250 lines, Style ≤200 lines. Split at these thresholds.
- **Imports order** (from Rules.md): React → 3rd party → Hooks → Services → Components → Utils → Styles.
- **Performance**: Use `React.memo` on leaf components, `useCallback` for passed handlers, `useMemo` for derived data, `lazy()` + `Suspense` for page code-splitting.

## What Not to Do

- Do **not** add JWT/auth middleware without explicit request (current auth is plain-text).
- Do **not** convert to TypeScript without asking (zero TS tooling exists).
- Do **not** install a router library (page switching is intentional).
- Do **not** create `.opencode/` config files without user confirmation.
- Do **not** break the offline fallback when modifying online data flows.
