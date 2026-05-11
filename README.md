# Backend — SW Technologies (MERN)

Express + MongoDB backend for the Round 2 full‑stack integration.

## Setup

### 1) Environment variables

Create `Backend/.env` (you will add Mongo URI later):

```bash
cp .env.example .env
```

Required keys:

- `PORT` (default: 5001)
- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### 2) Install dependencies

```bash
npm install
```

### 3) Seed admin user

Creates (or upgrades) the admin user from `.env` values:

```bash
npm run seed
```

Default admin credentials (from `.env.example`):

- `ADMIN_EMAIL`: `admin@swtech.com`
- `ADMIN_PASSWORD`: `Admin@12345`

### 4) Run server

```bash
npm run dev
```

Server:

- `http://localhost:5001`

## API routes

### Contact
- `POST /api/contact`

### Newsletter
- `POST /api/newsletter/subscribe`

### Quote
- `POST /api/quote`

### Auth (JWT expires in 7 days)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (Bearer token)

### Admin (Bearer token + admin only; returns 401 otherwise)
- `GET /api/admin/contacts`
- `DELETE /api/admin/contacts/:id`
- `GET /api/admin/users`
- `GET /api/admin/quotes`

