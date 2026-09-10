# Colab

> A real-time collaborative document editor with role-based access control, rich text editing, and version history.
>

Full-stack real-time collaborative editor built with **Next.js**, **Express**, **Prisma**, and **Redis**, enabling seamless document editing, team collaboration, and scalable productivity workflows.

Colab

Next.js

TypeScript

Prisma

PostgreSQL

---

## Table of Contents

- Description
- Features
- Tech Stack
- Project Structure
- Getting Started
- Environment Variables
- Supabase Database Setup
- Local Development
- Production Deployment
    - Deploy Backend to Render
    - Deploy Frontend to Vercel
    - Configure Production Environment Variables
    - Configure OAuth
    - Configure CORS
    - Configure Nodemailer
    - Verify Deployment
- API Routes
- Contributing

---

## Description

Colab is a full-stack collaborative document editing platform built for teams. It supports real-time multi-user editing powered by **Yjs** and **WebSockets**, rich text formatting via **Tiptap**, and a complete document management system with role-based permissions.

Users can sign in via Google, GitHub, or email OTP, create and manage documents, invite collaborators, and see live cursor presence of other users in real time.

The application is deployed using **Vercel for the frontend** and **Render for the backend**, with **Supabase PostgreSQL** providing the production database and **Nodemailer** handling email delivery.

---

## Features

- **Authentication** — Google OAuth, GitHub OAuth, and passwordless Email OTP login
- **Rich Text Editor** — Powered by Tiptap with support for headings, bold, italic, lists, colors, and more
- **Real-time Collaboration** — Live co-editing with Yjs + WebSocket, with per-user cursor presence and labels
- **Collaborator Management** — Invite users by email, assign EDITOR or VIEWER roles, remove collaborators
- **Role-Based Access Control** — OWNER, EDITOR, and VIEWER roles with instant permission propagation via Yjs awareness
- **Document Versioning** — Binary Yjs state stored per save in `DocumentVersion`, with automatic cleanup keeping the latest 20 versions
- **Auto-save** — Content is debounced and saved automatically as you type
- **Dark / Light Mode** — Full theme support with CSS variables
- **Dashboard** — Separate views for owned and shared documents with inline scrollable lists
- **Profile Management** — Update name, upload profile photo, delete account
- **Email Notifications** — Invitation and OTP emails sent using Nodemailer
- **Scheduled Cleanup** — Cron job runs every 12 hours to prune old document versions

---

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| Next.js 15 (App Router) | React framework with SSR and routing |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Tiptap | Rich text editor |
| Yjs | CRDT-based real-time collaboration |
| y-websocket | WebSocket provider for Yjs |
| NextAuth.js | Authentication (OAuth + Credentials) |
| Axios | HTTP client |
| Lucide React | Icon library |
| Vercel | Frontend deployment |

### Backend

| Technology | Purpose |
| --- | --- |
| Express.js | REST API server |
| TypeScript | Type safety |
| Prisma | ORM for database access |
| PostgreSQL (Supabase) | Production relational database |
| Redis | OTP storage and session caching |
| y-websocket | WebSocket server for Yjs collaboration |
| node-cron | Scheduled jobs |
| Nodemailer | Email delivery |
| Winston | Logging |
| JSON Web Tokens | API authentication |
| Render | Backend deployment |

---

## Project Structure

```
colab/
├── frontend/                          # Next.js frontend application
│   ├── .next/                       # Next.js build output and cached files
│   ├── app/                         # App Router pages, layouts, and route segments
│   ├── components/                  # Reusable React UI components
│   ├── config/                      # Client-side configuration files
│   ├── context/                     # React context providers
│   ├── public/                      # Static assets
│   ├── types/                       # Shared TypeScript types/interfaces
│   ├── utils/                       # Helper utilities
│   ├── .env.local                   # Local development environment variables
│   ├── .gitignore                   # Files ignored by Git
│   ├── next.config.ts               # Next.js configuration
│   ├── package.json                 # Frontend dependencies and scripts
│   └── tsconfig.json                # TypeScript configuration
│
├── backend/                          # Express backend application
│   ├── config/                      # Backend configuration
│   ├── controllers/                 # Request handlers
│   ├── middleware/                  # Authentication and validation middleware
│   ├── prisma/                      # Prisma schema and database configuration
│   ├── repositories/                # Data access layer
│   ├── routes/                      # API route definitions
│   ├── services/                    # Business logic
│   ├── utils/                       # Backend utilities
│   ├── worker/                      # Background workers
│   ├── .env                         # Backend environment variables
│   ├── index.ts                     # Express server entry point
│   ├── prisma.config.ts             # Prisma configuration
│   ├── package.json                 # Backend dependencies and scripts
│   └── tsconfig.json                # TypeScript configuration
│
└── README.md                        # Project documentation
```

