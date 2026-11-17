from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminLoginView,
    AdminLogoutView,
    AdminMeView,
    AdminChangePasswordView,
    AdminDashboardView,
    ProfileView,
    ResumeView,
    SkillViewSet,
    ProjectViewSet,
    ProjectDetailBySlugView,
    EducationViewSet,
    ExperienceViewSet,
    CourseCertificationViewSet,
    SocialLinkViewSet,
    ContactMessageViewSet,
    PortfolioOverviewView,
)

router = DefaultRouter()
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'certificates', CourseCertificationViewSet, basename='certificate')
router.register(r'certifications', CourseCertificationViewSet, basename='certification')
router.register(r'social-links', SocialLinkViewSet, basename='social-link')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    # Consolidated public portfolio overview
    path('overview/', PortfolioOverviewView.as_view(), name='portfolio-overview'),

    # Profile, About & Resume endpoints
    path('profile/', ProfileView.as_view(), name='portfolio-profile'),
    path('about/', ProfileView.as_view(), name='portfolio-about'),
    path('resume/', ResumeView.as_view(), name='portfolio-resume'),

    # Slug lookup for public project sharing
    path('projects/slug/<slug:slug>/', ProjectDetailBySlugView.as_view(), name='portfolio-project-by-slug'),

    # Admin Authentication & Dashboard endpoints
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('admin/me/', AdminMeView.as_view(), name='admin-me'),
    path('admin/change-password/', AdminChangePasswordView.as_view(), name='admin-change-password'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),

    # CRUD ViewSet routes
    path('', include(router.urls)),
]
