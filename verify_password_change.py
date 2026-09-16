import urllib.request
import json
import urllib.error

# 1. Login with initial admin credentials
valid_data = json.dumps({"username": "Poovarasan", "password": "Poovarasan31@"}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/login/", data=valid_data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as response:
    token = json.loads(response.read().decode())["token"]

# 2. Test change password with wrong old password
bad_change = json.dumps({
    "current_password": "WrongPassword",
    "new_password": "TemporaryNewPass123@",
    "confirm_new_password": "TemporaryNewPass123@"
}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/change-password/", data=bad_change, headers={"Content-Type": "application/json", "Authorization": f"Token {token}"})
try:
    with urllib.request.urlopen(req) as response:
        assert False, "Should have rejected wrong current password"
except urllib.error.HTTPError as e:
    assert e.code == 400
    err_data = json.loads(e.read().decode())
    print("Wrong current password rejected:", err_data["error"])

# 3. Test correct change password
good_change = json.dumps({
    "current_password": "Poovarasan31@",
    "new_password": "PoovarasanUpdatedPass99@",
    "confirm_new_password": "PoovarasanUpdatedPass99@"
}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/change-password/", data=good_change, headers={"Content-Type": "application/json", "Authorization": f"Token {token}"})
with urllib.request.urlopen(req) as response:
    assert response.status == 200
    res_data = json.loads(response.read().decode())
    print("Password change response:", res_data["message"])

# 4. Confirm old password no longer works
old_login = json.dumps({"username": "Poovarasan", "password": "Poovarasan31@"}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/login/", data=old_login, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as response:
        assert False, "Old password should not work"
except urllib.error.HTTPError as e:
    assert e.code == 401
    print("Old password rejected correctly with 401!")

# 5. Confirm new password works
new_login = json.dumps({"username": "Poovarasan", "password": "PoovarasanUpdatedPass99@"}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/login/", data=new_login, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as response:
    assert response.status == 200
    new_token = json.loads(response.read().decode())["token"]
    print("New password authenticated successfully! New token:", new_token[:8] + "...")

# 6. Reset password back to initial requirement Poovarasan31@ for user convenience
reset_payload = json.dumps({
    "current_password": "PoovarasanUpdatedPass99@",
    "new_password": "Poovarasan31@",
    "confirm_new_password": "Poovarasan31@"
}).encode("utf-8")
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/change-password/", data=reset_payload, headers={"Content-Type": "application/json", "Authorization": f"Token {new_token}"})
with urllib.request.urlopen(req) as response:
    assert response.status == 200
    print("Reset back to standard initial password (Poovarasan31@) for user hand-off.")

print("\nALL PASSWORD LIFECYCLE TESTS VERIFIED PERFECTLY!")
