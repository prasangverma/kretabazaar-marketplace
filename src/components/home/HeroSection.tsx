'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 22, seconds: 41 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#0B192C] text-white border-b border-slate-800 py-12 lg:py-16">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#05101E] via-[#0B192C] to-[#142843] opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column: Headlines & Deal Ticker */}
          <div className="flex-1 text-center lg:text-left">
            {/* Flash Deal Pill */}
            <div className="inline-flex items-center gap-2 bg-[#F5C542]/10 border border-[#F5C542]/30 text-[#F5C542] px-4 py-1.5 rounded-full text-xs font-extrabold mb-6 animate-pulse">
              <Zap className="w-4 h-4 fill-[#F5C542] text-[#F5C542]" />
              <span>FLASH DROPSHIPPING SALE :: UP TO 40% OFF</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Premium Products, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C542] via-[#F59E0B] to-[#38BDF8]">
                Delivered Direct to Door.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Discover curated electronics, audiophile sound gear, Figma UI kits, and EDC accessories with express global shipping and 30-day risk-free returns.
            </p>

            {/* Countdown Ticker */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Flash Sale Ends In:</span>
              <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold">
                <span className="bg-slate-800 text-white px-2.5 py-1 rounded-md shadow-xs border border-slate-700">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-[#F5C542]">:</span>
                <span className="bg-slate-800 text-white px-2.5 py-1 rounded-md shadow-xs border border-slate-700">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-[#F5C542]">:</span>
                <span className="bg-[#F5C542] text-[#0B192C] px-2.5 py-1 rounded-md shadow-xs font-extrabold">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F5C542] hover:bg-[#eab308] text-[#0B192C] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#F5C542]/20 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" /> Shop Trending Deals
              </Link>

              <Link
                href="/track-order"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Truck className="w-4 h-4 text-[#38BDF8]" /> Track Order Status
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Box */}
          <div className="w-full max-w-md lg:max-w-lg shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 p-2">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                alt="Acoustica Spatial Pro ANC Headphones"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#F5C542] uppercase tracking-widest block">Featured Dropship Pick</span>
                  <h3 className="text-sm font-bold text-white">Acoustica Spatial Pro ANC</h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#F5C542]">$349.99</span>
                  <span className="text-xs text-slate-400 line-through block">$499.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Badges Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <Truck className="w-5 h-5 text-[#38BDF8] shrink-0" />
            <div>
              <h4 className="font-bold text-white">Free Express Delivery</h4>
              <span className="text-[11px] text-slate-400">On all orders over $100</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <RefreshCw className="w-5 h-5 text-[#F5C542] shrink-0" />
            <div>
              <h4 className="font-bold text-white">30-Day Guarantee</h4>
              <span className="text-[11px] text-slate-400">100% money back returns</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white">256-Bit SSL Checkout</h4>
              <span className="text-[11px] text-slate-400">Stripe & PayPal encrypted</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <Sparkles className="w-5 h-5 text-coral-400 text-red-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Direct Factory Sourcing</h4>
              <span className="text-[11px] text-slate-400">Verified top-tier suppliers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
