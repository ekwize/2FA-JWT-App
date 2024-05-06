from rest_framework.permissions import AllowAny
from .permissions import IsOwner
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserRegisterSerializer, UserViewSerializer, CustomTokenSerializer, UIDSerializer
from .tokens import account_activation_token
from .tasks import send_email_verification_message
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode
from rest_framework_simplejwt.views import TokenObtainPairView



class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(data=user.pk, status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenSerializer



class SendVerificationEmail(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data)
        serializer = UIDSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            current_site = get_current_site(request)
            send_email_verification_message.delay(str(current_site.domain), serializer.validated_data["uid"])
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
        

class ActivateAccount(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except:
            user = None

        if user and account_activation_token.check_token(user, token):
            user.is_veryfied = True
            user.save()
            return Response(status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

        
class GetUserView(APIView):
    permission_classes = [IsOwner]

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserViewSerializer(user)
        return Response(serializer.data)