---

# Getting Started

## Prerequisites

Make sure the following are installed or available:

- Node.js >= 18
- npm
- A Supabase project
- A Redis instance (for eg. Upstash)
- Google and/or GitHub OAuth application credentials
- An email account for Nodemailer SMTP

---

## 1. Clone the repository

```bash
git clone https://github.com/sankalpj47/colab.git
cd colab
```

---

## 2. Install dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

# Environment Variables

Colab uses separate environment variables for the frontend and backend.

## Backend — `backend/.env`

```
DATABASE_URL=your-supabase-connection-pooling-url
DIRECT_URL=your-supabase-direct-connection-url

REDIS_URL=redis://localhost:6379

ALLOWED_ORIGINS=http://localhost:3000

JWT_SECRET=your-secret-key

PORT=8000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000

SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

> Optional (have safe defaults if omitted): `SMTP_HOST` defaults to `smtp.gmail.com`, and `JWT_EXPIRY_TIME` defaults to `7d`. Only set these if you need a non-default value.

### Production Backend

For the Render deployment, use:

```
DATABASE_URL=your-supabase-pooling-url
DIRECT_URL=your-supabase-direct-url

REDIS_URL=your-redis-url

ALLOWED_ORIGINS=https://your-colab-frontend.vercel.app

JWT_SECRET=your-production-jwt-secret

PORT=10000
NODE_ENV=production

FRONTEND_URL=https://your-colab-frontend.vercel.app

SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

> **Important:** Do not commit `.env` or any secret credentials to GitHub.
>

---

## Frontend — `frontend/.env.local`

### Local development

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

NEXT_PUBLIC_BASE_BACKEND_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Production — Vercel

```
NEXTAUTH_URL=https://your-colab-frontend.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret

NEXT_PUBLIC_BASE_BACKEND_URL=https://your-colab-backend.onrender.com/api/v1
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-colab-backend.onrender.com

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

> Use `wss://` instead of `ws://` for the production WebSocket connection because the frontend is served over HTTPS.
>

---

# Supabase Database Setup

Colab uses **Supabase PostgreSQL** as its production database.

## 1. Create a Supabase project

Create a new project in Supabase and wait for the database to finish provisioning.

## 2. Get the database connection strings

From your Supabase project:

1. Open your project.
2. Go to **Connect**.
3. Select **ORMs / Prisma** or PostgreSQL connection details.
4. Copy the required connection strings.
5. Add them to `backend/.env`.

You will typically need:

```
DATABASE_URL=your-pooled-connection-string
DIRECT_URL=your-direct-connection-string
```

`DATABASE_URL` is used for normal application database queries, while `DIRECT_URL` is used by Prisma for database migrations.

## 3. Run Prisma migrations

From the `backend` directory:

```bash
npx prisma generate
npx prisma migrate dev
```

For production:

```bash
npx prisma migrate deploy
npx prisma generate
```

---

# Local Development

## 1. Start Redis

If Redis is installed locally:

```bash
redis-server
```

Alternatively, use a hosted Redis provider and put its connection string in:

```
REDIS_URL=your-redis-url
```

---

## 2. Start the backend

From `/backend`:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:8000
```

---

## 3. Start the frontend

From `/frontend`:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:3000
```

---

# Production Deployment

Colab uses the following production architecture:

