from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import (
    ServiceCategory, Service, Contact, Industry, 
    CaseStudy, TeamMember, Methodology, BlogCategory, BlogPost, OfficeLocation, HeroSlide
)
from .serializers import (
    ServiceCategorySerializer, ServiceSerializer, ContactSerializer, IndustrySerializer,
    CaseStudySerializer, TeamMemberSerializer, MethodologySerializer, 
    BlogCategorySerializer, BlogPostSerializer, OfficeLocationSerializer, HeroSlideSerializer
)

# --- Service Views ---
class ServiceCategoryList(generics.ListAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer

class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetail(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

# --- Industry Views ---
class IndustryList(generics.ListAPIView):
    queryset = Industry.objects.filter(is_active=True).order_by('order')
    serializer_class = IndustrySerializer

class IndustryDetail(generics.RetrieveAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer
    lookup_field = 'slug'

# --- Portfolio/Case Study Views ---
class CaseStudyList(generics.ListAPIView):
    queryset = CaseStudy.objects.all().order_by('-created_at')
    serializer_class = CaseStudySerializer

class FeaturedCaseStudyList(generics.ListAPIView):
    queryset = CaseStudy.objects.filter(is_featured=True)
    serializer_class = CaseStudySerializer

# --- About/Team Views ---
class TeamMemberList(generics.ListAPIView):
    queryset = TeamMember.objects.all().order_by('order')
    serializer_class = TeamMemberSerializer

class MethodologyList(generics.ListAPIView):
    queryset = Methodology.objects.all().order_by('order')
    serializer_class = MethodologySerializer

# --- Blog Views ---
class BlogPostList(generics.ListAPIView):
    queryset = BlogPost.objects.filter(is_published=True).order_by('-published_at')
    serializer_class = BlogPostSerializer

class BlogPostDetail(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

# --- Contact & Location Views ---
class ContactAPI(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class OfficeLocationList(generics.ListAPIView):
    queryset = OfficeLocation.objects.all()
    serializer_class = OfficeLocationSerializer

# --- Hero & Home Views ---
class HeroSlideList(generics.ListAPIView):
    queryset = HeroSlide.objects.all().order_by('order')
    serializer_class = HeroSlideSerializer

