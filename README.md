# Poovarasan • Premium Full Stack Developer Portfolio

A modern, high-craft, production-ready Full Stack Developer Portfolio website engineered for **Poovarasan**, a **Python Full Stack Developer**.

Designed with a bespoke **Black-and-White Visual Identity** (`#080808` deep black, `#111111` dark charcoal, metallic silver accents, glassmorphic cards, luminous hover states, and smooth scrolling). Fully dynamic and connected to a **Python / Django REST Framework** backend backed by a **MySQL** relational database.

---

## 🛠️ Technology Stack

### Frontend
- **React.js 19** (JavaScript only, modern Hooks & clean component architecture)
- **Tailwind CSS** (Custom dark palette, glassmorphism utilities, glow shadows)
- **React Router DOM** & **Axios** (RESTful API consumption with automatic synced fallback)
- **Framer Motion** & **Canvas Confetti** (Subtle entrance animations & interactive delight)
- **Lucide React** (Vector icons across all competencies & sections)

### Backend
- **Python 3.14+**
- **Django** & **Django REST Framework (DRF)**
- **MySQL 8.0** via `PyMySQL` (`Myportfolio` database)
- **JWT Authentication** (`djangorestframework-simplejwt`)
- **Django CORS Headers** & **Python-Dotenv**
- **Django Admin Dashboard** with customized models and media handlers

---

## 🗂️ Project Architecture

```
Portfolio for me/
├── backend/
│   ├── config/                     # Django project configuration
│   │   ├── settings.py             # MySQL DB, CORS, JWT, Media configs
│   │   ├── urls.py                 # Admin, API router, JWT endpoints
│   │   └── wsgi.py / asgi.py
│   ├── portfolio/                  # Main portfolio Django application
│   │   ├── models.py               # Profile, Skill, Project, Education, Certification, ContactMessage
│   │   ├── serializers.py          # DRF ModelSerializers with media URL resolvers
│   │   ├── views.py                # REST API views (Granular + Consolidated overview)
│   │   ├── urls.py                 # API endpoints
│   │   ├── admin.py                # Django Admin dashboard customization
│   │   └── management/commands/    # 'seed_data' auto-population script
│   ├── media/                      # Uploaded resumes, avatars, project screenshots
│   ├── manage.py
│   ├── requirements.txt            # Python dependencies
│   └── .env                        # Isolated database credentials
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Glassmorphic header with live API status indicator
│   │   │   ├── Hero.jsx            # Hero banner, 3D interactive terminal, social links
│   │   │   ├── About.jsx           # Bio, 4 core pillars, 3-tier architecture diagram
│   │   │   ├── Skills.jsx          # Filterable skills grid, soft skills breakdown
│   │   │   ├── Projects.jsx        # Panisudar Job Portal, interactive case study modal
│   │   │   ├── Education.jsx       # B.E. CSE, HSC, SSLC interactive vertical timeline
│   │   │   ├── Certifications.jsx  # Certificate gallery with interactive modal preview
│   │   │   ├── Contact.jsx         # MySQL-backed contact form with confetti celebration
│   │   │   ├── ResumeModal.jsx     # ATS-friendly interactive printable resume viewer
│   │   │   ├── Footer.jsx          # Live Salem time clock, back to top, tech stack badges
│   │   │   └── Icons.jsx           # SVG icons (GitHub, LinkedIn, etc.)
│   │   ├── services/
│   │   │   └── api.js              # Axios client with fallback dataset
│   │   ├── App.jsx                 # Top-level state and orchestrator
│   │   ├── index.css               # Tailwind directives, custom scrollbar, glass styles
│   │   └── main.jsx
│   ├── index.html                  # SEO metadata, Open Graph, Google fonts
│   ├── tailwind.config.js          # Design system & color tokens
│   ├── vite.config.js              # Vite React bundler config
│   └── package.json
│
├── run_all.bat                     # 1-Click launcher for both Backend & Frontend
├── start_backend.bat               # Starts Django on http://127.0.0.1:8000
├── start_frontend.bat              # Starts React on http://localhost:3000
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. One-Click Launch (Windows)
Double-click `run_all.bat` in the project root directory. It will automatically launch both the Django backend server and the React Vite development server!

---

### 2. Manual Setup & Running

#### Step A: Backend (Django & MySQL)

1. **Verify MySQL Database**:
   The database `Myportfolio` is pre-created and configured with:
   - **Database Name**: `Myportfolio`
   - **User**: `root`
   - **Password**: `poovarasan`
   - Credentials are kept safely inside `backend/.env`.

2. **Navigate to Backend Directory**:
   ```bash
   cd backend
   ```

3. **Install Requirements**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Database Migrations & Seed Data**:
   ```bash
   python manage.py makemigrations portfolio
   python manage.py migrate
   python manage.py seed_data
   ```

5. **Run Django Server**:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   - API Root: `http://127.0.0.1:8000/api/overview/`
   - Admin Dashboard: `http://127.0.0.1:8000/admin/`
     - **Username**: `admin`
     - **Password**: `poovarasan`

