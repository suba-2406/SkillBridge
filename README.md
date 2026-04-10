🚀 SkillBridge AI

Education-to-Industry Bridge System for Skill Alignment & Opportunity Matching

"Status" (https://img.shields.io/badge/status-active-success)
"Tech" (https://img.shields.io/badge/stack-React%20%7C%20Node%20%7C%20Supabase-blue)
"AI" (https://img.shields.io/badge/AI-OpenAI-orange)

---

📌 Problem Statement

There exists a major disconnect between academic learning and industry requirements.

Students often lack clarity on:

- What skills are relevant
- What to learn next
- How to become job-ready

At the same time, companies struggle to identify candidates with the right skill set.

Existing platforms operate in isolation (learning, jobs, networking) and fail to provide a unified solution.

---

🎯 Solution

SkillBridge AI is a unified platform that connects:

Learn → Analyze → Improve → Build → Get Hired → Hire Talent

It bridges the gap between education and industry using AI-driven insights.

---

🚀 Features

Feature| Description
🔍 Skill Gap Analysis| Analyze user skills and detect missing skills
📄 Resume Upload| Extract skills from resume using OpenAI
🧠 AI Project Generator| Generate personalized real-world project ideas
📚 Learning Recommendations| Suggest courses based on missing skills
💼 Job Matching| Match jobs with skill percentage and gaps
📊 Readiness Score| Evaluate how job-ready a student is
🏢 Company Dashboard| Recruiters can explore and filter candidates

---

🏗️ Tech Stack

Frontend

- React.js
- Bootstrap / Tailwind CSS
- React Router
- Chart.js

Backend

- Node.js
- OpenAI API
- Multer + PDF Parser

Database

- Supabase (PostgreSQL)

---

📂 Project Structure

frontend/
  ├── pages/
  │   ├── Overview.jsx
  │   ├── LearningPage.jsx
  │   ├── ProjectsPage.jsx
  │   ├── JobsPage.jsx
  │   └── CompanyDashboard.jsx

backend/
  ├── controllers/
  ├── services/
  ├── routes/

database/
  └── Supabase (PostgreSQL)

README.md

---

⚙️ Installation & Setup

Clone Repository

git clone https://github.com/your-username/skillbridge-ai.git
cd skillbridge-ai

---

Frontend Setup

cd frontend
npm install
npm start

---

Backend Setup

cd backend
npm install
node server.js

---

Environment Variables

Create ".env" file:

OPENAI_API_KEY=your_openai_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

---

How It Works

1. Resume Upload

User uploads resume → OpenAI extracts skills

2. Skill Analysis

System compares skills with job roles → finds gaps

3. Learning Path

Courses are recommended based on missing skills

4. AI Project Generation

Generates real-world projects using OpenAI

5. Job Matching

Matches jobs with skill percentage and highlights gaps

6. Company Dashboard

Recruiters can view students, skills, and readiness score

---

Current Status

Module| Status
Resume Upload| ✅ Working
Skill Extraction| ✅ Working
Learning Page| ✅ Dynamic
Projects Page| ✅ AI Integrated
Jobs Page| ✅ Matching Logic
Company Dashboard| ✅ Functional
Database| ✅ Connected

---

Scalability

- AI-based mentoring
- Interview simulation
- Real-time analytics
- Multi-role support
- Deployment scaling

---

Novelty

- Full ecosystem (not isolated features)
- AI-driven personalization
- Skill-based hiring approach
- Real-time readiness tracking

---

Ethical Use

This system is intended for educational and career development purposes only.
Not for misuse or manipulation of hiring systems.

---


---

Contributing

1. Fork the repository
2. Create a branch
3. Commit changes
4. Submit a Pull Request

---

💡 Final Note

SkillBridge AI demonstrates how AI can transform education into a skill-driven, industry-ready ecosystem.