from django.urls import include, path


# fmt: off
v1_urlpatterns = []
# fmt: on

urlpatterns = [
    path("v1/", include(v1_urlpatterns)),
]
