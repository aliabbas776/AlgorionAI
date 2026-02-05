import os
import django
import sys

# Patch AuthConfig before django.setup()
import django.contrib.auth.apps
class MyAuthConfig(django.contrib.auth.apps.AuthConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField'
django.contrib.auth.apps.AuthConfig = MyAuthConfig

# Patch AdminConfig too for LogEntry
import django.contrib.admin.apps
class MyAdminConfig(django.contrib.admin.apps.AdminConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField'
django.contrib.admin.apps.AdminConfig = MyAdminConfig

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
django.setup()

from django.contrib.auth.models import User
user = User.objects.first()
if user:
    print(f"User: {user.username}")
    print(f"PK: {user.pk} (Type: {type(user.pk)})")
    print(f"Field Type: {type(User._meta.get_field('id'))}")
else:
    print("No user found")
