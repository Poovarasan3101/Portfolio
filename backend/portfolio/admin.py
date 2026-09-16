from django.contrib import admin
from .models import Profile, Project, Skill, Experience, Education, ExtraSection, ContactMessage

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'phone', 'updated_at')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'display_order', 'project_date')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'technologies', 'short_description')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'display_order')
    list_filter = ('category',)
    search_fields = ('name',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'company', 'location', 'start_date', 'end_date', 'is_fresher_notice', 'display_order')
    list_filter = ('is_fresher_notice', 'is_current')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'location', 'start_year', 'end_year', 'display_order')

@admin.register(ExtraSection)
class ExtraSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'is_active', 'display_order')
    list_filter = ('is_active',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
