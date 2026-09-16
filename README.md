# 🧑‍💻 Poovarasan — Full Stack Developer Portfolio

A modern, responsive, and professionally designed **Full Stack Developer Portfolio** built with **React.js and Django REST Framework**.

This portfolio allows visitors to explore my profile, skills, education, experience, projects, resume, and contact information. It also includes a secure **Admin Dashboard** where portfolio content can be managed dynamically without changing the source code.

---

## 🌐 Live Demo

🔗 **Live Website:** `Add your deployed website URL here`

🔗 **GitHub Repository:** `Add your GitHub repository URL here`

---

## 📸 Screenshots

> Add screenshots of your application here.

### 🏠 Home

`Add Home Page Screenshot`

### 👨‍💻 About

`Add About Section Screenshot`

### 🚀 Projects

`Add Projects Section Screenshot`

### 🔐 Admin Login

`Add Admin Login Screenshot`

### 📊 Admin Dashboard

`Add Admin Dashboard Screenshot`

---

# 📌 About The Project

The **Poovarasan Portfolio** is a full-stack personal portfolio application created to showcase my technical skills, projects, education, experience, and professional information.

Unlike a static portfolio website, this project uses a **Django REST API backend and React frontend**, allowing portfolio information to be managed dynamically through an authenticated admin dashboard.

The application follows a clean separation between the frontend and backend and demonstrates practical full-stack development concepts.

---

# ✨ Features

## 🌍 Public Portfolio

* Responsive home page
* Professional hero section
* About section
* Skills section
* Projects section
* Experience section
* Education section
* Resume download
* Contact section
* Social media links
* Custom extra sections
* Responsive navigation
* Mobile-friendly design
* Smooth scrolling
* Form validation

---

## 🔐 Admin Dashboard

The portfolio includes a secure admin panel.

### Admin Features

* Secure admin login
* Dashboard overview
* Manage profile information
* Manage About section
* Add projects
* Edit projects
* Delete projects
* Manage project images
* Manage project technologies
* Add/Edit/Delete skills
* Add/Edit/Delete experience
* Add/Edit/Delete education
* Add custom sections
* Edit custom sections
* Delete custom sections
* Enable/disable sections
* Upload/replace resume
* Update contact information
* Change admin password
* Secure logout

---

# 🚀 Project Management

Projects are stored in the Django database and displayed dynamically on the React frontend.

Each project can contain:

* Project title
* Short description
* Detailed description
* Project image
* Technologies used
* Project category
* GitHub repository URL
* Live demo URL
* Project date
* Featured project status
* Display order

The admin can update project information without modifying the React source code.

---

# 🧩 Dynamic Extra Sections

The application supports custom portfolio sections.

The admin can create additional sections such as:

* Services
* Certifications
* Achievements
* Testimonials
* Hobbies
* Publications
* Blog
* What I Do

Each section can be:

* Created
* Edited
* Deleted
* Enabled
* Disabled
* Reordered

This makes the portfolio flexible and easy to customize.

---

# 🛠️ Technologies Used

## Frontend

| Technology   | Purpose              |
| ------------ | -------------------- |
| React.js     | Frontend development |
| React Router | Page navigation      |
| Axios        | API communication    |
| HTML5        | Structure            |
| CSS3         | Styling              |
| Tailwind CSS | Responsive UI        |
| JavaScript   | Application logic    |

## Backend

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Python                | Backend programming            |
| Django                | Web framework                  |
| Django REST Framework | REST API                       |
| SQLite                | Development database           |
| Pillow                | Image processing               |
| CORS Headers          | Frontend-backend communication |

## Development Tools

| Tool    | Purpose         |
| ------- | --------------- |
| VS Code | Code editor     |
| Git     | Version control |
| GitHub  | Code hosting    |
| Postman | API testing     |
| Figma   | UI design       |

---

# 🏗️ Project Architecture

The application follows a **frontend + REST API backend architecture**.

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │                      │
                    │  Portfolio UI        │
                    │  Admin Dashboard     │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Django Backend     │
                    │                      │
                    │ Django REST Framework│
                    │ Authentication       │
                    │ Business Logic       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Database        │
                    │       SQLite         │
                    └──────────────────────┘
```

---

# 📁 Project Structure

```text
portfolio/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── services/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   ├── portfolio/
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

# 🗄️ Database Models

The backend contains database models for managing portfolio information.

### Profile

Stores:

* Name
* Professional title
* Bio
* Career objective
* Profile image
* Contact information
* Social links
* Resume

### Project

Stores:

* Title
* Description
* Image
* Technologies
* Category
* GitHub URL
* Live URL
* Date
* Featured status

### Skill

Stores:

* Skill name
* Skill category
* Skill level
* Display order

### Experience

Stores:

* Job title
* Company
* Location
* Start date
* End date
* Description

