from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions, status
from typing import Any


class APIException(exceptions.APIException):
    def __init__(self, detail: Any, code: Any) -> None:
        super().__init__(detail, code)
        self.status_code = code


class UnhandledAPIException(exceptions.APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = _("Unknown error.")
    default_code = "internal_server_error"
