from backchallenge.api.policies.annotation import AnnotationPolicy
from backchallenge.api.serializers.annotation import AnnotationSerializer
from backchallenge.core.models import Annotation
from backchallenge.types import Queryset
from rest_framework import generics


class AnnotationRetrieveUpdateDestroyView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = AnnotationSerializer
    lookup_field = "id"

    def get_queryset(self) -> Queryset[Annotation]:
        return AnnotationPolicy.get_queryset(self.request.user)


class AnnotationListCreateView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = AnnotationSerializer

    def get_queryset(self) -> Queryset[Annotation]:
        return AnnotationPolicy.get_queryset(self.request.user)
