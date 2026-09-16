import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldAlert, KeyRound, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const res = await login(username, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      // Must not reveal whether username or password was specifically incorrect
      setError(res.error || 'Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Back to website */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink-heading transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-paper-card border border-paper-border rounded shadow-classic-md p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full border border-paper-border bg-paper-muted mx-auto flex items-center justify-center text-classic-accent mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink-heading">
            Admin Authentication
          </h1>
          <p className="text-xs font-mono text-ink-muted mt-1">
            Poovarasan Portfolio Management
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded flex items-center gap-3 text-xs font-medium animate-fadeIn">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                placeholder="Enter admin username"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-classic-primary hover:bg-classic-primary-hover border border-classic-primary rounded shadow-classic transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-paper-border text-center">
          <p className="text-[11px] font-mono text-ink-faint">
            Protected endpoint with secure token session validation
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
