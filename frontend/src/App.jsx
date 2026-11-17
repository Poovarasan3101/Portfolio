import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import PublicPortfolio from './pages/PublicPortfolio';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProfileManager from './pages/admin/ProfileManager';
import HeroManager from './pages/admin/HeroManager';
import SkillsManager from './pages/admin/SkillsManager';
import ProjectsManager from './pages/admin/ProjectsManager';
import EducationManager from './pages/admin/EducationManager';
import ExperienceManager from './pages/admin/ExperienceManager';
import CertificatesManager from './pages/admin/CertificatesManager';
import ResumeManager from './pages/admin/ResumeManager';
import SocialLinksManager from './pages/admin/SocialLinksManager';
import MessagesManager from './pages/admin/MessagesManager';
import SettingsManager from './pages/admin/SettingsManager';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Portfolio */}
            <Route path="/" element={<PublicPortfolio />} />

            {/* Dedicated Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Dashboard Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="profile" element={<ProfileManager />} />
              <Route path="hero" element={<HeroManager />} />
              <Route path="skills" element={<SkillsManager />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="experience" element={<ExperienceManager />} />
              <Route path="certificates" element={<CertificatesManager />} />
              <Route path="resume" element={<ResumeManager />} />
              <Route path="social-links" element={<SocialLinksManager />} />
              <Route path="messages" element={<MessagesManager />} />
              <Route path="settings" element={<SettingsManager />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
