# SBS — Sai Business Solutions Website
### Full MERN Stack | Tailwind CSS v4 | Dark Luxury UI

---

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, QRCode
- **Frontend:** React 18, Vite, Tailwind CSS v4, React Router v6, Axios

---

## Project Structure
```
sbs-website/
├── backend/          ← Express API + MongoDB
└── frontend/         ← React + Vite + Tailwind v4
```

---

## Setup & Run

### 1. Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`) or MongoDB Atlas URI

### 2. Backend Setup
```bash
cd backend
npm install
```

Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/sbs-website
JWT_SECRET=sbs_super_secret_jwt_key_2024
ADMIN_EMAIL=admin@sbs.com
ADMIN_PASSWORD=sbs@admin123
PORT=5000
BASE_URL=http://localhost:5173
```

Seed the database:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```
→ API runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
→ App runs on `http://localhost:5173`

---

## Admin Login
- URL: `http://localhost:5173/admin/login`
- Email: `admin@sbs.com`
- Password: `sbs@admin123`

---

## Pages

### Public
| Route | Page |
|---|---|
| `/` | Home — 3 CTA buttons |
| `/jobs` | Jobs — Free & Paid listings |
| `/online-degrees` | Degrees — University programs |
| `/business-offers` | Offers — Business opportunities |
| `/contact` | Contact — Region-wise offices |

### Admin (protected)
| Route | Page |
|---|---|
| `/admin` | Dashboard — Stats + recent applications |
| `/admin/jobs` | Jobs CRUD |
| `/admin/degrees` | Degrees CRUD |
| `/admin/offers` | Offers CRUD |
| `/admin/applications` | View + update status + export CSV |
| `/admin/qr` | QR Code generator with download/print |
| `/admin/settings` | Cities ticker + site URL |

---

## Key Features
- **QR Code:** Admin generates QR → user scans → lands on website
- **Sticky Footer:** "Contact Us" fixed left + auto-scrolling city ticker
- **Slide Panel:** Apply/Enquire form drawer with resume upload
- **Mobile-first:** Hamburger sidebar nav on all public pages
- **JWT Auth:** Admin portal protected, token in localStorage
- **CSV Export:** Download all applications as CSV

---

## API Endpoints

### Public
```
GET  /api/jobs?type=free|paid&search=&location=
GET  /api/degrees?course=&search=
GET  /api/offers?search=
GET  /api/contacts
POST /api/applications/apply       (multipart: name, mobile, resume, refId, refTitle, type)
POST /api/applications/enquire     (json: name, mobile, refId, refTitle, type)
```

### Admin (Bearer token required)
```
POST /api/admin/login
GET  /api/admin/dashboard/stats
GET|POST|PUT|DELETE /api/jobs/:id
GET|POST|PUT|DELETE /api/degrees/:id
GET|POST|PUT|DELETE /api/offers/:id
GET  /api/applications
PUT  /api/applications/:id/status
GET  /api/applications/export-csv
POST /api/qr/generate              (body: { url, size })
GET|PUT /api/settings
GET|PUT /api/contacts/:id
```

---

## Production Build
```bash
cd frontend && npm run build
```
Serve `frontend/dist` via nginx or any static host.
Set `BASE_URL` in backend `.env` to your live domain.
