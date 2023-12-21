from backchallenge.accounts.validators import validate_password
from backchallenge.types import DictStrAny
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from typing import Any


class RegisterUserSerializer(serializers.Serializer[Any]):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(max_length=150, required=True)
    password = serializers.CharField(write_only=True, max_length=150, required=True)
    password_match = serializers.CharField(write_only=True, max_length=150, required=True)

    def validate(self, data: DictStrAny) -> DictStrAny:
        if data["password"] != data["password_match"]:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        try:
            validate_password(data["password"])
        except ValidationError:
            raise serializers.ValidationError({"password": "Password not valid or safe enough."})
        return data

    def create(self, validated_data: DictStrAny) -> DictStrAny:
        user = get_user_model().objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            is_active=True,
        )
        return UserSerializer(instance=user).data


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
        )
