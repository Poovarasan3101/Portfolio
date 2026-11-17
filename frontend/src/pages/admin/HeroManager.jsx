import React, { useState, useEffect } from 'react';
import { Save, Upload, Loader2, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const HeroManager = () => {
  const [form, setForm] = useState({
    hero_subheading: '',
    headline: '',
    hero_description: '',
    hero_primary_btn_text: '',
    hero_primary_btn_link: '',
    hero_secondary_btn_text: '',
    hero_secondary_btn_link: '',
    hero_tertiary_btn_text: '',
    hero_tertiary_btn_link: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    adminService
      .getProfile()
      .then((data) => {
        setForm({
          hero_subheading: data.hero_subheading || '',
          headline: data.headline || '',
          hero_description: data.hero_description || '',
          hero_primary_btn_text: data.hero_primary_btn_text || 'View My Projects',
          hero_primary_btn_link: data.hero_primary_btn_link || '#projects',
          hero_secondary_btn_text: data.hero_secondary_btn_text || 'Download Resume',
          hero_secondary_btn_link: data.hero_secondary_btn_link || '#resume',
          hero_tertiary_btn_text: data.hero_tertiary_btn_text || 'Contact Me',
          hero_tertiary_btn_link: data.hero_tertiary_btn_link || '#contact',
        });
        setAvatarPreview(data.avatar_file_url || '');
      })
      .catch((err) => toast.error(extractApiError(err, 'Failed to load hero settings.')))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      if (avatarFile) {
        fd.append('avatar', avatarFile);
      }
      const updated = await adminService.updateProfile(fd, true);
      setAvatarPreview(updated.avatar_file_url || '');
      setAvatarFile(null);
      toast.success('Hero section updated live!');
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to save hero section.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center gap-2 text-neutral-400">
        <Loader2 className="w-5 h-5 animate-spin text-white" />
        <span className="text-xs font-mono">Loading hero settings...</span>
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
      {/* Hero Copy */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-5">
        <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
          Hero Headlines & Copy
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400">Subheading</label>
          <input
            type="text"
            value={form.hero_subheading}
            onChange={(e) => setForm({ ...form, hero_subheading: e.target.value })}
            placeholder="e.g. Hello, World! I am"
            className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400">Main Headline *</label>
          <input
            type="text"
            required
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            placeholder="Building Modern Web Experiences with Code & Creativity."
            className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400">Hero Description *</label>
          <textarea
            rows={4}
            required
            value={form.hero_description}
            onChange={(e) => setForm({ ...form, hero_description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
          />
        </div>

        {/* Quick Profile Image Update */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#181818] border border-white/15 flex items-center justify-center overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Hero Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-neutral-600" />
            )}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-medium cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Change Hero Profile Image</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Action Buttons Configuration */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-5">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
            Call-to-Action Buttons
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Use section anchors like <code className="text-neutral-300">#projects</code>,{' '}
            <code className="text-neutral-300">#resume</code> (opens resume modal),{' '}
            <code className="text-neutral-300">#contact</code>, or any external URL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Primary Button Text</label>
            <input
              type="text"
              value={form.hero_primary_btn_text}
              onChange={(e) => setForm({ ...form, hero_primary_btn_text: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Primary Button Link</label>
            <input
              type="text"
              value={form.hero_primary_btn_link}
              onChange={(e) => setForm({ ...form, hero_primary_btn_link: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Secondary Button Text</label>
            <input
              type="text"
              value={form.hero_secondary_btn_text}
              onChange={(e) => setForm({ ...form, hero_secondary_btn_text: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Secondary Button Link</label>
            <input
              type="text"
              value={form.hero_secondary_btn_link}
              onChange={(e) => setForm({ ...form, hero_secondary_btn_link: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Tertiary Button Text</label>
            <input
              type="text"
              value={form.hero_tertiary_btn_text}
              onChange={(e) => setForm({ ...form, hero_tertiary_btn_text: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Tertiary Button Link</label>
            <input
              type="text"
              value={form.hero_tertiary_btn_link}
              onChange={(e) => setForm({ ...form, hero_tertiary_btn_link: e.target.value })}
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
          <span>{saving ? 'Saving Hero...' : 'Save Hero Section'}</span>
        </button>
      </div>
    </motion.form>
  );
};

export default HeroManager;
