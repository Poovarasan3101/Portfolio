import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Layers,
  Mail,
  KeyRound,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Profile & About', path: '/admin/profile', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Skills', path: '/admin/skills', icon: Cpu },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Extra Sections', path: '/admin/extra-sections', icon: Layers },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Change Password', path: '/admin/change-password', icon: KeyRound },
  ];

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-paper-card border-b border-paper-border px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-classic-accent" />
          <span className="font-serif font-bold text-ink-heading">Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-ink-heading hover:bg-paper-muted rounded border border-paper-border"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-paper-card border-r border-paper-border flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-paper-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-xl font-bold text-ink-heading">
                Poovarasan
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden text-ink-muted hover:text-ink-heading"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Logged in as {user?.username || 'Admin'}</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-classic-primary text-white'
                        : 'text-ink-muted hover:text-ink-heading hover:bg-paper-muted'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-paper-border space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 text-xs font-mono text-ink-muted hover:text-ink-heading hover:bg-paper-muted rounded border border-paper-border transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 w-full px-3.5 py-2 text-xs font-mono text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Confirm Sign Out"
        message="Are you sure you want to end your current admin session?"
        confirmText="Sign Out"
        isDestructive={false}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
};

export default AdminLayout;
