from django.db import models
import django_mongodb_backend.fields
from django.utils import timezone

class Service(models.Model):
    # MongoDB specific Primary Key
    id = django_mongodb_backend.fields.ObjectIdField(primary_key=True)
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    # Using auto_now_add is the Django way to handle default timestamps
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Contact(models.Model):
    # MongoDB specific Primary Key
    id = django_mongodb_backend.fields.ObjectIdField(primary_key=True)
    
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Message from {self.name}"