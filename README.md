# AuthKit

> Production-ready authentication boilerplate for rapid integration — built for hackathons, side projects, and beyond.

Full-stack authentication starter with **Next.js** + **Express** + **Supabase** + **Redis**, supporting Google, GitHub, and Email OTP login out of the box. Clone it, configure your keys, and have auth running in minutes.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![Redis](https://img.shields.io/badge/Redis-OTP_Storage-DC382D?style=flat-square&logo=redis)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)

---

## Contents

- [Features](features)
- [Tech Stack](tech-stack)
- [Project Structure](project-structure)
- [Getting Started](getting-started)
- [Environment Variables](environment-variables)
- [Auth Flows](auth-flows)
- [API Reference](api-reference)
- [Contributing](contributing)

---

## Features

- **Google OAuth** — one-click sign in with Google
- **GitHub OAuth** — one-click sign in with GitHub
- **Email + OTP** — passwordless login and signup via 6-digit OTP
- ⏱**OTP Expiry** — OTPs stored in Redis with a 10-minute TTL
- **JWT Sessions** — stateless sessions via NextAuth JWT strategy
- **Prisma + Supabase** — type-safe database access on PostgreSQL
- **Nodemailer** — transactional OTP emails
- **Role-based** — `USER` and `ADMIN` roles baked in
- **Prettier** — consistent formatting on both frontend and backend
- **Fully typed** — end-to-end TypeScript with no `any` shortcuts

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, NextAuth.js |
| **Backend** | Node.js, Express 5, TypeScript, ts-node-dev |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **Cache / OTP** | Redis (ioredis) |
| **Email** | Nodemailer |
| **Auth** | NextAuth.js (Google, GitHub, Credentials) |
| **Code Style** | Prettier |

---

## Project Structure
```
authkit/
├── client/                     # Next.js frontend
│   ├── app/
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts        # NextAuth handler
│   │   └── auth/
│   │       └── login/
│   │           └── page.tsx    # Login page
│   ├── config/
│   │   └── constants.ts        # Frontend env constants
│   ├── utils/
│   │   └── axios.ts            # Axios instance with interceptors
│   ├── types/
│   │   └── next-auth.d.ts      # NextAuth type extensions
│   └── .env.local
│
├── server/                     # Express backend
│   ├── config/
│   │   ├── constants.config.ts
│   │   ├── logger.config.ts
│   │   ├── redis.config.ts
│   │   └── mail.config.ts
│   ├── controllers/
│   │   └── auth/
│   │       ├── register.controller.ts
│   │       ├── sendOtp.controller.ts
│   │       └── emailAuth.controller.ts
│   ├── services/
│   │   └── auth/
│   │       ├── register.service.ts
│   │       ├── sendOtp.service.ts
│   │       ├── emailAuth.service.ts
│   │       └── verifyOtp.service.ts
│   ├── repositories/
│   │   └── user/
│   │       └── user.repository.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── reqBody.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── errorHandler.middleware.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── utils/
│   │   ├── error.utils.ts
│   │   ├── jwt.util.ts
│   │   ├── otp.util.ts
│   │   ├── mail.util.ts
│   │   └── types/
│   │       ├── express.types.ts
│   │       └── common.types.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── index.ts
│   └── .env
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- A [Supabase](https://supabase.com) project (free tier works)
- A [Redis](https://redis.io) instance — local or [Upstash](https://upstash.com) (free tier)
- Google OAuth credentials — [Google Cloud Console](https://console.cloud.google.com)
- GitHub OAuth credentials — [GitHub Developer Settings](https://github.com/settings/developers)
- An SMTP email account (Gmail works)

---

### 1. Clone the repository
```bash
git clone https://github.com/SHIVAM-KUMAR-59/authkit.git
cd authkit
```

### 2. Setup the backend
```bash
cd server
npm install
cp .env.example .env
```

Fill in your `.env` — see [Environment Variables](#-environment-variables).
```bash
npx prisma migrate dev --name init
npm run dev
```

Backend runs on `http://localhost:8000`

### 3. Setup the frontend
```bash
cd client
npm install
cp .env.local.example .env.local
```

Fill in your `.env.local`.
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Environment Variables

### Backend — `server/.env`
```env
# Server
PORT=8000
NODE_ENV=development

# Database — Supabase
DATABASE_URL=postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://USER:PASSWORD@HOST:5432/postgres

# Redis
REDIS_URL=redis://127.0.0.1:6379

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Email — Nodemailer
SMTP_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend — `client/.env.local`
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api/v1
```

> **Gmail tip:** Use an [App Password](https://support.google.com/accounts/answer/185833) instead of your real password for `SMTP_PASS`.

---

## Auth Flows

### Google / GitHub OAuth
```
User clicks "Sign in with Google/GitHub"
  → NextAuth redirects to provider
  → Provider redirects back with profile
  → signIn callback POSTs to /api/v1/auth/register (upsert user)
  → Backend returns JWT token
  → Token stored in NextAuth session
```

### Email + OTP
```
# Sign Up
User enters name + email
  → POST /api/v1/auth/send-otp { email, isSignup: true }
  → OTP generated, stored in Redis (TTL: 10min), emailed to user
  → User enters OTP
  → NextAuth CredentialsProvider → POST /api/v1/auth/email { name, email, otp, isSignup: true }
  → OTP verified, user created in DB, JWT returned
  → Token stored in NextAuth session

# Login
User enters email
  → POST /api/v1/auth/send-otp { email, isSignup: false }
  → OTP emailed to existing user
  → User enters OTP
  → NextAuth CredentialsProvider → POST /api/v1/auth/email { email, otp, isSignup: false }
  → OTP verified, JWT returned
  → Token stored in NextAuth session
```

---

## API Reference

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | `{ name, email, provider, imageUrl }` | OAuth user upsert |
| `POST` | `/send-otp` | `{ email, isSignup }` | Send OTP to email |
| `POST` | `/email` | `{ name?, email, otp, isSignup }` | Verify OTP + login/signup |

### Responses

**Success**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "token": "eyJhbGci...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error**
```json
{
  "success": false,
  "message": "OTP expired or not found"
}
```

---

## Database Schema
```prisma
model User {
  id        String       @id @default(uuid())
  name      String?
  email     String       @unique
  imageUrl  String?
  provider  AuthProvider
  role      UserRole     @default(USER)
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}

enum UserRole {
  USER
  ADMIN
}

enum AuthProvider {
  GOOGLE
  GITHUB
  EMAIL
}
```

---

## Contributing

Contributions are welcome — especially if you're adding new auth providers or improving the OTP flow.
```bash
# Fork the repo, then:
git checkout -b feat/your-feature
git commit -m "feat: your feature"
git push origin feat/your-feature
# Open a PR
```

---

<div align="center">
  Built with ❤️ for developers who'd rather be building features than auth
</div>