```
                    ┌─────────────────────┐
                    │       Users         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Vercel        │
                    │  Next.js Frontend   │
                    └──────────┬──────────┘
                               │
                    HTTPS / WebSocket
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Render        │
                    │  Express Backend    │
                    │   + WebSocket       │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └─────────────┐
              ▼                                  ▼
     ┌─────────────────┐                 ┌─────────────────┐
     │    Supabase     │                 │      Redis      │
     │   PostgreSQL    │                 │ OTP / Caching   │
     └─────────────────┘                 └─────────────────┘

                    ┌─────────────────┐
                    │    Nodemailer   │
                    │   SMTP / Email  │
                    └─────────────────┘
```

---

## 1. Deploy Backend to Render

Create a new **Web Service** on Render and connect your GitHub repository.

### Root directory

If your repository contains both frontend and backend:

```
backend
```

Set the backend directory as the Render **Root Directory**.

### Build command

Use:

```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

### Start command

Use the start command defined in your backend `package.json`, for example:

```bash
npm start
```

or:

```bash
node dist/index.js
```

depending on the project's build configuration.

### Add environment variables

In Render → **Environment**, add:

```
DATABASE_URL=your-supabase-pooling-url
DIRECT_URL=your-supabase-direct-url

REDIS_URL=your-redis-url

ALLOWED_ORIGINS=https://your-colab-frontend.vercel.app

JWT_SECRET=your-production-jwt-secret

NODE_ENV=production
PORT=10000

FRONTEND_URL=https://your-colab-frontend.vercel.app

SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

> `ALLOWED_ORIGINS` is required for the frontend to be able to call the API at all — without it, every request from your Vercel frontend is blocked by CORS. If you also test against the deployed backend from `localhost`, list both origins comma-separated: `https://your-colab-frontend.vercel.app,http://localhost:3000`.

After deployment, Render will provide a backend URL similar to:

```
https://your-colab-backend.onrender.com
```

---

## 2. Deploy Frontend to Vercel

Go to Vercel and import the GitHub repository.

If the frontend is inside the `frontend` directory, set:

```
Root Directory: frontend
```

Vercel will automatically detect the Next.js application.

### Build command

Usually:

```bash
npm run build
```

### Output

Next.js will automatically configure the build output.

---

## 3. Configure Production Environment Variables

In Vercel:

**Project → Settings → Environment Variables**

Add:

```
NEXTAUTH_URL=https://your-colab-frontend.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret

NEXT_PUBLIC_BASE_BACKEND_URL=https://your-colab-backend.onrender.com/api/v1
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-colab-backend.onrender.com

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Redeploy the frontend after adding or changing environment variables.

---

## 4. Configure OAuth

If Google or GitHub authentication is enabled, update the OAuth callback URLs to use the deployed Vercel domain.

For example:

```
https://your-colab-frontend.vercel.app/...
```

Make sure the callback URLs configured with Google and GitHub match the routes used by your NextAuth configuration.

Also make sure the production domain is added to any allowed origins or redirect URL configuration.

---

## 5. Configure CORS

The backend must allow requests from the deployed Vercel frontend. CORS is controlled by **`ALLOWED_ORIGINS`** — not `FRONTEND_URL`. The two variables have separate jobs and are easy to mix up:

- **`ALLOWED_ORIGINS`** — a comma-separated whitelist read directly by the `cors()` middleware in `index.ts`. Every origin that will call the API (your deployed frontend, plus `localhost` if you test locally against the deployed backend) must be listed here exactly, including the protocol, with no trailing slash.
- **`FRONTEND_URL`** — used elsewhere in the backend (e.g. building links inside invitation and OTP emails, and OAuth redirects). Setting this alone does **not** affect CORS.

Set on Render:

```
ALLOWED_ORIGINS=https://your-colab-frontend.vercel.app
FRONTEND_URL=https://your-colab-frontend.vercel.app
```

For local development (`backend/.env`):

```
ALLOWED_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

To allow more than one origin, separate them with a comma and no spaces:

```
ALLOWED_ORIGINS=https://your-colab-frontend.vercel.app,http://localhost:3000
```

> After changing `ALLOWED_ORIGINS` on Render, trigger a manual redeploy. Environment variable edits don't always restart the running service automatically, so the old value can keep serving requests until you redeploy.

---

## 6. Configure Nodemailer

Colab uses **Nodemailer** to send OTPs and collaborator invitation emails.

