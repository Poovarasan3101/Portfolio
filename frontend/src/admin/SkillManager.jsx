import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';
import portfolioService from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const initialForm = {
    name: '',
    category: 'Frontend',
    level: 85,
    display_order: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await portfolioService.getSkills();
      setSkills(res.data);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load skills.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      display_order: skill.display_order,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'level' || name === 'display_order' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: '', text: '' });

    try {
      if (editingId) {
        await portfolioService.updateSkill(editingId, formData);
        setFeedback({ type: 'success', text: 'Skill updated successfully.' });
      } else {
        await portfolioService.createSkill(formData);
        setFeedback({ type: 'success', text: 'Skill added successfully.' });
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to save skill.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioService.deleteSkill(deleteTargetId);
      setDeleteTargetId(null);
      setFeedback({ type: 'success', text: 'Skill deleted successfully.' });
      fetchSkills();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete skill.' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-heading">
            Skill Management
          </h1>
          <p className="text-sm font-mono text-ink-muted mt-1">
            Configure technical capabilities across Frontend, Backend, Database, and Tools.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded shadow-classic transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
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
          <span className="font-serif text-ink-heading">Loading Skills...</span>
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
          No skills found. Click "Add New Skill" to add your first skill.
        </div>
      ) : (
        <div className="bg-paper-card border border-paper-border rounded shadow-classic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-muted border-b border-paper-border text-ink-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Skill Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Proficiency</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-paper-muted/50 transition-colors">
                    <td className="px-4 py-3 text-ink-muted font-medium">
                      #{skill.display_order}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-heading text-sm font-serif">
                      {skill.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded bg-paper-muted border border-paper-border font-mono text-[11px] text-ink-body">
                        {skill.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 max-w-xs">
                        <div className="flex-1 h-2 bg-paper-muted rounded-full overflow-hidden border border-paper-border/60">
                          <div
                            className="h-full bg-classic-primary rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <span className="text-ink-muted text-[11px] font-mono">{skill.level}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(skill)}
                          className="p-1.5 text-ink-muted hover:text-classic-accent border border-paper-border rounded hover:bg-paper-card"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(skill.id)}
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
          <div className="bg-paper-card border border-paper-border rounded shadow-classic-md w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-paper-border bg-paper">
              <h3 className="font-serif text-xl font-bold text-ink-heading">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
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
                  Skill Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Python, React.js, PostgreSQL"
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted">
                    Proficiency Percentage
                  </label>
                  <span className="text-xs font-mono font-bold text-classic-accent">
                    {formData.level}%
                  </span>
                </div>
                <input
                  type="range"
                  name="level"
                  min="20"
                  max="100"
                  step="5"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full accent-classic-primary cursor-pointer"
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
                  {saving ? 'Saving...' : editingId ? 'Update Skill' : 'Create Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your portfolio?"
        confirmText="Delete Skill"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default SkillManager;
