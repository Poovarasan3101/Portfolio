import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Save,
  Upload,
  Award,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPTY_FORM = {
  entry_type: 'certification',
  title: '',
  issuer: '',
  period_or_date: '',
  credential_url: '',
  image_url: '',
  skills_covered: '',
  order: 0,
};

const CertificatesManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const loadData = async () => {
    try {
      const data = await adminService.getCertificates();
      setItems(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load certificates.'));
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
    setImageFile(null);
    setCertFile(null);
    setImagePreview('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      entry_type: item.entry_type || 'certification',
      title: item.title || '',
      issuer: item.issuer || '',
      period_or_date: item.period_or_date || '',
      credential_url: item.credential_url || '',
      image_url: item.image_url || '',
      skills_covered: item.skills_covered || '',
      order: item.order ?? 0,
    });
    setImageFile(null);
    setCertFile(null);
    setImagePreview(item.image_display_url || item.image_url || '');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      if (imageFile) fd.append('image', imageFile);
      if (certFile) fd.append('certificate_file', certFile);

      if (editing) {
        await adminService.updateCertificate(editing.id, fd);
        toast.success(`Updated "${form.title}".`);
      } else {
        await adminService.createCertificate(fd);
        toast.success(`Added "${form.title}".`);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Could not save certificate.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteCertificate(deleteTarget.id);
      toast.success(`Deleted "${deleteTarget.title}".`);
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete certificate.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage courses & industrial certifications ({items.length} records).
        </p>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading certificates...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No certificates or courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative h-36 bg-[#161616] border-b border-white/10 flex items-center justify-center overflow-hidden">
                  {cert.image_display_url || cert.image_url ? (
                    <img
                      src={cert.image_display_url || cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <Award className="w-10 h-10 text-neutral-600" />
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono uppercase text-neutral-200">
                    {cert.entry_type}
                  </span>
                  {cert.period_or_date && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono text-neutral-300">
                      {cert.period_or_date}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                  <p className="text-xs text-neutral-400">{cert.issuer}</p>
                  {cert.skills_covered && (
                    <p className="text-[11px] font-mono text-neutral-500 line-clamp-2">
                      {cert.skills_covered}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cert.certificate_file_url && (
                      <a
                        href={cert.certificate_file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline"
                      >
                        <FileText className="w-3 h-3" /> File Attached
                      </a>
                    )}
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-300 hover:text-white hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" /> Verify URL
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(cert)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(cert)}
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
          <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/20 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editing ? 'Edit Certificate' : 'Add Certificate'}
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
                  <label className="text-xs font-mono text-neutral-400">Type</label>
                  <select
                    value={form.entry_type}
                    onChange={(e) => setForm({ ...form, entry_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  >
                    <option value="certification">Certification</option>
                    <option value="course">Course / Training</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400">Issue Date / Period</label>
                  <input
                    type="text"
                    value={form.period_or_date}
                    onChange={(e) => setForm({ ...form, period_or_date: e.target.value })}
                    placeholder="e.g. September 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Certificate / Course Name *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  placeholder="e.g. Login360, Coimbatore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Skills Covered</label>
                <input
                  type="text"
                  value={form.skills_covered}
                  onChange={(e) => setForm({ ...form, skills_covered: e.target.value })}
                  placeholder="Python, Django, React.js, MySQL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Verification URL</label>
                <input
                  type="url"
                  value={form.credential_url}
                  onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Uploads */}
              <div className="p-4 rounded-xl bg-[#161616] border border-white/10 space-y-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Certificate preview"
                    className="w-full h-36 object-cover rounded-lg border border-white/10"
                  />
                )}
                <div className="flex flex-wrap gap-3">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-black font-bold text-xs cursor-pointer hover:bg-neutral-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{imageFile ? imageFile.name : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
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

                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 font-medium text-xs cursor-pointer">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{certFile ? certFile.name : 'Upload PDF / File'}</span>
                    <input
                      type="file"
                      accept=".pdf,image/png,image/jpeg,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCertFile(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
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
        title="Delete Certificate"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default CertificatesManager;
