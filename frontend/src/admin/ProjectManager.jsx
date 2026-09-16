import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Star, Image, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import portfolioService from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    short_description: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    category: 'Full Stack',
    project_date: new Date().getFullYear().toString(),
    featured: false,
    display_order: 0,
  };

  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await portfolioService.getProjects();
      setProjects(res.data);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load projects.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      short_description: proj.short_description || '',
      description: proj.description || '',
      technologies: proj.technologies || '',
      github_url: proj.github_url || '',
      live_url: proj.live_url || '',
      category: proj.category || 'Full Stack',
      project_date: proj.project_date || '',
      featured: Boolean(proj.featured),
      display_order: proj.display_order ?? 0,
    });
    setImageFile(null);
    setImagePreview(proj.image_url || null);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: '', text: '' });

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, val);
      });
      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (editingId) {
        await portfolioService.updateProject(editingId, payload);
        setFeedback({ type: 'success', text: 'Project updated successfully.' });
      } else {
        await portfolioService.createProject(payload);
        setFeedback({ type: 'success', text: 'New project added successfully.' });
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err.response?.data?.title || 'Failed to save project.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioService.deleteProject(deleteTargetId);
      setDeleteTargetId(null);
      setFeedback({ type: 'success', text: 'Project deleted successfully.' });
      fetchProjects();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-heading">
            Project Management
          </h1>
          <p className="text-sm font-mono text-ink-muted mt-1">
            Add, update, or remove portfolio projects. Unlimited projects supported.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded shadow-classic transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Notifications */}
      {feedback.text && (
        <div
          className={`p-4 rounded border flex items-center gap-3 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Projects Table / Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-classic-accent animate-spin mb-3" />
          <span className="font-serif text-ink-heading">Loading Projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
          No projects found. Click "Add New Project" to get started.
        </div>
      ) : (
        <div className="bg-paper-card border border-paper-border rounded shadow-classic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-muted border-b border-paper-border text-ink-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-paper-muted/50 transition-colors">
                    <td className="px-4 py-3 text-ink-muted font-medium">
                      #{proj.display_order}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-paper-border bg-stone-100 shrink-0 overflow-hidden flex items-center justify-center">
                          {proj.image_url ? (
                            <img src={proj.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Image className="w-4 h-4 text-ink-muted" />
                          )}
                        </div>
                        <div>
                          <span className="font-serif font-semibold text-sm text-ink-heading block">
                            {proj.title}
                          </span>
                          <span className="text-[11px] text-ink-muted line-clamp-1 max-w-xs">
                            {proj.technologies}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-body font-medium">
                      {proj.category}
                    </td>
                    <td className="px-4 py-3">
                      {proj.featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-semibold">
                          <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-ink-faint">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {proj.project_date || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        {proj.live_url && (
                          <a
                            href={proj.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-ink-muted hover:text-ink-heading border border-paper-border rounded"
                            title="Live URL"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 text-ink-muted hover:text-classic-accent border border-paper-border rounded hover:bg-paper-card"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(proj.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 border border-paper-border rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper-card border border-paper-border rounded shadow-classic-md w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-paper-border bg-paper">
              <h3 className="font-serif text-2xl font-bold text-ink-heading">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-ink-muted hover:text-ink-heading"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Project Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Business Finance Management System"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack, Backend"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Project Date
                  </label>
                  <input
                    type="text"
                    name="project_date"
                    value={formData.project_date}
                    onChange={handleChange}
                    placeholder="e.g. 2025"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Short Description (Card preview) <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="short_description"
                  rows={2}
                  value={formData.short_description}
                  onChange={handleChange}
                  required
                  placeholder="Brief 1-2 sentence overview of the project..."
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Full Detailed Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Comprehensive explanation of architecture, features, problem solved..."
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="e.g. React, Django, Django REST Framework, SQLite"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    name="live_url"
                    value={formData.live_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>
              </div>

              {/* Project Image */}
              <div className="pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Project Screenshot / Thumbnail
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="w-16 h-16 rounded border border-paper-border overflow-hidden bg-stone-100 shrink-0">
                      <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-paper-border file:text-xs file:font-mono file:bg-paper-muted hover:file:bg-stone-200"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded border-paper-border text-classic-primary focus:ring-classic-accent"
                />
                <label htmlFor="featured" className="text-sm font-medium text-ink-heading cursor-pointer">
                  Mark as Featured Project (displays highlight badge on public portfolio)
                </label>
              </div>

              <div className="pt-6 border-t border-paper-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono text-ink-muted hover:text-ink-heading border border-paper-border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded shadow-classic disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Project"
        message="Are you sure you want to permanently delete this project? This action cannot be undone."
        confirmText="Delete Project"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default ProjectManager;
