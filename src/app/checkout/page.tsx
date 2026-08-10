'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('Elena Rostova');
  const [email, setEmail] = useState('elena@kretabazaar.com');

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-200 dark:border-blue-800">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Freelance Contract Confirmed!</h1>
        <p className="text-xs text-zinc-500 mb-6">
          Thank you, <strong className="text-blue-600">{name}</strong>. Your project inquiry reference is <strong className="text-zinc-900 dark:text-white">HIRE-99210</strong>. We sent confirmation to <strong className="text-zinc-900 dark:text-white">{email}</strong>.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
        >
          Return to Creative Feed <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Kretabazaar Hire</span>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Hire Creative Talent</h1>
      </div>

      <form onSubmit={handleComplete} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col gap-6 text-xs">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
          Direct Project Booking Inquiry
        </h3>

        <div>
          <label className="text-zinc-700 dark:text-zinc-300 font-semibold block mb-1">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="text-zinc-700 dark:text-zinc-300 font-semibold block mb-1">Work Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="text-zinc-700 dark:text-zinc-300 font-semibold block mb-1">Project Scope & Budget</label>
          <textarea
            required
            rows={4}
            placeholder="Describe your design project requirements, deadline, and budget range..."
            className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-colors"
        >
          Send Freelance Proposal
        </button>
      </form>
    </div>
  );
}