### Education

Stores:

* Degree
* Institution
* Location
* Start year
* End year
* Description

### Extra Section

Stores:

* Section title
* Subtitle
* Description
* Image
* Button
* Button URL
* Display order
* Active status

### Contact Message

Stores:

* Name
* Email
* Subject
* Message
* Created date

---

# 🔗 API Endpoints

Example API structure:

```text
/api/profile/

/api/projects/

/api/projects/<id>/

/api/skills/

/api/experience/

/api/education/

/api/extra-sections/

/api/contact/

/api/auth/login/

/api/auth/logout/

/api/auth/change-password/
```

### HTTP Methods

```text
GET     → Retrieve data
POST    → Create data
PUT     → Update data
PATCH   → Partially update data
DELETE  → Delete data
```

---

# 🔐 Authentication & Security

The admin panel uses Django authentication.

Important security practices implemented:

* Protected admin routes
* Authenticated API requests
* Password hashing through Django
* Protected CRUD operations
* Form validation
* API validation
* Environment variables for sensitive configuration
* No plaintext passwords stored in the database
* Admin credentials are not exposed in the frontend

> **Security Note:** Never commit passwords, API keys, Django secret keys, or `.env` files to GitHub.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd portfolio
```

---

# 🐍 Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` does not exist:

```bash
pip install django djangorestframework django-cors-headers pillow
```

---

## Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Create Admin User

Create the Django admin user securely:

```bash
python manage.py createsuperuser
```

Enter your username and password when prompted.

**Do not put your password in this README or in the GitHub repository.**

---

## Start Django Server

```bash
python manage.py runserver
```

Backend will normally run at:

```text
http://127.0.0.1:8000/
```

---

# ⚛️ Frontend Setup

Open another terminal.

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

---

# 🔧 Environment Variables

Create a `.env` file for environment-specific configuration.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For Django, use environment variables for sensitive settings such as:

```env
DJANGO_SECRET_KEY=your_secret_key
DEBUG=True
```

Add `.env` to `.gitignore`.

---

# 📱 Responsive Design

The portfolio is designed to work across:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The layout adapts automatically to different screen sizes.

---

# 🎨 UI Design

The portfolio follows a classic professional visual style.

Design principles include:

* Clean typography
* Professional spacing
* Minimal visual clutter
* Subtle animations
* Elegant cards
* Responsive layouts
* Clear navigation
* Accessible buttons
* Consistent design system

The goal is to provide a professional experience for recruiters, clients, and visitors.

---

# 🧪 Testing

Before deployment, test:

### Frontend

* Navigation
* Responsive layout
* Forms
* Project cards
* Resume download
* API integration
* Error handling

### Backend

* API endpoints
* CRUD operations
* Authentication
* Password change
* Database operations
* Image uploads
* Form validation

### Security

* Unauthorized admin access
* Invalid login attempts
* Protected API endpoints
* Password validation

---

# 🚀 Future Improvements

Planned improvements may include:

* AI-powered portfolio assistant
* Blog management
* Project search and filtering
* Project categories
* Dark mode
* Visitor analytics
* Email notification system
* PostgreSQL production database
* Cloud image storage
* Automated deployment
* Docker support
* CI/CD pipeline

---

# 💼 Why I Built This Project

I built this project to demonstrate practical knowledge of:

* React.js
* Python
* Django
* Django REST Framework
* REST API development
* Authentication
* CRUD operations
* Database management
* Responsive UI development
* Git & GitHub
* Full-stack application architecture

This project also provides a real-world example of how a frontend application communicates with a backend API.

---

# 👨‍💻 About Me

Hi, I'm **Poovarasan**, a passionate **Python Full Stack Developer** interested in building practical and user-friendly web applications.

### Technical Interests

* Python
* Django
* React.js
* JavaScript
* REST APIs
* Database Management
* Full Stack Web Development
* AI-powered applications

I am continuously improving my development skills by building practical projects and learning modern technologies.

---

# 📫 Contact

### GitHub

`Add your GitHub profile URL`

### LinkedIn

`Add your LinkedIn profile URL`

### Email

`Add your professional email address`

### Portfolio

`Add your deployed portfolio URL`

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project is created for personal portfolio and educational purposes.

You may refer to the project structure and implementation for learning purposes.

---

## ⭐ Project Highlights

```text
✔ React Frontend
✔ Django REST API
✔ Secure Authentication
✔ Admin Dashboard
✔ Dynamic Project Management
✔ CRUD Operations
✔ Dynamic Skills
✔ Dynamic Experience
✔ Dynamic Education
✔ Custom Sections
✔ Resume Management
✔ Contact Form
✔ Responsive Design
✔ Database Integration
✔ Git & GitHub
```

---

**Built with ❤️ by Poovarasan**
