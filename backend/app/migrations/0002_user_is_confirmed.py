# Generated by Django 5.0.4 on 2024-04-24 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_confirmed',
            field=models.BooleanField(default=False),
        ),
    ]