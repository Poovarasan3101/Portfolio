import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Mail,
  MailOpen,
  Trash2,
  X,
  Loader2,
  Clock,
  Reply,
  Check,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService, extractApiError } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const outletCtx = useOutletContext();

  const loadMessages = async () => {
    try {
      const data = await adminService.getMessages();
      setMessages(data);
      outletCtx?.refreshUnreadCount?.();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to load messages.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (msg, nextState) => {
    try {
      const updated = await adminService.toggleMessageRead(msg.id, nextState);
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)));
      if (selected?.id === msg.id) setSelected(updated);
      outletCtx?.refreshUnreadCount?.();
      toast.info(nextState ? 'Marked as read.' : 'Marked as unread.');
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to update message status.'));
    }
  };

  const handleOpenMessage = async (msg) => {
    setSelected(msg);
    if (!msg.is_read) {
      try {
        const updated = await adminService.toggleMessageRead(msg.id, true);
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)));
        setSelected(updated);
        outletCtx?.refreshUnreadCount?.();
      } catch {
        // Non-blocking
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteMessage(deleteTarget.id);
      toast.success('Message deleted.');
      if (selected?.id === deleteTarget.id) setSelected(null);
      setDeleteTarget(null);
      await loadMessages();
    } catch (err) {
      toast.error(extractApiError(err, 'Failed to delete message.'));
    } finally {
      setDeleting(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const visibleMessages =
    filter === 'unread'
      ? messages.filter((m) => !m.is_read)
      : filter === 'read'
      ? messages.filter((m) => m.is_read)
      : messages;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: `All (${messages.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'read', label: `Read (${messages.length - unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                filter === tab.id
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#111111] text-neutral-400 border border-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="py-20 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-xs font-mono">Loading messages...</span>
        </div>
      ) : visibleMessages.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#111111] border border-white/10 text-center text-sm text-neutral-500">
          No messages in this view.
        </div>
      ) : (
        <div className="rounded-2xl bg-[#111111] border border-white/10 divide-y divide-white/5 overflow-hidden">
          {visibleMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                msg.is_read ? 'hover:bg-white/[0.02]' : 'bg-white/[0.025] hover:bg-white/[0.04]'
              }`}
            >
              <div
                onClick={() => handleOpenMessage(msg)}
                className="flex items-start gap-3.5 min-w-0 flex-1 cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                    msg.is_read
                      ? 'bg-white/5 border-white/10 text-neutral-500'
                      : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  {msg.is_read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                    <span className="text-xs font-mono text-neutral-500">{msg.email}</span>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-neutral-200 truncate">{msg.subject}</div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{msg.message}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 mr-2">
                  <Clock className="w-3 h-3" />
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>

                <button
                  onClick={() => handleOpenMessage(msg)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white cursor-pointer"
                  title="Read message"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleToggleRead(msg, !msg.is_read)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white cursor-pointer"
                  title={msg.is_read ? 'Mark as unread' : 'Mark as read'}
                >
                  {msg.is_read ? <Mail className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
                <button
                  onClick={() => setDeleteTarget(msg)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 cursor-pointer"
                  title="Delete message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl bg-[#111111] border border-white/20 p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">{selected.subject}</h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  From <span className="text-white">{selected.name}</span> ({selected.email})
                </p>
                <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                  Received: {new Date(selected.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#161616] border border-white/10 text-sm text-neutral-200 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
              {selected.message}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
              <button
                onClick={() => handleToggleRead(selected, !selected.is_read)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium cursor-pointer"
              >
                {selected.is_read ? 'Mark as Unread' : 'Mark as Read'}
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setDeleteTarget(selected)}
                  className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold text-xs flex items-center gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Contact Message"
        message={`Are you sure you want to permanently delete the message from "${deleteTarget?.name}"?`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
};

export default MessagesManager;
