import os
import django
from django.db.models.signals import post_migrate
from django.contrib.auth.management import create_permissions

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings') # Change 'main' to your project name
django.setup()

# This is the secret sauce: disconnect the signal that crashes on MongoDB
post_migrate.disconnect(create_permissions, dispatch_uid="django.contrib.auth.management.create_permissions")

if __name__ == "__main__":
    from django.core.management import call_command
    print("Generating clean migrations...")
    call_command('makemigrations', 'app')
    print("Applying migrations with bypassed signals...")
    call_command('migrate')
    print("\nSUCCESS: Database is ready.")