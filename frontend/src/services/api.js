import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fallback data strictly based on Poovarasan's specifications
export const FALLBACK_DATA = {
  profile: {
    name: "Poovarasan",
    role: "Python Full Stack Developer",
    headline: "Building Modern Web Experiences with Code & Creativity.",
    hero_description: "I'm an aspiring Python Full Stack Developer passionate about building responsive, scalable, and user-friendly web applications using React.js, Python, Django, and MySQL.",
    about_bio: "I'm Poovarasan, a Computer Science and Engineering graduate with an interest in full-stack web development. I enjoy developing modern web applications, solving technical problems, and learning new technologies. My goal is to create practical and user-friendly digital solutions.",
    email: "poovarasan31012005@gmail.com",
    phone: "+91-9629617818",
    location: "Salem, Tamil Nadu, India",
    linkedin_url: "https://www.linkedin.com/in/poovarasan-subramani-310105sana",
    github_url: "https://github.com/poovarasan-subramani",
    resume_url: "/Poovarasan_Resume.pdf",
    avatar_url: ""
  },
  skills: [
    // Frontend
    { id: 1, category: "frontend", name: "HTML", icon_name: "FileCode", badge_label: "Semantic UI", order: 1 },
    { id: 2, category: "frontend", name: "CSS", icon_name: "Palette", badge_label: "Styling & Flexbox", order: 2 },
    { id: 3, category: "frontend", name: "JavaScript", icon_name: "Code2", badge_label: "ES6+ & Async", order: 3 },
    { id: 4, category: "frontend", name: "React.js", icon_name: "Atom", badge_label: "SPA Architecture", order: 4 },
    { id: 5, category: "frontend", name: "Tailwind CSS", icon_name: "Wind", badge_label: "Utility CSS", order: 5 },
    { id: 6, category: "frontend", name: "Responsive Web Design", icon_name: "Smartphone", badge_label: "Mobile First", order: 6 },
    { id: 7, category: "frontend", name: "DOM Manipulation", icon_name: "Layers", badge_label: "State & Events", order: 7 },
    
    // Backend
    { id: 8, category: "backend", name: "Python", icon_name: "Binary", badge_label: "Core Language", order: 1 },
    { id: 9, category: "backend", name: "Django", icon_name: "Server", badge_label: "Full Stack MVC/MVT", order: 2 },
    { id: 10, category: "backend", name: "RESTful APIs", icon_name: "Cpu", badge_label: "API Architecture", order: 3 },
    { id: 11, category: "backend", name: "OOP", icon_name: "Boxes", badge_label: "Design Patterns", order: 4 },
    { id: 12, category: "backend", name: "CRUD Operations", icon_name: "DatabaseBackup", badge_label: "Data Management", order: 5 },

    // Database
    { id: 13, category: "database", name: "MySQL", icon_name: "Database", badge_label: "Relational Queries", order: 1 },
    { id: 14, category: "database", name: "SQLite", icon_name: "HardDrive", badge_label: "Embedded DB", order: 2 },

    // Tools
    { id: 15, category: "tools", name: "Visual Studio Code", icon_name: "TerminalSquare", badge_label: "Primary IDE", order: 1 },
    { id: 16, category: "tools", name: "Cursor", icon_name: "Sparkles", badge_label: "AI Code Editor", order: 2 },
    { id: 17, category: "tools", name: "Git", icon_name: "GitBranch", badge_label: "Version Control", order: 3 },
    { id: 18, category: "tools", name: "GitHub", icon_name: "Github", badge_label: "Code Repositories", order: 4 },
    { id: 19, category: "tools", name: "GitHub Copilot", icon_name: "Bot", badge_label: "AI Assistance", order: 5 },

    // Soft Skills
    { id: 20, category: "soft_skills", name: "Problem-Solving", icon_name: "Brain", badge_label: "Core Competency", order: 1 },
    { id: 21, category: "soft_skills", name: "Analytical Thinking", icon_name: "SearchCode", badge_label: "Root-Cause Analysis", order: 2 },
    { id: 22, category: "soft_skills", name: "Effective Communication", icon_name: "MessageSquare", badge_label: "Active Listening", order: 3 },
    { id: 23, category: "soft_skills", name: "Teamwork & Collaboration", icon_name: "Users", badge_label: "Cross-Functional", order: 4 },
    { id: 24, category: "soft_skills", name: "Adaptability", icon_name: "RefreshCw", badge_label: "Quick Learner", order: 5 },
    { id: 25, category: "soft_skills", name: "Debugging", icon_name: "Bug", badge_label: "Defect Resolution", order: 6 },
    { id: 26, category: "soft_skills", name: "Time Management", icon_name: "Clock", badge_label: "Sprint Delivery", order: 7 },
  ],
  projects: [
    {
      id: 1,
      title: "Panisudar – Job Portal Web Application",
      slug: "panisudar-job-portal",
      duration: "September 2026 – October 2026",
      short_description: "Developed a responsive job portal for job seekers and recruiters with dedicated dashboards.",
      full_description: "Panisudar is an advanced recruitment platform architected to bridge job seekers and talent recruiters through dedicated, high-speed dashboards. Built with modern React.js, Tailwind CSS, Vite, and backed by a Python/Django REST API service with MySQL relational storage.",
      technologies: ["React.js", "Vite", "Tailwind CSS", "React Router", "Axios", "Django REST Framework", "MySQL"],
      features: [
        "Job search and dynamic multi-parameter filtering",
        "Saved jobs and candidate bookmark management",
        "Comprehensive application tracking lifecycle",
        "Recruiter job posting portal with custom form controls",
        "Applicant review pipeline and resume management",
        "Detailed company profiles with open position views",
        "Real-time notifications and status updates"
      ],
      image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      github_url: "https://github.com/poovarasan-subramani",
      live_demo_url: "https://panisudar-jobs.demo.app",
      featured: true,
      order: 1
    },
    {
      id: 2,
      title: "Full-Stack Task & Workflow Orchestration API",
      slug: "task-workflow-api",
      duration: "July 2026 – August 2026",
      short_description: "A RESTful micro-service with JWT authentication, CRUD operations, and relational MySQL persistence.",
      full_description: "Robust backend API service engineered using Django REST Framework and MySQL database. Features JWT authentication, role-based access control, query optimization, and structured error responses.",
      technologies: ["Python", "Django", "Django REST Framework", "MySQL", "JWT", "Tailwind CSS"],
      features: [
        "Secure JWT authentication and token refresh handling",
        "Full CRUD operations with strict relational integrity",
        "Dynamic search, filtering, and pagination",
        "Comprehensive API documentation and test coverage"
      ],
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      github_url: "https://github.com/poovarasan-subramani",
      live_demo_url: "https://workflow-api.demo.app",
      featured: true,
      order: 2
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.E. Computer Science and Engineering",
      institution: "Ganesh College of Engineering",
      period: "2022 – 2026",
      location: "Salem",
      description: "Graduating with strong academic standing. Specialized in Full Stack Web Development, Object-Oriented Programming, Database Management Systems, and Software Engineering.",
      order: 1
    },
    {
      id: 2,
      degree: "HSC (Higher Secondary Certificate)",
      institution: "Government Higher Secondary School",
      period: "2022",
      location: "Aragalur, Salem",
      description: "Completed higher secondary curriculum with distinguished marks in Computer Science and Mathematics.",
      order: 2
    },
    {
      id: 3,
      degree: "SSLC (Secondary School Leaving Certificate)",
      institution: "Government Higher Secondary School",
      period: "2020",
      location: "Aragalur, Salem",
      description: "Completed secondary education with scholastic distinction.",
      order: 3
    }
  ],
  certifications: [
    {
      id: 1,
      entry_type: "course",
      title: "Python Full Stack Development",
      issuer: "Login360, Coimbatore",
      period_or_date: "May 2026 – September 2026",
      skills_covered: "Python, Django, React.js, RESTful APIs, MySQL, Frontend & Backend Architecture",
      image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      credential_url: "",
      order: 1
    },
    {
      id: 2,
      entry_type: "certification",
      title: "Python Programming",
      issuer: "YARD STICK, Salem",
      period_or_date: "2026",
      skills_covered: "Core Python, Object-Oriented Design, Data Structures, Algorithms",
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      credential_url: "",
      order: 2
    },
    {
      id: 3,
      entry_type: "certification",
      title: "Python Full Stack Development",
      issuer: "Login360, Coimbatore",
      period_or_date: "2026",
      skills_covered: "Django REST Framework, React Components, MySQL Integration, Full-Stack Testing",
      image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      credential_url: "",
      order: 3
    },
    {
      id: 4,
      entry_type: "certification",
      title: "Android App Development",
      issuer: "Wings Technology, Salem",
      period_or_date: "2025",
      skills_covered: "Android Studio, Mobile Lifecycle, UI Widgets, REST Integration",
      image_url: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80",
      credential_url: "",
      order: 4
    },
    {
      id: 5,
      entry_type: "certification",
      title: "AI and Green Skills",
      issuer: "Naan Mudhalvan",
      period_or_date: "2025",
      skills_covered: "Artificial Intelligence Foundations, Sustainable Computing, Prompt Engineering",
      image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      credential_url: "",
      order: 5
    }
  ]
};

