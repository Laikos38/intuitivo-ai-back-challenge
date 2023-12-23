from backchallenge.api.views import annotation as annotation_views
from backchallenge.api.views import auth as auth_views
from backchallenge.api.views import image as image_views
from django.urls import path


urlpatterns = [
    path("accounts/token/", auth_views.UserTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("accounts/token/refresh/", auth_views.UserTokenRefreshView.as_view(), name="token_refresh"),
    path("accounts/users/me/", auth_views.RetrieveUserView.as_view(), name="me"),
    path("accounts/users/", auth_views.RegisterUserView.as_view(), name="users"),
    path("images/<int:id>/", image_views.ImageRetrieveUpdateDestroyView.as_view(), name="retrieve_update_destroy_images"),
    path("images/", image_views.ImageListCreateView.as_view(), name="list_create_images"),
    path(
        "annotations/<int:id>/",
        annotation_views.AnnotationRetrieveUpdateDestroyView.as_view(),
        name="retrieve_update_destroy_annotations",
    ),
    path("annotations/", annotation_views.AnnotationListCreateView.as_view(), name="list_create_annotations"),
]
