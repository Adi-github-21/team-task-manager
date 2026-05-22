# Team Task Manager (SaaS)

A production-grade, full-stack Role-Based Team Task Management application built to mirror real-world SaaS products. Features secure JWT authentication, responsive Tailwind UI, and relational database management via PostgreSQL.

## Features

- **Secure Authentication:** JWT-based login/signup with securely hashed passwords using bcrypt.
- **Role-Based Access Control (RBAC):** Distinct `ADMIN` and `MEMBER` roles. Admins manage projects and teams; Members manage assigned tasks.
- **Project Management:** Full CRUD capabilities for team projects.
- **Task Kanban/List:** Create tasks, assign priorities (Low/Medium/High), and track status (Todo/In Progress/Done).
- **Dashboard Analytics:** Live calculation of total, pending, and completed tasks.
- **Modern UI/UX:** Built with Tailwind CSS v4, Lucide icons, and fluid modal transitions.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4, React Router DOM, Axios, Lucide-React.
- **Backend:** Node.js, Express.js, JWT, Zod (Validation), bcrypt.
- **Database:** PostgreSQL managed via Prisma ORM v5.

## Folder Structure

```text
team-task-manager/
├── backend/
│   ├── prisma/             # Schema & Migrations
│   ├── src/
│   │   ├── controllers/    # API Logic
│   │   ├── middlewares/    # Auth & RBAC
│   │   ├── routes/         # Express endpoints
│   │   ├── utils/          # Error handlers
│   │   └── server.js       # Express entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/            # Axios interceptors
    │   ├── components/     # UI, Sidebar, Topbar, Layout
    │   ├── context/        # React Auth Context
    │   ├── pages/          # Dashboard, Login, Tasks, Projects
    │   └── App.jsx         # Routing configuration
    └── package.json



Setup Instructions---

Prerequisites
Node.js installed
A running PostgreSQL database (Local or Cloud/Railway)



Backend Setup
cd backend
Run npm install
Configure the .env file:
   PORT=5000
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_secret_key"
   CLIENT_URL="http://localhost:5173"

Sync the database: npx prisma db push
Create the initial Admin user: node seed.js
Start the server: npm run dev




Frontend Setup
cd frontend
Run npm install
Configure the .env file:
  VITE_API_URL="http://localhost:5000/api"

Start the Vite server: npm run dev


Deployment Guide (Railway)
Database: Create a PostgreSQL database instance on Railway.
Backend: Connect your GitHub repo. Set Root Directory to /backend. Add DATABASE_URL and JWT_SECRET variables. Set start command to npx prisma generate && npx prisma db push && node src/server.js.
Frontend: Connect the repo again. Set Root Directory to /frontend. Add VITE_API_URL pointing to your deployed backend URL. Generate a public domain in Railway settings.




Demo Credentials
To test the application locally or in production, use the seeded admin account:
Email: admin@test.com
Password: password123



Future Improvements
Add drag-and-drop Kanban boards using dnd-kit.
Implement WebSockets for real-time task updates between team members.
Add user profile image uploads via AWS S3 or Cloudinary.


