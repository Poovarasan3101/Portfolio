import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import { SKILL_ICON_MAP } from '../../components/Skills';

const CATEGORIES = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'tools', label: 'Tools' },
  { value: 'soft_skills', label: 'Soft Skills' },
];

const ICON_OPTIONS = Object.keys(SKILL_ICON_MAP);

const EMPTY_FORM = {
  name: '',
  category: 'frontend',
  icon_name: 'Code2',
  badge_label: '',
  description: '',
  order: 0,
  featured: true,
};

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const loadSkills = async () => {
    try {
      const data = await adminService.getSkills();
      setSkills(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load skills.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditing(skill);
    setForm({
      name: skill.name || '',
      category: skill.category || 'frontend',
      icon_name: skill.icon_name || 'Code2',
      badge_label: skill.badge_label || '',
      description: skill.description || '',
      order: skill.order ?? 0,
      featured: skill.featured ?? true,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminService.updateSkill(editing.id, form);
        toast.success(`Updated skill "${form.name}".`);
      } else {
        await adminService.createSkill(form);
        toast.success(`Added skill "${form.name}".`);
      }
      setModalOpen(false);
      await loadSkills();
    } catch (err) {
      toast.error(extractApiError(err, 'Could not save skill.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteSkill(deleteTarget.id);
      toast.success(`Deleted skill "${deleteTarget.name}".`);
      setDeleteTarget(null);
      await loadSkills();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete skill.'));
    } finally {
      setDeleting(false);
    }
  };

  const visibleSkills = filter === 'all' ? skills : skills.filter((s) => s.category === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
              filter === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-[#111111] text-neutral-400 border border-white/10 hover:text-white'
            }`}
          >
            All ({skills.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = skills.filter((s) => s.category === c.value).length;
            return (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                  filter === c.value
                    ? 'bg-white text-black font-bold'
                    : 'bg-[#111111] text-neutral-400 border border-white/10 hover:text-white'
                }`}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading skills...</span>
        </div>
      ) : visibleSkills.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No skills found in this category. Click &quot;Add Skill&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSkills.map((skill) => {
            const Icon = SKILL_ICON_MAP[skill.icon_name] || Code2;
            return (
              <div
                key={skill.id}
                className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {skill.category_display || skill.category}
                          {skill.badge_label ? ` • ${skill.badge_label}` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">#{skill.order}</span>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-neutral-400 leading-relaxed">{skill.description}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEdit(skill)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(skill)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/20 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editing ? 'Edit Skill' : 'Add New Skill'}
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
                  <label className="text-xs font-mono text-neutral-400">Skill Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. React.js"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Badge Label</label>
                  <input
                    type="text"
                    value={form.badge_label}
                    onChange={(e) => setForm({ ...form, badge_label: e.target.value })}
                    placeholder="e.g. Framework, Core Language"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Skill Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description of how you apply this skill..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Icon Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400">
                  Skill Icon ({form.icon_name})
                </label>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-36 overflow-y-auto p-2 rounded-xl bg-[#161616] border border-white/10">
                  {ICON_OPTIONS.map((iconKey) => {
                    const IconComp = SKILL_ICON_MAP[iconKey];
                    const selected = form.icon_name === iconKey;
                    return (
                      <button
                        type="button"
                        key={iconKey}
                        onClick={() => setForm({ ...form, icon_name: iconKey })}
                        title={iconKey}
                        className={`p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          selected
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </button>
                    );
                  })}
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
                  <span>{editing ? 'Update Skill' : 'Create Skill'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Skill"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? It will immediately disappear from your public portfolio.`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default SkillsManager;
