# MentorAI Backend (Spring Boot + JWT)

MentorAI Backend is a Spring Boot REST API that provides authentication and user management using JWT (JSON Web Token) and Spring Security.

---

## Tech Stack

- Java 21
- Spring Boot 4
- Spring Security
- Spring Data JPA
- MySQL
- JWT Authentication
- Maven

---

## Features Implemented

- User Registration
- User Login
- Password Encryption using BCrypt
- JWT Token Generation
- JWT Authentication Filter
- Stateless Authentication
- Secure API Endpoints
- MySQL Database Integration

---

## Project Structure
com.mentorai
│
├── config
│ └── SecurityConfig.java
│
├── controller
│ └── AuthController.java
│
├── model
│ ├── User.java
│ └── Role.java
│
├── repository
│ └── UserRepository.java
│
├── security
│ ├── JwtAuthenticationFilter.java
│ └── JwtUtil.java
│
├── service
│ └── AuthService.java
│
└── MentoraiBackendApplication.java


---

## API Endpoints

### 1. Register User

**POST**
http://localhost:8081/api/auth/register

** Request Body **
{
"name": "Rahul",
"email": "rahul@gmail.com",
"password": "1234"
}

**Response**
User Register Successfully


---

### 2. Login User

**POST**
http://localhost:8081/api/auth/login


**Request Body**
{
"email": "rahul@gmail.com",
"password": "1234"
}

**Response**
JWT Token


---

## JWT Authentication Flow

1. User registers using /api/auth/register
2. User logs in using /api/auth/login
3. Server verifies credentials
4. Server generates JWT token
5. Client stores token
6. Client sends token in Authorization header

7. Spring Security validates token
8. User gets access to secured endpoints

---

## How to Run Project

Step 1 — Open terminal in project folder

Step 2 — Run:

Step 3 — Server will start at:


---

## Current Status

Completed:

- Registration
- Login
- JWT generation
- JWT validation
- Spring Security integration

In Progress:

- Get current user endpoint
- Role based authorization
- Roadmap feature APIs

---

## Author

Pranay Salunkhe  
Java Full Stack Developer  
