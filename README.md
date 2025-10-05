# BLOG APP — MERN + AWS + Tailwind

A full‑stack blog application built with the MERN stack, styled with Tailwind CSS, and integrated with AWS for media handling. The repository is structured as a monorepo with separate `frontend` and `backend` packages.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, ESLint
- Backend: Node.js, Express, MongoDB
- Cloud/Infra: AWS (S3 for media)
- Hosting/Deploy: Vercel (per-package configs present)

## Repository Structure

```
/
├─ backend/
│  ├─ .gitignore
│  ├─ awsRoutes.js
│  ├─ connect.js
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ postRoutes.js
│  ├─ server.js
│  ├─ userRoutes.js
│  └─ vercel.json
├─ frontend/
│  ├─ .gitignore
│  ├─ README.md
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ public/
│  ├─ src/
│  ├─ vercel.json
│  └─ vite.config.js
├─ package.json
└─ package-lock.json
```

Key files:
- Backend:
  - `backend/server.js`: Express server and middleware bootstrap
  - `backend/connect.js`: Database connection
  - `backend/userRoutes.js`: Authentication and user endpoints
  - `backend/postRoutes.js`: Blog post CRUD endpoints
  - `backend/awsRoutes.js`: AWS S3 upload/signed URL handling
  - `backend/vercel.json`: Deployment config
- Frontend:
  - `frontend/vite.config.js`: Vite configuration (dev server, proxy, etc.)
  - `frontend/eslint.config.js`: Linting configuration
  - `frontend/index.html`: App entry HTML
  - `frontend/src/`: React application source
  - `frontend/vercel.json`: Deployment config

For package-specific details, see:
- Frontend README: `frontend/README.md`

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm (bundled with Node)

### Installation

Install dependencies per package:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Environment Variables

Create `.env` files in each package with values appropriate to your environment.

Backend (`backend/.env`):
```
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CORS_ORIGIN=http://localhost:5173

# AWS (if using S3)
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
AWS_REGION=<your-region>
S3_BUCKET_NAME=<your-bucket-name>
```

Frontend (`frontend/.env`):
```
# Typical Vite convention
VITE_API_URL=http://localhost:3000
```

Note: Ensure the frontend API URL matches your backend port and CORS config.

### Running Locally

In separate terminals:

```bash
# Backend
cd backend
# check package.json for scripts; e.g.:
npm start
# or
node server.js

# Frontend
cd frontend
npm run dev
```

- Vite default: http://localhost:5173
- Backend default (example): http://localhost:3000

### API Overview

- `User` routes (`backend/userRoutes.js`): registration, login, profile
- `Post` routes (`backend/postRoutes.js`): create, read, update, delete blog posts
- `AWS` routes (`backend/awsRoutes.js`): media uploads / signed URL flows for S3

Refer to route files for exact endpoints and request/response shapes.

## Deployment

This repo includes `vercel.json` in both `backend` and `frontend`:
- Deploy frontend and backend as separate Vercel projects or configure a monorepo setup.
- Set all required environment variables in each Vercel project.
- If using a dev proxy in `vite.config.js`, adjust for production by using absolute API URLs.

## Scripts

Check `package.json` in each package for available scripts (e.g., `dev`, `start`, `lint`).

## Contributing

- Install dependencies and create `.env` files as described above.
- Follow ESLint recommendations (frontend).
- Open pull requests with clear descriptions.

## License

