import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
django.setup()

from django.contrib.auth.models import User

user = User.objects.first()
if user:
    print(f"User found: {user.username}")
    print(f"PK name: {user._meta.pk.name}")
    print(f"PK value: {user.pk}")
    print(f"ID value: {getattr(user, 'id', 'N/A')}")
    print(f"All fields: {[f.name for f in user._meta.fields]}")
    # Check if id field is in the model
    id_field = user._meta.get_field('id')
    print(f"ID field type: {type(id_field)}")
else:
    print("No user found")
