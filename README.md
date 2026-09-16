# Poovarasan — Classic Full-Stack Portfolio Web Application

A complete, responsive, production-ready personal portfolio web application built for **Poovarasan**, Python Full Stack Developer.

Designed with a **timeless, classic, and elegant editorial aesthetic** — featuring refined serif typography, off-white/cream paper backgrounds, deep charcoal typography, thin borders, and subtle hover interactions, avoiding generic modern dashboard styles or excessive animations.

---

## Technology Stack

- **Backend**: Python 3.14+, Django 6.1, Django REST Framework, SQLite (with built-in switch to PostgreSQL), Pillow, django-cors-headers.
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, React Router DOM, Axios.
- **Authentication**: Django REST Framework Token Authentication, PBKDF2 password hashing, secure protected admin routes, token invalidation on logout and password change.

---

## Directory Structure

```text
poovarasan-portfolio/
├── backend/
│   ├── manage.py
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── portfolio/
│   │   ├── models.py              # Profile, Project, Skill, Experience, Education, ExtraSection, ContactMessage
│   │   ├── serializers.py         # DRF serializers with validation & file URLs
│   │   ├── views.py               # ViewSets, Profile singleton, Auth & Dashboard stats
│   │   ├── urls.py                # REST API routes
│   │   ├── admin.py               # Django Admin registration
│   │   ├── tests.py               # Unit tests for APIs and auth flows
│   │   └── management/commands/
│   │       └── setup_portfolio.py # Bootstraps admin and seeds initial data
│   ├── media/                     # Uploaded profile photos, project screenshots, resumes
│   └── db.sqlite3
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Sticky header with mobile drawer
│   │   │   ├── Hero.jsx           # Timeless hero with resume download & portrait
│   │   │   ├── About.jsx          # Bio, career objective, strengths, interests
│   │   │   ├── Skills.jsx         # Categorized skills (Frontend, Backend, Database, Tools)
│   │   │   ├── Projects.jsx       # Filterable cards with modal details
│   │   │   ├── Experience.jsx     # Career timeline & Fresher notice support
│   │   │   ├── Education.jsx      # Academic qualifications
│   │   │   ├── ExtraSections.jsx  # Custom dynamic sections (Services, Certifications)
│   │   │   ├── Contact.jsx        # Working contact form & direct reach-out info
│   │   │   ├── Footer.jsx         # Classic copyright & social links
│   │   │   ├── ProtectedRoute.jsx # Route guard for admin panel
│   │   │   ├── ConfirmModal.jsx   # Classic delete confirmation dialog
│   │   │   └── SocialIcons.jsx    # SVG icons for GitHub & LinkedIn
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Public portfolio view
│   │   │   └── AdminLogin.jsx     # Secure admin login
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx    # Admin portal shell with responsive sidebar
│   │   │   ├── Dashboard.jsx      # Summary metrics and recent visitor messages
│   │   │   ├── ProfileManager.jsx # Edit About, bio, photo, and resume upload
│   │   │   ├── ProjectManager.jsx # Full CRUD for unlimited projects & screenshots
│   │   │   ├── SkillManager.jsx   # Full CRUD for categorized technical skills
│   │   │   ├── ExperienceManager.jsx # Work history & Fresher status manager
│   │   │   ├── EducationManager.jsx  # Academic records manager
│   │   │   ├── ExtraSectionManager.jsx # Dynamic custom sections manager
│   │   │   ├── MessageManager.jsx # Visitor inquiries viewer
│   │   │   └── ChangePassword.jsx # Password change with current verification
│   │   ├── services/
│   │   │   └── api.js             # Axios client with Token interceptor
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global authentication provider
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## Initial Admin Credentials

> [!IMPORTANT]
> The initial bootstrap credentials for the Admin Portal are:
> - **Username**: `Poovarasan`
> - **Password**: `Poovarasan31@`
>
> **Security Note**: These credentials are used only to bootstrap the administrator account into the database using secure PBKDF2 hashing. Passwords are never hard-coded into client-side JavaScript or API responses. After logging in, you can change the password at any time via `/admin/change-password`.

---

## Getting Started

### 1. Backend Setup (Django REST Framework)

Navigate to the `backend` directory:

```bash
cd backend
```

Create and activate a virtual environment (optional if using system Python):

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install django djangorestframework django-cors-headers pillow
```

