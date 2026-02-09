from django.urls import path
from . import views

urlpatterns = [
    # Services
    path("service-categories/", views.ServiceCategoryList.as_view(), name="service-category-list"),
    path("services/", views.ServiceList.as_view(), name="service-list"),
    path("services/<slug:slug>/", views.ServiceDetail.as_view(), name="service-detail"),

    # Industries
    path("industries/", views.IndustryList.as_view(), name="industry-list"),
    path("industries/<slug:slug>/", views.IndustryDetail.as_view(), name="industry-detail"),

    # Portfolio
    path("case-studies/", views.CaseStudyList.as_view(), name="case-study-list"),
    path("case-studies/featured/", views.FeaturedCaseStudyList.as_view(), name="featured-case-study-list"),

    # About
    path("team/", views.TeamMemberList.as_view(), name="team-member-list"),
    path("methodology/", views.MethodologyList.as_view(), name="methodology-list"),

    # Blog
    path("blog/", views.BlogPostList.as_view(), name="blog-post-list"),
    path("blog/<slug:slug>/", views.BlogPostDetail.as_view(), name="blog-post-detail"),

    # Contact & Locations
    path("contact/", views.ContactAPI.as_view(), name="contact-api"),
    path("locations/", views.OfficeLocationList.as_view(), name="office-location-list"),

    # Home/Hero
    path('hero-slides/', views.HeroSlideList.as_view(), name='hero-slides'),
]
