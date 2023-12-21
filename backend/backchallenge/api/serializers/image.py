from backchallenge.core.models import Image
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    image_name = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Image
        fields = (
            "id",
            "image_name",
            "image_url",
        )

    def get_image_name(self, image):
        return image.image.name

    def get_image_url(self, image):
        request = self.context.get("request")
        image_url = image.photo.url
        return request.build_absolute_uri(image_url)
