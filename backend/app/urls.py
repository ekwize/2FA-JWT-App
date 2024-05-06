from .views import RegisterView, GetUserView, ActivateAccount, SendVerificationEmail, LoginView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
	path('signup/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
	path('user/<str:pk>/', GetUserView.as_view(), name='user'),
    path('verification/', SendVerificationEmail.as_view(), name='verification'),
    path('activation/<str:uidb64>/<str:token>/', ActivateAccount.as_view(), name='activation'),
]

