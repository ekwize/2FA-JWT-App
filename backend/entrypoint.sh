#!/bin/bash

poetry run python3 manage.py makemigrations
poetry run python3 manage.py migrate
poetry run celery -A backend worker -l INFO &
poetry run python3 manage.py runserver 0.0.0.0:8080
