'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, Truck, RefreshCw, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Footer() {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addToast('VIP 15% discount coupon (KRETA15) unlocked!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800 transition-colors pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-blue-600/30">
                K
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Kreta<span className="text-blue-500">bazaar</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier global dropshipping marketplace for verified studio gear, digital Figma assets, audiophile acoustics, and EDC titanium hardware. Delivered worldwide with 30-day risk-free guarantee.
            </p>

            {/* Newsletter VIP Discount Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to get 15% OFF"
                className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 px-3.5 py-2.5 rounded-xl outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 transition-colors flex items-center gap-1"
              >
                Claim 15% OFF <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="flex flex-col gap-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Shop Categories</h4>
            <Link href="/products?category=Apparel" className="text-zinc-400 hover:text-white transition-colors">Streetwear Apparel</Link>
            <Link href="/products?category=Electronics" className="text-zinc-400 hover:text-white transition-colors">Smart Electronics</Link>
            <Link href="/products?category=Digital%20Goods" className="text-zinc-400 hover:text-white transition-colors">Digital Figma Assets</Link>
            <Link href="/products?category=Audio" className="text-zinc-400 hover:text-white transition-colors">Audiophile Sound</Link>
            <Link href="/products?category=Accessories" className="text-zinc-400 hover:text-white transition-colors">Titanium EDC Accessories</Link>
          </div>

          {/* Column 3: Customer Care & Order Help */}
          <div className="flex flex-col gap-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Customer Support</h4>
            <Link href="/track-order" className="text-blue-400 font-bold hover:underline">Track Your Package 🚚</Link>
            <Link href="/shipping" className="text-zinc-400 hover:text-white transition-colors">Shipping & Air Delivery</Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">30-Day Returns Policy</Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact Support Center</Link>
            <Link href="/admin" className="text-zinc-400 hover:text-white transition-colors">Seller Studio Portal</Link>
          </div>

          {/* Column 4: Legal Policies */}
          <div className="flex flex-col gap-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Legal & Policies</h4>
            <span className="text-zinc-400 cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="text-zinc-400 cursor-pointer hover:text-white">Terms of Service</span>
            <span className="text-zinc-400 cursor-pointer hover:text-white">Refund Policy</span>
            <span className="text-zinc-400 cursor-pointer hover:text-white">Cookie Consent</span>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Kretabazaar Inc. All rights reserved. Powered by Next.js 15 & Prisma ORM.</p>

          {/* Payment Gateways Badges */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300 font-bold">STRIPE</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300 font-bold">PAYPAL</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300 font-bold">RAZORPAY</span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300 font-bold">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
