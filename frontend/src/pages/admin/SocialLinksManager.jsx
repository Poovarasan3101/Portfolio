import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import { SocialIcon } from '../../components/Icons';

const PLATFORM_PRESETS = [
  { platform: 'LinkedIn', icon_name: 'Linkedin' },
  { platform: 'GitHub', icon_name: 'Github' },
  { platform: 'Instagram', icon_name: 'Instagram' },
  { platform: 'Twitter / X', icon_name: 'Twitter' },
  { platform: 'YouTube', icon_name: 'Youtube' },
  { platform: 'Website / Other', icon_name: 'Globe' },
];

const EMPTY_FORM = {
  platform: 'LinkedIn',
  label: '',
  url: '',
  icon_name: 'Linkedin',
  is_active: true,
  order: 0,
};

const SocialLinksManager = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const loadData = async () => {
    try {
      const data = await adminService.getSocialLinks();
      setLinks(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load social links.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      platform: item.platform || '',
      label: item.label || '',
      url: item.url || '',
      icon_name: item.icon_name || 'Globe',
      is_active: item.is_active ?? true,
      order: item.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminService.updateSocialLink(editing.id, form);
        toast.success(`Updated "${form.platform}" link.`);
      } else {
        await adminService.createSocialLink(form);
        toast.success(`Added "${form.platform}" link.`);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Could not save social link.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteSocialLink(deleteTarget.id);
      toast.success(`Deleted "${deleteTarget.platform}" link.`);
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete social link.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage LinkedIn, GitHub, Instagram, and other social links shown across Navbar, Hero, Contact, and Footer.
        </p>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 shadow-glow-sm cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading social links...</span>
        </div>
      ) : links.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No social links configured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <SocialIcon platform={item.platform} iconName={item.icon_name} className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{item.platform}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        item.is_active
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-white/5 text-neutral-500'
                      }`}
                    >
                      {item.is_active ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-neutral-400 hover:text-white truncate flex items-center gap-1 mt-0.5"
                  >
                    <span className="truncate">{item.url}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-[#111111] border border-white/20 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editing ? 'Edit Social Link' : 'Add Social Link'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5">
                {PLATFORM_PRESETS.map((p) => (
                  <button
                    type="button"
                    key={p.platform}
                    onClick={() => setForm({ ...form, platform: p.platform, icon_name: p.icon_name })}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border cursor-pointer transition-colors ${
                      form.icon_name === p.icon_name
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {p.platform}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Platform Name *</label>
                <input
                  type="text"
                  required
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  placeholder="e.g. LinkedIn, GitHub, Instagram"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Display Handle / Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g. @poovarasan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Profile URL *</label>
                <input
                  type="url"
                  required
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="inline-flex items-center gap-2 text-xs text-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="w-4 h-4 rounded accent-white"
                  />
                  <span>Visible on public portfolio</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono text-neutral-400">Order:</label>
                  <input
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-16 px-2.5 py-1.5 rounded-lg bg-[#161616] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 disabled:opacity-60 cursor-pointer"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{editing ? 'Update' : 'Save'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Social Link"
        message={`Are you sure you want to delete your "${deleteTarget?.platform}" link?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default SocialLinksManager;
