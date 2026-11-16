from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import (
    Profile,
    Skill,
    Project,
    Education,
    CourseCertification,
    ContactMessage
)
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    EducationSerializer,
    CourseCertificationSerializer,
    ContactMessageSerializer
)


class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(
                name="Poovarasan",
                role="Python Full Stack Developer",
                headline="Building Modern Web Experiences with Code & Creativity.",
                hero_description="I'm an aspiring Python Full Stack Developer passionate about building responsive, scalable, and user-friendly web applications using React.js, Python, Django, and MySQL.",
                about_bio="I'm Poovarasan, a Computer Science and Engineering graduate with an interest in full-stack web development. I enjoy developing modern web applications, solving technical problems, and learning new technologies. My goal is to create practical and user-friendly digital solutions.",
                email="poovarasan31012005@gmail.com",
                phone="+91-9629617818",
                location="Salem, Tamil Nadu, India",
                linkedin_url="https://www.linkedin.com/in/poovarasan-subramani-310105sana",
                github_url="https://github.com/poovarasan-subramani"
            )
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)


class SkillListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class EducationListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class CourseCertificationListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = CourseCertification.objects.all()
    serializer_class = CourseCertificationSerializer


class ContactCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {
                    "success": True,
                    "message": "Thank you! Your message has been received successfully. Poovarasan will get back to you shortly.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "success": False,
                "message": "Please correct the errors in the form.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class PortfolioOverviewView(APIView):
    """
    Consolidated endpoint to fetch all portfolio sections in a single fast payload,
    minimizing round-trips while keeping individual REST endpoints available.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create()

        skills = Skill.objects.all()
        projects = Project.objects.all()
        education = Education.objects.all()
        certifications = CourseCertification.objects.all()

        return Response({
            "profile": ProfileSerializer(profile, context={'request': request}).data,
            "skills": SkillSerializer(skills, many=True).data,
            "projects": ProjectSerializer(projects, many=True, context={'request': request}).data,
            "education": EducationSerializer(education, many=True).data,
            "certifications": CourseCertificationSerializer(certifications, many=True, context={'request': request}).data,
        })
