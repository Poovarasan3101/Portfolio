import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';

// Admin Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProfileManager from './admin/ProfileManager';
import ProjectManager from './admin/ProjectManager';
import SkillManager from './admin/SkillManager';
import ExperienceManager from './admin/ExperienceManager';
import EducationManager from './admin/EducationManager';
import ExtraSectionManager from './admin/ExtraSectionManager';
import MessageManager from './admin/MessageManager';
import ChangePassword from './admin/ChangePassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Home */}
          <Route path="/" element={<Home />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="skills" element={<SkillManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="extra-sections" element={<ExtraSectionManager />} />
            <Route path="messages" element={<MessageManager />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
