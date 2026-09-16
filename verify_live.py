import urllib.request
import json
import urllib.error

# 1. Test frontend
req = urllib.request.Request("http://127.0.0.1:5173")
with urllib.request.urlopen(req) as response:
    print("Frontend status:", response.status)
    assert response.status == 200

# 2. Test backend profile
req = urllib.request.Request("http://127.0.0.1:8000/api/profile/")
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    print("Profile GET:", data["name"], "-", data["title"])
    assert data["name"] == "Poovarasan"

# 3. Test backend projects
req = urllib.request.Request("http://127.0.0.1:8000/api/projects/")
with urllib.request.urlopen(req) as response:
    projects = json.loads(response.read().decode())
    print("Projects count:", len(projects), "Sample:", projects[0]["title"])
    assert len(projects) >= 1

# 4. Test backend skills
req = urllib.request.Request("http://127.0.0.1:8000/api/skills/")
with urllib.request.urlopen(req) as response:
    skills = json.loads(response.read().decode())
    print("Skills count:", len(skills))
    assert len(skills) >= 10

# 5. Test invalid login
login_data = json.dumps({"username": "Poovarasan", "password": "WrongPassword"}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/login/", data=login_data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as response:
        assert False, "Should have failed with 401"
except urllib.error.HTTPError as e:
    print("Invalid login correctly rejected with code:", e.code)
    assert e.code == 401
    err_data = json.loads(e.read().decode())
    print("Generic error message:", err_data["error"])
    assert err_data["error"] == "Invalid username or password."

# 6. Test valid login
valid_data = json.dumps({"username": "Poovarasan", "password": "Poovarasan31@"}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/login/", data=valid_data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as response:
    auth_data = json.loads(response.read().decode())
    token = auth_data["token"]
    print("Valid login succeeded! Token:", token[:8] + "...")
    assert "token" in auth_data

# 7. Test authenticated dashboard stats
req = urllib.request.Request("http://127.0.0.1:8000/api/dashboard-stats/", headers={"Authorization": f"Token {token}"})
with urllib.request.urlopen(req) as response:
    stats = json.loads(response.read().decode())
    print("Dashboard stats via live server:", stats)
    assert stats["total_projects"] >= 1

# 8. Test contact submission
contact_payload = json.dumps({
    "name": "Alex Mercer",
    "email": "alex.mercer@example.com",
    "subject": "Senior Python Developer Opportunity",
    "message": "We have an exciting full-stack opportunity matching your experience."
}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/contact/", data=contact_payload, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as response:
    contact_res = json.loads(response.read().decode())
    print("Contact message created successfully with ID:", contact_res["id"])
    assert contact_res["name"] == "Alex Mercer"

print("\nALL LIVE INTEGRATION TESTS PASSED SUCCESSFULLY!")
