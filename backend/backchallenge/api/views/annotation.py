from backchallenge.api.docs import annotation as annotation_docs
from backchallenge.api.policies.annotation import AnnotationPolicy
from backchallenge.api.serializers.annotation import AnnotationSerializer
from backchallenge.core.models import Annotation
from backchallenge.types import Queryset
from drf_spectacular.utils import extend_schema
from rest_framework import generics


@extend_schema(**annotation_docs.ExtendAnnotationRetrieveUpdateDestroyViewSchema)
class AnnotationRetrieveUpdateDestroyView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = AnnotationSerializer
    lookup_field = "id"

    def get_queryset(self) -> Queryset[Annotation]:
        return AnnotationPolicy.get_queryset(self.request.user)


@extend_schema(**annotation_docs.ExtendAnnotationListCreateViewSchema)
class AnnotationListCreateView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = AnnotationSerializer

    def get_queryset(self) -> Queryset[Annotation]:
        return AnnotationPolicy.get_queryset(self.request.user)
