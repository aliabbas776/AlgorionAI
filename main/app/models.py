from django.db import models
from django.utils import timezone

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, help_text="Lucide icon name or CSS class", blank=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, related_name="services")
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, null=True)
    description = models.TextField()
    detailed_content = models.TextField(blank=True)
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Message from {self.name}"

class Industry(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    hero_title = models.CharField(max_length=255)
    hero_subtitle = models.TextField()
    hero_media = models.FileField(upload_to="industries/")
    detailed_description = models.TextField(blank=True)
    button_text = models.CharField(max_length=50)
    button_link = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class ClientLogo(models.Model):
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE, related_name="logos")
    logo = models.ImageField(upload_to="clients/")

class CaseStudy(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    client_name = models.CharField(max_length=255)
    industry = models.ForeignKey(Industry, on_delete=models.SET_NULL, null=True, related_name="case_studies")
    problem = models.TextField()
    solution = models.TextField()
    results = models.TextField(help_text="Measurable outcomes")
    image = models.ImageField(upload_to="case_studies/")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    bio = models.TextField()
    image = models.ImageField(upload_to="team/")
    linkedin = models.URLField(blank=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Methodology(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    author = models.ForeignKey(TeamMember, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name="posts")
    thumbnail = models.ImageField(upload_to="blog/")
    published_at = models.DateTimeField(default=timezone.now)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class OfficeLocation(models.Model):
    city = models.CharField(max_length=100)
    address = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    is_main_office = models.BooleanField(default=False)

    def __str__(self):
        return self.city

class HeroSlide(models.Model):
    label = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    image = models.ImageField(upload_to="hero/", blank=True, null=True)
    background_gradient = models.CharField(max_length=255, help_text="CSS gradient string", blank=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title
