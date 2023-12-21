from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from model_utils.models import TimeStampedModel


class Image(TimeStampedModel):
    image = models.ImageField(null=False, blank=False, upload_to="images/")

    class Meta:
        ordering = ("-created",)


class Annotation(TimeStampedModel):
    user = models.ForeignKey(User, null=False, related_name="annotations", on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=False, related_name="annotations", on_delete=models.CASCADE)
    coordinates_xy = models.JSONField(null=False, encoder=DjangoJSONEncoder)
    text = models.TextField(null=False, blank=False)

    class Meta:
        ordering = ("-created",)
