import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const TOKEN_STORAGE = {
  ACCESS: 'portfolio_admin_access',
  REFRESH: 'portfolio_admin_refresh',
  USER: 'portfolio_admin_user',
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach JWT access token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic JWT refresh on 401 responses
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint =
      originalRequest?.url?.includes('/admin/login/') ||
      originalRequest?.url?.includes('/auth/token/refresh/');

    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthEndpoint) {
      const refreshToken = localStorage.getItem(TOKEN_STORAGE.REFRESH);
      if (!refreshToken) {
        localStorage.removeItem(TOKEN_STORAGE.ACCESS);
        localStorage.removeItem(TOKEN_STORAGE.USER);
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        const newAccess = res.data.access;
        localStorage.setItem(TOKEN_STORAGE.ACCESS, newAccess);
        if (res.data.refresh) {
          localStorage.setItem(TOKEN_STORAGE.REFRESH, res.data.refresh);
        }
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        processQueue(null, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem(TOKEN_STORAGE.ACCESS);
        localStorage.removeItem(TOKEN_STORAGE.REFRESH);
        localStorage.removeItem(TOKEN_STORAGE.USER);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export function extractApiError(err, fallback = 'An unexpected error occurred.') {
  if (!err) return fallback;
  const data = err.response?.data;
  if (!data) return err.message || fallback;
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  if (data.message && !data.errors) return data.message;
  const target = data.errors || data;
  if (typeof target === 'object') {
    const parts = Object.entries(target).map(([field, val]) => {
      const msg = Array.isArray(val) ? val.join(', ') : String(val);
      return field === 'non_field_errors' ? msg : `${field}: ${msg}`;
    });
    if (parts.length > 0) return parts.join(' | ');
  }
  return fallback;
}

// ============================================================
// PUBLIC PORTFOLIO SERVICE (100% Dynamic from Django APIs)
// ============================================================

export const portfolioService = {
  async getOverview() {
    const response = await api.get('/overview/');
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/profile/');
    return response.data;
  },

  async getSkills() {
    const response = await api.get('/skills/');
    return response.data;
  },

  async getProjects() {
    const response = await api.get('/projects/');
    return response.data;
  },

  async getEducation() {
    const response = await api.get('/education/');
    return response.data;
  },

  async getExperience() {
    const response = await api.get('/experience/');
    return response.data;
  },

  async getCertificates() {
    const response = await api.get('/certificates/');
    return response.data;
  },

  async getSocialLinks() {
    const response = await api.get('/social-links/');
    return response.data;
  },

  async getResume() {
    const response = await api.get('/resume/');
    return response.data;
  },

  async submitContact(formData) {
    try {
      const response = await api.post('/contact/', formData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        throw err.response.data;
      }
      throw new Error('Unable to connect to the backend server. Please verify Django is running.');
    }
  },
};

// ============================================================
// ADMIN CMS SERVICE (Protected JWT Endpoints)
// ============================================================

export const adminService = {
  // Auth
  async login(username, password) {
    const response = await api.post('/admin/login/', { username, password });
    return response.data;
  },

  async logout() {
    try {
      await api.post('/admin/logout/');
    } catch {
      // Clear local session regardless
    }
  },

  async getMe() {
    const response = await api.get('/admin/me/');
    return response.data;
  },

  async changePassword(payload) {
    const response = await api.post('/admin/change-password/', payload);
    return response.data;
  },

  // Dashboard
  async getDashboard() {
    const response = await api.get('/admin/dashboard/');
    return response.data;
  },

  // Profile & Hero
  async getProfile() {
    const response = await api.get('/profile/');
    return response.data;
  },

  async updateProfile(data, isMultipart = false) {
    const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const response = await api.patch('/profile/', data, config);
    return response.data;
  },

  // Skills
  async getSkills() {
    const response = await api.get('/skills/');
    return response.data;
  },
  async createSkill(data) {
    const response = await api.post('/skills/', data);
    return response.data;
  },
  async updateSkill(id, data) {
    const response = await api.patch(`/skills/${id}/`, data);
    return response.data;
  },
  async deleteSkill(id) {
    await api.delete(`/skills/${id}/`);
  },

  // Projects
  async getProjects() {
    const response = await api.get('/projects/');
    return response.data;
  },
  async createProject(formData) {
    const response = await api.post('/projects/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  async updateProject(id, formData) {
    const response = await api.patch(`/projects/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  async deleteProject(id) {
    await api.delete(`/projects/${id}/`);
  },

  // Education
  async getEducation() {
    const response = await api.get('/education/');
    return response.data;
  },
  async createEducation(data) {
    const response = await api.post('/education/', data);
    return response.data;
  },
  async updateEducation(id, data) {
    const response = await api.patch(`/education/${id}/`, data);
    return response.data;
  },
  async deleteEducation(id) {
    await api.delete(`/education/${id}/`);
  },

  // Experience
  async getExperience() {
    const response = await api.get('/experience/');
    return response.data;
  },
  async createExperience(data) {
    const response = await api.post('/experience/', data);
    return response.data;
  },
  async updateExperience(id, data) {
    const response = await api.patch(`/experience/${id}/`, data);
    return response.data;
  },
  async deleteExperience(id) {
    await api.delete(`/experience/${id}/`);
  },

  // Certificates
  async getCertificates() {
    const response = await api.get('/certificates/');
    return response.data;
  },
  async createCertificate(formData) {
    const response = await api.post('/certificates/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  async updateCertificate(id, formData) {
    const response = await api.patch(`/certificates/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  async deleteCertificate(id) {
    await api.delete(`/certificates/${id}/`);
  },

  // Resume
  async getResume() {
    const response = await api.get('/resume/');
    return response.data;
  },
  async uploadResume(file) {
    const formData = new FormData();
    formData.append('resume_file', file);
    const response = await api.post('/resume/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  async deleteResume() {
    const response = await api.delete('/resume/');
    return response.data;
  },

  // Social Links
  async getSocialLinks() {
    const response = await api.get('/social-links/');
    return response.data;
  },
  async createSocialLink(data) {
    const response = await api.post('/social-links/', data);
    return response.data;
  },
  async updateSocialLink(id, data) {
    const response = await api.patch(`/social-links/${id}/`, data);
    return response.data;
  },
  async deleteSocialLink(id) {
    await api.delete(`/social-links/${id}/`);
  },

  // Contact Messages
  async getMessages() {
    const response = await api.get('/contact/');
    return response.data;
  },
  async toggleMessageRead(id, isRead) {
    const response = await api.patch(`/contact/${id}/`, { is_read: isRead });
    return response.data;
  },
  async deleteMessage(id) {
    await api.delete(`/contact/${id}/`);
  },
};

export default api;
