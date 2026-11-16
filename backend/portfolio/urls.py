from django.urls import path
from .views import (
    ProfileView,
    SkillListView,
    ProjectListView,
    ProjectDetailView,
    EducationListView,
    CourseCertificationListView,
    ContactCreateView,
    PortfolioOverviewView
)

urlpatterns = [
    path('overview/', PortfolioOverviewView.as_view(), name='portfolio-overview'),
    path('profile/', ProfileView.as_view(), name='portfolio-profile'),
    path('skills/', SkillListView.as_view(), name='portfolio-skills'),
    path('projects/', ProjectListView.as_view(), name='portfolio-projects'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='portfolio-project-detail'),
    path('education/', EducationListView.as_view(), name='portfolio-education'),
    path('certifications/', CourseCertificationListView.as_view(), name='portfolio-certifications'),
    path('contact/', ContactCreateView.as_view(), name='portfolio-contact'),
]
