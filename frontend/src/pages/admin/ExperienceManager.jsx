import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save, Briefcase, Calendar, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPLOYMENT_TYPES = ['Full-Time', 'Part-Time', 'Internship', 'Freelance', 'Contract', 'Training'];

const EMPTY_FORM = {
  company_name: '',
  job_role: '',
  employment_type: 'Full-Time',
  location: '',
  start_date: '',
  end_date: 'Present',
  responsibilities: '',
  order: 0,
};

const ExperienceManager = () => {
  const [items, setItems] = useState([]);
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
      const data = await adminService.getExperience();
      setItems(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load experience entries.'));
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
      company_name: item.company_name || '',
      job_role: item.job_role || '',
      employment_type: item.employment_type || 'Full-Time',
      location: item.location || '',
      start_date: item.start_date || '',
      end_date: item.end_date || 'Present',
      responsibilities: item.responsibilities || '',
      order: item.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminService.updateExperience(editing.id, form);
        toast.success('Experience updated.');
      } else {
        await adminService.createExperience(form);
        toast.success('Experience created.');
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Could not save experience.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteExperience(deleteTarget.id);
      toast.success('Experience deleted.');
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete experience.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage work experience, internships, and training roles ({items.length} records).
        </p>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading experience...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No experience records yet. Add a job role, internship, or training experience.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-white" />
                  <h4 className="text-base font-bold text-white">{item.job_role}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold">
                    {item.employment_type}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                  <span className="font-medium text-neutral-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> {item.company_name}
                  </span>
                  <span className="font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.start_date} – {item.end_date || 'Present'}
                  </span>
                </div>
                {item.responsibilities && (
                  <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-line pt-1">
                    {item.responsibilities}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/20 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editing ? 'Edit Experience' : 'Add Experience'}
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
                  <label className="text-xs font-mono text-neutral-400">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={form.job_role}
                    onChange={(e) => setForm({ ...form, job_role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Employment Type *</label>
                  <select
                    value={form.employment_type}
                    onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  >
                    {EMPLOYMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Salem / Remote"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Start Date *</label>
                  <input
                    type="text"
                    required
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    placeholder="e.g. May 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">End Date</label>
                  <input
                    type="text"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    placeholder="e.g. Present or Oct 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">
                  Responsibilities (one bullet point per line)
                </label>
                <textarea
                  rows={4}
                  value={form.responsibilities}
                  onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                  placeholder={"Built RESTful APIs using Django REST Framework\nCreated responsive React components"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
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
                <div className="flex gap-3">
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
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteTarget?.job_role}" at "${deleteTarget?.company_name}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default ExperienceManager;
