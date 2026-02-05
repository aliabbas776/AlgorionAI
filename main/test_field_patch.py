import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
django.setup()

import django_mongodb_backend.fields
from django.contrib.auth.models import User

# Attempt to patch the field class directly
user_id_field = User._meta.get_field('id')
print(f"Before patch: {user_id_field.__class__}")
user_id_field.__class__ = django_mongodb_backend.fields.ObjectIdAutoField
print(f"After patch: {user_id_field.__class__}")

user = User.objects.first()
if user:
    print(f"User found: {user.username}")
    print(f"PK value: {user.pk} (Type: {type(user.pk)})")
    try:
        user.last_login = None
        user.save(update_fields=['last_login'])
        print("Save successful!")
    except Exception as e:
        print(f"Save failed: {e}")
else:
    print("No user found")
