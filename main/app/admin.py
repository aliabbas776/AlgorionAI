from django.contrib import admin
from .models import (
    ServiceCategory, Service, Contact, Industry, ClientLogo, 
    CaseStudy, TeamMember, Methodology, BlogCategory, BlogPost, OfficeLocation, HeroSlide
)

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Methodology)
class MethodologyAdmin(admin.ModelAdmin):
    pass

@admin.register(OfficeLocation)
class OfficeLocationAdmin(admin.ModelAdmin):
    pass

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'label', 'order')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ('title', 'description')

@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'order')
    prepopulated_fields = {"slug": ("name",)}

@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'client_name', 'industry', 'is_featured')
    prepopulated_fields = {"slug": ("title",)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'published_at', 'is_published')
    prepopulated_fields = {"slug": ("title",)}

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(ClientLogo)
class ClientLogoAdmin(admin.ModelAdmin):
    pass
