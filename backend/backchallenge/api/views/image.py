from backchallenge.api.serializers.image import ImageSerializer
from backchallenge.core.models import Image
from rest_framework import generics


class ImageRetrieveUpdateDestroyView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    lookup_field = "id"


class ImageListCreateView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
