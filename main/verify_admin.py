import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
django.setup()

from django.contrib.auth.models import User

try:
    user = User.objects.get(username='admin')
    print(f'User PK: {user.pk} (Type: {type(user.pk)})')
    user.last_login = None
    user.save(update_fields=['last_login'])
    print('Save successful: last_login updated')
    
    # Check if LogEntry works (this is where it usually crashes in admin)
    from django.contrib.admin.models import LogEntry
    from django.contrib.contenttypes.models import ContentType
    ct = ContentType.objects.get_for_model(user)
    LogEntry.objects.log_action(
        user_id=user.id,
        content_type_id=ct.pk,
        object_id=str(user.pk),
        object_repr=str(user),
        action_flag=1
    )
    print('LogEntry successful')
    print("VERIFICATION SUCCESSFUL")
except Exception as e:
    print(f"VERIFICATION FAILED: {e}")
    import traceback
    traceback.print_exc()
