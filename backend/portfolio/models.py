from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=120, default="Poovarasan")
    title = models.CharField(max_length=150, default="Python Full Stack Developer")
    hero_subtitle = models.TextField(
        default="I am a passionate Python Full Stack Developer focused on building practical, responsive, and user-friendly web applications."
    )
    bio = models.TextField(blank=True, default="")
    career_objective = models.TextField(blank=True, default="")
    developer_background = models.TextField(blank=True, default="")
    interests = models.TextField(blank=True, default="")
    strengths = models.TextField(blank=True, default="")
    profile_image = models.ImageField(upload_to="profile/", blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    email = models.EmailField(blank=True, default="poovarasan.dev@example.com")
    phone = models.CharField(max_length=50, blank=True, default="+91 9876543210")
    location = models.CharField(max_length=150, blank=True, default="Tamil Nadu, India")
    github = models.URLField(blank=True, default="https://github.com/Poovarasan")
    linkedin = models.URLField(blank=True, default="https://linkedin.com/in/poovarasan")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return f"{self.name} - {self.title}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    technologies = models.CharField(max_length=300, help_text="Comma-separated technologies, e.g. React, Django, SQLite")
    github_url = models.URLField(blank=True, default="")
    live_url = models.URLField(blank=True, default="")
    category = models.CharField(max_length=100, default="Full Stack")
    project_date = models.CharField(max_length=100, blank=True, default="2025")
    featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("Frontend", "Frontend"),
        ("Backend", "Backend"),
        ("Database", "Database"),
        ("Tools", "Tools"),
        ("Other", "Other"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Frontend")
    level = models.IntegerField(default=85, help_text="Proficiency percentage (0-100)")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["category", "display_order", "name"]

    def __str__(self):
        return f"{self.name} ({self.category})"


class Experience(models.Model):
    job_title = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    location = models.CharField(max_length=150, blank=True, default="")
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, default="Present")
    is_current = models.BooleanField(default=False)
    is_fresher_notice = models.BooleanField(
        default=False, 
        help_text="Check if this entry highlights fresher / open to opportunities status"
    )
    description = models.TextField(blank=True, default="")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "-id"]

    def __str__(self):
        return f"{self.job_title} at {self.company}"


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=150, blank=True, default="")
    start_year = models.CharField(max_length=50)
    end_year = models.CharField(max_length=50)
    description = models.TextField(blank=True, default="")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["display_order", "-end_year"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class ExtraSection(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=250, blank=True, default="")
    description = models.TextField()
    image = models.ImageField(upload_to="extra_sections/", blank=True, null=True)
    button_text = models.CharField(max_length=100, blank=True, default="")
    button_url = models.CharField(max_length=300, blank=True, default="")
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "id"]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=250)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
