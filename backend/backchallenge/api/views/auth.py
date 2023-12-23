from backchallenge.api.docs import auth as auth_docs
from backchallenge.api.serializers.auth import RegisterUserSerializer, UserSerializer
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


@extend_schema(**auth_docs.ExtendRegisterUserViewSchema)
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer


@extend_schema(**auth_docs.ExtendRetrieveUserViewSchema)
class RetrieveUserView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@extend_schema(**auth_docs.ExtendUserTokenObtainPairViewSchema)
class UserTokenObtainPairView(TokenObtainPairView):
    pass


@extend_schema(**auth_docs.ExtendUserTokenRefreshViewSchema)
class UserTokenRefreshView(TokenRefreshView):
    pass
