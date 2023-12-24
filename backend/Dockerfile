FROM mcr.microsoft.com/devcontainers/python:1-3.12-bullseye

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get -y install sudo

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
