from rest_framework.response import Response
from typing import Any, Mapping


class ApiResponse(Response):
    def __init__(
        self,
        data: Any = None,
        status: int | None = None,
        template_name: str | None = None,
        headers: Mapping[str, str] | None = None,
        exception: bool = False,
        content_type: str | None = None,
        reason_phrase: str | None = None,
    ):
        if isinstance(data, str):
            data = {"detail": data}
        super().__init__(data, status, template_name, headers, exception, content_type)
        if reason_phrase:
            self.reason_phrase = reason_phrase
