from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from rest_framework.test import APIClient
from portfolio.models import (
    Profile,
    Skill,
    Project,
    Education,
    Experience,
    CourseCertification,
    SocialLink,
    ContactMessage,
)


class DynamicPortfolioCMSAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username="testadmin",
            email="admin@example.com",
            password="AdminPassword123",
        )
        self.profile = Profile.objects.create(
            name="Poovarasan",
            role="Python Full Stack Developer",
            email="poovarasan31012005@gmail.com",
        )

    def authenticate_admin(self):
        res = self.client.post(
            '/api/admin/login/',
            {"username": "testadmin", "password": "AdminPassword123"},
            format='json',
        )
        self.assertEqual(res.status_code, 200)
        self.assertIn('access', res.data)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {res.data['access']}")
        return res.data

    def test_public_read_and_protected_writes(self):
        # Public GET works
        res = self.client.get('/api/overview/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['profile']['name'], 'Poovarasan')

        # Unauthenticated POST to skills is blocked
        res = self.client.post('/api/skills/', {"name": "Docker", "category": "tools"}, format='json')
        self.assertIn(res.status_code, (401, 403))

        # Unauthenticated GET to admin dashboard is blocked
        res = self.client.get('/api/admin/dashboard/')
        self.assertIn(res.status_code, (401, 403))

        # Unauthenticated GET to contact messages is blocked
        res = self.client.get('/api/contact/')
        self.assertIn(res.status_code, (401, 403))

    def test_admin_crud_skills_projects_education_experience_certificates_social(self):
        self.authenticate_admin()

        # 1. Profile & Hero PATCH
        res = self.client.patch(
            '/api/profile/',
            {"headline": "Updated Dynamic Headline", "hero_primary_btn_text": "Explore Work"},
            format='json',
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['headline'], "Updated Dynamic Headline")

        # 2. Skills CRUD
        res = self.client.post(
            '/api/skills/',
            {"name": "Docker", "category": "tools", "icon_name": "Boxes", "description": "Containerization"},
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        skill_id = res.data['id']
        res = self.client.patch(f'/api/skills/{skill_id}/', {"description": "Container orchestration"}, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['description'], "Container orchestration")
        res = self.client.delete(f'/api/skills/{skill_id}/')
        self.assertEqual(res.status_code, 204)

        # 3. Projects CRUD (auto-slug + list parsing)
        res = self.client.post(
            '/api/projects/',
            {
                "title": "Dynamic CMS Portfolio",
                "duration": "Nov 2026",
                "short_description": "Dynamic portfolio with React and Django",
                "technologies": ["React", "Django", "MySQL"],
                "features": ["JWT Auth", "Full CRUD"],
                "featured": True,
            },
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        proj_id = res.data['id']
        self.assertEqual(res.data['slug'], 'dynamic-cms-portfolio')
        res = self.client.patch(f'/api/projects/{proj_id}/', {"featured": False}, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertFalse(res.data['featured'])
        res = self.client.delete(f'/api/projects/{proj_id}/')
        self.assertEqual(res.status_code, 204)

        # 4. Education CRUD
        res = self.client.post(
            '/api/education/',
            {
                "degree": "M.Tech AI",
                "institution": "Test University",
                "location": "Chennai",
                "start_year": "2026",
                "end_year": "2028",
                "description": "Postgraduate research",
            },
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data['period'], "2026 – 2028")
        res = self.client.delete(f"/api/education/{res.data['id']}/")
        self.assertEqual(res.status_code, 204)

        # 5. Experience CRUD
        res = self.client.post(
            '/api/experience/',
            {
                "company_name": "Acme Corp",
                "job_role": "Full Stack Engineer",
                "employment_type": "Full-Time",
                "start_date": "Oct 2026",
                "end_date": "Present",
                "responsibilities": "Built APIs\nBuilt React UI",
            },
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        self.assertEqual(len(res.data['responsibilities_list']), 2)
        res = self.client.delete(f"/api/experience/{res.data['id']}/")
        self.assertEqual(res.status_code, 204)

        # 6. Certificates CRUD
        res = self.client.post(
            '/api/certificates/',
            {
                "title": "AWS Cloud Practitioner",
                "issuer": "Amazon Web Services",
                "period_or_date": "2026",
                "credential_url": "https://aws.amazon.com/verify",
            },
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        res = self.client.delete(f"/api/certificates/{res.data['id']}/")
        self.assertEqual(res.status_code, 204)

        # 7. Social Links CRUD
        res = self.client.post(
            '/api/social-links/',
            {"platform": "Instagram", "url": "https://instagram.com/poovarasan", "icon_name": "Instagram"},
            format='json',
        )
        self.assertEqual(res.status_code, 201)
        res = self.client.delete(f"/api/social-links/{res.data['id']}/")
        self.assertEqual(res.status_code, 204)

    def test_resume_upload_validation_and_delete(self):
        self.authenticate_admin()

        # Reject invalid extension
        bad_file = SimpleUploadedFile("bad.txt", b"not a pdf", content_type="text/plain")
        res = self.client.post('/api/resume/', {"resume_file": bad_file}, format='multipart')
        self.assertEqual(res.status_code, 400)

        # Accept valid PDF
        good_pdf = SimpleUploadedFile("test_resume.pdf", b"%PDF-1.4\n%%EOF", content_type="application/pdf")
        res = self.client.post('/api/resume/', {"resume_file": good_pdf}, format='multipart')
        self.assertEqual(res.status_code, 200)
        self.assertTrue(res.data['has_resume'])

        # Delete resume
        res = self.client.delete('/api/resume/')
        self.assertEqual(res.status_code, 200)
        self.assertFalse(res.data['has_resume'])

    def test_contact_workflow_and_dashboard_and_password_change(self):
        # Public visitor submits message
        payload = {
            "name": "Alex Recruiter",
            "email": "alex@company.com",
            "subject": "Hiring Inquiry",
            "message": "Interested in your Python Full Stack profile.",
        }
        res = self.client.post('/api/contact/', payload, format='json')
        self.assertEqual(res.status_code, 201)
        msg_id = res.data['data']['id']

        # Admin views dashboard and marks message read
        self.authenticate_admin()
        dash = self.client.get('/api/admin/dashboard/')
        self.assertEqual(dash.status_code, 200)
        self.assertEqual(dash.data['stats']['unread_messages'], 1)

        res = self.client.patch(f'/api/contact/{msg_id}/', {"is_read": True}, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertTrue(res.data['is_read'])

        # Admin changes password
        res = self.client.post(
            '/api/admin/change-password/',
            {
                "old_password": "AdminPassword123",
                "new_password": "NewStrongPassword456",
                "confirm_password": "NewStrongPassword456",
            },
            format='json',
        )
        self.assertEqual(res.status_code, 200)
        self.admin_user.refresh_from_db()
        self.assertTrue(self.admin_user.check_password("NewStrongPassword456"))
