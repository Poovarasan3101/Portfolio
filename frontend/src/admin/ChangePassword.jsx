import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All password fields are required.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword === currentPassword) {
      setError('New password must be different from current password.');
      return;
    }

    setSubmitting(true);
    const res = await changePassword(currentPassword, newPassword, confirmNewPassword);

    if (res.success) {
      setSuccess(
        'Password changed successfully! You will be redirected to log in with your new password...'
      );
      setTimeout(() => {
        navigate('/admin/login');
      }, 2500);
    } else {
      setError(res.error || 'Failed to change password. Please check your current password.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink-heading">
          Change Admin Password
        </h1>
        <p className="text-sm font-mono text-ink-muted mt-1">
          Update the administrator authentication credentials securely.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-3 text-sm font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded flex items-center gap-3 text-sm font-medium animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Current Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              New Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password (min. 6 characters)"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Confirm New Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
              />
            </div>
          </div>

          <div className="p-4 bg-paper-muted rounded border border-paper-border text-xs font-mono text-ink-muted space-y-1">
            <div className="font-semibold text-ink-body">Security Rules:</div>
            <div>• Minimum 6 characters</div>
            <div>• Must match confirmation field</div>
            <div>• Changing password terminates active sessions and requires re-login</div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white bg-classic-primary hover:bg-classic-primary-hover border border-classic-primary rounded shadow-classic transition-colors disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{submitting ? 'Updating Password...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
