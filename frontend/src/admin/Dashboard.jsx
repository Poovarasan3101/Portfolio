import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Layers,
  Mail,
  ArrowUpRight,
  Plus,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import portfolioService from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, messagesRes] = await Promise.allSettled([
          portfolioService.getDashboardStats(),
          portfolioService.getContactMessages(),
        ]);

        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
        if (messagesRes.status === 'fulfilled') setMessages(messagesRes.value.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-classic-accent animate-spin mb-3" />
        <span className="font-serif text-ink-heading">Loading Dashboard Statistics...</span>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      count: stats?.total_projects ?? 0,
      icon: FolderGit2,
      link: '/admin/projects',
    },
    {
      title: 'Total Skills',
      count: stats?.total_skills ?? 0,
      icon: Cpu,
      link: '/admin/skills',
    },
    {
      title: 'Experience Entries',
      count: stats?.total_experience ?? 0,
      icon: Briefcase,
      link: '/admin/experience',
    },
    {
      title: 'Education Records',
      count: stats?.total_education ?? 0,
      icon: GraduationCap,
      link: '/admin/education',
    },
    {
      title: 'Extra Sections',
      count: stats?.total_extra_sections ?? 0,
      icon: Layers,
      link: '/admin/extra-sections',
    },
    {
      title: 'Inquiries Received',
      count: stats?.total_messages ?? 0,
      unread: stats?.unread_messages ?? 0,
      icon: Mail,
      link: '/admin/messages',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink-heading">
          Portfolio Management Dashboard
        </h1>
        <p className="text-sm font-mono text-ink-muted mt-1">
          Real-time metrics, content control, and visitor inquiries.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-paper-card border border-paper-border rounded shadow-classic p-6 hover:shadow-classic-md hover:border-classic-accent/40 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block mb-1">
                    {card.title}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-ink-heading">
                      {card.count}
                    </span>
                    {card.unread > 0 && (
                      <span className="text-xs font-mono px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                        {card.unread} unread
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-3 bg-paper-muted group-hover:bg-stone-200 border border-paper-border rounded text-classic-accent transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-paper-border flex items-center justify-between text-xs font-mono text-ink-muted group-hover:text-ink-heading">
                <span>Manage entries</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-5 bg-paper-card border border-paper-border rounded shadow-classic p-6">
          <h2 className="font-serif text-xl font-semibold text-ink-heading mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="flex items-center justify-between p-3 rounded border border-paper-border hover:bg-paper-muted text-xs font-mono transition-colors"
            >
              <span>+ Add New Project</span>
              <Plus className="w-4 h-4 text-classic-accent" />
            </Link>
            <Link
              to="/admin/skills"
              className="flex items-center justify-between p-3 rounded border border-paper-border hover:bg-paper-muted text-xs font-mono transition-colors"
            >
              <span>+ Add New Skill</span>
              <Plus className="w-4 h-4 text-classic-accent" />
            </Link>
            <Link
              to="/admin/profile"
              className="flex items-center justify-between p-3 rounded border border-paper-border hover:bg-paper-muted text-xs font-mono transition-colors"
            >
              <span>Update About / Bio / Resume</span>
              <ArrowUpRight className="w-4 h-4 text-classic-accent" />
            </Link>
            <Link
              to="/admin/extra-sections"
              className="flex items-center justify-between p-3 rounded border border-paper-border hover:bg-paper-muted text-xs font-mono transition-colors"
            >
              <span>Manage Custom Sections</span>
              <ArrowUpRight className="w-4 h-4 text-classic-accent" />
            </Link>
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="lg:col-span-7 bg-paper-card border border-paper-border rounded shadow-classic p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-ink-heading">
              Recent Visitor Messages
            </h2>
            <Link
              to="/admin/messages"
              className="text-xs font-mono text-classic-accent hover:underline"
            >
              View All ({stats?.total_messages ?? 0})
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-ink-muted italic border border-dashed border-paper-border rounded">
              No visitor messages received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 bg-paper rounded border border-paper-border text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink-heading">{msg.name}</span>
                    <span className="text-[11px] font-mono text-ink-muted">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-ink-muted font-mono">{msg.email}</div>
                  <div className="font-medium text-ink-body pt-1">{msg.subject}</div>
                  <p className="text-ink-muted line-clamp-1">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
