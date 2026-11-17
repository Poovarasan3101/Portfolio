import React, { useState, useEffect } from 'react';
import { Save, Upload, Loader2, Trash2, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const ProfileManager = () => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    short_intro: '',
    about_bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    avatar_url: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [clearAvatar, setClearAvatar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    adminService
      .getProfile()
      .then((data) => {
        setForm({
          name: data.name || '',
          role: data.role || '',
          short_intro: data.short_intro || '',
          about_bio: data.about_bio || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          linkedin_url: data.linkedin_url || '',
          github_url: data.github_url || '',
          avatar_url: data.avatar_url || '',
        });
        setAvatarPreview(data.avatar_file_url || '');
      })
      .catch((err) => toast.error(extractApiError(err, 'Failed to load profile.')))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setClearAvatar(false);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      if (avatarFile) {
        fd.append('avatar', avatarFile);
      }
      if (clearAvatar) {
        fd.append('clear_avatar', 'true');
      }

      const updated = await adminService.updateProfile(fd, true);
      setAvatarPreview(updated.avatar_file_url || '');
      setAvatarFile(null);
      setClearAvatar(false);
      toast.success('Profile & About Me updated successfully!');
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to update profile.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center gap-2 text-neutral-400">
        <Loader2 className="w-5 h-5 animate-spin text-white" />
        <span className="text-xs font-mono">Loading profile data...</span>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Profile Image Card */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
          Profile Photo
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-24 h-24 rounded-2xl bg-[#181818] border border-white/15 flex items-center justify-center overflow-hidden flex-shrink-0">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-9 h-9 text-neutral-600" />
            )}
          </div>

          <div className="space-y-2.5 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatarFile(null);
                    setAvatarPreview('');
                    setClearAvatar(true);
                    setForm((prev) => ({ ...prev, avatar_url: '' }));
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-red-500/15 text-neutral-300 hover:text-red-300 border border-white/10 text-xs font-medium cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>
            <p className="text-[11px] font-mono text-neutral-500">
              Accepted formats: JPG, PNG, WEBP, GIF (max 5 MB). Or paste an image URL below.
            </p>
            <input
              type="url"
              value={form.avatar_url}
              onChange={(e) => {
                setForm({ ...form, avatar_url: e.target.value });
                if (!avatarFile) setAvatarPreview(e.target.value);
              }}
              placeholder="Optional: External profile image URL (https://...)"
              className="w-full px-3.5 py-2 rounded-xl bg-[#161616] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      </div>

      {/* Identity & About Me Card */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-5">
        <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
          Identity & About Me
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Full Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Professional Title *</label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400">Short Introduction</label>
          <textarea
            rows={2}
            value={form.short_intro}
            onChange={(e) => setForm({ ...form, short_intro: e.target.value })}
            placeholder="Brief developer introduction shown in About & Footer..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400">About Me *</label>
          <textarea
            rows={5}
            required
            value={form.about_bio}
            onChange={(e) => setForm({ ...form, about_bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
          />
        </div>
      </div>

      {/* Contact Details & Primary Links */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-5">
        <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
          Contact Details & Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">LinkedIn URL</label>
            <input
              type="url"
              value={form.linkedin_url}
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">GitHub URL</label>
            <input
              type="url"
              value={form.github_url}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm flex items-center gap-2 transition-all shadow-glow-sm disabled:opacity-60 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
        </button>
      </div>
    </motion.form>
  );
};

export default ProfileManager;
