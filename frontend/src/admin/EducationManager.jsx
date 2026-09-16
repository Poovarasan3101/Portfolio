import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, CheckCircle2, AlertCircle, GraduationCap } from 'lucide-react';
import portfolioService from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const EducationManager = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const initialForm = {
    degree: '',
    institution: '',
    location: '',
    start_year: '',
    end_year: '',
    description: '',
    display_order: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await portfolioService.getEducation();
      setEducations(res.data);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load education records.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (edu) => {
    setEditingId(edu.id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location || '',
      start_year: edu.start_year || '',
      end_year: edu.end_year || '',
      description: edu.description || '',
      display_order: edu.display_order ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: '', text: '' });

    try {
      if (editingId) {
        await portfolioService.updateEducation(editingId, formData);
        setFeedback({ type: 'success', text: 'Education record updated successfully.' });
      } else {
        await portfolioService.createEducation(formData);
        setFeedback({ type: 'success', text: 'New education qualification added.' });
      }
      setIsModalOpen(false);
      fetchEducation();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to save education record.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioService.deleteEducation(deleteTargetId);
      setDeleteTargetId(null);
      setFeedback({ type: 'success', text: 'Education record deleted.' });
      fetchEducation();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete education record.' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-heading">
            Education Management
          </h1>
          <p className="text-sm font-mono text-ink-muted mt-1">
            Maintain academic qualifications, university degrees, and courses.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded shadow-classic transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education Record</span>
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
          <span className="font-serif text-ink-heading">Loading Education...</span>
        </div>
      ) : educations.length === 0 ? (
        <div className="p-12 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
          No education records found. Click "Add Education Record" to add your first qualification.
        </div>
      ) : (
        <div className="bg-paper-card border border-paper-border rounded shadow-classic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-muted border-b border-paper-border text-ink-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Degree / Course</th>
                  <th className="px-4 py-3">Institution</th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border">
                {educations.map((edu) => (
                  <tr key={edu.id} className="hover:bg-paper-muted/50 transition-colors">
                    <td className="px-4 py-3 text-ink-muted font-medium">
                      #{edu.display_order}
                    </td>
                    <td className="px-4 py-3 font-serif font-semibold text-sm text-ink-heading">
                      {edu.degree}
                    </td>
                    <td className="px-4 py-3 text-ink-body font-medium">
                      {edu.institution}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {edu.start_year} – {edu.end_year}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{edu.location || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(edu)}
                          className="p-1.5 text-ink-muted hover:text-classic-accent border border-paper-border rounded hover:bg-paper-card"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(edu.id)}
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
                {editingId ? 'Edit Education Record' : 'Add Education Record'}
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
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Degree / Course Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  placeholder="e.g. B.E. Computer Science and Engineering"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Institution / University <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Anna University Affiliated College"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Start Year
                  </label>
                  <input
                    type="text"
                    name="start_year"
                    value={formData.start_year}
                    onChange={handleChange}
                    placeholder="e.g. 2020"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    End Year
                  </label>
                  <input
                    type="text"
                    name="end_year"
                    value={formData.end_year}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
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
                    placeholder="e.g. Tamil Nadu, India"
                    className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Description / Achievements
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Specialization, GPA, honours, key coursework..."
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                ></textarea>
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
                  {saving ? 'Saving...' : editingId ? 'Update Record' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Education Record"
        message="Are you sure you want to delete this educational qualification?"
        confirmText="Delete Record"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default EducationManager;
