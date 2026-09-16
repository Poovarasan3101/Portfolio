import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-ctjh.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Token dynamically before each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for auth expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on a protected route, remove token
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const portfolioService = {
  // Public & Profile
  getProfile: () => api.get('/profile/'),
  updateProfile: (data) => {
    // Supports multipart/form-data for image and resume upload
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.put('/profile/', data, config);
  },

  // Projects
  getProjects: (params) => api.get('/projects/', { params }),
  createProject: (formData) => api.post('/projects/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateProject: (id, formData) => api.patch(`/projects/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteProject: (id) => api.delete(`/projects/${id}/`),

  // Skills
  getSkills: (params) => api.get('/skills/', { params }),
  createSkill: (data) => api.post('/skills/', data),
  updateSkill: (id, data) => api.put(`/skills/${id}/`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}/`),

  // Experience
  getExperience: () => api.get('/experience/'),
  createExperience: (data) => api.post('/experience/', data),
  updateExperience: (id, data) => api.put(`/experience/${id}/`, data),
  deleteExperience: (id) => api.delete(`/experience/${id}/`),

  // Education
  getEducation: () => api.get('/education/'),
  createEducation: (data) => api.post('/education/', data),
  updateEducation: (id, data) => api.put(`/education/${id}/`, data),
  deleteEducation: (id) => api.delete(`/education/${id}/`),

  // Extra Sections
  getExtraSections: () => api.get('/extra-sections/'),
  createExtraSection: (formData) => api.post('/extra-sections/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateExtraSection: (id, formData) => api.patch(`/extra-sections/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteExtraSection: (id) => api.delete(`/extra-sections/${id}/`),

  // Contact Messages
  submitContact: (data) => api.post('/contact/', data),
  getContactMessages: () => api.get('/contact/'),
  deleteContactMessage: (id) => api.delete(`/contact/${id}/`),

  // Authentication
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  changePassword: (data) => api.post('/auth/change-password/', data),
  getDashboardStats: () => api.get('/dashboard-stats/'),
};

export default portfolioService;
