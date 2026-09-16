import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", isDestructive = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-paper-card w-full max-w-md border border-paper-border rounded shadow-classic-md p-6">
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-full ${isDestructive ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-ink-heading mb-1">{title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-paper-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-ink-body bg-paper-muted hover:bg-stone-200 border border-paper-border rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm text-white rounded transition-colors ${
              isDestructive ? 'bg-red-700 hover:bg-red-800' : 'bg-classic-primary hover:bg-classic-primary-hover'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
