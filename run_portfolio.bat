@echo off
echo ============================================================
echo Starting Poovarasan Portfolio Web Application
echo ============================================================

echo Starting Django Backend Server on http://127.0.0.1:8000 ...
start "Django Backend Server" cmd /k "cd backend && python manage.py migrate && python manage.py setup_portfolio && python manage.py runserver 127.0.0.1:8000"

timeout /t 3 /nobreak >nul

echo Starting Vite Frontend Server on http://localhost:5173 ...
start "Vite React Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are launching!
echo Public Portfolio: http://localhost:5173
echo Admin Login:      http://localhost:5173/admin/login
echo Initial Admin:    Poovarasan / Poovarasan31@
echo ============================================================
pause
