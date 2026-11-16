@echo off
echo ====================================================
echo Starting Poovarasan Portfolio - Django REST Backend
echo Database: MySQL (Myportfolio)
echo Admin: http://127.0.0.1:8000/admin/
echo API:   http://127.0.0.1:8000/api/
echo ====================================================
cd /d "%~dp0backend"

:: Try py launcher or explicit Python 3.14 path or standard python
if exist "C:\Users\ELCOT\AppData\Local\Programs\Python\Python314\python.exe" (
    "C:\Users\ELCOT\AppData\Local\Programs\Python\Python314\python.exe" manage.py runserver 127.0.0.1:8000
) else (
    py manage.py runserver 127.0.0.1:8000
)
pause
