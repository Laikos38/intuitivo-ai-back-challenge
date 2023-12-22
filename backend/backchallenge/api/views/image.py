from backchallenge.api.docs import image as image_docs
from backchallenge.api.serializers.image import ImageSerializer
from backchallenge.core.models import Image
from drf_spectacular.utils import extend_schema
from rest_framework import generics


@extend_schema(**image_docs.ExtendImageRetrieveUpdateDestroyViewSchema)
class ImageRetrieveUpdateDestroyView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    lookup_field = "id"


@extend_schema(**image_docs.ExtendImageListCreateViewSchema)
class ImageListCreateView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
