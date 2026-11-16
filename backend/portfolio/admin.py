from django.contrib import admin
from .models import (
    Profile,
    Skill,
    Project,
    Education,
    CourseCertification,
    ContactMessage
)

admin.site.site_header = "Poovarasan | Portfolio Administration"
admin.site.site_title = "Poovarasan Portfolio Admin"
admin.site.index_title = "Portfolio Content & Data Management"


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email', 'phone', 'location', 'updated_at')
    fieldsets = (
        ("Personal Information", {
            "fields": ("name", "role", "email", "phone", "location")
        }),
        ("Hero & Bio Details", {
            "fields": ("headline", "hero_description", "about_bio")
        }),
        ("Media & Links", {
            "fields": ("linkedin_url", "github_url", "resume_file", "resume_url", "avatar", "avatar_url")
        }),
    )

    def has_add_permission(self, request):
        # Keep single profile instance
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'badge_label', 'icon_name', 'order', 'featured')
    list_filter = ('category', 'featured')
    search_fields = ('name', 'badge_label')
    list_editable = ('order', 'featured')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'duration', 'order', 'featured', 'created_at')
    list_filter = ('featured', 'created_at')
    search_fields = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order', 'featured')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'period', 'location', 'order')
    list_editable = ('order',)
    search_fields = ('degree', 'institution')


@admin.register(CourseCertification)
class CourseCertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'entry_type', 'period_or_date', 'order')
    list_filter = ('entry_type', 'issuer')
    list_editable = ('order',)
    search_fields = ('title', 'issuer', 'skills_covered')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

    def has_add_permission(self, request):
        return False
