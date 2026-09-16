import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Calendar, User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import portfolioService from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await portfolioService.getContactMessages();
      setMessages(res.data);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load messages.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await portfolioService.deleteContactMessage(deleteTargetId);
      setDeleteTargetId(null);
      setFeedback({ type: 'success', text: 'Message deleted successfully.' });
      fetchMessages();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete message.' });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink-heading">
          Visitor Inquiries & Contact Messages
        </h1>
        <p className="text-sm font-mono text-ink-muted mt-1">
          Review messages submitted by visitors, recruiters, and clients through your public portfolio.
        </p>
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
          <span className="font-serif text-ink-heading">Loading Messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
          No contact messages received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-paper-card border border-paper-border rounded shadow-classic p-6 hover:shadow-classic-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-paper-border">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-classic-accent" />
                  <span className="font-serif font-bold text-base text-ink-heading">
                    {msg.name}
                  </span>
                  <span className="text-xs font-mono text-ink-muted">
                    ({msg.email})
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-ink-muted">
                    <Calendar className="w-3.5 h-3.5 text-classic-accent" />
                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(msg.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    title="Delete inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-classic-accent font-semibold">
                  Subject: {msg.subject || '(No subject)'}
                </div>
                <p className="text-sm text-ink-body leading-relaxed whitespace-pre-line bg-paper p-4 rounded border border-paper-border">
                  {msg.message}
                </p>
              </div>

              <div className="mt-4 pt-2 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-heading bg-paper hover:bg-stone-200 border border-paper-border rounded transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Message"
        message="Are you sure you want to remove this message?"
        confirmText="Delete Message"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default MessageManager;
