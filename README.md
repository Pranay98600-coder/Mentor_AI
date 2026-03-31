🚀 MentorAI – Full Stack AI Learning Platform

MentorAI is an AI-powered learning assistant that helps users generate personalized learning roadmaps, track progress, and access curated YouTube resources — all in one platform.

It combines Spring Boot backend + React frontend with JWT-based authentication to deliver a complete full-stack learning system.

---

🧠 Key Features

🔐 Authentication & Security

- User Registration & Login
- JWT Token-Based Authentication
- Stateless Security Architecture
- Password Encryption using BCrypt
- Role-Based Authorization (USER / ADMIN)

---

🗺️ AI-Powered Learning System

- Personalized Roadmap Generation
- Topic-wise Learning Structure
- YouTube Video Recommendations per topic
- Fallback roadmap logic (for development phase)

---

📊 Progress Tracking

- Track knowledge before and after learning
- Topic-wise progress updates
- Persistent progress storage in database

---

🧾 User Dashboard (Frontend)

- Clean UI with Dashboard & Sidebar
- Empty state for new users (Generate Roadmap)
- Display saved roadmaps for existing users
- Protected routes using JWT

---

🛠️ Admin Features

- View all users
- Delete users
- Promote USER → ADMIN

---

🛠️ Tech Stack

💻 Backend

- Java 21
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- Maven

🎨 Frontend

- React.js
- Axios
- CSS (Modular styling)

🗄️ Database

- MySQL

🤖 AI & External APIs

- Google Gemini API (setup done, fallback used)
- YouTube Data API (for video recommendations)

---

📂 Project Structure

MentorAI/
├── mentorai-backend/
│   ├── config/
│   ├── controller/
│   ├── dto/
│   ├── model/
│   ├── repository/
│   ├── security/
│   ├── service/
│   └── main application
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
5. Token sent in every request:

Authorization: Bearer TOKEN

6. JWT filter validates token
7. User accesses protected APIs

---

🗄️ Database Tables

- users
- roadmap
- roadmap_topic
- topic_progress

---

▶️ How to Run

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

🚧 Current Status

✅ Completed

- Authentication (JWT)
- Role-Based Authorization
- Roadmap Generation
- Roadmap Storage (DB)
- YouTube Video Integration (with fallback)
- Progress Tracking System
- Full Frontend UI (Dashboard + Auth + Generate Roadmap)
- Backend ↔ Frontend Integration

---

🚀 Upcoming Features

- AI-based dynamic roadmap generation (Gemini integration)
- Smart prompt-based roadmap creation
- AI Chat Assistant
- Progress analytics dashboard (charts)
- Deployment (AWS / Render / Vercel)

---

💡 Key Learnings

- Implemented JWT-based secure authentication
- Designed REST APIs with layered architecture (Controller → Service → Repository)
- Solved circular JSON issues using "@JsonIgnore"
- Handled CORS & frontend-backend integration
- Built full-stack application with real-world structure

---

👨‍💻 Author

Pranay Salunkhe
Java Full Stack Developer

---

⭐ Project Vision

To build an intelligent learning assistant that guides users step-by-step in mastering any skill using AI, structured roadmaps, and real-world resources.
