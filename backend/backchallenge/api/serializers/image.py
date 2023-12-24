from backchallenge.api.policies.annotation import AnnotationPolicy
from backchallenge.api.serializers.annotation import AnnotationSerializer
from backchallenge.core.models import Image
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    image_name = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(write_only=True)

    class Meta:
        model = Image
        fields = ("id", "image", "image_name", "image_url", "height", "width")

    def get_image_name(self, image):
        return image.image.name.replace("images/", "") if image.image else ""

    def get_image_url(self, image):
        request = self.context.get("request")
        image_url = image.image.url
        return request.build_absolute_uri(image_url)


class ImageWithAnnotationsSerializer(serializers.ModelSerializer):
    image_name = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(write_only=True)
    annotations = serializers.SerializerMethodField("get_annotations", read_only=True)

    class Meta:
        model = Image
        fields = ("id", "image", "image_name", "image_url", "height", "width", "annotations")

    def get_image_name(self, image):
        return image.image.name.replace("images/", "") if image.image else ""

    def get_image_url(self, image):
        request = self.context.get("request")
        image_url = image.image.url
        return request.build_absolute_uri(image_url)

    def get_annotations(self, image):
        annotations = AnnotationPolicy.get_queryset(self.context["request"].user)
        annotations = annotations.filter(image_id=image.id)
        serializer = AnnotationSerializer(instance=annotations, many=True)
        return serializer.data
