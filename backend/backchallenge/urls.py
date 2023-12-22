from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


urlpatterns = [
    path("", RedirectView.as_view(pattern_name="openapi", permanent=False)),
    path("admin/", admin.site.urls),
    path("api/", include("backchallenge.api.urls")),
    path("docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/openapi/", SpectacularSwaggerView.as_view(url_name="schema"), name="openapi"),
    path("docs/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
