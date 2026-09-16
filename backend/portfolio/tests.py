from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from .models import Profile, Project, Skill, Experience, Education, ExtraSection, ContactMessage

class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username="Poovarasan",
            password="Poovarasan31@",
            email="poovarasan.dev@example.com"
        )
        self.token = Token.objects.create(user=self.admin_user)
        self.profile = Profile.objects.create(
            name="Poovarasan",
            title="Python Full Stack Developer"
        )
        self.project = Project.objects.create(
            title="Business Finance Management System",
            short_description="A full-stack web application designed to help businesses.",
            description="Detailed description...",
            technologies="React, Django, SQLite",
            category="Full Stack",
            featured=True,
            display_order=1
        )

    def test_public_endpoints(self):
        res = self.client.get('/api/profile/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['name'], 'Poovarasan')

        res = self.client.get('/api/projects/')
        self.assertEqual(res.status_code, 200)
        self.assertGreaterEqual(len(res.data), 1)

    def test_contact_submission(self):
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Interview Inquiry",
            "message": "We would love to discuss a developer role."
        }
        res = self.client.post('/api/contact/', payload, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertTrue(ContactMessage.objects.filter(email="jane@example.com").exists())

    def test_admin_login_success(self):
        res = self.client.post('/api/auth/login/', {
            "username": "Poovarasan",
            "password": "Poovarasan31@"
        }, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertIn("token", res.data)

    def test_admin_login_failure(self):
        res = self.client.post('/api/auth/login/', {
            "username": "Poovarasan",
            "password": "IncorrectPassword"
        }, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(res.data.get("error"), "Invalid username or password.")

    def test_change_password_flow(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        # Try wrong current password
        res = self.client.post('/api/auth/change-password/', {
            "current_password": "WrongOldPassword",
            "new_password": "NewSecretPassword123@",
            "confirm_new_password": "NewSecretPassword123@"
        }, format='json')
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data.get("error"), "Current password is incorrect.")

        # Correct change
        res = self.client.post('/api/auth/change-password/', {
            "current_password": "Poovarasan31@",
            "new_password": "NewSecretPassword123@",
            "confirm_new_password": "NewSecretPassword123@"
        }, format='json')
        self.assertEqual(res.status_code, 200)

        # Verify old password fails
        self.client.credentials() # clear header
        old_res = self.client.post('/api/auth/login/', {
            "username": "Poovarasan",
            "password": "Poovarasan31@"
        }, format='json')
        self.assertEqual(old_res.status_code, 401)

        # Verify new password succeeds
        new_res = self.client.post('/api/auth/login/', {
            "username": "Poovarasan",
            "password": "NewSecretPassword123@"
        }, format='json')
        self.assertEqual(new_res.status_code, 200)
        self.assertIn("token", new_res.data)
