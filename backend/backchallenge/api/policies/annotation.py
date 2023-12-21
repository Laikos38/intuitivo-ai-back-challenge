from backchallenge.core.models import Annotation
from backchallenge.types import ModelId, Queryset, RequestUser
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework.exceptions import NotAuthenticated


class AnnotationPolicy:
    @staticmethod
    def get(object_id: ModelId, user: RequestUser) -> Annotation:
        try:
            if not isinstance(user, User):
                raise NotAuthenticated()
            annotation = Annotation.objects.get(id=object_id, user_id=user.id)
            return annotation
        except Annotation.DoesNotExist:
            raise Http404("Annotation not found.")
        except Annotation.MultipleObjectsReturned:
            raise Exception()

    @staticmethod
    def get_queryset(user: RequestUser) -> Queryset[Annotation]:
        if not isinstance(user, User):
            raise NotAuthenticated()
        queryset = Annotation.objects.filter(user_id=user.id)
        return queryset
