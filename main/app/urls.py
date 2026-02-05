from django.urls import path
from .views import ServiceAPI, ContactAPI

urlpatterns = [
    path("services/", ServiceAPI.as_view()),
    path("contact/", ContactAPI.as_view()),
]
