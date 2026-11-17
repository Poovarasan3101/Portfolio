import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Cpu,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Share2,
  Mail,
  KeyRound,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { adminService } from '../../services/api';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/profile', label: 'Profile & About', icon: User },
  { to: '/admin/hero', label: 'Hero Section', icon: Sparkles },
  { to: '/admin/skills', label: 'Skills', icon: Cpu },
  { to: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/certificates', label: 'Certificates', icon: Award },
  { to: '/admin/resume', label: 'Resume PDF', icon: FileText },
  { to: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { to: '/admin/messages', label: 'Messages', icon: Mail, showBadge: true },
  { to: '/admin/settings', label: 'Account & Security', icon: KeyRound },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Admin Dashboard | Portfolio CMS';
    adminService
      .getDashboard()
      .then((res) => setUnreadCount(res?.stats?.unread_messages || 0))
      .catch(() => {});
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    toast.info('Logged out of Admin Dashboard.');
    navigate('/admin/login', { replace: true });
  };

  const currentNav = NAV_ITEMS.find((item) => location.pathname.startsWith(item.to));

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0c0c0c] border-r border-white/10">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-black font-mono font-extrabold flex items-center justify-center text-sm shadow-glow-sm">
            P
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">Portfolio CMS</div>
            <div className="text-[10px] font-mono text-neutral-500">Admin Console</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-glow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </span>
              {item.showBadge && unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-black">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom User & Logout */}
      <div className="p-4 border-t border-white/10 space-y-2.5">
        <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-xs font-bold text-white truncate">{user?.username || 'Admin'}</div>
          <div className="text-[10px] font-mono text-neutral-500 truncate">{user?.email || 'Superuser'}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/15 text-neutral-300 hover:text-red-300 border border-white/10 hover:border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-200 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 max-w-[80vw] h-full z-10">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white">
                {currentNav?.label || 'Admin Dashboard'}
              </h1>
              <p className="text-[11px] font-mono text-neutral-500 hidden sm:block">
                Changes save directly to MySQL and reflect live on your portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-colors shadow-glow-sm"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Outlet Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          <Outlet context={{ refreshUnreadCount: () => adminService.getDashboard().then((r) => setUnreadCount(r?.stats?.unread_messages || 0)).catch(() => {}) }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
