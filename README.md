# intuitivo-ai-back-challenge
Intuitivo AI Back Challenge

## Execute

### With docker & docker compose
Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) on your OS.

Then on the base app directory run:
```bash
$ docker-compose -f docker-compose.yaml up --build
```

### Installing
1. Create a postgres db called `intuitivo_backchallenge`.
2. Create a `.env` on the backend directory, with the following content:
```
DJANGO_SECRET_KEY=""
DJANGO_DEBUG="true"
DJANGO_ALLOWED_HOST="*"
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB="intuitivo_backchallenge"
POSTGRES_HOST="127.0.0.1"
POSTGRES_PORT="5432"
DB_IGNORE_SSL="true"
```

For the backend dependencies, run on the backend directory,: 
```bash
$ python -m venv ./.venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

Then run:
```bash
$ python manage.py migrate
$ python manage.py load_images
```

To run the backend execute: `python manage.py runserver`

For the frontend dependencies, run on the frontend directory,: 
```bash
$ npm install
```

To run the frontend execute: `npm run dev`


## Backend project
Django & Django REST Framework API project.

Navigate to `http://localhost:8000` (host) or `http://localhost:7171` (docker) to check the OpenAPI documentation.

Things to improve:
- Add code comments
- Add integration and unit tests

## Frontend project

NextJS 11 project.

Navigate to `http://localhost:3000` (host) or `http://localhost:7172` (docker) to open the project.

Things to improve:
- Never used React or NextJS before, so there is a lot of things that I'm sure can be improved. Taking in mind that only have 5 days to code the entire project during Christmas time and working full time, I consider to be good enough.
- Add Keypresses to navigate between images during annotations.
- Add on screen indications on annotations page.
