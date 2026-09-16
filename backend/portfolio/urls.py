from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ProfileView,
    ProjectViewSet,
    SkillViewSet,
    ExperienceViewSet,
    EducationViewSet,
    ExtraSectionViewSet,
    ContactMessageViewSet,
    AdminLoginView,
    AdminLogoutView,
    ChangePasswordView,
    DashboardStatsView,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'extra-sections', ExtraSectionViewSet, basename='extra-section')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    # Singleton Profile
    path('profile/', ProfileView.as_view(), name='profile'),

    # Authentication
    path('auth/login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='admin-change-password'),

    # Dashboard metrics
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),

    # Model ViewSets
    path('', include(router.urls)),
]
