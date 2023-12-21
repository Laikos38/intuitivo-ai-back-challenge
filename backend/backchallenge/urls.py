from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    # Accounts
    path("accounts/", include("backchallenge.accounts.urls")),
    path("admin/", admin.site.urls),
    path("api/", include("backchallenge.api.urls")),
]
