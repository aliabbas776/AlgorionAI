from rest_framework import serializers
from .models import (
    ServiceCategory, Service, Contact, Industry, ClientLogo, 
    CaseStudy, TeamMember, Methodology, BlogCategory, BlogPost, OfficeLocation, HeroSlide
)

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ServiceCategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = ["logo"]

class CaseStudySerializer(serializers.ModelSerializer):
    industry_name = serializers.CharField(source='industry.name', read_only=True)

    class Meta:
        model = CaseStudy
        fields = '__all__'

class IndustrySerializer(serializers.ModelSerializer):
    logos = ClientLogoSerializer(many=True, read_only=True)
    case_studies = CaseStudySerializer(many=True, read_only=True)

    class Meta:
        model = Industry
        fields = "__all__"

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class MethodologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Methodology
        fields = '__all__'

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'

class OfficeLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeLocation
        fields = '__all__'

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = "__all__"




