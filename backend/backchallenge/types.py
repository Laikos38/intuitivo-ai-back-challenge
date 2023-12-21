# flake8: noqa
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, AnonymousUser
from django.db.models.query import QuerySet
from typing import Any, Dict, TypeVar


T = TypeVar("T")
Queryset = QuerySet[T]
ModelId = int | str
DictStrAny = Dict[str, Any]
RequestUser = AbstractBaseUser | AnonymousUser
User = get_user_model()
