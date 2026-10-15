# Student Expense List System — GET API

A starter backend using Node.js, Express.js, and MongoDB. This version implements read-only GET endpoints.

## Requirements
- Node.js 18+
- MongoDB local instance or MongoDB Atlas connection string

## Setup
1. Open a terminal in this folder.
2. Install packages:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`.
4. Set `MONGODB_URI` in `.env` to your MongoDB connection string.
5. Start the server:
   ```bash
   npm run dev
   ```
   Or use `npm start`.

The server starts at `http://localhost:5000` by default.

## Endpoints
- `GET /` — health check and endpoint list
- `GET /api/students` — all students
- `GET /api/students?search=ana` — search student name or student ID
- `GET /api/students/:id` — one student by MongoDB ObjectId
- `GET /api/contributions` — all contributions, with student information populated
- `GET /api/contributions?search=ana` — search contribution description or student
- `GET /api/expenses` — all expenses
- `GET /api/expenses?search=supplies` — search expense description or category
- `GET /api/transactions` — all contributions and expenses
- `GET /api/transactions?type=expense` — expenses only
- `GET /api/transactions?type=contribution` — contributions only
- `GET /api/dashboard` — student count, contributions, expenses, and remaining balance

## Important
This starter intentionally has GET routes only. Add POST and PUT routes when you are ready to create and edit records. Use sample documents in MongoDB Compass or another trusted setup method to test the GET routes. Do not expose your `.env` file or MongoDB credentials.
