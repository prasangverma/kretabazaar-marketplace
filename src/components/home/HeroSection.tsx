'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, ShieldCheck, Truck, RefreshCw, Zap, ArrowRight } from 'lucide-react';
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
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column: Headlines & Deal Ticker */}
          <div className="flex-1 text-center lg:text-left">
            {/* Flash Deal Pill */}
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 animate-pulse">
              <Zap className="w-4 h-4 fill-blue-600 text-blue-600" />
              <span>FLASH DROPSHIPPING SALE :: UP TO 40% OFF</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-4">
              Premium Products, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Delivered Direct to Door.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Discover curated electronics, audiophile sound gear, Figma UI kits, and EDC accessories with express global shipping and 30-day risk-free returns.
            </p>

            {/* Countdown Ticker */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Flash Sale Ends In:</span>
              <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold">
                <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-2.5 py-1 rounded-md shadow-xs">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-2.5 py-1 rounded-md shadow-xs">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-blue-600 text-white px-2.5 py-1 rounded-md shadow-xs">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto behance-btn-primary px-8 py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
              >
                <ShoppingBag className="w-4 h-4" /> Shop Trending Deals
              </Link>

              <Link
                href="/track-order"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                <Truck className="w-4 h-4 text-blue-600" /> Track Order Status
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Box */}
          <div className="w-full max-w-md lg:max-w-lg shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900 p-2">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                alt="Acoustica Spatial Pro ANC Headphones"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Featured Dropship Pick</span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Acoustica Spatial Pro ANC</h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-blue-600">$349.99</span>
                  <span className="text-xs text-zinc-400 line-through block">$499.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Badges Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
            <Truck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white">Free Express Delivery</h4>
              <span className="text-[11px] text-zinc-500">On all orders over $100</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
            <RefreshCw className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white">30-Day Guarantee</h4>
              <span className="text-[11px] text-zinc-500">100% money back returns</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white">256-Bit SSL Checkout</h4>
              <span className="text-[11px] text-zinc-500">Stripe & PayPal encrypted</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white">Direct Factory Sourcing</h4>
              <span className="text-[11px] text-zinc-500">Verified top-tier suppliers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
