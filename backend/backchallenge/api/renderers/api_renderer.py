from rest_framework.compat import INDENT_SEPARATORS, LONG_SEPARATORS, SHORT_SEPARATORS
from rest_framework.renderers import JSONRenderer
from rest_framework.utils import json
from typing import Any, Mapping, Optional


class APIJSONRenderer(JSONRenderer):
    # media_type = 'text/plain'
    # media_type = 'application/json'
    charset = "utf-8"

    def render(self, data: Any, accepted_media_type: Optional[str] = None, renderer_context: Optional[Mapping[str, Any]] = None) -> bytes:
        """
        Render `data` into JSON, returning a bytestring.
        """
        if data is None:
            return b""

        renderer_context = renderer_context or {}
        indent = self.get_indent(str(accepted_media_type), renderer_context)

        if indent is None:
            separators = SHORT_SEPARATORS if self.compact else LONG_SEPARATORS
        else:
            separators = INDENT_SEPARATORS
        status_code = None
        message = None
        ok = True
        if "response" in renderer_context.keys():
            status_code = renderer_context["response"].status_code
            ok = not renderer_context["response"].exception
            message = renderer_context["response"].reason_phrase
        data = {
            "data": data,
            "message": message,
            "ok": ok,
            "status_code": status_code,
        }
        ret = json.dumps(
            data,
            cls=self.encoder_class,
            indent=indent,
            ensure_ascii=self.ensure_ascii,
            allow_nan=not self.strict,
            separators=separators,
        )
        ret = ret.replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
        return ret.encode()
