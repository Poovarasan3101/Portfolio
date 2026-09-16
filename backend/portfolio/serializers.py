from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Profile, Project, Skill, Experience, Education, ExtraSection, ContactMessage

class ProfileSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'name',
            'title',
            'hero_subtitle',
            'bio',
            'career_objective',
            'developer_background',
            'interests',
            'strengths',
            'profile_image',
            'profile_image_url',
            'resume',
            'resume_url',
            'email',
            'phone',
            'location',
            'github',
            'linkedin',
            'updated_at',
        ]
        extra_kwargs = {
            'profile_image': {'required': False, 'allow_null': True},
            'resume': {'required': False, 'allow_null': True},
        }

    def get_profile_image_url(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None

    def get_resume_url(self, obj):
        if obj.resume:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume.url)
            return obj.resume.url
        return None


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'short_description',
            'description',
            'image',
            'image_url',
            'technologies',
            'github_url',
            'live_url',
            'category',
            'project_date',
            'featured',
            'display_order',
            'created_at',
            'updated_at',
        ]
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True},
        }

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level', 'display_order']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id',
            'job_title',
            'company',
            'location',
            'start_date',
            'end_date',
            'is_current',
            'is_fresher_notice',
            'description',
            'display_order',
        ]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id',
            'degree',
            'institution',
            'location',
            'start_year',
            'end_year',
            'description',
            'display_order',
        ]


class ExtraSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ExtraSection
        fields = [
            'id',
            'title',
            'subtitle',
            'description',
            'image',
            'image_url',
            'button_text',
            'button_url',
            'display_order',
            'is_active',
        ]
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True},
        }

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message is required.")
        return value


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is inactive.")

        attrs['user'] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError({"confirm_new_password": "New passwords do not match."})
        if len(attrs['new_password']) < 6:
            raise serializers.ValidationError({"new_password": "New password must be at least 6 characters."})
        return attrs
