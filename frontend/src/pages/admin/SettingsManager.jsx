import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Loader2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { adminService, extractApiError } from '../../services/api';

const SettingsManager = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }
    if (form.new_password !== form.confirm_password) {
      toast.error('New passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      await adminService.changePassword(form);
      toast.success('Admin password changed successfully!');
      setForm({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to update password.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
      {/* Account Summary */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">{user?.username || 'Admin'}</h3>
          <p className="text-xs font-mono text-neutral-400">
            {user?.email || 'Superuser Account'} • JWT Authentication Enabled
          </p>
        </div>
      </div>

      {/* Change Password Card */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 space-y-5"
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <KeyRound className="w-5 h-5 text-white" />
          <div>
            <h3 className="text-base font-bold text-white">Change Admin Password</h3>
            <p className="text-xs text-neutral-500">
              Use a strong password to keep your portfolio CMS protected.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Current Password *</label>
            <input
              type="password"
              required
              value={form.old_password}
              onChange={(e) => setForm({ ...form, old_password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">New Password *</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.new_password}
              onChange={(e) => setForm({ ...form, new_password: e.target.value })}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-400">Confirm New Password *</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.confirm_password}
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-white/10">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-glow-sm disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Updating...' : 'Update Password'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SettingsManager;
