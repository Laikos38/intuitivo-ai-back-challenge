import os
import shutil
from backchallenge.core.models import Image
from django.conf import settings
from django.core import management
from django.core.files.images import ImageFile
from io import BytesIO
from urllib.request import urlopen
from zipfile import ZipFile


class Command(management.base.BaseCommand):
    help = "Command to register Image models from images located in a directory."

    def handle(self, *args, **options) -> None:
        try:
            self.stdout.write("Downloading images...")
            zip_url = "https://laikos-space.nyc3.digitaloceanspaces.com/images.zip"
            extract_dir = str(settings.BASE_DIR) + "/images_test"
            with urlopen(zip_url) as zip_resp:
                with ZipFile(BytesIO(zip_resp.read())) as z_file:
                    z_file.extractall(extract_dir)
            self.stdout.write("SUCCESS")
        except Exception as e:
            self.stderr.write(f"ERROR: {e}")
            return
        images_dir = extract_dir + "/images/"
        images_list = os.listdir(images_dir)
        total = len(images_list)
        self.stdout.write("Registering Images instances...")
        for i, filename in enumerate(images_list):
            try:
                if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
                    self.stdout.write(f"[{i + 1}/{total}] {filename}", ending=" ")
                    image_instance = Image()
                    image_instance.image.save(filename, ImageFile(open(images_dir + filename, "rb")))
                    image_instance.save()
                    self.stdout.write("SUCCESS")
            except Exception as e:
                self.stderr.write(f"ERROR: {e}")
        try:
            self.stdout.write("Deleting downloaded images...")
            shutil.rmtree(extract_dir)
            self.stdout.write("SUCCESS")
        except Exception as e:
            self.stderr.write(f"ERROR: {e}")
