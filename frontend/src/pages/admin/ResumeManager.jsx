import React, { useState, useEffect } from 'react';
import { FileText, Upload, Trash2, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const ResumeManager = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const loadResume = async () => {
    try {
      const data = await adminService.getResume();
      setResume(data);
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load resume details.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF (.pdf) files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Resume PDF cannot exceed 10 MB.');
      return;
    }

    setUploading(true);
    try {
      const updated = await adminService.uploadResume(file);
      setResume(updated);
      toast.success('Resume PDF uploaded and updated on your live portfolio!');
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to upload resume PDF.'));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const updated = await adminService.deleteResume();
      setResume(updated);
      setConfirmDelete(false);
      toast.success('Resume removed successfully.');
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete resume.'));
    } finally {
      setDeleting(false);
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center gap-2 text-neutral-400">
        <Loader2 className="w-5 h-5 animate-spin text-white" />
        <span className="text-xs font-mono">Loading resume status...</span>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Current Resume Status */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Resume PDF Manager</h3>
              <p className="text-xs font-mono text-neutral-400">
                Connected directly to your public portfolio Download Resume buttons
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono self-start sm:self-center ${
              resume?.has_resume
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-neutral-400 border border-white/10'
            }`}
          >
            {resume?.has_resume ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Active PDF
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" /> No PDF Uploaded
              </>
            )}
          </span>
        </div>

        {resume?.has_resume ? (
          <div className="p-5 rounded-xl bg-[#161616] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">
                {resume.filename || 'Resume.pdf'}
              </div>
              <div className="text-xs font-mono text-neutral-400 flex flex-wrap gap-3">
                {resume.file_size ? <span>Size: {formatBytes(resume.file_size)}</span> : null}
                {resume.updated_at && (
                  <span>Updated: {new Date(resume.updated_at).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <a
                href={resume.resume_file_url}
                target="_blank"
                rel="noopener noreferrer"
                download={resume.filename || 'Resume.pdf'}
                className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / View</span>
              </a>

              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-white/[0.02] border border-dashed border-white/15 text-center text-xs font-mono text-neutral-400">
            No resume PDF is currently attached. Upload a PDF below to enable direct PDF downloads on your public portfolio.
          </div>
        )}

        {/* Upload / Replace Dropzone */}
        <label className="block p-10 rounded-2xl bg-[#141414] hover:bg-[#181818] border-2 border-dashed border-white/15 hover:border-white/35 transition-all text-center cursor-pointer space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white mx-auto">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">
              {uploading
                ? 'Uploading Resume PDF...'
                : resume?.has_resume
                ? 'Click to Replace Current Resume PDF'
                : 'Click to Upload New Resume PDF'}
            </div>
            <p className="text-xs font-mono text-neutral-500">
              PDF format only • Max file size 10 MB • Automatically replaces old file
            </p>
          </div>
          <input
            type="file"
            accept="application/pdf,.pdf"
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      <ConfirmDialog
        isOpen={confirmDelete}
        title="Delete Resume PDF"
        message="Are you sure you want to delete your uploaded resume PDF? Visitors will still be able to print the dynamically generated CV view."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </motion.div>
  );
};

export default ResumeManager;
