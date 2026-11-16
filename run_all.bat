@echo off
echo ==========================================================
echo Starting Full Stack Portfolio (Django + MySQL + React)
echo ==========================================================
start "Django REST Backend (Port 8000)" cmd /k "cd backend && python manage.py runserver 127.0.0.1:8000"
timeout /t 3 /nobreak >nul
start "React Vite Frontend (Port 3000)" cmd /k "cd frontend && npm run dev"
echo Both servers initiated!
echo Frontend: http://localhost:3000
echo Backend API: http://127.0.0.1:8000/api/
echo Django Admin: http://127.0.0.1:8000/admin/
