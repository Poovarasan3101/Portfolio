from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import (
    Profile,
    Skill,
    Project,
    Education,
    CourseCertification
)

class Command(BaseCommand):
    help = 'Seeds initial portfolio data for Poovarasan'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Starting portfolio database seed..."))

        # Create or update superuser for Django Admin
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'poovarasan31012005@gmail.com', 'poovarasan')
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created with password 'poovarasan'."))

        # 1. Profile
        Profile.objects.all().delete()
        profile = Profile.objects.create(
            name="Poovarasan",
            role="Python Full Stack Developer",
            headline="Building Modern Web Experiences with Code & Creativity.",
            hero_description=(
                "I'm an aspiring Python Full Stack Developer passionate about building "
                "responsive, scalable, and user-friendly web applications using React.js, "
                "Python, Django, and MySQL."
            ),
            about_bio=(
                "I'm Poovarasan, a Computer Science and Engineering graduate with an interest in "
                "full-stack web development. I enjoy developing modern web applications, solving "
                "technical problems, and learning new technologies. My goal is to create practical "
                "and user-friendly digital solutions."
            ),
            email="poovarasan31012005@gmail.com",
            phone="+91-9629617818",
            location="Salem, Tamil Nadu, India",
            linkedin_url="https://www.linkedin.com/in/poovarasan-subramani-310105sana",
            github_url="https://github.com/poovarasan-subramani",
            resume_url="/Poovarasan_Resume.pdf"
        )
        self.stdout.write(self.style.SUCCESS("Profile seeded."))

        # 2. Skills
        Skill.objects.all().delete()
        skills_data = [
            # Frontend
            {"category": "frontend", "name": "HTML", "icon_name": "FileCode", "badge_label": "Frontend", "order": 1},
            {"category": "frontend", "name": "CSS", "icon_name": "Palette", "badge_label": "Frontend", "order": 2},
            {"category": "frontend", "name": "JavaScript", "icon_name": "Code2", "badge_label": "Core JS", "order": 3},
            {"category": "frontend", "name": "React.js", "icon_name": "Atom", "badge_label": "Framework", "order": 4},
            {"category": "frontend", "name": "Tailwind CSS", "icon_name": "Wind", "badge_label": "Styling", "order": 5},
            {"category": "frontend", "name": "Responsive Web Design", "icon_name": "Smartphone", "badge_label": "UI/UX", "order": 6},
            {"category": "frontend", "name": "DOM Manipulation", "icon_name": "Layers", "badge_label": "Interactive", "order": 7},
            
            # Backend
            {"category": "backend", "name": "Python", "icon_name": "Binary", "badge_label": "Core Language", "order": 1},
            {"category": "backend", "name": "Django", "icon_name": "Server", "badge_label": "Full-Stack Web", "order": 2},
            {"category": "backend", "name": "RESTful APIs", "icon_name": "Cpu", "badge_label": "API Architecture", "order": 3},
            {"category": "backend", "name": "OOP", "icon_name": "Boxes", "badge_label": "Design Patterns", "order": 4},
            {"category": "backend", "name": "CRUD Operations", "icon_name": "DatabaseBackup", "badge_label": "Data Operations", "order": 5},

            # Database
            {"category": "database", "name": "MySQL", "icon_name": "Database", "badge_label": "Relational DB", "order": 1},
            {"category": "database", "name": "SQLite", "icon_name": "HardDrive", "badge_label": "Embedded DB", "order": 2},

            # Tools
            {"category": "tools", "name": "Visual Studio Code", "icon_name": "TerminalSquare", "badge_label": "Editor", "order": 1},
            {"category": "tools", "name": "Cursor", "icon_name": "Sparkles", "badge_label": "AI IDE", "order": 2},
            {"category": "tools", "name": "Git", "icon_name": "GitBranch", "badge_label": "VCS", "order": 3},
            {"category": "tools", "name": "GitHub", "icon_name": "Github", "badge_label": "Collaboration", "order": 4},
            {"category": "tools", "name": "GitHub Copilot", "icon_name": "Bot", "badge_label": "AI Pair Dev", "order": 5},

            # Soft Skills
            {"category": "soft_skills", "name": "Problem-Solving", "icon_name": "Brain", "badge_label": "Core Competency", "order": 1},
            {"category": "soft_skills", "name": "Analytical Thinking", "icon_name": "SearchCode", "badge_label": "Logic & Systems", "order": 2},
            {"category": "soft_skills", "name": "Effective Communication", "icon_name": "MessageSquare", "badge_label": "Interpersonal", "order": 3},
            {"category": "soft_skills", "name": "Teamwork & Collaboration", "icon_name": "Users", "badge_label": "Team Player", "order": 4},
            {"category": "soft_skills", "name": "Adaptability", "icon_name": "RefreshCw", "badge_label": "Fast Learner", "order": 5},
            {"category": "soft_skills", "name": "Debugging", "icon_name": "Bug", "badge_label": "Problem Isolation", "order": 6},
            {"category": "soft_skills", "name": "Time Management", "icon_name": "Clock", "badge_label": "Productivity", "order": 7},
        ]
        for s in skills_data:
            Skill.objects.create(**s)
        self.stdout.write(self.style.SUCCESS(f"{len(skills_data)} skills seeded."))

        # 3. Projects
        Project.objects.all().delete()
        projects_data = [
            {
                "title": "Panisudar – Job Portal Web Application",
                "slug": "panisudar-job-portal",
                "duration": "September 2026 – October 2026",
                "short_description": "Developed a responsive job portal for job seekers and recruiters with dedicated dashboards.",
                "full_description": (
                    "Panisudar is an end-to-end modern recruitment platform built to streamline the hiring process. "
                    "It features dual dedicated dashboard experiences tailored specifically for job seekers looking for their "
                    "next career move and talent recruiters managing high-volume applicant pipelines. "
                    "Engineered with clean architectural principles, responsive UI, real-time status updates, and robust API endpoints."
                ),
                "technologies": ["React.js", "Vite", "Tailwind CSS", "React Router", "Axios", "Django REST Framework", "MySQL"],
                "features": [
                    "Job search with multi-criteria dynamic filtering",
                    "Saved jobs & bookmarking functionality",
                    "Application lifecycle tracking for candidates",
                    "Dedicated Recruiter dashboard for job postings",
                    "Applicant pipeline management & status reviews",
                    "Detailed company profiles with open position views",
                    "Real-time notifications & application updates"
                ],
                "image_url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
                "github_url": "https://github.com/poovarasan-subramani",
                "live_demo_url": "https://panisudar-jobs.demo.app",
                "featured": True,
                "order": 1
            },
            {
                "title": "Full-Stack Task & Workflow Orchestration API",
                "slug": "task-workflow-api",
                "duration": "July 2026 – August 2026",
                "short_description": "A RESTful micro-service with JWT authentication, CRUD operations, and relational MySQL persistence.",
                "full_description": (
                    "High-performance backend API designed with Django REST Framework and MySQL. "
                    "Implements role-based access control (RBAC), token refresh cycles, and optimized queries with Django ORM."
                ),
                "technologies": ["Python", "Django", "Django REST Framework", "MySQL", "JWT", "Tailwind CSS"],
                "features": [
                    "Secure JWT authentication and session protection",
                    "Full CRUD data persistence with relational integrity",
                    "Pagination, ordering, and filter backends",
                    "Comprehensive API test coverage and documentation"
                ],
                "image_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
                "github_url": "https://github.com/poovarasan-subramani",
                "live_demo_url": "https://workflow-api.demo.app",
                "featured": True,
                "order": 2
            }
        ]
        for p in projects_data:
            Project.objects.create(**p)
        self.stdout.write(self.style.SUCCESS(f"{len(projects_data)} projects seeded."))

        # 4. Education
        Education.objects.all().delete()
        education_data = [
            {
                "degree": "B.E. Computer Science and Engineering",
                "institution": "Ganesh College of Engineering",
                "period": "2022 – 2026",
                "location": "Salem",
                "description": "Graduating with strong foundations in full stack web development, object-oriented programming, data structures, and database management.",
                "order": 1
            },
            {
                "degree": "HSC (Higher Secondary Certificate)",
                "institution": "Government Higher Secondary School",
                "period": "2022",
                "location": "Aragalur, Salem",
                "description": "Completed higher secondary education with strong focus in Mathematics and Science.",
                "order": 2
            },
            {
                "degree": "SSLC (Secondary School Leaving Certificate)",
                "institution": "Government Higher Secondary School",
                "period": "2020",
                "location": "Aragalur, Salem",
                "description": "Completed secondary education with scholastic distinction.",
                "order": 3
            },
        ]
        for ed in education_data:
            Education.objects.create(**ed)
        self.stdout.write(self.style.SUCCESS(f"{len(education_data)} education entries seeded."))

        # 5. Courses & Certifications
        CourseCertification.objects.all().delete()
        cert_data = [
            {
                "entry_type": "course",
                "title": "Python Full Stack Development",
                "issuer": "Login360, Coimbatore",
                "period_or_date": "May 2026 – September 2026",
                "skills_covered": "Python, Django, React.js, RESTful APIs, MySQL, Frontend & Backend Architecture",
                "image_url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
                "credential_url": "",
                "order": 1
            },
            {
                "entry_type": "certification",
                "title": "Python Programming",
                "issuer": "YARD STICK, Salem",
                "period_or_date": "2026",
                "skills_covered": "Core Python, OOP, Data Structures, Algorithms, Modular Programming",
                "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
                "credential_url": "",
                "order": 2
            },
            {
                "entry_type": "certification",
                "title": "Python Full Stack Development",
                "issuer": "Login360, Coimbatore",
                "period_or_date": "2026",
                "skills_covered": "React.js, Django, REST APIs, Database Optimization, Full Stack Deployment",
                "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
                "credential_url": "",
                "order": 3
            },
            {
                "entry_type": "certification",
                "title": "Android App Development",
                "issuer": "Wings Technology, Salem",
                "period_or_date": "2025",
                "skills_covered": "Mobile Architecture, Java/Kotlin, UI/UX Components, API Integration",
                "image_url": "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80",
                "credential_url": "",
                "order": 4
            },
            {
                "entry_type": "certification",
                "title": "AI and Green Skills",
                "issuer": "Naan Mudhalvan",
                "period_or_date": "2025",
                "skills_covered": "Artificial Intelligence Basics, Sustainable Tech, Prompt Engineering, Digital Innovations",
                "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
                "credential_url": "",
                "order": 5
            }
        ]
        for c in cert_data:
            CourseCertification.objects.create(**c)
        self.stdout.write(self.style.SUCCESS(f"{len(cert_data)} courses/certifications seeded."))
        self.stdout.write(self.style.SUCCESS("All portfolio data successfully populated!"))
