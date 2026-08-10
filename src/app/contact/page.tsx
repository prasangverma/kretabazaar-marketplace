'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ContactPage() {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Your concierge inquiry has been sent! Expect a response within 2 hours.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-12">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">24/7 VIP Concierge</span>
        <h1 className="text-4xl font-serif font-bold text-white mt-1">Contact Our Concierge Atelier</h1>
        <p className="text-xs text-zinc-400 mt-2">Have a question about custom sizing, order tracking, or wholesale dropshipping?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-white mb-4">Concierge Headquarters</h3>
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex items-center gap-3 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>One Market Plaza, Suite 3400, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@aethelgard.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 894-2190 (Toll-Free VIP Hotline)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-300 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Need instant help? Click the live chat widget at the bottom left!</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-7 glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
          <h3 className="text-base font-serif font-bold text-white mb-2">Send an Inquiry</h3>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lord Alex Vance"
              className="w-full bg-zinc-900 text-xs text-white p-3 rounded-xl border border-zinc-800 outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@vance.com"
              className="w-full bg-zinc-900 text-xs text-white p-3 rounded-xl border border-zinc-800 outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can our concierge team assist you today?"
              className="w-full bg-zinc-900 text-xs text-white p-3 rounded-xl border border-zinc-800 outline-none focus:border-amber-500/50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
          >
            Send VIP Message <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
