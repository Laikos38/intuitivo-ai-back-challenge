from backchallenge.api.docs import annotation as annotation_docs
from backchallenge.api.policies.annotation import AnnotationPolicy
from backchallenge.api.serializers.annotation import AnnotationSerializer
from backchallenge.core.models import Annotation
from backchallenge.types import Queryset
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status
from rest_framework.response import Response


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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Annotation.objects.create(
            user_id=request.user.id,
            image_id=serializer.validated_data["image_id"],
            coordinates_xy=serializer.validated_data["coordinates_xy"],
            text=serializer.validated_data["text"],
        )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
