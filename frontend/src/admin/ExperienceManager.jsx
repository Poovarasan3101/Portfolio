import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, CheckCircle2, AlertCircle, Briefcase, UserCheck } from 'lucide-react';
import portfolioService from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const initialForm = {
    job_title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: 'Present',
    is_current: false,
    is_fresher_notice: false,
    description: '',
    display_order: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const res = await portfolioService.getExperience();
      setExperiences(res.data);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load experiences.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingId(exp.id);
    setFormData({
      job_title: exp.job_title,
      company: exp.company,
      location: exp.location || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: Boolean(exp.is_current),
      is_fresher_notice: Boolean(exp.is_fresher_notice),
      description: exp.description || '',
      display_order: exp.display_order ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: '', text: '' });

    try {
      if (editingId) {
        await portfolioService.updateExperience(editingId, formData);
        setFeedback({ type: 'success', text: 'Experience record updated successfully.' });
      } else {
        await portfolioService.createExperience(formData);
        setFeedback({ type: 'success', text: 'New experience record added.' });
      }
      setIsModalOpen(false);
      fetchExperience();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to save experience record.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioService.deleteExperience(deleteTargetId);
      setDeleteTargetId(null);
      setFeedback({ type: 'success', text: 'Experience deleted successfully.' });
      fetchExperience();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete experience.' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-heading">
            Experience Management
          </h1>
          <p className="text-sm font-mono text-ink-muted mt-1">
            Manage your employment trajectory, internships, or activate "Fresher / Open to Opportunities".
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded shadow-classic transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience Entry</span>
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
          <span className="font-serif text-ink-heading">Loading Experience...</span>
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-12 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
          No experience records found. Click "Add Experience Entry" to add your first record or fresher notice.
        </div>
      ) : (
        <div className="bg-paper-card border border-paper-border rounded shadow-classic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-muted border-b border-paper-border text-ink-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Role & Company</th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border">
                {experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-paper-muted/50 transition-colors">
                    <td className="px-4 py-3 text-ink-muted font-medium">
                      #{exp.display_order}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-serif font-semibold text-sm text-ink-heading block">
                        {exp.job_title}
                      </span>
                      <span className="text-xs text-classic-accent">{exp.company}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {exp.start_date} – {exp.end_date}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{exp.location || '—'}</td>
                    <td className="px-4 py-3">
                      {exp.is_fresher_notice ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-semibold">
                          <UserCheck className="w-3 h-3 text-amber-700" />
                          Fresher Notice
                        </span>
                      ) : (
                        <span className="text-ink-body">Standard</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(exp)}
                          className="p-1.5 text-ink-muted hover:text-classic-accent border border-paper-border rounded hover:bg-paper-card"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(exp.id)}
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
          <div className="bg-paper-card border border-paper-border rounded shadow-classic-md w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-paper-border bg-paper">
              <h3 className="font-serif text-xl font-bold text-ink-heading">
                {editingId ? 'Edit Experience' : 'Add Experience Entry'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-ink-muted hover:text-ink-heading"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Job Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Python Full Stack Developer"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Company / Organization <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Tech Solutions Inc."
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="text"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    placeholder="e.g. 2024 or Jan 2024"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    End Date
                  </label>
                  <input
                    type="text"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    placeholder="e.g. Present"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai, India"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Role Description / Accomplishments
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Key responsibilities, tools utilized, accomplishments..."
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_fresher_notice"
                  name="is_fresher_notice"
                  checked={formData.is_fresher_notice}
                  onChange={handleChange}
                  className="rounded border-paper-border text-classic-primary focus:ring-classic-accent"
                />
                <label htmlFor="is_fresher_notice" className="text-xs font-medium text-ink-heading cursor-pointer">
                  Display as "Fresher / Open to Opportunities" banner
                </label>
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
                  {saving ? 'Saving...' : editingId ? 'Update Entry' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Experience"
        message="Are you sure you want to permanently delete this experience entry?"
        confirmText="Delete Entry"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default ExperienceManager;
