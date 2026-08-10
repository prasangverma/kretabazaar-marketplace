'use client';

import React, { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, user, setUser, addToast } = useStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      setUser({
        id: 'u-1',
        name: email.split('@')[0] || 'Elena Rostova',
        email: email || 'elena@kretabazaar.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        role: 'customer',
        savedProductIds: []
      });
      addToast('Welcome back to Kretabazaar!', 'success');
    } else {
      setUser({
        id: 'u-2',
        name: name || 'Member',
        email: email || 'member@kretabazaar.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        role: 'customer',
        savedProductIds: []
      });
      addToast('Account created! Welcome to Kretabazaar.', 'success');
    }
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
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="text-center py-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-blue-600"
            />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-zinc-500 mb-6">{user.email}</p>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${
                  tab === 'login' ? 'border-blue-600 text-blue-600' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${
                  tab === 'register' ? 'border-blue-600 text-blue-600' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'
                }`}
              >
                Join Kretabazaar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {tab === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
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
                  className="w-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all mt-2"
              >
                {tab === 'login' ? 'Sign In to Account' : 'Create Free Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
