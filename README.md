<div align="center">

# SW Technologies — Backend API

**Express + MongoDB + JWT — REST API for contact, newsletter, quotes, auth & admin.**

**Live API**: [`https://sw-technologies-backend.onrender.com`](https://sw-technologies-backend.onrender.com)

<p>
  <a href="https://sw-technologies-backend.onrender.com" target="_blank" rel="noreferrer">
    <img alt="API live" src="https://img.shields.io/badge/API-Live-46C93A?style=for-the-badge&logo=render&logoColor=white" />
  </a>
  <a href="https://sw-technologies-backend.onrender.com/api/health" target="_blank" rel="noreferrer">
    <img alt="Health check" src="https://img.shields.io/badge/Health-%2Fapi%2Fhealth-111827?style=for-the-badge&logo=checkmarx&logoColor=white" />
  </a>
</p>

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

<p>
  <a href="https://sw-technologies-backend.onrender.com/" target="_blank" rel="noreferrer">
    <img alt="Open backend root" src="https://img.shields.io/badge/Open%20root-View%20message-111827?style=for-the-badge&logo=googlechrome&logoColor=white" />
  </a>
</p>

_Root `GET /` returns: `sw backend is running`_

**Live frontend:** [https://nikky-kumar7505.github.io/SW-Technologies/](https://nikky-kumar7505.github.io/SW-Technologies/)

### To access admin panel

1. Click **Login** in the navbar.  
2. Use these credentials:

| Field | Value |
|--------|--------|
| **Email** | `admin@swtech.com` |
| **Password** | `Admin@12345` |

</div>

---

## ✨ Highlights

- **RESTful JSON API** — contact, newsletter, quote, auth, admin
- **MongoDB** — Mongoose models & persistence
- **Auth** — bcrypt password hashing + JWT (7-day expiry)
- **Admin** — protected routes; seed script for admin user(s)
- **CORS** — open for cross-origin frontend (e.g. Netlify + Render)
- **Optional static frontend** — if `../Frontend` exists next to `Backend`, the server can serve it; on Render (API-only) it skips missing files safely

---

## 🚀 Quick start (local)

From this `Backend/` folder:

```bash
cp .env.example .env
# Edit .env: MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

npm install
npm run seed
npm run dev
```

Default local URL: `http://localhost:5001` (or whatever you set in `PORT`).

---

## 🔐 Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default **5001**) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs (use a long random value in production) |
| `ADMIN_EMAIL` | Seeded admin email |
| `ADMIN_PASSWORD` | Seeded admin password |

Example defaults are in `.env.example`. **Never commit `.env`** to git.

---

## 🧪 Useful endpoints

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/` | Plain text: `sw backend is running` |
| `GET` | `/api/health` | `{ "ok": true }` |
| `POST` | `/api/contact` | Contact form |
| `POST` | `/api/newsletter/subscribe` | Newsletter |
| `POST` | `/api/quote` | Quote request |
| `POST` | `/api/auth/register` | Register |
| `POST` | `/api/auth/login` | Login → JWT |
| `GET` | `/api/auth/profile` | Bearer token |
| `GET` | `/api/admin/contacts` | Admin + JWT |
| `DELETE` | `/api/admin/contacts/:id` | Admin + JWT |
| `GET` | `/api/admin/users` | Admin + JWT |
| `GET` | `/api/admin/quotes` | Admin + JWT |

Validation errors return JSON like:

```json
{ "message": "Validation failed", "errors": { "email": "Valid email is required." } }
```

---

## 📄 License

Educational / assignment use. Add a license if you publish publicly.