// API Services
export const portfolioService = {
  // Fetch overview
  async getOverview() {
    try {
      const response = await api.get('/overview/');
      return { data: response.data, isLive: true };
    } catch (err) {
      console.warn("Django API unreachable, using local synchronized data:", err.message);
      return { data: FALLBACK_DATA, isLive: false };
    }
  },

  // Fetch individual sections
  async getProfile() {
    try {
      const response = await api.get('/profile/');
      return { data: response.data, isLive: true };
    } catch {
      return { data: FALLBACK_DATA.profile, isLive: false };
    }
  },

  async getSkills() {
    try {
      const response = await api.get('/skills/');
      return { data: response.data, isLive: true };
    } catch {
      return { data: FALLBACK_DATA.skills, isLive: false };
    }
  },

  async getProjects() {
    try {
      const response = await api.get('/projects/');
      return { data: response.data, isLive: true };
    } catch {
      return { data: FALLBACK_DATA.projects, isLive: false };
    }
  },

  async getEducation() {
    try {
      const response = await api.get('/education/');
      return { data: response.data, isLive: true };
    } catch {
      return { data: FALLBACK_DATA.education, isLive: false };
    }
  },

  async getCertifications() {
    try {
      const response = await api.get('/certifications/');
      return { data: response.data, isLive: true };
    } catch {
      return { data: FALLBACK_DATA.certifications, isLive: false };
    }
  },

  // Submit contact message to Django MySQL backend
  async submitContact(formData) {
    try {
      const response = await api.post('/contact/', formData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        throw err.response.data;
      }
      throw new Error("Unable to connect to the backend server. Please verify Django is running.");
    }
  }
};

export default api;
