from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100, default="Poovarasan")
    role = models.CharField(max_length=150, default="Python Full Stack Developer")
    headline = models.CharField(
        max_length=255, 
        default="Building Modern Web Experiences with Code & Creativity."
    )
    hero_description = models.TextField(
        default="I'm an aspiring Python Full Stack Developer passionate about building responsive, scalable, and user-friendly web applications using React.js, Python, Django, and MySQL."
    )
    about_bio = models.TextField(
        default="I'm Poovarasan, a Computer Science and Engineering graduate with an interest in full-stack web development. I enjoy developing modern web applications, solving technical problems, and learning new technologies. My goal is to create practical and user-friendly digital solutions."
    )
    email = models.EmailField(default="poovarasan31012005@gmail.com")
    phone = models.CharField(max_length=30, default="+91-9629617818")
    location = models.CharField(max_length=150, default="Salem, Tamil Nadu, India")
    linkedin_url = models.URLField(
        default="https://www.linkedin.com/in/poovarasan-subramani-310105sana"
    )
    github_url = models.URLField(
        default="https://github.com/poovarasan-subramani"
    )
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    resume_url = models.URLField(blank=True, default="")
    avatar = models.ImageField(upload_to='profile/', blank=True, null=True)
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
        ('tools', 'Tools & Platforms'),
        ('soft_skills', 'Soft Skills'),
    ]

    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=60, blank=True, default="")
    badge_label = models.CharField(max_length=50, blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"[{self.get_category_display()}] {self.name}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    duration = models.CharField(max_length=100, default="September 2026 – October 2026")
    short_description = models.TextField()
    full_description = models.TextField(blank=True, default="")
    technologies = models.JSONField(default=list, help_text="List of technologies e.g. ['React.js', 'Vite', 'Tailwind CSS']")
    features = models.JSONField(default=list, help_text="List of key feature bullets")
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_url = models.URLField(blank=True, default="")
    github_url = models.URLField(blank=True, default="https://github.com/poovarasan-subramani")
    live_demo_url = models.URLField(blank=True, default="")
    featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=250)
    period = models.CharField(max_length=100)
    location = models.CharField(max_length=150)
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


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
    image = models.ImageField(upload_to='certificates/', blank=True, null=True)
    image_url = models.URLField(blank=True, default="")
    skills_covered = models.CharField(max_length=250, blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = "Course & Certification"
        verbose_name_plural = "Courses & Certifications"

    def __str__(self):
        return f"{self.title} ({self.issuer})"


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
