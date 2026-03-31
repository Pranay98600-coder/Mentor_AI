MentorAI Backend (Spring Boot + JWT + AI Learning Platform)
MentorAI Backend is a Spring Boot REST API that provides authentication, roadmap generation, and learning progress tracking for an AI-powered learning assistant platform.

The system allows users to register, log in securely using JWT authentication, generate learning roadmaps, and track their learning progress over time.

Tech Stack
Backend

Java 21
Spring Boot 4
Spring Security
Spring Data JPA
Maven
Database

MySQL
Security

JWT Authentication
BCrypt Password Encryption
AI Integration

Google Gemini API (setup completed)
Fallback roadmap generator used during development
Features Implemented
Authentication & Security

User Registration
User Login
Password Encryption using BCrypt
JWT Token Generation
JWT Authentication Filter
Stateless Authentication
Role Based Authorization (USER / ADMIN)
Learning System

Roadmap Generation API
Roadmap Storage in Database
Learning Progress Tracking
Admin APIs

View users
Delete users
Promote USER → ADMIN
Database

MySQL Integration using Spring Data JPA
Project Structure
com.mentorai │ ├── config │ └── SecurityConfig.java │ ├── controller │ ├── AuthController.java │ ├── RoadmapController.java │ └── ProgressController.java │ ├── dto │ └── ProgressRequest.java │ ├── model │ ├── User.java │ ├── Role.java │ ├── Roadmap.java │ └── TopicProgress.java │ ├── repository │ ├── UserRepository.java │ ├── RoadmapRepository.java │ └── TopicProgressRepository.java │ ├── security │ ├── JwtAuthenticationFilter.java │ └── JwtUtil.java │ ├── service │ ├── AuthService.java │ ├── RoadmapService.java │ └── ProgressService.java │ └── MentoraiBackendApplication.java

API Endpoints
1️⃣ Register User
POST

http://localhost:8081/api/auth/register

Request Body

{ "name": "Rahul", "email": "rahul@gmail.com ", "password": "1234" }

Response

User registered successfully

2️⃣ Login User
POST

http://localhost:8081/api/auth/login

Request Body

{ "email": "rahul@gmail.com ", "password": "1234" }

Response

JWT Token

3️⃣ Generate Learning Roadmap
POST

http://localhost:8081/api/roadmap/generate

Header

Authorization: Bearer YOUR_TOKEN

Request Body

{ "topic": "Spring Boot" }

Response

Generated roadmap saved in database

4️⃣ Update Learning Progress
POST

http://localhost:8081/api/progress/update

Header

Authorization: Bearer YOUR_TOKEN

Request Body

{ "topic": "Spring Security", "knowledgeBefore": 2, "knowledgeAfter": 8 }

Response

Progress saved successfully

JWT Authentication Flow
User registers using /api/auth/register
User logs in using /api/auth/login
Server verifies credentials
Server generates JWT token
Client stores token
Client sends token in Authorization header
Authorization: Bearer TOKEN

JWT filter validates token
User gets access to secured endpoints
Database Tables
The system currently uses the following tables:

users roadmap topic_progress

How to Run Project
Step 1 — Open terminal in project folder

Step 2 — Run

mvn spring-boot:run

Step 3 — Server starts at

http://localhost:8081

Current Project Status
Completed

User Registration
User Login
JWT Authentication
Role Based Authorization
Roadmap Generation
Roadmap Storage
Learning Progress Tracking
Admin APIs
MySQL Database Integration
Upcoming Features

AI Chat Assistant
React Frontend
Roadmap Visualization UI
Progress Analytics Dashboard
Deployment
Author
Pranay Salunkhe
Java Full Stack Developer
