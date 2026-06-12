# SignBridge AI

<p align="center">
  <h3 align="center">Real-Time Sign Language Communication Platform</h3>
  <p align="center">
    Built with React, FastAPI, TensorFlow, MediaPipe, Supabase PostgreSQL and WebSockets
  </p>
</p>

---

## Overview

SignBridge AI is a real-time sign language communication platform designed to bridge the communication gap between sign language users and non-sign language users.

The platform captures live hand gestures through a camera feed, performs hand landmark detection, recognizes sign language gestures using machine learning models, constructs words and sentences, and stores conversations for continuous communication.

---

## Features

### Authentication & Security

- JWT Authentication
- Secure User Registration & Login
- Protected Routes
- Session Management

### Real-Time Sign Recognition

- Live Camera Streaming
- Hand Landmark Detection
- Landmark Extraction
- Sign Classification
- Prediction Stabilization
- Confidence Tracking

### Language Processing

- Word Builder
- Sentence Builder
- Real-Time Recognition Pipeline

### Conversation Management

- Multi-Session Conversations
- Conversation History
- Persistent Message Storage
- Real-Time Chat Interface

### Backend Infrastructure

- REST API Architecture
- WebSocket Communication
- FastAPI Backend
- SQLAlchemy ORM
- Supabase PostgreSQL

---

## System Architecture

![System Architecture](docs/SignBridge_Architecture.png)

---

## Sign Recognition Pipeline

![Sign Recognition Pipeline](docs/SignBridge_Pipeline.png)

---

## Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Zustand
- React Router
- Axios

### Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- WebSockets

### AI & Computer Vision

- TensorFlow
- MediaPipe
- OpenCV
- NumPy

### Database

- Supabase PostgreSQL

---

## Project Structure

```text
SignBridge-AI

├── Backend
│   ├── app
│   │   ├── ai
│   │   ├── api
│   │   ├── core
│   │   ├── models
│   │   ├── schemas
│   │
│   │
│   └── main.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── store
│   │
│   └── public
│
├── docs
│   ├── SignBridge_System_Architecture.png
│   └── SignBridge_Sign_Pipeline.png
│
├── README.md
└── .gitignore
```

---

## Recognition Workflow

```text
Camera Feed
      ↓
Hand Detection
      ↓
Landmark Extraction
      ↓
Gesture Prediction
      ↓
Prediction Stabilization
      ↓
Word Builder
      ↓
Sentence Builder
      ↓
Message Service
      ↓
Conversation Interface
```

---

## Environment Variables

### Backend

Create:

```text
Backend/.env
```

Add:

```env
DATABASE_URL=postgresql://postgres.xxxxxxxxx:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## Local Development

### Backend

```bash
cd Backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Current MVP Status

### Completed

- JWT Authentication
- User Registration & Login
- Protected Routes
- Conversation Management
- Message Persistence
- Supabase PostgreSQL Integration
- WebSocket Streaming
- Live Camera Feed
- Hand Detection
- Landmark Extraction
- Sign Classification
- Prediction Stabilization
- Word Builder
- Sentence Builder
- Real-Time Recognition Dashboard

### Planned Roadmap

- Multi-Language Translation
- Speech Synthesis
- Voice-to-Sign Communication
- Analytics Dashboard
- Cloud Deployment
- Mobile Companion Application

---

## License

MIT License
