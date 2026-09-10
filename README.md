# Colab
> A real-time collaborative document editor with role-based access control, rich text editing, and version history.

Full-stack real-time collaborative editor built with **Next.js**, **Express**, **Prisma**, and **Redis**, enabling seamless document editing, team collaboration, and scalable productivity workflows. Deployed with **Vercel** (frontend) and **Render** (backend), backed by **Supabase PostgreSQL**.

![Colab](https://img.shields.io/badge/Colab-Document%20Editor-2563EB?style=for-the-badge&logo=files&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Routes](#api-routes)
- [Contributing](#contributing)

---

## Description

Colab is a full-stack collaborative document editing platform built for teams. It supports real-time multi-user editing powered by **Yjs** and **WebSockets**, rich text formatting via **Tiptap**, and a complete document management system with role-based permissions. Users can sign in via Google, GitHub, or email OTP, create and manage documents, invite collaborators, and see live cursor presence of other users in real time.

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
|---|---|
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
|---|---|
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
│   ├── app/                         # App Router pages, layouts, and route segments
│   ├── components/                  # Reusable React UI components
│   ├── config/                      # Client-side configuration files
│   ├── context/                     # React context providers
│   ├── public/                      # Static assets
│   ├── types/                       # Shared TypeScript types/interfaces
│   ├── utils/                       # Helper utilities
│   ├── .env.local                   # Local development environment variables
│   ├── next.config.ts               # Next.js configuration
│   ├── package.json                 # Frontend dependencies and scripts
│   └── tsconfig.json                # TypeScript configuration
│
├── backend/                          # Express backend application
│   ├── config/                      # Backend configuration (Prisma, Redis, logger, WebSocket)
│   ├── controllers/                 # Request handlers
│   ├── middleware/                  # Auth, logging, and error-handling middleware
│   ├── prisma/                      # Prisma schema and database configuration
│   ├── repositories/                # Data access layer
│   ├── routes/                      # API route definitions
│   ├── services/                    # Business logic
│   ├── utils/                       # Backend utilities
│   ├── worker/                      # Background workers
│   ├── .env                         # Backend environment variables
│   ├── index.ts                     # Express server entry point
│   ├── prisma.config.ts             # Prisma configuration
│   └── package.json                 # Backend dependencies and scripts
│
└── README.md                        # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- A [Supabase](https://supabase.com) project (PostgreSQL)
- A Redis instance (local or [Upstash](https://upstash.com))
- Google and/or GitHub OAuth app credentials
- An email account for Nodemailer SMTP

### 1. Clone the repository
```bash
git clone https://github.com/sankalpj47/colab.git
cd colab
```

### 2. Install dependencies
```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

### 3. Set up environment variables

Create `.env` in `backend/` and `.env.local` in `frontend/` — see [Environment Variables](#environment-variables) below.

### 4. Run database migrations
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### 5. Start Redis
```bash
redis-server
```
Or point `REDIS_URL` at a hosted instance (e.g. Upstash) instead.

### 6. Start the development servers
```bash
# backend (from /backend)
npm run dev

# frontend (from /frontend)
npm run dev
```

The frontend runs at `http://localhost:3000` and the backend at `http://localhost:8000`.

---

## Environment Variables

### Backend — `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Connection pooling URL — used for runtime queries | `postgresql://user:pass@host:5432/colab?pgbouncer=true` |
| `DIRECT_URL` | Direct connection URL — used by Prisma for migrations | `postgresql://user:pass@host:5432/colab` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `ALLOWED_ORIGINS` | **Controls CORS.** Comma-separated list of origins allowed to call the API — must exactly match the frontend's URL(s), no trailing slash | `http://localhost:3000` |
| `JWT_SECRET` | Secret key for signing JWTs | `your-secret-key` |
| `PORT` | Port the Express server listens on | `8000` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Base URL used for links inside emails and OAuth redirects — **does not affect CORS** | `http://localhost:3000` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username / email address | `you@gmail.com` |
| `SMTP_PASS` | SMTP password or app password | `your-app-password` |
| `SMTP_HOST` *(optional)* | SMTP host — defaults to `smtp.gmail.com` | `smtp.gmail.com` |
| `JWT_EXPIRY_TIME` *(optional)* | JWT expiry — defaults to `7d` | `7d` |

> `ALLOWED_ORIGINS` and `FRONTEND_URL` are separate variables with separate jobs — see [Deployment](#deployment) for why this matters in production.

### Frontend — `frontend/.env.local`

| Variable | Description | Example |
|---|---|---|
| `NEXTAUTH_URL` | Base URL of the Next.js app | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | `your-nextauth-secret` |
| `NEXT_PUBLIC_BASE_BACKEND_URL` | Backend API base URL | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_WEBSOCKET_URL` | WebSocket server URL | `ws://localhost:8000` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `your-google-secret` |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | `your-github-client-id` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | `your-github-secret` |

---

## Deployment

Colab deploys the frontend to **Vercel** and the backend to **Render**, with **Supabase** as the production database.

### Backend (Render)

- Root directory: `backend`
- Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start command: `npm start` (or `node dist/index.js`, depending on your build setup)
- Environment variables to set on Render:

| Variable | Production value |
|---|---|
| `DATABASE_URL` / `DIRECT_URL` | Your Supabase pooling/direct URLs |
| `REDIS_URL` | Your hosted Redis URL |
| `ALLOWED_ORIGINS` | `https://your-colab-frontend.vercel.app` — add `,http://localhost:3000` if you also test locally against the deployed backend |
| `FRONTEND_URL` | `https://your-colab-frontend.vercel.app` |
| `JWT_SECRET`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Same as local, production values |
| `NODE_ENV` | `production` |

> **This is the step most likely to break CORS.** If `ALLOWED_ORIGINS` isn't set here (or is stale), every request from the frontend gets blocked. After changing it, trigger a manual redeploy on Render — env var edits don't always restart the running service on their own.

Health check: `GET https://your-colab-backend.onrender.com/health`

### Frontend (Vercel)

- Root directory: `frontend`
- Build command: `npm run build`
- Set `NEXTAUTH_URL`, `NEXT_PUBLIC_BASE_BACKEND_URL` (pointing at the Render URL + `/api/v1`), `NEXT_PUBLIC_WEBSOCKET_URL` (`wss://...`), and the OAuth client vars in **Project → Settings → Environment Variables**, then redeploy.
- Update Google/GitHub OAuth callback URLs to the deployed Vercel domain.

---

## API Routes

### Auth — `/api/v1/auth`

| Method | Name | Route | Description |
|---|---|---|---|
| `POST` | Register | `/api/v1/auth/register` | Register or sign in a user via OAuth |
| `POST` | Send OTP | `/api/v1/auth/send-otp` | Send a one-time password to an email address |
| `POST` | Email auth | `/api/v1/auth/email` | Verify OTP and return a JWT token |

### Documents — `/api/v1/document`

| Method | Name | Route | Description |
|---|---|---|---|
| `GET` | Get all documents | `/api/v1/document` | Fetch all documents owned by the authenticated user |
| `GET` | Get shared documents | `/api/v1/document/shared` | Fetch all documents shared with the authenticated user |
| `GET` | Get document | `/api/v1/document/:id` | Fetch a single document with latest version content and user role |
| `POST` | Create document | `/api/v1/document` | Create a new document |
| `PATCH` | Update document | `/api/v1/document/:id` | Update document title and/or description |
| `PATCH` | Save content | `/api/v1/document/:id/save` | Save a new Yjs binary snapshot as a document version |
| `DELETE` | Delete document | `/api/v1/document/:id` | Delete a document and all its versions |

### Collaborators — `/api/v1/document/:id/collaborators`

| Method | Name | Route | Description |
|---|---|---|---|
| `GET` | Get collaborators | `/api/v1/document/:id/collaborators` | Fetch all collaborators |
| `POST` | Invite collaborator | `/api/v1/document/:id/invite` | Invite a user by email with a specified role |
| `PATCH` | Update role | `/api/v1/document/:documentId/collaborators/:documentUserId` | Update a collaborator's role |
| `DELETE` | Remove collaborator | `/api/v1/document/:id/collaborators/:documentUserId` | Remove a collaborator |

### User — `/api/v1/user`

| Method | Name | Route | Description |
|---|---|---|---|
| `GET` | Get profile | `/api/v1/user/profile` | Fetch the authenticated user's profile |
| `PATCH` | Update profile | `/api/v1/user/profile` | Update the user's name |
| `PATCH` | Update avatar | `/api/v1/user/profile/image` | Update the user's profile photo |
| `DELETE` | Delete account | `/api/v1/user/profile` | Permanently delete the user's account and associated data |

### Health — `/health`

| Method | Name | Route | Description |
|---|---|---|---|
| `GET` | Health check | `/health` | Returns server status, uptime, memory, and system information |

---

## Contributing

Contributions are welcome! Here's how to get started:

### 1. Fork the repository

Click the **Fork** button at the top right of this page.

### 2. Create a feature branch
```bash
git checkout -b feat/your-feature-name
```

### 3. Commit your changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):
```bash
git commit -m "feat: add document search"
git commit -m "fix: resolve collaborator role sync issue"
git commit -m "chore: update dependencies"
```

### 4. Push and open a Pull Request
```bash
git push origin feat/your-feature-name
```

Then open a Pull Request against the `main` branch. Please include a clear description of what your PR does and why.

### Guidelines

- Keep PRs focused — one feature or fix per PR
- Write clean, typed TypeScript — avoid `any` where possible
- Follow the existing folder structure and naming conventions
- Test your changes locally before submitting
- Never commit `.env` files or secret credentials
- Verify production environment variables before deployment

---

<div align="center">

Made with ❤️ by [Sankalp Joshi](https://github.com/sankalpj47)

</div>
