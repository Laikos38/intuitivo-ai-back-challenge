from backchallenge.api.views import annotation as annotation_views
from backchallenge.api.views import auth as auth_views
from backchallenge.api.views import image as image_views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("accounts/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("accounts/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("accounts/users/", auth_views.RegisterClientView.as_view(), name="users"),
    path("images/<int:id>/", image_views.ImageRetrieveUpdateDestroyView.as_view(), name="retrieve_update_destroy_images"),
    path("images/", image_views.ImageListCreateView.as_view(), name="list_create_images"),
    path(
        "annotations/<int:id>/",
        annotation_views.AnnotationRetrieveUpdateDestroyView.as_view(),
        name="retrieve_update_destroy_annotations",
    ),
    path("annotations/", annotation_views.AnnotationListCreateView.as_view(), name="list_create_annotations"),
]
