import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'success', duration = 4000) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error', 5500),
    info: (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] pointer-events-none">
        <AnimatePresence>
          {toasts.map((item) => {
            const Icon =
              item.type === 'error'
                ? AlertCircle
                : item.type === 'info'
                ? Info
                : CheckCircle2;

            const borderStyle =
              item.type === 'error'
                ? 'border-red-500/40 bg-[#140c0c]/95 text-red-100'
                : item.type === 'info'
                ? 'border-white/20 bg-[#141414]/95 text-neutral-100'
                : 'border-emerald-500/35 bg-[#0e1511]/95 text-emerald-100';

            const iconColor =
              item.type === 'error'
                ? 'text-red-400'
                : item.type === 'info'
                ? 'text-white'
                : 'text-emerald-400';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-xl shadow-2xl ${borderStyle}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                <p className="text-xs sm:text-sm leading-snug flex-1">{item.message}</p>
                <button
                  onClick={() => removeToast(item.id)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};
