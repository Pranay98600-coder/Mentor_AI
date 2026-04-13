🚀 MentorAI – AI-Powered Learning Platform

MentorAI is an intelligent learning assistant that helps users generate personalized learning roadmaps, track progress, and learn from curated YouTube resources — all in one place.

Built using a Spring Boot backend + React frontend, MentorAI demonstrates a complete real-world full-stack architecture with secure JWT authentication, AI integration, and modern UI/UX.

---

🌐 Live Demo Access

You can explore the application using demo credentials:

📧 Email: demouser@gmail.com
🔑 Password: 123456

---

🧠 Core Features

🔐 Authentication & Security

- User Registration & Login
- JWT Token-Based Authentication
- Stateless Security Architecture
- Password Encryption using BCrypt
- Role-Based Authorization (USER / ADMIN)
- Protected API Routes & Frontend Navigation

---

🗺️ AI-Powered Learning System

- Personalized Learning Roadmap Generation
- Topic-wise structured learning paths
- Integrated YouTube video recommendations
- Fallback roadmap generation (when AI unavailable)
- Scalable design for Gemini AI integration

---

📊 Progress Tracking System

- Track knowledge before vs after learning
- Topic-wise progress updates
- Persistent progress stored in database
- Designed for future analytics & visualization

---

🧾 User Dashboard (Frontend)

- Modern UI with sidebar navigation
- Dashboard displaying:
  - Learning insights
  - Strong areas
  - Focus areas
- Empty state for new users
- View and manage generated roadmaps
- Fully responsive design

---

🎯 Learning Insights Engine

- Smart feedback based on progress
- Highlights:
  - Strengths (e.g., JavaScript Fundamentals)
  - Weak areas (e.g., CSS Fundamentals)
- Motivational insights (streaks, progress tips)

---

🛠️ Admin Features

- View all users
- Delete users
- Promote USER → ADMIN
- Secure role-based access control

---

🛠️ Tech Stack

💻 Backend

- Java 21
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- Maven

🎨 Frontend

- React.js
- Axios
- CSS (Modular Styling)
- React Router

🗄️ Database

- PostgreSQL (Production - Render)
- MySQL (Local Development)

🤖 AI & External APIs

- Google Gemini API (Integration ready, fallback active)
- YouTube Data API (video recommendations)

---

📂 Project Structure

MentorAI/
│
├── mentorai-backend/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   ├── model/
│   ├── repository/
│   ├── security/
│   ├── service/
│   └── MentoraiBackendApplication.java
│
├── mentorai-frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.jsx

---

🔗 API Endpoints

1️⃣ Register User

POST "/api/auth/register"

{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "1234"
}

---

2️⃣ Login User

POST "/api/auth/login"

{
  "email": "rahul@gmail.com",
  "password": "1234"
}

➡️ Returns JWT Token

---

3️⃣ Generate Roadmap

POST "/api/roadmap/generate"

Header:

Authorization: Bearer TOKEN

{
  "topic": "Spring Boot"
}

---

4️⃣ Get User Roadmaps

GET "/api/roadmap/my-roadmaps"

---

5️⃣ Update Progress

POST "/api/progress/update"

{
  "topic": "Spring Security",
  "knowledgeBefore": 2,
  "knowledgeAfter": 8
}

---

🔐 JWT Authentication Flow

1. User registers → "/api/auth/register"
2. User logs in → "/api/auth/login"
3. Server generates JWT token
4. Token stored in frontend (localStorage)
5. Token sent with every request:

Authorization: Bearer TOKEN

6. JWT filter validates request
7. Access granted to protected APIs

---

🗄️ Database Schema

- users → stores user credentials & roles
- roadmap → stores generated roadmap
- roadmap_topic → individual topics inside roadmap
- topic_progress → user learning progress

---

▶️ How to Run Locally

🔧 Backend

cd mentorai-backend
mvn spring-boot:run

Runs on:

http://localhost:8081

---

🎨 Frontend

cd mentorai-frontend
npm install
npm run dev

Runs on:

http://localhost:5173

---

🚀 Deployment

- Backend: Render
- Frontend: Vercel
- Database: PostgreSQL (Render)

---

🚧 Current Status

✅ Completed

- JWT Authentication System
- Role-Based Authorization
- Roadmap Generation
- Roadmap Persistence (Database)
- YouTube Integration (Fallback Supported)
- Progress Tracking System
- AI-powered dynamic roadmap generation (Gemini)
- Smart prompt-based roadmap customization
- AI Chat Assistant
- Progress analytics dashboard (charts & graphs)
- Full Frontend UI (Auth + Dashboard + Roadmaps)
- Backend ↔ Frontend Integration
- Deployment (Render + Vercel)

---

🚀 Upcoming Features


- Notifications & reminders
- Advanced recommendation engine

---

💡 Key Learnings

- Implemented secure JWT authentication
- Built scalable REST APIs using layered architecture
- Solved circular JSON issues using "@JsonIgnore"
- Handled CORS and frontend-backend integration
- Managed real-world deployment issues (Render cold start, routing)
- Built a complete production-style full-stack application

---

👨‍💻 Author

Pranay Salunkhe
Java Full Stack Developer

---

⭐ Project Vision

To build an intelligent AI-powered learning assistant that helps users master any skill through:

- Structured roadmaps
- Personalized insights
- Real-world resources
- Smart progress tracking

MentorAI aims to become a complete guided learning ecosystem powered by AI.

---