import os
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.text import slugify


def validate_image_file(value):
    if not value:
        return
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    if ext not in valid_extensions:
        raise ValidationError('Unsupported image format. Allowed: JPG, JPEG, PNG, WEBP, GIF.')
    if value.size > 5 * 1024 * 1024:
        raise ValidationError('Image file size cannot exceed 5 MB.')


def validate_pdf_file(value):
    if not value:
        return
    ext = os.path.splitext(value.name)[1].lower()
    if ext != '.pdf':
        raise ValidationError('Only PDF files are allowed for resumes.')
    if value.size > 10 * 1024 * 1024:
        raise ValidationError('Resume PDF size cannot exceed 10 MB.')


def validate_certificate_file(value):
    if not value:
        return
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.webp']
    if ext not in valid_extensions:
        raise ValidationError('Unsupported certificate format. Allowed: PDF, JPG, JPEG, PNG, WEBP.')
    if value.size > 10 * 1024 * 1024:
        raise ValidationError('Certificate file size cannot exceed 10 MB.')


class Profile(models.Model):
    name = models.CharField(max_length=100, default="Poovarasan")
    role = models.CharField(max_length=150, default="Python Full Stack Developer")
    headline = models.CharField(
        max_length=255,
        default="Building Modern Web Experiences with Code & Creativity."
    )
    hero_subheading = models.CharField(
        max_length=150,
        blank=True,
        default="Hello, World! I am"
    )
    hero_description = models.TextField(
        default="I'm an aspiring Python Full Stack Developer passionate about building responsive, scalable, and user-friendly web applications using React.js, Python, Django, and MySQL."
    )
    short_intro = models.TextField(
        blank=True,
        default="Aspiring Python Full Stack Developer building scalable web applications with React.js, Django REST Framework, and MySQL."
    )
    about_bio = models.TextField(
        default="I'm Poovarasan, a Computer Science and Engineering graduate with an interest in full-stack web development. I enjoy developing modern web applications, solving technical problems, and learning new technologies. My goal is to create practical and user-friendly digital solutions."
    )
    # Hero Action Buttons
    hero_primary_btn_text = models.CharField(max_length=80, blank=True, default="View My Projects")
    hero_primary_btn_link = models.CharField(max_length=255, blank=True, default="#projects")
    hero_secondary_btn_text = models.CharField(max_length=80, blank=True, default="Download Resume")
    hero_secondary_btn_link = models.CharField(max_length=255, blank=True, default="#resume")
    hero_tertiary_btn_text = models.CharField(max_length=80, blank=True, default="Contact Me")
    hero_tertiary_btn_link = models.CharField(max_length=255, blank=True, default="#contact")

    # Contact & Direct Links
    email = models.EmailField(default="poovarasan31012005@gmail.com")
    phone = models.CharField(max_length=30, default="+91-9629617818")
    location = models.CharField(max_length=150, default="Salem, Tamil Nadu, India")
    linkedin_url = models.URLField(
        blank=True,
        default="https://www.linkedin.com/in/poovarasan-subramani-310105sana"
    )
    github_url = models.URLField(
        blank=True,
        default="https://github.com/Poovarasan3101"
    )
    resume_file = models.FileField(
        upload_to='resumes/',
        blank=True,
        null=True,
        validators=[validate_pdf_file]
    )
    resume_url = models.URLField(blank=True, default="")
    avatar = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True,
        validators=[validate_image_file]
    )
    avatar_url = models.URLField(blank=True, default="")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.role}"

    class Meta:
        verbose_name = "Profile Information"
        verbose_name_plural = "Profile Information"


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tools', 'Tools'),
        ('soft_skills', 'Soft Skills'),
    ]

    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=60, blank=True, default="Code2")
    badge_label = models.CharField(max_length=50, blank=True, default="")
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"[{self.get_category_display()}] {self.name}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    duration = models.CharField(max_length=100, blank=True, default="")
    short_description = models.TextField()
    full_description = models.TextField(blank=True, default="")
    technologies = models.JSONField(default=list, blank=True, help_text="List of technologies e.g. ['React.js', 'Vite', 'Tailwind CSS']")
    features = models.JSONField(default=list, blank=True, help_text="List of key feature bullets")
    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True,
        validators=[validate_image_file]
    )
    image_url = models.URLField(blank=True, default="")
    github_url = models.URLField(blank=True, default="")
    live_demo_url = models.URLField(blank=True, default="")
    featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)[:180] or "project"
            slug = base_slug
            counter = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=250)
    start_year = models.CharField(max_length=20, blank=True, default="")
    end_year = models.CharField(max_length=20, blank=True, default="")
    period = models.CharField(max_length=100, blank=True, default="")
    location = models.CharField(max_length=150)
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']
        verbose_name_plural = "Education"

    def save(self, *args, **kwargs):
        if self.start_year and self.end_year:
            self.period = f"{self.start_year} – {self.end_year}"
        elif self.end_year and not self.period:
            self.period = self.end_year
        elif self.start_year and not self.period:
            self.period = self.start_year
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Experience(models.Model):
    EMPLOYMENT_TYPE_CHOICES = [
        ('Full-Time', 'Full-Time'),
        ('Part-Time', 'Part-Time'),
        ('Internship', 'Internship'),
        ('Freelance', 'Freelance'),
        ('Contract', 'Contract'),
        ('Training', 'Training'),
    ]

    company_name = models.CharField(max_length=200)
    job_role = models.CharField(max_length=200)
    employment_type = models.CharField(
        max_length=50,
        choices=EMPLOYMENT_TYPE_CHOICES,
        default='Full-Time'
    )
    location = models.CharField(max_length=150, blank=True, default="")
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True, default="Present")
    responsibilities = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Experience"
        verbose_name_plural = "Experience"

    def __str__(self):
        return f"{self.job_role} at {self.company_name}"


class CourseCertification(models.Model):
    TYPE_CHOICES = [
        ('course', 'Course'),
        ('certification', 'Certification'),
    ]

    entry_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='certification')
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    period_or_date = models.CharField(max_length=100, blank=True, default="")
    credential_url = models.URLField(blank=True, default="")
    image = models.ImageField(
        upload_to='certificates/',
        blank=True,
        null=True,
        validators=[validate_image_file]
    )
    certificate_file = models.FileField(
        upload_to='certificates/files/',
        blank=True,
        null=True,
        validators=[validate_certificate_file]
    )
    image_url = models.URLField(blank=True, default="")
    skills_covered = models.CharField(max_length=250, blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = "Course & Certification"
        verbose_name_plural = "Courses & Certifications"

    def __str__(self):
        return f"{self.title} ({self.issuer})"


class SocialLink(models.Model):
    platform = models.CharField(max_length=60)
    label = models.CharField(max_length=100, blank=True, default="")
    url = models.URLField()
    icon_name = models.CharField(max_length=60, blank=True, default="Globe")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'platform']
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.platform} - {self.url}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=250)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"From {self.name} ({self.email}) - {self.subject}"
