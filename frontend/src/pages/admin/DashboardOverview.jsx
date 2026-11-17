import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  Award,
  Mail,
  GraduationCap,
  Briefcase,
  FileText,
  ArrowUpRight,
  Loader2,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const DashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    adminService
      .getDashboard()
      .then((res) => setData(res))
      .catch((err) => toast.error(extractApiError(err, 'Failed to load dashboard metrics.')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-neutral-400">
        <Loader2 className="w-6 h-6 animate-spin text-white" />
        <span className="text-xs font-mono">Loading dashboard overview...</span>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentMessages = data?.recent_messages || [];

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.total_projects ?? 0,
      sub: `${stats.featured_projects ?? 0} featured`,
      icon: FolderGit2,
      to: '/admin/projects',
    },
    {
      label: 'Total Skills',
      value: stats.total_skills ?? 0,
      sub: 'Across all categories',
      icon: Cpu,
      to: '/admin/skills',
    },
    {
      label: 'Total Certificates',
      value: stats.total_certificates ?? 0,
      sub: 'Courses & credentials',
      icon: Award,
      to: '/admin/certificates',
    },
    {
      label: 'Total Messages',
      value: stats.total_messages ?? 0,
      sub: `${stats.unread_messages ?? 0} unread`,
      icon: Mail,
      to: '/admin/messages',
      highlight: (stats.unread_messages ?? 0) > 0,
    },
  ];

  const secondaryCards = [
    { label: 'Education', value: stats.total_education ?? 0, icon: GraduationCap, to: '/admin/education' },
    { label: 'Experience', value: stats.total_experience ?? 0, icon: Briefcase, to: '/admin/experience' },
    { label: 'Resume PDF', value: stats.has_resume ? 'Active' : 'Not Set', icon: FileText, to: '/admin/resume' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>MySQL Connected & Live</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Welcome back, {data?.profile_summary?.name || 'Admin'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Manage every section of your portfolio dynamically — no source code editing needed.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
          >
            + Manage Projects
          </Link>
          <Link
            to="/admin/hero"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edit Hero</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.to}
              className="group p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/30 transition-all shadow-sm hover:shadow-glow-card flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </div>

              <div>
                <div className="text-3xl font-extrabold text-white font-mono">{card.value}</div>
                <div className="text-xs font-semibold text-neutral-300 mt-1">{card.label}</div>
                <div className={`text-[11px] font-mono mt-0.5 ${card.highlight ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {card.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Secondary Modules Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {secondaryCards.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className="p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-white/25 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">{item.label}</div>
                  <div className="text-sm font-bold text-white font-mono">{item.value}</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </Link>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="rounded-2xl bg-[#111111] border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Contact Messages</h3>
            <p className="text-xs text-neutral-500">Latest inquiries submitted through your public portfolio</p>
          </div>
          <Link
            to="/admin/messages"
            className="text-xs font-mono text-white hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-10 text-center text-xs font-mono text-neutral-500">
            No contact messages received yet.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentMessages.map((msg) => (
              <Link
                key={msg.id}
                to="/admin/messages"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2.5">
                    {!msg.is_read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" title="Unread" />
                    )}
                    <span className="text-sm font-bold text-white truncate">{msg.name}</span>
                    <span className="text-xs font-mono text-neutral-500 truncate">{msg.email}</span>
                  </div>
                  <div className="text-xs text-neutral-300 truncate">{msg.subject}</div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      msg.is_read
                        ? 'bg-white/5 text-neutral-400'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {msg.is_read ? 'Read' : 'New'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
