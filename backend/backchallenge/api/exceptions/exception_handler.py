import traceback
from backchallenge.api.exceptions.exceptions import APIException, UnhandledAPIException
from backchallenge.api.utils.http.api_response import ApiResponse
from backchallenge.types import DictStrAny
from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.http import Http404
from rest_framework import exceptions, views
from rest_framework.response import Response


def api_exception_handler(exc: Exception, context: DictStrAny) -> Response | None:
    error_message = ""
    if isinstance(exc, Http404):
        exc = exceptions.NotFound(str(exc))
        error_message = str(exc)
    elif isinstance(exc, PermissionDenied):
        exc = exceptions.PermissionDenied()
    elif isinstance(exc, APIException):
        error_message = str(exc)
    elif isinstance(exc, exceptions.APIException):
        pass
    elif isinstance(exc, Exception):
        detail = f"{traceback.format_exc()}" if settings.DEBUG else "Unknown error"
        exc = UnhandledAPIException(detail)
        error_message = "Unknown error"
    headers = {}
    if getattr(exc, "auth_header", None):
        headers["WWW-Authenticate"] = exc.auth_header  # type: ignore
    if getattr(exc, "wait", None):
        headers["Retry-After"] = "%d" % exc.wait  # type: ignore
    data = None
    if isinstance(exc.detail, (list, dict)):
        data = exc.detail
    else:
        data = {"detail": exc.detail}
    views.set_rollback()
    r = ApiResponse(data, status=exc.status_code, headers=headers)
    r.reason_phrase = error_message if error_message else r.reason_phrase
    return r
