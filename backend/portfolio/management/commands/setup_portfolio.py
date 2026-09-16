import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import Profile, Project, Skill, Experience, Education, ExtraSection

class Command(BaseCommand):
    help = "Bootstrap the initial administrator and seed portfolio data"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Initializing Portfolio Setup..."))

        # 1. Ensure initial admin user exists
        admin_username = "Poovarasan"
        admin_password = "Poovarasan31@"
        admin_email = "poovarasan.dev@example.com"

        user, created = User.objects.get_or_create(username=admin_username)
        if created:
            user.set_password(admin_password)
            user.email = admin_email
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Created initial admin user: {admin_username}"))
        else:
            self.stdout.write(self.style.NOTICE(f"Admin user '{admin_username}' already exists. Preserving credentials."))

        # 2. Seed or update Profile
        profile, p_created = Profile.objects.get_or_create(id=1)
        profile.name = "Poovarasan"
        profile.title = "Python Full Stack Developer"
        profile.hero_subtitle = (
            "I am a passionate Python Full Stack Developer focused on building "
            "practical, responsive, and user-friendly web applications."
        )
        if p_created or not profile.bio:
            profile.bio = (
                "Hello! I am Poovarasan, a dedicated Python Full Stack Developer with an eye for "
                "clean architecture, robust API design, and intuitive user experiences. I bridge the "
                "gap between powerful backend systems built with Django / Django REST Framework and "
                "dynamic, elegant web interfaces powered by React and modern styling."
            )
            profile.career_objective = (
                "To leverage my deep technical expertise in Python full-stack engineering, API security, "
                "and modern frontend architectures to build scalable, mission-critical applications that "
                "solve genuine business problems and deliver exceptional user experiences."
            )
            profile.developer_background = (
                "With a foundational degree in Computer Science & Engineering and focused hands-on experience "
                "with Python ecosystems, I specialize in architecting full-stack web applications from relational "
                "database schema modeling to secure authentication flows and seamless client-side state handling."
            )
            profile.interests = (
                "System architecture, RESTful API design, database query optimization, clean code methodologies, "
                "modern React patterns, responsive design systems, and open-source software."
            )
            profile.strengths = (
                "Full-stack problem solving, Django & DRF proficiency, React component architecture, "
                "relational database design (PostgreSQL/MySQL/SQLite), git workflow, and rapid prototyping."
            )
            profile.email = "poovarasan.dev@example.com"
            profile.phone = "+91 9876543210"
            profile.location = "Tamil Nadu, India"
            profile.github = "https://github.com/Poovarasan"
            profile.linkedin = "https://linkedin.com/in/poovarasan"
            profile.save()
            self.stdout.write(self.style.SUCCESS("Seeded Profile information."))

        # 3. Seed Skills if table is empty
        if Skill.objects.count() == 0:
            skills_data = [
                # Frontend
                ("HTML", "Frontend", 95, 1),
                ("CSS", "Frontend", 90, 2),
                ("JavaScript", "Frontend", 88, 3),
                ("React.js", "Frontend", 88, 4),
                ("Tailwind CSS", "Frontend", 90, 5),
                # Backend
                ("Python", "Backend", 92, 1),
                ("Django", "Backend", 90, 2),
                ("Django REST Framework", "Backend", 89, 3),
                # Database
                ("MySQL", "Database", 85, 1),
                ("SQLite", "Database", 90, 2),
                ("PostgreSQL", "Database", 86, 3),
                # Tools
                ("Git", "Tools", 90, 1),
                ("GitHub", "Tools", 90, 2),
                ("VS Code", "Tools", 92, 3),
                ("Figma", "Tools", 80, 4),
            ]
            for name, cat, lvl, order in skills_data:
                Skill.objects.create(name=name, category=cat, level=lvl, display_order=order)
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(skills_data)} skills."))

        # 4. Seed Projects if table is empty
        if Project.objects.count() == 0:
            p1 = Project.objects.create(
                title="Business Finance Management System",
                short_description="A full-stack web application designed to help businesses manage income, expenses, transactions, and financial information through a simple and user-friendly interface.",
                description=(
                    "The Business Finance Management System is a comprehensive full-stack solution designed "
                    "to streamline financial record-keeping for businesses and freelancers. It features income and "
                    "expense categorization, multi-currency transaction logging, real-time cash flow analytics, "
                    "and automated monthly financial balance reports. Built with a modular React frontend and "
                    "a secure Django REST Framework backend with token-based authentication and SQLite/PostgreSQL support."
                ),
                technologies="React, Django, Django REST Framework, SQLite, Tailwind CSS",
                github_url="https://github.com/Poovarasan/business-finance-management",
                live_url="https://finance-management-demo.example.com",
                category="Full Stack",
                project_date="2025",
                featured=True,
                display_order=1,
            )

            p2 = Project.objects.create(
                title="Enterprise Workflow & Task Management Portal",
                short_description="Collaborative project management tool featuring agile boards, milestone tracking, team role assignment, and automated notifications.",
                description=(
                    "An enterprise-ready project and task collaboration suite. Teams can create workspaces, "
                    "organize sprints, assign priority-based tickets, and monitor delivery deadlines. Includes "
                    "granular user access control, RESTful API endpoints for external integrations, and interactive "
                    "drag-and-drop workflow stages."
                ),
                technologies="React, Django REST Framework, PostgreSQL, Tailwind CSS",
                github_url="https://github.com/Poovarasan/workflow-task-portal",
                live_url="https://task-portal-demo.example.com",
                category="Full Stack",
                project_date="2024",
                featured=True,
                display_order=2,
            )

            p3 = Project.objects.create(
                title="High-Performance E-Commerce REST API",
                short_description="Scalable and secure backend API engine powering product catalogues, cart management, checkout order flows, and customer authentication.",
                description=(
                    "Engineered a robust e-commerce API backend utilizing Django REST Framework. "
                    "Implements token-based user authentication, category hierarchy filtering, inventory stock tracking, "
                    "and order state machine transitions. Designed with database query optimizations and defensive API security."
                ),
                technologies="Python, Django, Django REST Framework, SQLite, Token Auth",
                github_url="https://github.com/Poovarasan/ecommerce-rest-engine",
                live_url="",
                category="Backend",
                project_date="2024",
                featured=False,
                display_order=3,
            )
            self.stdout.write(self.style.SUCCESS("Seeded sample projects including Business Finance Management System."))

        # 5. Seed Experience if empty
        if Experience.objects.count() == 0:
            Experience.objects.create(
                job_title="Python Full Stack Developer",
                company="Tech Solutions & Innovation Labs",
                location="Chennai, Tamil Nadu",
                start_date="2024",
                end_date="Present",
                is_current=True,
                is_fresher_notice=False,
                description=(
                    "Designed, developed, and maintained production full-stack web applications. "
                    "Created robust REST APIs using Django REST Framework and built intuitive, responsive "
                    "user interfaces with React.js and Tailwind CSS. Implemented secure authentication, "
                    "database schema migrations, and optimized SQL queries."
                ),
                display_order=1,
            )
            self.stdout.write(self.style.SUCCESS("Seeded Experience entry."))

        # 6. Seed Education if empty
        if Education.objects.count() == 0:
            Education.objects.create(
                degree="Bachelor of Engineering in Computer Science and Engineering",
                institution="Anna University Affiliated Engineering College",
                location="Tamil Nadu, India",
                start_year="2020",
                end_year="2024",
                description="Specialized in software engineering, database management systems, data structures, and web technologies. Graduated with First Class with Distinction.",
                display_order=1,
            )
            self.stdout.write(self.style.SUCCESS("Seeded Education entry."))

        # 7. Seed Extra Sections if empty
        if ExtraSection.objects.count() == 0:
            ExtraSection.objects.create(
                title="Services & Solutions",
                subtitle="High-impact software engineering capabilities tailored to modern businesses",
                description=(
                    "1. Custom Full-Stack Web Applications: End-to-end development with React and Django.\n"
                    "2. RESTful API Architecture: Scalable, documented, and secure API microservices.\n"
                    "3. Database Design & Optimization: Clean schema design for PostgreSQL, MySQL, and SQLite.\n"
                    "4. Responsive Web Design: Pixel-perfect, accessible layouts that work seamlessly across all devices."
                ),
                button_text="Get in Touch",
                button_url="#contact",
                display_order=1,
                is_active=True,
            )
            ExtraSection.objects.create(
                title="Certifications & Recognitions",
                subtitle="Continuous growth and verified software development credentials",
                description=(
                    "• Certified Python Full Stack Developer - Modern Web Development Program\n"
                    "• Advanced React & Component Architecture Specialist\n"
                    "• Relational Database Systems & SQL Performance Certification"
                ),
                button_text="View Skills",
                button_url="#skills",
                display_order=2,
                is_active=True,
            )
            self.stdout.write(self.style.SUCCESS("Seeded Extra Sections."))

        self.stdout.write(self.style.SUCCESS("Portfolio setup completed successfully!"))
