from typing import Any, Dict
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from app.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data: Dict[str, Any]) -> User:
        return User.objects.create_user(**data)


class CustomTokenSerializer(TokenObtainPairSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        user = User.objects.get(username=attrs['username'])

        if not user.is_veryfied:
            raise serializers.ValidationError('User is not veryfied')
        
        data = super().validate(attrs)
        return data
    

class UIDSerializer(serializers.Serializer):
    uid = serializers.CharField(required=True, allow_blank=False)

    def validate(self, data):
        try:
            user = User.objects.get(id=data["uid"])
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this UUID does not exist.")
        return data


class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'date_joined'
        )


