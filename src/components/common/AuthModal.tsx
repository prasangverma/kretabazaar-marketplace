'use client';

import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, user, setUser, addToast } = useStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'seller'>('customer');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authUser = {
      id: tab === 'login' ? 'u-1' : 'u-' + Math.floor(100 + Math.random() * 900),
      name: tab === 'login' ? (email.split('@')[0] || 'Elena Rostova') : (name || 'Member'),
      email: email || 'elena@kretabazaar.com',
      avatar: tab === 'login'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      role: role,
      savedProductIds: []
    };

    setUser(authUser);
    addToast(tab === 'login' ? 'Welcome back to Kretabazaar!' : 'Account created! Welcome to Kretabazaar.', 'success');
    setIsAuthOpen(false);
  };

  const handleSocialLogin = (provider: string) => {
    setUser({
      id: 'u-social-' + Math.floor(100 + Math.random() * 900),
      name: `${provider} Member`,
      email: `member@${provider.toLowerCase()}.com`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      role: 'customer',
      savedProductIds: []
    });
    addToast(`Signed in with ${provider}!`, 'success');
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    addToast('Signed out of account.', 'info');
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 relative">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="text-center py-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-blue-600 shadow-md"
            />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-zinc-500 mb-6">{user.email}</p>

            <div className="flex flex-col gap-2">
              {user.role === 'seller' && (
                <Link
                  href="/admin"
                  onClick={() => setIsAuthOpen(false)}
                  className="w-full py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Sparkles className="w-4 h-4" /> Open Seller Studio
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Brand */}
            <div className="text-center mb-6">
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white font-sans">
                Kreta<span className="text-blue-600">bazaar</span>
              </span>
              <p className="text-xs text-zinc-500 mt-0.5">Sign in or create an account to start shopping</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-6">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tab === 'login'
                    ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tab === 'register'
                    ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Join Kretabazaar
              </button>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex-1 py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.04.0 12s.46 3.8 1.27 5.42l4.01-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="flex-1 py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <svg className="w-4 h-4 fill-current text-zinc-900 dark:text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.67-.82 1.13-1.95.99-3.09-.98.04-2.18.66-2.87 1.48-.62.72-1.16 1.88-.99 3.01 1.1.09 2.22-.57 2.87-1.4" />
                </svg>
                Apple
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {tab === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@kretabazaar.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 pl-3.5 pr-10 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all mt-1"
              >
                {tab === 'login' ? 'Sign In to Account' : 'Create Free Account'}
              </button>

              <div className="text-center mt-1">
                <Link
                  href={tab === 'login' ? '/login' : '/login?tab=register'}
                  onClick={() => setIsAuthOpen(false)}
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Open full page experience <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
