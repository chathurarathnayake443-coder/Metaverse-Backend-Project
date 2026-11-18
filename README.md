MetaVerse Backend

REST API for MetaVerse, a tech hiring platform where companies post task-based vacancies, manage officers, and receive candidate submissions.

Live API: https://metaverse-backend-project.vercel.app
Frontend repo:https://github.com/chathurarathnayake443-coder/Metaverse-Frontend-Project.git

Features
User registration and login with JWT access and refresh tokens
Protected routes with auth middleware
Company profiles (details, description, profile image)
Vacancy management with submission counts and deadlines
Company officers
Deployed as a serverless function on Vercel
Tech Stack
Runtime: Node.js
Framework: Express
Language: TypeScript
Database: MongoDB with Mongoose
Auth: JSON Web Tokens (access and refresh)
Storage: Supabase
Hosting: Vercel
Getting Started
Prerequisites
Node.js 18 or newer
A MongoDB database (local or MongoDB Atlas)
Installation
bash
git clone https://github.com/chathurarathnayake443-coder/Metaverse-Backend-Project.git
cd MetaVerse-backend
npm install
Environment Variables

Create a .env file in the project root:

env
PORT=3000
MONGO_URL=<your MongoDB connection string>
JWT_SECRET=<a long random string>
JWT_REFRESH_SECRET=<another long random string>
SUPABASE_SECRET=<your Supabase key>

Add any other variables your project reads. Never commit .env.

Run Locally
bash
npm run dev

The API runs at http://localhost:3000/api/v1.

Build
bash
npm run build
API Overview

Base path: /api/v1

Method	Endpoint	Description	Auth
POST	/auth/register	Create an account	No
POST	/auth/login	Log in and receive tokens	No
POST	/auth/refresh	Get a new access token	No
GET	/auth/me	Get the logged-in user's details	Yes

Protected routes expect this header:

Authorization: Bearer <access_token>

Add your company, vacancy, and officer endpoints to this table.

Project Structure
MetaVerse-backend/
├── api/
│   └── index.ts        # Vercel serverless entry point
├── src/
│   ├── app.ts          # Express app
│   ├── server.ts       # Local server (app.listen)
│   ├── config/         # Database connection
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── vercel.json
├── tsconfig.json
└── package.json

Adjust folder names to match your project.

Deployment (Vercel)
Push the repository to GitHub.
Import it in Vercel with the Other framework preset.
Add the environment variables under Project Settings, Environment Variables.
Allow Vercel in MongoDB Atlas under Network Access (0.0.0.0/0).
Deploy. Every push to main redeploys automatically.

api/index.ts connects to MongoDB and passes requests to the Express app, and vercel.json rewrites all routes to it:

json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
Author

Chathura GitHub: https://github.com/chathurarathnayake443-coder