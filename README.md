# PRISM EDU — Student Dropout Prediction & Intervention Platform

PRISM EDU is an institutional, production-quality **Student Dropout Prediction & Intervention Platform** built for higher educational institutions. It identifies students who may require targeted support and reduces student dropout rates through predictive analytics, longitudinal trend monitoring, and faculty-led interventions.

---

## 🏛️ Platform Roles & Credentials

The platform enforces strict Role-Based Access Control (RBAC) across three primary user roles:

| Role | Demo Email | Demo Password | Purpose & Permissions |
|---|---|---|---|
| **Admin** | `admin@prismedu.com` | `password123` | Institutional management: faculty management, student directory, catalog resource management, institutional KPI analytics. |
| **Faculty** | `faculty1@prismedu.com` | `password123` | Operational system user: cohort monitoring, manual/Excel student registration, multidimensional trend analysis, targeted interventions. |
| **Student** | `student2@prismedu.com` (Priya Patel) | `password123` | Learning environment, RAG AI Learning Agent, academic progress, attendance tracking, scholarships, wellness counsellors, career skills. |

---

## 🔄 Core Feedback Loop

```
Admission Data (Academic, Financial, Family)
      ↓
Initial Background Predictive Assessment
      ↓
Student Uses Platform (Notes, Quizzes, AI Doubts, Portal Sessions)
      ↓
Centralized Activity Telemetry System
      ↓
Analytics Engine (Feature Re-Aggregation)
      ↓
Faculty Actionable Insights & Contributing Factors
      ↓
Targeted Faculty Intervention (Academic, Attendance, Financial, Support, Career)
      ↓
Student Receives Support & Outcome Recorded
      ↓
Stored Historical Dataset Improves Future Predictive Models
```

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend API:** Next.js Server Endpoints (REST-style), JOSE (JWT sessions), BcryptJS.
- **Machine Learning & AI Service:** Python FastAPI, scikit-learn, pandas, numpy, OpenAI GPT-4o-mini (with built-in offline curriculum fallbacks).
- **Database & Storage:** PostgreSQL / Supabase, pgvector extension for semantic document embeddings.
- **Data Ingestion & Import:** XLSX / CSV parser with automated column and row validation.

---

## 📁 Project Architecture

```
PRISM-EDU/
├── src/
│   ├── app/
│   │   ├── (auth)/login/             # Institutional login with demo role switcher
│   │   ├── (admin)/admin/            # Admin Module
│   │   │   ├── dashboard/            # Institutional KPI charts & intervention breakdown
│   │   │   ├── students/             # Student management, search, filters & status toggles
│   │   │   ├── faculty/              # Faculty account provisioning & status
│   │   │   └── resources/            # Learning, Financial, Support & Career catalogs
│   │   ├── (faculty)/faculty/        # Faculty Module
│   │   │   ├── dashboard/            # Assigned students, attention indicators, recent changes
│   │   │   ├── students/             # Cohort list & search
│   │   │   │   ├── [id]/             # Actionable insights, 5 longitudinal trends & interventions
│   │   │   │   ├── add/              # Method 1: Manual admission entry & predictive trigger
│   │   │   │   └── import/           # Method 2: Multi-step Excel/CSV import wizard
│   │   │   └── interventions/        # Intervention lifecycle management & outcome logging
│   │   ├── (student)/student/        # Student Module (Section 15 layout)
│   │   │   ├── dashboard/            # Personalized home (no dropout probability displayed)
│   │   │   ├── learning/             # Notes, PDFs, video lectures, assignments & quizzes
│   │   │   ├── ai-learning/          # RAG Academic Doubt-Solving Agent
│   │   │   ├── progress/             # Cumulative GPA, degree credits & semester transcripts
│   │   │   ├── attendance/           # 4-week trajectory, subject breakdown & exam warnings
│   │   │   ├── financial/            # Scholarships & educational loans with eligibility tags
│   │   │   ├── support/              # Approved counsellor directory & AI wellness companion
│   │   │   ├── career/               # Jobs, internships, certifications & skill pathways
│   │   │   └── notifications/        # In-app academic, deadline & mentorship notifications
│   │   └── api/                      # Protected REST APIs for all operations
│   ├── components/
│   │   ├── ui/                       # Base components (Button, Input, Card, Table, Dialog, etc.)
│   │   ├── layout/                   # Sidebar, Navbar, DashboardLayout
│   │   ├── charts/                   # Recharts trend line visualizations
│   │   ├── learning/                 # Interactive QuizRunner with automated scoring
│   │   ├── ai/                       # Responsive ChatWindow with suggested prompts
│   │   ├── student/                  # StudentCard with semantic status badges
│   │   └── interventions/            # InterventionCard & InterventionForm modal
│   ├── lib/
│   │   ├── auth/                     # Password hashing, JWT sessions, RBAC guards
│   │   ├── services/                 # ImportService, StudentService, ActivityService, AnalyticsService
│   │   └── supabase/                 # Server and browser Supabase clients
│   └── types/                        # Strongly-typed TypeScript interfaces matching DB schema
├── ml-service/                       # Python FastAPI Machine Learning Microservice
│   ├── analytics/engine.py           # Feature aggregation & insight level computation
│   ├── prediction/                   # Model trainer, feature encoder & risk predictor
│   ├── ai/                           # RAG learning agent & supportive companion
│   ├── routers/                      # /predict and /ai endpoints
│   ├── tests/                        # Python test suite
│   └── main.py                       # FastAPI application entrypoint
├── supabase/
│   ├── migrations/001_initial_schema.sql  # 24 core tables, enums, indexes, triggers
│   ├── migrations/002_row_level_security.sql # Row-Level Security policies
│   └── seed.sql                      # Complete seed dataset for demo scenarios
├── __tests__/                        # Automated TypeScript test suite (20 tests passing)
│   ├── auth/login.test.ts
│   ├── import/validation.test.ts
│   ├── analytics/features.test.ts
│   └── interventions/intervention.test.ts
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Run the Web Application

The platform is installed and ready to run using **Bun**:

```bash
# Run automated test suite
bun test

