'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl glass-panel shadow-2xl border text-xs animate-in slide-in-from-right duration-300 ${
            t.type === 'success'
              ? 'border-amber-500/30 text-amber-200'
              : t.type === 'error'
              ? 'border-red-500/30 text-red-200'
              : 'border-zinc-700 text-zinc-200'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {t.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          <span className="font-medium">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="text-zinc-500 hover:text-white p-0.5 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
