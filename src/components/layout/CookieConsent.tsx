'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 glass-panel p-4 rounded-2xl border border-zinc-800 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <Cookie className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="flex-1 text-xs">
          <h4 className="font-bold text-white mb-1">Luxury Experience & Cookies</h4>
          <p className="text-zinc-400 mb-3">
            We use essential cookies and encryption protocols to personalize your shopping experience and secure dropshipping transactions.
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
            >
              Accept All Cookies
            </button>
            <button
              onClick={() => setShow(false)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs border border-zinc-800"
            >
              Necessary Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