# Start the Next.js development server
bun run dev
```

The application will be accessible at: `http://localhost:3000`

### 2. Run the ML Service (Optional)

```bash
cd ml-service
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

*Note: The platform features graceful built-in fallbacks for predictions, analytics, and curriculum doubt-solving so the entire demo flow works seamlessly out-of-the-box even before starting the Python service.*

---

## 🎬 Expected End-to-End Demo Flow

You can execute the complete end-to-end demonstration flow specified in Section 35:

1. **ADMIN LOGIN:**
   - Log in at `/login` with `admin@prismedu.com` / `password123`.
   - Review institutional metrics: Total Students, Faculty, Attention Indicators, and Intervention Summary.
   - Navigate to **Faculty Management** (`/admin/faculty`) and create a new faculty mentor.
   - Navigate to **Resource Catalog** (`/admin/resources`) and inspect learning, financial, counsellor, and career items.

2. **FACULTY LOGIN:**
   - Sign in as `faculty1@prismedu.com` / `password123`.
   - Review the **Faculty Dashboard**: see assigned students, students requiring attention, recent telemetry changes, and pending interventions.
   - Click **Import Excel** (`/faculty/students/import`), download the sample template, upload an Excel file, review column/row validation and duplicate detection, then confirm the batch import.
   - Click **Register Student** (`/faculty/students/add`) to manually add a student and trigger the initial predictive assessment.

3. **STUDENT LOGIN:**
   - Sign in as `student2@prismedu.com` (Priya Patel) / `password123`.
   - Observe the **Personalized Home**: course progress, attendance rate, recommended learning, scholarships, and opportunities (with **no dropout probability** displayed).
   - Open **Learning Environment** (`/student/learning`): open notes, mark completed, submit assignment text, and take the interactive assessment quiz.
   - Open **AI Learning Agent** (`/student/ai-learning`): ask academic questions (e.g. *"Explain 3NF vs BCNF"* or *"What is Dijkstra's algorithm?"*).
   - Visit **Financial Support** (`/student/financial`) to see matching scholarships tagged with *Potentially Eligible*.
   - Visit **Personal Support** (`/student/support`) to review campus counsellors and chat with the AI support companion.
   - Visit **Career Opportunities** (`/student/career`) to explore full-time jobs, internships, and certifications.

4. **FACULTY REVIEW & INTERVENTION:**
   - Log back in as `faculty1@prismedu.com`.
   - Open **Priya Patel** (`/faculty/students/s2222222-2222-2222-2222-222222222222`).
   - View updated actionable status indicators:
     ```
     Academic:        Attention Required
     Attendance:      Declining
     Financial:       Support Available
     Career:          Active
     ```
   - Inspect the contributing factors: *Attendance decreased from 82% to 69%*, *Quiz performance decreased*, *Learning portal activity reduced*.
   - Click **Create Targeted Intervention**, assign an Academic tutoring session, and submit.
   - Log into student portal: observe the new in-app notification for the scheduled intervention.
   - Log back into faculty portal: record the intervention outcome and mark as completed.

---

## 🔒 Security & Privacy Guarantees

- **Student Privacy:** Students are never shown distressing raw predictions (e.g. *"You have an 80% chance of dropping out"*). They only see constructive learning goals, attendance rates, and support opportunities.
- **Counselling Confidentiality:** AI support companion interactions and private counselling sessions are never exposed to faculty dashboards.
- **RBAC Enforcement:** Next.js middleware and server-side route guards strictly isolate Admin, Faculty, and Student workspaces. Students can only ever access their own data.
