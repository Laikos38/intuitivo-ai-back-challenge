import dotenv
import os
import pathlib
from django.core.asgi import get_asgi_application


CURRENT_DIR = pathlib.Path(__file__).resolve().parent
BASE_DIR = CURRENT_DIR.parent
ENV_FILE_PATH = BASE_DIR / ".env"

dotenv.read_dotenv(str(ENV_FILE_PATH))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backchallenge.settings.prod")

application = get_asgi_application()
