import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, CheckCircle2, AlertCircle, Layers, Eye, EyeOff } from 'lucide-react';
import portfolioService from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const ExtraSectionManager = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    subtitle: '',
    description: '',
    button_text: '',
    button_url: '',
    display_order: 0,
    is_active: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await portfolioService.getExtraSections();
      setSections(res.data);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load extra sections.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (sec) => {
    setEditingId(sec.id);
    setFormData({
      title: sec.title,
      subtitle: sec.subtitle || '',
      description: sec.description || '',
      button_text: sec.button_text || '',
      button_url: sec.button_url || '',
      display_order: sec.display_order ?? 0,
      is_active: Boolean(sec.is_active),
    });
    setImageFile(null);
    setImagePreview(sec.image_url || null);
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

  const handleToggleActive = async (sec) => {
    try {
      const payload = new FormData();
      payload.append('is_active', !sec.is_active);
      await portfolioService.updateExtraSection(sec.id, payload);
      fetchSections();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to toggle status.' });
    }
  };

  const handleSubmit = async (e) => {
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
        await portfolioService.updateExtraSection(editingId, payload);
        setFeedback({ type: 'success', text: 'Custom section updated.' });
      } else {
        await portfolioService.createExtraSection(payload);
        setFeedback({ type: 'success', text: 'New custom section created.' });
      }
      setIsModalOpen(false);
      fetchSections();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to save custom section.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioService.deleteExtraSection(deleteTargetId);
      setDeleteTargetId(null);
      setFeedback({ type: 'success', text: 'Custom section deleted.' });
      fetchSections();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete section.' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-heading">
            Extra Sections Manager
          </h1>
          <p className="text-sm font-mono text-ink-muted mt-1">
            Create and organize custom sections (e.g. Services, Certifications, Achievements, Publications).
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded shadow-classic transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Section</span>
        </button>
      </div>

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

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-classic-accent animate-spin mb-3" />
          <span className="font-serif text-ink-heading">Loading Custom Sections...</span>
        </div>
      ) : sections.length === 0 ? (
        <div className="p-12 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
          No extra sections created yet. Click "Add Custom Section" to create one.
        </div>
      ) : (
        <div className="bg-paper-card border border-paper-border rounded shadow-classic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-muted border-b border-paper-border text-ink-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Subtitle</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border">
                {sections.map((sec) => (
                  <tr key={sec.id} className="hover:bg-paper-muted/50 transition-colors">
                    <td className="px-4 py-3 text-ink-muted font-medium">
                      #{sec.display_order}
                    </td>
                    <td className="px-4 py-3 font-serif font-semibold text-sm text-ink-heading">
                      {sec.title}
                    </td>
                    <td className="px-4 py-3 text-ink-muted line-clamp-1 max-w-xs">
                      {sec.subtitle || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(sec)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                          sec.is_active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                        title="Click to toggle visibility"
                      >
                        {sec.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{sec.is_active ? 'Active' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(sec)}
                          className="p-1.5 text-ink-muted hover:text-classic-accent border border-paper-border rounded hover:bg-paper-card"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(sec.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper-card border border-paper-border rounded shadow-classic-md w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-paper-border bg-paper">
              <h3 className="font-serif text-xl font-bold text-ink-heading">
                {editingId ? 'Edit Custom Section' : 'Add Custom Section'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-ink-muted hover:text-ink-heading"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Section Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Services, Certifications, Publications"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g. What I bring to engineering teams"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Description / Content <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Detailed content for this custom section..."
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Optional Button Text
                  </label>
                  <input
                    type="text"
                    name="button_text"
                    value={formData.button_text}
                    onChange={handleChange}
                    placeholder="e.g. Discuss a Project"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Button URL
                  </label>
                  <input
                    type="text"
                    name="button_url"
                    value={formData.button_url}
                    onChange={handleChange}
                    placeholder="e.g. #contact or https://..."
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="flex items-center pt-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      className="rounded border-paper-border text-classic-primary focus:ring-classic-accent"
                    />
                    <span className="text-xs font-medium text-ink-heading">
                      Active (visible on public site)
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Optional Section Image
                </label>
                <div className="flex items-center gap-3">
                  {imagePreview && (
                    <div className="w-14 h-14 rounded border border-paper-border overflow-hidden bg-stone-100 shrink-0">
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

              <div className="pt-4 border-t border-paper-border flex justify-end gap-3">
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
                  {saving ? 'Saving...' : editingId ? 'Update Section' : 'Create Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Custom Section"
        message="Are you sure you want to delete this custom section?"
        confirmText="Delete Section"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default ExtraSectionManager;
