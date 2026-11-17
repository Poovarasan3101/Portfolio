import os
from django.contrib.auth import authenticate
from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    Profile,
    Skill,
    Project,
    Education,
    Experience,
    CourseCertification,
    SocialLink,
    ContactMessage,
    validate_pdf_file,
)
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    EducationSerializer,
    ExperienceSerializer,
    CourseCertificationSerializer,
    SocialLinkSerializer,
    ContactMessageSerializer,
    ChangePasswordSerializer,
)
from .permissions import IsAdminOrReadOnly


def get_or_create_profile():
    profile = Profile.objects.first()
    if not profile:
        profile = Profile.objects.create()
    return profile


# ============================================================
# ADMIN AUTHENTICATION & DASHBOARD VIEWS
# ============================================================

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '')

        if not username or not password:
            return Response(
                {"detail": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response(
                {"detail": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_staff and not user.is_superuser:
            return Response(
                {"detail": "Access denied. Admin privileges are required."},
                status=status.HTTP_403_FORBIDDEN,
            )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_superuser": user.is_superuser,
                    "is_staff": user.is_staff,
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminLogoutView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)


class AdminMeView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_superuser": user.is_superuser,
            "is_staff": user.is_staff,
        })


class AdminChangePasswordView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {"old_password": ["Current password is incorrect."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)


class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        profile = get_or_create_profile()
        recent_messages = ContactMessage.objects.all()[:6]
        return Response({
            "stats": {
                "total_projects": Project.objects.count(),
                "featured_projects": Project.objects.filter(featured=True).count(),
                "total_skills": Skill.objects.count(),
                "total_certificates": CourseCertification.objects.count(),
                "total_education": Education.objects.count(),
                "total_experience": Experience.objects.count(),
                "total_social_links": SocialLink.objects.count(),
                "total_messages": ContactMessage.objects.count(),
                "unread_messages": ContactMessage.objects.filter(is_read=False).count(),
                "has_resume": bool(profile.resume_file or profile.resume_url),
            },
            "recent_messages": ContactMessageSerializer(recent_messages, many=True).data,
            "profile_summary": {
                "name": profile.name,
                "role": profile.role,
                "updated_at": profile.updated_at,
            },
        })


# ============================================================
# PORTFOLIO PROFILE, ABOUT & RESUME VIEWS
# ============================================================

class ProfileView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        profile = get_or_create_profile()
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        return self._update(request, partial=False)

    def patch(self, request):
        return self._update(request, partial=True)

    def _update(self, request, partial=True):
        profile = get_or_create_profile()
        # Allow clearing avatar if explicitly requested
        if request.data.get('clear_avatar') in ('true', 'True', True, '1'):
            if profile.avatar:
                profile.avatar.delete(save=False)
            profile.avatar = None
            profile.avatar_url = ""

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=partial,
            context={'request': request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResumeView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        profile = get_or_create_profile()
        resume_url = ""
        filename = ""
        file_size = None
        if profile.resume_file:
            resume_url = request.build_absolute_uri(profile.resume_file.url)
            filename = os.path.basename(profile.resume_file.name)
            try:
                file_size = profile.resume_file.size
            except Exception:
                file_size = None
        elif profile.resume_url:
            resume_url = profile.resume_url
            filename = os.path.basename(profile.resume_url)

        return Response({
            "has_resume": bool(resume_url),
            "resume_file_url": resume_url,
            "resume_url": profile.resume_url,
            "filename": filename,
            "file_size": file_size,
            "updated_at": profile.updated_at,
        })

    def post(self, request):
        profile = get_or_create_profile()
        uploaded = request.FILES.get('resume_file') or request.FILES.get('file')
        if not uploaded:
            return Response(
                {"detail": "Please select a PDF file to upload."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_pdf_file(uploaded)
        except Exception as exc:
            msg = exc.messages[0] if hasattr(exc, 'messages') else str(exc)
            return Response({"detail": msg}, status=status.HTTP_400_BAD_REQUEST)

        # Replace existing resume cleanly
        if profile.resume_file:
            try:
                profile.resume_file.delete(save=False)
            except Exception:
                pass

        profile.resume_file = uploaded
        profile.save()
        return self.get(request)

    def delete(self, request):
        profile = get_or_create_profile()
        if profile.resume_file:
            try:
                profile.resume_file.delete(save=False)
            except Exception:
                pass
            profile.resume_file = None
        profile.resume_url = ""
        profile.save()
        return Response({"detail": "Resume deleted successfully.", "has_resume": False}, status=status.HTTP_200_OK)


# ============================================================
# PORTFOLIO CRUD VIEWSETS
# ============================================================

class SkillViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class ProjectDetailBySlugView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class EducationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class CourseCertificationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = CourseCertification.objects.all()
    serializer_class = CourseCertificationSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class SocialLinkViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {
                    "success": True,
                    "message": "Thank you! Your message has been received successfully. Poovarasan will get back to you shortly.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "success": False,
                "message": "Please correct the errors in the form.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


# ============================================================
# CONSOLIDATED OVERVIEW ENDPOINT (PUBLIC PORTFOLIO)
# ============================================================

class PortfolioOverviewView(APIView):
    """
    Consolidated endpoint fetching all dynamic portfolio sections from MySQL
    in a single fast payload while individual REST endpoints remain available.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        profile = get_or_create_profile()
        skills = Skill.objects.all()
        projects = Project.objects.all()
        education = Education.objects.all()
        experience = Experience.objects.all()
        certifications = CourseCertification.objects.all()
        social_links = SocialLink.objects.filter(is_active=True)

        return Response({
            "profile": ProfileSerializer(profile, context={'request': request}).data,
            "skills": SkillSerializer(skills, many=True).data,
            "projects": ProjectSerializer(projects, many=True, context={'request': request}).data,
            "education": EducationSerializer(education, many=True).data,
            "experience": ExperienceSerializer(experience, many=True).data,
            "certifications": CourseCertificationSerializer(certifications, many=True, context={'request': request}).data,
            "social_links": SocialLinkSerializer(social_links, many=True).data,
        })
