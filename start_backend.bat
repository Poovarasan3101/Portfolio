@echo off
echo ====================================================
echo Starting Poovarasan Portfolio - Django REST Backend
echo Database: MySQL (Myportfolio)
echo Admin: http://127.0.0.1:8000/admin/
echo API:   http://127.0.0.1:8000/api/
echo ====================================================
cd backend
python manage.py runserver 127.0.0.1:8000
pause
