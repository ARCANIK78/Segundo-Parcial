python manage.py makemigrations --empty my_servidor
python manage.py showmigrations
python manage.py makemigrations
python manage.py migrate

@echo off
REM Para que el servidor escuche cualquier ip conectada
python manage.py runserver 0.0.0.0:8000
REM Para que el servidor solo escuche la ip local
REM python manage.py runserver 