Apply database migrations:

```bash
python manage.py migrate
```

Bootstrap the administrator user and seed the portfolio data:

```bash
python manage.py setup_portfolio
```

Run the backend development server:

```bash
python manage.py runserver 8000
```

The Django REST API will be accessible at: `http://127.0.0.1:8000/api/`

To run the automated backend unit tests:

```bash
python manage.py test
```

---

### 2. Frontend Setup (React + Vite + Tailwind CSS)

In a separate terminal, navigate to the `frontend` directory:

```bash
cd frontend
```

Install the npm packages:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The React portfolio application will be accessible at: `http://localhost:5173/`

To create a production build:

```bash
npm run build
```

---

## Application Features & Usage

### 1. Public Portfolio (`/`)
- **Hero Section**: Highlights Poovarasan's title as "Python Full Stack Developer", headline intro, core technology tags, action buttons ("View Projects", "Download Resume", "Contact Me"), and a classic portrait frame.
- **About Section**: Detailed biography, career objective, developer background, core strengths, and interests.
- **Skills Section**: Categorized into *Frontend*, *Backend*, *Database*, and *Tools*, displaying proficiency bars and counts.
- **Projects Section**: Showcases full-stack projects including the *Business Finance Management System*. Features category filtering, tech pills, GitHub/Live demo links, and an expandable detailed overview modal.
- **Experience Section**: Professional employment timeline with support for an active *"Fresher / Open to Opportunities"* badge.
- **Education Section**: Degree, university, period, and coursework details.
- **Extra Sections**: Custom sections managed directly by the admin (e.g., Services, Certifications, Publications).
- **Contact Section**: Working contact form that submits messages directly to the Django database, with client and server validation, plus direct contact cards (email, phone, location, LinkedIn, GitHub).
- **Responsive Layout**: Designed and tested for mobile (375px+), tablet (768px+), and desktop (1024px+ - 1440px+).

---

### 2. Admin Management Portal (`/admin/dashboard`)
Access the login page at `/admin/login`:
- Enter `Poovarasan` and `Poovarasan31@`.
- Invalid attempts return a generic *"Invalid username or password."* error message to prevent username enumeration.
- Authenticated sessions are managed via DRF Tokens stored in local storage and attached to every mutating API request.
- **Dashboard Overview**: Displays real-time counts of projects, skills, experience, education, extra sections, and visitor messages.
- **Profile & About Manager**: Update personal details, bio, career goals, upload profile pictures, and upload/replace resume PDFs.
- **Project Manager**: Add unlimited projects, edit existing records, upload screenshots, assign categories, and toggle featured status.
- **Skill Manager**: Add, edit, or delete skills with category assignment and visual proficiency sliders.
- **Experience Manager**: Add or edit employment history or activate the fresher notice.
- **Education Manager**: Manage degrees, institutions, and periods.
- **Extra Sections Manager**: Add custom sections (e.g. Services, Certifications), toggle visibility on/off, and reorder.
- **Contact Inquiries**: Review visitor messages with sender details and timestamp, and delete or reply directly via email.
- **Change Password**: Validates current password, enforces minimum security rules, hashes new password with Django auth, invalidates old token, and redirects to login with the new credentials.

---

## Switching from SQLite to PostgreSQL

The project is pre-configured to easily switch from SQLite to PostgreSQL. In `backend/config/settings.py`, database settings read from environment variables:

1. Install PostgreSQL driver:
   ```bash
   pip install psycopg2-binary
   ```
2. Set environment variables in your terminal or `.env` file:
   ```bash
   export DB_ENGINE=postgresql
   export POSTGRES_DB=poovarasan_portfolio
   export POSTGRES_USER=postgres
   export POSTGRES_PASSWORD=your_password
   export POSTGRES_HOST=localhost
   export POSTGRES_PORT=5432
   ```
3. Run migrations and setup:
   ```bash
   python manage.py migrate
   python manage.py setup_portfolio
   ```

---

## License & Copyright

© 2026 Poovarasan. All Rights Reserved.