For Gmail SMTP, create an **App Password** for the account used to send emails.

Use:

```
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

Do not use your normal Gmail account password.

The same SMTP environment variables can be configured in Render for production.

---

## 7. Verify the Deployment

After both services are deployed:

### Frontend

Open:

```
https://your-colab-frontend.vercel.app
```

### Backend health check

Open:

```
https://your-colab-backend.onrender.com/health
```

The health endpoint should return the server status.

### Test

Verify:

- User registration/login
- Google/GitHub authentication
- Email OTP
- Document creation
- Document editing
- Real-time collaboration
- WebSocket connection
- Document auto-save
- Version history
- Collaborator invitations
- Role-based permissions
- Profile updates
- Email notifications

---

# API Routes

## Auth — `/api/v1/auth`

| Method | Name | Route | Description |
| --- | --- | --- | --- |
| `POST` | Register | `/api/v1/auth/register` | Register or sign in a user via OAuth |
| `POST` | Send OTP | `/api/v1/auth/send-otp` | Send a one-time password to an email address |
| `POST` | Email auth | `/api/v1/auth/email` | Verify OTP and return a JWT token |

## Documents — `/api/v1/document`

| Method | Name | Route | Description |
| --- | --- | --- | --- |
| `GET` | Get all documents | `/api/v1/document` | Fetch all documents owned by the authenticated user |
| `GET` | Get shared documents | `/api/v1/document/shared` | Fetch all documents shared with the authenticated user |
| `GET` | Get document | `/api/v1/document/:id` | Fetch a single document with latest version content and user role |
| `POST` | Create document | `/api/v1/document` | Create a new document |
| `PATCH` | Update document | `/api/v1/document/:id` | Update document title and/or description |
| `PATCH` | Save content | `/api/v1/document/:id/save` | Save a new Yjs binary snapshot as a document version |
| `DELETE` | Delete document | `/api/v1/document/:id` | Delete a document and all its versions |

## Collaborators — `/api/v1/document/:id/collaborators`

| Method | Name | Route | Description |
| --- | --- | --- | --- |
| `GET` | Get collaborators | `/api/v1/document/:id/collaborators` | Fetch all collaborators |
| `POST` | Invite collaborator | `/api/v1/document/:id/invite` | Invite a user by email with a specified role |
| `PATCH` | Update role | `/api/v1/document/:documentId/collaborators/:documentUserId` | Update a collaborator's role |
| `DELETE` | Remove collaborator | `/api/v1/document/:id/collaborators/:documentUserId` | Remove a collaborator |

## User — `/api/v1/user`

| Method | Name | Route | Description |
| --- | --- | --- | --- |
| `GET` | Get profile | `/api/v1/user/profile` | Fetch the authenticated user's profile |
| `PATCH` | Update profile | `/api/v1/user/profile` | Update the authenticated user's name |
| `PATCH` | Update avatar | `/api/v1/user/profile/image` | Update the user's profile photo |
| `DELETE` | Delete account | `/api/v1/user/profile` | Permanently delete the user's account and associated data |

## Health — `/health`

| Method | Name | Route | Description |
| --- | --- | --- | --- |
| `GET` | Health check | `/health` | Returns server status, uptime, memory, and system information |

---

# Contributing

Contributions are welcome!

## 1. Fork the repository

Click the **Fork** button at the top right of the repository.

## 2. Create a feature branch

```bash
git checkout -b feat/your-feature-name
```

## 3. Commit your changes

Follow Conventional Commits:

```bash
git commit -m "feat: add document search"
git commit -m "fix: resolve collaborator role sync issue"
git commit -m "chore: update dependencies"
```

## 4. Push and open a Pull Request

```bash
git push origin feat/your-feature-name
```

Then open a Pull Request against the `main` branch.

Please include a clear description of what your PR does and why.

### Guidelines

- Keep PRs focused — one feature or fix per PR
- Write clean, typed TypeScript — avoid `any` where possible
- Follow the existing folder structure and naming conventions
- Test your changes locally before submitting
- Never commit `.env` files or secret credentials
- Verify production environment variables before deployment

---

 Made with ❤️ by [Sankalp Joshi](https://github.com/sankalpj47)