#### Step B: Frontend (React.js)

1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at: `http://localhost:3000`

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📡 REST API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/overview/` | Public | Consolidated live payload (`profile`, `skills`, `projects`, `education`, `experience`, `certifications`, `social_links`) |
| `GET, PATCH` | `/api/profile/` & `/api/about/` | Public GET / Admin Write | Profile, Hero section, About Me & Avatar image upload |
| `GET, POST, PATCH, DELETE` | `/api/skills/` & `/api/skills/<id>/` | Public GET / Admin Write | Full CRUD for Frontend, Backend, Database, Tools & Soft Skills |
| `GET, POST, PATCH, DELETE` | `/api/projects/` & `/api/projects/<id>/` | Public GET / Admin Write | Full CRUD for Projects with screenshot image upload |
| `GET, POST, PATCH, DELETE` | `/api/education/` & `/api/education/<id>/` | Public GET / Admin Write | Full CRUD for Education history |
| `GET, POST, PATCH, DELETE` | `/api/experience/` & `/api/experience/<id>/` | Public GET / Admin Write | Full CRUD for Experience / Internships / Training |
| `GET, POST, PATCH, DELETE` | `/api/certificates/` & `/api/certificates/<id>/` | Public GET / Admin Write | Full CRUD for Certificates & Courses with Image/PDF upload |
| `GET, POST, DELETE` | `/api/resume/` | Public GET / Admin Write | Get, upload/replace, or delete Resume PDF |
| `GET, POST, PATCH, DELETE` | `/api/social-links/` & `/api/social-links/<id>/` | Public GET / Admin Write | Full CRUD for Social Links (LinkedIn, GitHub, Instagram, etc.) |
| `POST / GET, PATCH, DELETE` | `/api/contact/` & `/api/contact/<id>/` | Public POST / Admin Manage | Public message submission; Admin inbox read/unread & delete |
| `POST` | `/api/admin/login/` | Public | Admin username/password login returning JWT tokens |
| `POST` | `/api/admin/logout/` | Admin JWT | Admin logout endpoint |
| `GET` | `/api/admin/me/` | Admin JWT | Verify active admin session |
| `POST` | `/api/admin/change-password/` | Admin JWT | Securely change admin password |
| `GET` | `/api/admin/dashboard/` | Admin JWT | Dashboard metrics & recent contact messages |

---

## 🔐 React Admin Dashboard (Full CMS)

Visit **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)** to manage your entire portfolio without editing code:
- **Username**: `admin`
- **Password**: `poovarasan` *(can be changed anytime inside **Account & Security**)*

Available Admin Modules:
- **Dashboard**: Total Projects, Skills, Certificates, Messages & Recent Inquiries.
- **Profile & About**: Full name, title, profile image upload, short intro, about bio, contact info.
- **Hero Section**: Subheading, main headline, description, avatar, CTA button texts & links.
- **Skills, Projects, Education, Experience, Certificates, Social Links**: Complete Create, Edit, Delete with confirmation dialogs & file uploads.
- **Resume PDF**: Upload, replace, preview, download, or delete your resume PDF.
- **Contact Messages**: Filter unread/read, open full details, mark read/unread, reply via email, or delete.
- **Account & Security**: Change admin password.

Django's built-in admin also remains available at `http://127.0.0.1:8000/admin/`.

---

## 🚢 Deployment Instructions

### Backend (Render / Railway / VPS / PythonAnywhere)
1. Set environment variables on your hosting provider:
   - `SECRET_KEY`: High-entropy secret key
   - `DEBUG`: `False`
   - `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`: Production MySQL credentials
   - `ALLOWED_HOSTS`: Your domain name (e.g. `api.yourdomain.com`)
2. Run database migrations: `python manage.py migrate`
3. Seed data: `python manage.py seed_data`
4. Serve with Gunicorn or Uvicorn: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. Link your repository or upload `frontend/dist` folder.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Set environment variable:
   - `VITE_API_URL`: `https://api.yourdomain.com/api`

---

## 👨‍💻 Author

**Poovarasan S**
- **Role**: Python Full Stack Developer
- **Degree**: B.E. Computer Science and Engineering (Ganesh College of Engineering, 2022–2026)
- **Email**: [poovarasan31012005@gmail.com](mailto:poovarasan31012005@gmail.com)
- **Phone**: +91-9629617818
- **Location**: Salem, Tamil Nadu, India
- **LinkedIn**: [linkedin.com/in/poovarasan-subramani-310105sana](https://www.linkedin.com/in/poovarasan-subramani-310105sana)
- **GitHub**: [github.com/poovarasan-subramani](https://github.com/poovarasan-subramani)
