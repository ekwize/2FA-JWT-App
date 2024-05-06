from celery import shared_task
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from .tokens import account_activation_token
from backend import settings
from .models import User


@shared_task
def send_email_verification_message(current_site, pk):
    user = User.objects.get(pk=pk)

    subject = 'Verify Email'
    message = render_to_string('verify_email.html', {
        'user': user.username,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(pk)),
        'token': account_activation_token.make_token(user),
    })

    send_mail(
        subject,
        message,
        str(settings.EMAIL_HOST_USER),
        [user.email],
        fail_silently=True,
    )
    return None