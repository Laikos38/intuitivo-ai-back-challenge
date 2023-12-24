from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from model_utils.models import TimeStampedModel


class Image(TimeStampedModel):
    image = models.ImageField(
        null=False,
        blank=False,
        upload_to="images/",
        height_field="height",
        width_field="width",
    )
    height = models.IntegerField()
    width = models.IntegerField()

    class Meta:
        ordering = ("-created",)


@receiver(post_delete, sender=Image)
def delete_image(sender, instance, **kwargs):
    try:
        if instance.image:
            instance.image.delete()
    except Exception:
        pass


class Annotation(TimeStampedModel):
    user = models.ForeignKey(User, null=False, related_name="annotations", on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=False, related_name="annotations", on_delete=models.CASCADE)
    coordinates_xy = models.JSONField(null=False, encoder=DjangoJSONEncoder)
    text = models.TextField(null=False, blank=False)

    class Meta:
        ordering = ("-created",)
