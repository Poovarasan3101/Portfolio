import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from rest_framework.test import APIClient

client = APIClient()

# 1. Profile test
res = client.get('/api/profile/')
assert res.status_code == 200, f"Profile failed: {res.status_code}"
print("Profile GET OK:", res.data['name'], "-", res.data['title'])

# 2. Projects test
res = client.get('/api/projects/')
assert res.status_code == 200
print("Projects count:", len(res.data))

# 3. Auth failure test
res = client.post('/api/auth/login/', {'username': 'Poovarasan', 'password': 'WrongPassword'}, format='json')
assert res.status_code == 401, f"Expected 401, got {res.status_code}"
assert res.data.get('error') == 'Invalid username or password.'
print("Auth invalid check passed: 'Invalid username or password.'")

# 4. Auth success test
res = client.post('/api/auth/login/', {'username': 'Poovarasan', 'password': 'Poovarasan31@'}, format='json')
assert res.status_code == 200, f"Expected 200, got {res.status_code}"
token = res.data.get('token')
assert token is not None
print("Auth login check passed. Token received:", token[:8] + '...')

# 5. Contact message post
res = client.post('/api/contact/', {'name': 'Recruiter', 'email': 'recruiter@example.com', 'subject': 'Job Opportunity', 'message': 'We liked your portfolio!'}, format='json')
assert res.status_code == 201
print("Contact message submission passed.")

# 6. Admin stats check with token
client.credentials(HTTP_AUTHORIZATION='Token ' + token)
res = client.get('/api/dashboard-stats/')
assert res.status_code == 200
print("Dashboard stats OK:", res.data)
