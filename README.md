# SYNCUP - Realtime Coaching Feed

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/abhishek-singh-111/syncup-realtime-feed.git
```

---

# Backend Setup

## 2. Navigate to backend

```bash
cd syncup-realtime-feed/backend
```

---

## 3. Install dependencies

```bash
npm install
```

---

# MongoDB Setup

## 4. Create MongoDB Atlas Cluster

Create free cluster from:

https://www.mongodb.com/cloud/atlas

---

## 5. Create Database User

Example:

```txt
Username: syncupuser
Password: syncup123
```

---

## 6. Add Network Access

In MongoDB Atlas:

Network Access → Add IP Address

Add:

```txt
0.0.0.0/0
```
Get the MONGO_URI string

---

## 7. Create .env file

Inside backend folder create:

```bash
.env
```

Add:

```env
PORT=5000

MONGO_URI= YOUR_MONGO_URI_STRING

REDIS_URL=redis://localhost:6379

CLIENT_URL=http://localhost:3000
```

---

# Redis Setup

## 8. Install Docker Desktop

Download:
https://www.docker.com/products/docker-desktop/

Start Docker Desktop.

---

## 9. Run Redis Container

```bash
docker run -d -p 6379:6379 redis
```

Verify Redis is running:

```bash
docker ps
```

---

# Start Backend

## 10. Run backend server

```bash
npm run dev
```

Expected output:

```bash
MongoDB Connected
Redis Connected
Server running on port 5000
```

---

# Frontend Setup

## 11. Open new terminal

Navigate to frontend:

```bash
cd ../frontend
```

---

## 12. Install dependencies

```bash
npm install
```

---

## 13. Start frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Application Pages

## Home Page

```txt
http://localhost:3000
```

Features:
- Displays realtime feeds
- Socket.IO live updates
- Loading states
- Error handling

---

## Admin Page

```txt
http://localhost:3000/admin
```

Features:
- Add new feed
- Form validation
- Success/error messages

---

# API Endpoints

## GET /feed

Fetch all feeds.

```bash
GET http://localhost:5000/feed
```

---

## POST /feed

Create new feed.

```bash
POST http://localhost:5000/feed
```

Example body:

```json
{
  "title": "Important Update",
  "message": "Tomorrow's lecture starts at 5 PM"
}
```

---

# Realtime Architecture

## Flow

1. Frontend requests feeds
2. Backend checks Redis cache
3. If cache miss:
   - Fetch from MongoDB
   - Store in Redis
4. Admin creates new feed
5. Cache invalidated
6. Socket.IO emits realtime event
7. Frontend updates instantly without refresh

---

# Bonus Features Implemented

- Redis TTL caching
- Reconnect handling
- Duplicate socket event prevention
- Loading states
- Error handling
- Responsive UI
- Modern dashboard UI
- Timestamp rendering

---

# Future Improvements

- Authentication
- Pagination
- Docker Compose setup
- Deployment
- Feed categories
- Notifications
- Unit testing

---

# Author

Abhishek Singh