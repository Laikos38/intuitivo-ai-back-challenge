from backchallenge.core.models import Annotation
from rest_framework import serializers


class AnnotationSerializer(serializers.ModelSerializer):
    image_id = serializers.IntegerField(required=True)

    class Meta:
        model = Annotation
        fields = (
            "id",
            "image_id",
            "coordinates_xy",
            "text",
        )
