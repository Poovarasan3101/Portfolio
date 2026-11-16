from django.test import TestCase
from rest_framework.test import APIClient
from portfolio.models import Profile, Skill, Project, Education, CourseCertification, ContactMessage

class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.profile = Profile.objects.create(
            name="Poovarasan",
            role="Python Full Stack Developer",
            email="poovarasan31012005@gmail.com"
        )
        self.skill = Skill.objects.create(
            category="backend",
            name="Python",
            icon_name="Binary",
            badge_label="Core"
        )
        self.project = Project.objects.create(
            title="Panisudar – Job Portal Web Application",
            slug="panisudar-job-portal",
            short_description="Job portal platform",
            technologies=["React.js", "Django", "MySQL"]
        )

    def test_overview_endpoint(self):
        response = self.client.get('/api/overview/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('profile', response.data)
        self.assertEqual(response.data['profile']['name'], 'Poovarasan')

    def test_contact_submission(self):
        payload = {
            "name": "Alex Tech",
            "email": "alex@example.com",
            "subject": "Role Discussion",
            "message": "Let's connect regarding a Full Stack role."
        }
        response = self.client.post('/api/contact/', payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(ContactMessage.objects.filter(email="alex@example.com").exists())
