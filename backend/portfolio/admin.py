from django.contrib import admin
from .models import (
    Profile,
    Skill,
    Project,
    Education,
    Experience,
    CourseCertification,
    SocialLink,
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
            "fields": (
                "hero_subheading", "headline", "hero_description",
                "short_intro", "about_bio",
                "hero_primary_btn_text", "hero_primary_btn_link",
                "hero_secondary_btn_text", "hero_secondary_btn_link",
                "hero_tertiary_btn_text", "hero_tertiary_btn_link",
            )
        }),
        ("Media & Links", {
            "fields": ("linkedin_url", "github_url", "resume_file", "resume_url", "avatar", "avatar_url")
        }),
    )

    def has_add_permission(self, request):
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'badge_label', 'icon_name', 'order', 'featured')
    list_filter = ('category', 'featured')
    search_fields = ('name', 'badge_label', 'description')
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
    list_display = ('degree', 'institution', 'start_year', 'end_year', 'period', 'location', 'order')
    list_editable = ('order',)
    search_fields = ('degree', 'institution')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('job_role', 'company_name', 'employment_type', 'start_date', 'end_date', 'order')
    list_filter = ('employment_type',)
    list_editable = ('order',)
    search_fields = ('company_name', 'job_role', 'responsibilities')


@admin.register(CourseCertification)
class CourseCertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'entry_type', 'period_or_date', 'order')
    list_filter = ('entry_type', 'issuer')
    list_editable = ('order',)
    search_fields = ('title', 'issuer', 'skills_covered')


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'label', 'url', 'icon_name', 'is_active', 'order')
    list_filter = ('is_active', 'platform')
    list_editable = ('is_active', 'order')
    search_fields = ('platform', 'label', 'url')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

    def has_add_permission(self, request):
        return False
