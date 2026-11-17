import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPTY_FORM = {
  degree: '',
  institution: '',
  location: '',
  start_year: '',
  end_year: '',
  period: '',
  description: '',
  order: 0,
};

const EducationManager = () => {
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
      const data = await adminService.getEducation();
      setItems(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load education records.'));
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
      degree: item.degree || '',
      institution: item.institution || '',
      location: item.location || '',
      start_year: item.start_year || '',
      end_year: item.end_year || '',
      period: item.period || '',
      description: item.description || '',
      order: item.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (payload.start_year && payload.end_year) {
        payload.period = `${payload.start_year} – ${payload.end_year}`;
      } else if (payload.end_year) {
        payload.period = payload.end_year;
      }

      if (editing) {
        await adminService.updateEducation(editing.id, payload);
        toast.success('Education entry updated.');
      } else {
        await adminService.createEducation(payload);
        toast.success('Education entry created.');
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Could not save education entry.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteEducation(deleteTarget.id);
      toast.success('Education entry deleted.');
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete education entry.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage academic degrees and schooling ({items.length} records).
        </p>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading education...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No education entries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-white" />
                  <h4 className="text-base font-bold text-white">{item.degree}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.period}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                  <span className="font-medium text-neutral-300">{item.institution}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">{item.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
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
                {editing ? 'Edit Education' : 'Add Education'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Degree / Qualification *</label>
                <input
                  type="text"
                  required
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="e.g. B.E. Computer Science and Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Institution *</label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="e.g. Ganesh College of Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Location *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Salem"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Start Year</label>
                  <input
                    type="text"
                    value={form.start_year}
                    onChange={(e) => setForm({ ...form, start_year: e.target.value })}
                    placeholder="2022"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">End Year *</label>
                  <input
                    type="text"
                    required
                    value={form.end_year}
                    onChange={(e) => setForm({ ...form, end_year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        title="Delete Education Entry"
        message={`Are you sure you want to delete "${deleteTarget?.degree}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default EducationManager;
