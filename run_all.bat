@echo off
echo ==========================================================
echo Starting Full Stack Portfolio (Django + MySQL + React)
echo ==========================================================

set PYTHON_CMD="C:\Users\ELCOT\AppData\Local\Programs\Python\Python314\python.exe"
if not exist %PYTHON_CMD% set PYTHON_CMD=py

start "Django REST Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && %PYTHON_CMD% manage.py runserver 127.0.0.1:8000"
timeout /t 3 /nobreak >nul
start "React Vite Frontend (Port 3000)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers are launching!
echo Frontend UI:   http://localhost:3000
echo Django REST:   http://127.0.0.1:8000/api/overview/
echo Django Admin:  http://127.0.0.1:8000/admin/
