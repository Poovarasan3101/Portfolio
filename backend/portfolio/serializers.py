import json
import os
from rest_framework import serializers
from .models import (
    Profile,
    Skill,
    Project,
    Education,
    Experience,
    CourseCertification,
    SocialLink,
    ContactMessage,
)


class ProfileSerializer(serializers.ModelSerializer):
    resume_file_url = serializers.SerializerMethodField()
    resume_filename = serializers.SerializerMethodField()
    avatar_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_resume_file_url(self, obj):
        if obj.resume_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume_file.url)
            return obj.resume_file.url
        return obj.resume_url or ""

    def get_resume_filename(self, obj):
        if obj.resume_file:
            return os.path.basename(obj.resume_file.name)
        return ""

    def get_avatar_file_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return obj.avatar_url or ""


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    image_display_url = serializers.SerializerMethodField()
    technologies = serializers.JSONField(required=False)
    features = serializers.JSONField(required=False)

    class Meta:
        model = Project
        fields = '__all__'
        extra_kwargs = {
            'slug': {'required': False, 'allow_blank': True},
        }

    def get_image_display_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ""

    def _parse_list_field(self, value):
        if value is None or value == "":
            return []
        if isinstance(value, list):
            return [str(v).strip() for v in value if str(v).strip()]
        if isinstance(value, str):
            trimmed = value.strip()
            if trimmed.startswith('['):
                try:
                    parsed = json.loads(trimmed)
                    if isinstance(parsed, list):
                        return [str(v).strip() for v in parsed if str(v).strip()]
                except json.JSONDecodeError:
                    pass
            return [item.strip() for item in trimmed.split(',') if item.strip()]
        return []

    def validate_technologies(self, value):
        return self._parse_list_field(value)

    def validate_features(self, value):
        return self._parse_list_field(value)


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    responsibilities_list = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = '__all__'

    def get_responsibilities_list(self, obj):
        if not obj.responsibilities:
            return []
        return [line.strip().lstrip('•-* ') for line in obj.responsibilities.splitlines() if line.strip()]


class CourseCertificationSerializer(serializers.ModelSerializer):
    image_display_url = serializers.SerializerMethodField()
    certificate_file_url = serializers.SerializerMethodField()
    certificate_filename = serializers.SerializerMethodField()

    class Meta:
        model = CourseCertification
        fields = '__all__'

    def get_image_display_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ""

    def get_certificate_file_url(self, obj):
        if obj.certificate_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.certificate_file.url)
            return obj.certificate_file.url
        return ""

    def get_certificate_filename(self, obj):
        if obj.certificate_file:
            return os.path.basename(obj.certificate_file.name)
        return ""


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at']


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, min_length=6, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "New passwords do not match."})
        return attrs
