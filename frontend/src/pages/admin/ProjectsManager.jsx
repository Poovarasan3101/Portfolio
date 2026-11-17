import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Save,
  Upload,
  Star,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPTY_FORM = {
  title: '',
  duration: '',
  short_description: '',
  full_description: '',
  technologiesText: '',
  featuresText: '',
  image_url: '',
  github_url: '',
  live_demo_url: '',
  featured: true,
  order: 0,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const loadProjects = async () => {
    try {
      const data = await adminService.getProjects();
      setProjects(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load projects.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview('');
    setModalOpen(true);
  };

  const openEdit = (proj) => {
    setEditing(proj);
    setForm({
      title: proj.title || '',
      duration: proj.duration || '',
      short_description: proj.short_description || '',
      full_description: proj.full_description || '',
      technologiesText: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      featuresText: Array.isArray(proj.features) ? proj.features.join('\n') : '',
      image_url: proj.image_url || '',
      github_url: proj.github_url || '',
      live_demo_url: proj.live_demo_url || '',
      featured: Boolean(proj.featured),
      order: proj.order ?? 0,
    });
    setImageFile(null);
    setImagePreview(proj.image_display_url || proj.image_url || '');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const technologies = form.technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const features = form.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('duration', form.duration);
      fd.append('short_description', form.short_description);
      fd.append('full_description', form.full_description);
      fd.append('technologies', JSON.stringify(technologies));
      fd.append('features', JSON.stringify(features));
      fd.append('image_url', form.image_url);
      fd.append('github_url', form.github_url);
      fd.append('live_demo_url', form.live_demo_url);
      fd.append('featured', form.featured ? 'true' : 'false');
      fd.append('order', String(form.order ?? 0));
      if (imageFile) {
        fd.append('image', imageFile);
      }

      if (editing) {
        await adminService.updateProject(editing.id, fd);
        toast.success(`Updated project "${form.title}".`);
      } else {
        await adminService.createProject(fd);
        toast.success(`Created project "${form.title}".`);
      }
      setModalOpen(false);
      await loadProjects();
    } catch (err) {
      toast.error(extractApiError(err, 'Could not save project.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteProject(deleteTarget.id);
      toast.success(`Deleted project "${deleteTarget.title}".`);
      setDeleteTarget(null);
      await loadProjects();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete project.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage all portfolio projects ({projects.length} total). Featured projects stand out on your public site.
        </p>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 shadow-glow-sm cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No projects yet. Click &quot;Add Project&quot; to publish your first project.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative aspect-video bg-[#161616] border-b border-white/10 overflow-hidden">
                  <img
                    src={proj.image_display_url || proj.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80'}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  {proj.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" /> Featured
                    </span>
                  )}
                  {proj.duration && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono text-neutral-200 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {proj.duration}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h4 className="text-base font-bold text-white">{proj.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {proj.short_description}
                  </p>
                  {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  {proj.live_demo_url && (
                    <a
                      href={proj.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                  <span>Order #{proj.order}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(proj)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(proj)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/20 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editing ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Panisudar – Job Portal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. September 2026 – October 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Detailed Description</label>
                <textarea
                  rows={3}
                  value={form.full_description}
                  onChange={(e) => setForm({ ...form, full_description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">
                  Technologies Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.technologiesText}
                  onChange={(e) => setForm({ ...form, technologiesText: e.target.value })}
                  placeholder="React.js, Tailwind CSS, Django REST Framework, MySQL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={4}
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  placeholder={"Job search and filtering\nSaved jobs\nApplication tracking"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Image Upload */}
              <div className="p-4 rounded-xl bg-[#161616] border border-white/10 space-y-3">
                <label className="text-xs font-mono text-neutral-300 block">
                  Project Screenshot / Cover Image
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border border-white/10"
                  />
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-black font-bold text-xs cursor-pointer hover:bg-neutral-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Screenshot</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => {
                      setForm({ ...form, image_url: e.target.value });
                      if (!imageFile) setImagePreview(e.target.value);
                    }}
                    placeholder="Or paste image URL (https://...)"
                    className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-xs focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">GitHub URL</label>
                  <input
                    type="url"
                    value={form.github_url}
                    onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Live Demo URL</label>
                  <input
                    type="url"
                    value={form.live_demo_url}
                    onChange={(e) => setForm({ ...form, live_demo_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <label className="inline-flex items-center gap-2.5 text-xs text-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-white"
                  />
                  <span>Mark as Featured Project</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono text-neutral-400">Order:</label>
                  <input
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-20 px-3 py-1.5 rounded-lg bg-[#161616] border border-white/10 text-white text-xs"
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
                  <span>{editing ? 'Update Project' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default ProjectsManager;
