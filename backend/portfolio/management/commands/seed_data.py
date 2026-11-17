import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import (
    Profile,
    Skill,
    Project,
    Education,
    Experience,
    CourseCertification,
    SocialLink
)


class Command(BaseCommand):
    help = 'Seeds initial portfolio data for Poovarasan (use --upgrade-only to preserve existing records)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--upgrade-only',
            action='store_true',
            help='Non-destructively sync newly added fields and tables without overwriting existing data.',
        )

    def handle(self, *args, **options):
        upgrade_only = options.get('upgrade_only', False)

        # Ensure admin superuser exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'poovarasan31012005@gmail.com', 'poovarasan')
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created with password 'poovarasan'."))

        if upgrade_only:
            self.stdout.write(self.style.NOTICE("Running non-destructive database upgrade sync..."))
            profile = Profile.objects.first()
            if profile:
                profile.github_url = "https://github.com/Poovarasan3101"
                if not profile.resume_file and os.path.exists("media/resumes/Poovarasan_resume01.pdf"):
                    profile.resume_file = "resumes/Poovarasan_resume01.pdf"
                profile.save()
                self.stdout.write(self.style.SUCCESS(f"Profile synced (GitHub & Resume: {profile.resume_file.name})."))

            for edu in Education.objects.all():
                if not edu.start_year and not edu.end_year:
                    if "2022" in edu.period and "2026" in edu.period:
                        edu.start_year = "2022"
                        edu.end_year = "2026"
                        edu.save()
                    elif "2022" in edu.period:
                        edu.end_year = "2022"
                        edu.save()
                    elif "2020" in edu.period:
                        edu.end_year = "2020"
                        edu.save()

            SocialLink.objects.get_or_create(
                platform="LinkedIn",
                defaults={
                    "label": "poovarasan-subramani-310105sana",
                    "url": "https://www.linkedin.com/in/poovarasan-subramani-310105sana",
                    "icon_name": "Linkedin",
                    "is_active": True,
                    "order": 1,
                },
            )
            SocialLink.objects.get_or_create(
                platform="GitHub",
                defaults={
                    "label": "Poovarasan3101",
                    "url": "https://github.com/Poovarasan3101",
                    "icon_name": "Github",
                    "is_active": True,
                    "order": 2,
                },
            )
            if not Experience.objects.exists():
                Experience.objects.create(
                    company_name="Login360, Coimbatore",
                    job_role="Python Full Stack Developer Trainee",
                    employment_type="Training",
                    location="Coimbatore, Tamil Nadu",
                    start_date="May 2026",
                    end_date="September 2026",
                    responsibilities=(
                        "Engineered responsive full-stack web applications using React.js, Tailwind CSS, Python, Django REST Framework, and MySQL.\n"
                        "Designed RESTful APIs with JWT authentication, serializers, and structured CRUD operations.\n"
                        "Developed the Panisudar Job Portal featuring dedicated candidate and recruiter dashboards."
                    ),
                    order=1,
                )
            self.stdout.write(self.style.SUCCESS(
                f"Upgrade sync complete! SocialLinks: {SocialLink.objects.count()}, Experience: {Experience.objects.count()}"
            ))
            return

        self.stdout.write(self.style.NOTICE("Starting full portfolio database seed..."))

        # 1. Profile
        Profile.objects.all().delete()
        resume_path = "resumes/Poovarasan_resume01.pdf" if os.path.exists("media/resumes/Poovarasan_resume01.pdf") else None
        Profile.objects.create(
            name="Poovarasan",
            role="Python Full Stack Developer",
            hero_subheading="Hello, World! I am",
            headline="Building Modern Web Experiences with Code & Creativity.",
            hero_description=(
                "I'm an aspiring Python Full Stack Developer passionate about building "
                "responsive, scalable, and user-friendly web applications using React.js, "
                "Python, Django, and MySQL."
            ),
            short_intro=(
                "Aspiring Python Full Stack Developer specializing in responsive React user interfaces, "
                "scalable Django REST API backends, and relational MySQL persistence."
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
            github_url="https://github.com/Poovarasan3101",
            resume_file=resume_path,
            resume_url="/Poovarasan_Resume.pdf",
        )
        self.stdout.write(self.style.SUCCESS("Profile seeded."))

        # 2. Skills
        Skill.objects.all().delete()
        skills_data = [
            {"category": "frontend", "name": "HTML", "icon_name": "FileCode", "badge_label": "Frontend", "description": "Semantic HTML5 markup and accessible document structure.", "order": 1},
            {"category": "frontend", "name": "CSS", "icon_name": "Palette", "badge_label": "Frontend", "description": "Modern Flexbox, Grid, animations, and responsive layouts.", "order": 2},
            {"category": "frontend", "name": "JavaScript", "icon_name": "Code2", "badge_label": "Core JS", "description": "ES6+, async/await, closures, and API integration.", "order": 3},
            {"category": "frontend", "name": "React.js", "icon_name": "Atom", "badge_label": "Framework", "description": "Component architecture, hooks, routing, and dynamic SPAs.", "order": 4},
            {"category": "frontend", "name": "Tailwind CSS", "icon_name": "Wind", "badge_label": "Styling", "description": "Utility-first design systems and custom dark themes.", "order": 5},
            {"category": "frontend", "name": "Responsive Web Design", "icon_name": "Smartphone", "badge_label": "UI/UX", "description": "Mobile-first adaptive layouts across all screen sizes.", "order": 6},
            {"category": "frontend", "name": "DOM Manipulation", "icon_name": "Layers", "badge_label": "Interactive", "description": "Dynamic UI state handling and browser events.", "order": 7},
            {"category": "backend", "name": "Python", "icon_name": "Binary", "badge_label": "Core Language", "description": "Clean Python scripting, backend architecture, and automation.", "order": 1},
            {"category": "backend", "name": "Django", "icon_name": "Server", "badge_label": "Full-Stack Web", "description": "MVT architecture, ORM, migrations, and admin systems.", "order": 2},
            {"category": "backend", "name": "RESTful APIs", "icon_name": "Cpu", "badge_label": "API Architecture", "description": "Django REST Framework serializers, permissions, and JWT auth.", "order": 3},
            {"category": "backend", "name": "OOP", "icon_name": "Boxes", "badge_label": "Design Patterns", "description": "Modular, maintainable object-oriented software architecture.", "order": 4},
            {"category": "backend", "name": "CRUD Operations", "icon_name": "DatabaseBackup", "badge_label": "Data Operations", "description": "End-to-end create, read, update, and delete persistence.", "order": 5},
            {"category": "database", "name": "MySQL", "icon_name": "Database", "badge_label": "Relational DB", "description": "Schema design, joins, indexing, and transactional integrity.", "order": 1},
            {"category": "database", "name": "SQLite", "icon_name": "HardDrive", "badge_label": "Embedded DB", "description": "Lightweight relational database for rapid prototyping.", "order": 2},
            {"category": "tools", "name": "Visual Studio Code", "icon_name": "TerminalSquare", "badge_label": "Editor", "description": "Primary full-stack code editor and debugging environment.", "order": 1},
            {"category": "tools", "name": "Cursor", "icon_name": "Sparkles", "badge_label": "AI IDE", "description": "AI-accelerated software development and refactoring.", "order": 2},
            {"category": "tools", "name": "Git", "icon_name": "GitBranch", "badge_label": "VCS", "description": "Branching, merging, and version control workflows.", "order": 3},
            {"category": "tools", "name": "GitHub", "icon_name": "Github", "badge_label": "Collaboration", "description": "Remote repositories, pull requests, and issue tracking.", "order": 4},
            {"category": "tools", "name": "GitHub Copilot", "icon_name": "Bot", "badge_label": "AI Pair Dev", "description": "AI-assisted coding and boilerplate acceleration.", "order": 5},
            {"category": "soft_skills", "name": "Problem-Solving", "icon_name": "Brain", "badge_label": "Core Competency", "description": "Structured root-cause diagnosis and engineering solutions.", "order": 1},
            {"category": "soft_skills", "name": "Analytical Thinking", "icon_name": "SearchCode", "badge_label": "Logic & Systems", "description": "Breaking complex requirements into modular workflows.", "order": 2},
            {"category": "soft_skills", "name": "Effective Communication", "icon_name": "MessageSquare", "badge_label": "Interpersonal", "description": "Clear technical documentation and team collaboration.", "order": 3},
            {"category": "soft_skills", "name": "Teamwork & Collaboration", "icon_name": "Users", "badge_label": "Team Player", "description": "Working seamlessly across design, frontend, and backend.", "order": 4},
            {"category": "soft_skills", "name": "Adaptability", "icon_name": "RefreshCw", "badge_label": "Fast Learner", "description": "Rapidly adopting new frameworks and engineering tools.", "order": 5},
            {"category": "soft_skills", "name": "Debugging", "icon_name": "Bug", "badge_label": "Problem Isolation", "description": "Methodical tracing and resolving runtime issues.", "order": 6},
            {"category": "soft_skills", "name": "Time Management", "icon_name": "Clock", "badge_label": "Productivity", "description": "Consistent milestone execution and sprint delivery.", "order": 7},
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
                    "next career move and talent recruiters managing high-volume applicant pipelines."
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
                "github_url": "https://github.com/Poovarasan3101",
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
                "github_url": "https://github.com/Poovarasan3101",
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
                "start_year": "2022",
                "end_year": "2026",
                "period": "2022 – 2026",
                "location": "Salem",
                "description": "Graduating with strong foundations in full stack web development, object-oriented programming, data structures, and database management.",
                "order": 1
            },
            {
                "degree": "HSC (Higher Secondary Certificate)",
                "institution": "Government Higher Secondary School",
                "start_year": "",
                "end_year": "2022",
                "period": "2022",
                "location": "Aragalur, Salem",
                "description": "Completed higher secondary education with strong focus in Mathematics and Science.",
                "order": 2
            },
            {
                "degree": "SSLC (Secondary School Leaving Certificate)",
                "institution": "Government Higher Secondary School",
                "start_year": "",
                "end_year": "2020",
                "period": "2020",
                "location": "Aragalur, Salem",
                "description": "Completed secondary education with scholastic distinction.",
                "order": 3
            },
        ]
        for ed in education_data:
            Education.objects.create(**ed)
        self.stdout.write(self.style.SUCCESS(f"{len(education_data)} education entries seeded."))

        # 5. Experience
        Experience.objects.all().delete()
        Experience.objects.create(
            company_name="Login360, Coimbatore",
            job_role="Python Full Stack Developer Trainee",
            employment_type="Training",
            location="Coimbatore, Tamil Nadu",
            start_date="May 2026",
            end_date="September 2026",
            responsibilities=(
                "Engineered responsive full-stack web applications using React.js, Tailwind CSS, Python, Django REST Framework, and MySQL.\n"
                "Designed RESTful APIs with JWT authentication, serializers, and structured CRUD operations.\n"
                "Developed the Panisudar Job Portal featuring dedicated candidate and recruiter dashboards."
            ),
            order=1,
        )
        self.stdout.write(self.style.SUCCESS("Experience seeded."))

        # 6. Courses & Certifications
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

        # 7. Social Links
        SocialLink.objects.all().delete()
        SocialLink.objects.create(
            platform="LinkedIn",
            label="poovarasan-subramani-310105sana",
            url="https://www.linkedin.com/in/poovarasan-subramani-310105sana",
            icon_name="Linkedin",
            is_active=True,
            order=1,
        )
        SocialLink.objects.create(
            platform="GitHub",
            label="Poovarasan3101",
            url="https://github.com/Poovarasan3101",
            icon_name="Github",
            is_active=True,
            order=2,
        )
        self.stdout.write(self.style.SUCCESS("Social links seeded."))
        self.stdout.write(self.style.SUCCESS("All portfolio data successfully populated!"))
