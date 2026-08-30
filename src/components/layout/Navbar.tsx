'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Command, Truck, User, Menu, X, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, setIsSearchOpen, setIsAuthOpen, user } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C] text-white border-b border-slate-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-6">
          {/* Brand Logo Image */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/logo.png"
              alt="Kretabazaar"
              className="h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <Link
              href="/"
              className={`hover:text-[#F5C542] transition-colors ${pathname === '/' ? 'text-[#F5C542] font-bold' : ''}`}
            >
              Shop All
            </Link>
            <Link
              href="/products?category=Apparel"
              className="hover:text-[#F5C542] transition-colors"
            >
              Apparel
            </Link>
            <Link
              href="/products?category=Electronics"
              className="hover:text-[#F5C542] transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/products?category=Digital%20Goods"
              className="hover:text-[#F5C542] transition-colors"
            >
              Digital Assets
            </Link>
            <Link
              href="/track-order"
              className={`hover:text-[#F5C542] transition-colors flex items-center gap-1.5 text-xs bg-slate-800/80 text-[#F5C542] px-3.5 py-1 rounded-full border border-slate-700 ${
                pathname === '/track-order' || pathname === '/tracking' ? 'bg-[#F5C542] text-[#0B192C] font-bold border-[#F5C542]' : ''
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
          </nav>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-400 px-3.5 py-2 rounded-full border border-slate-700/80 text-xs cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="flex-1">Search products, headphones, Figma kits...</span>
              <kbd className="hidden lg:flex items-center gap-0.5 bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono border border-slate-700 shadow-xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Drawer Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-300 hover:text-[#F5C542] transition-colors rounded-full hover:bg-slate-800"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4.5 h-4.5 rounded-full bg-[#F5C542] text-[#0B192C] text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Auth User Button */}
            {user ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#F5C542]"
                />
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-full bg-[#F5C542] hover:bg-[#eab308] text-[#0B192C] text-xs font-bold transition-all shadow-md shadow-[#F5C542]/20"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 p-4 bg-[#0B192C] flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-semibold py-2 border-b border-slate-800"
          >
            Shop All Products
          </Link>
          <Link
            href="/products?category=Apparel"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-semibold py-2 border-b border-slate-800"
          >
            Apparel
          </Link>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-200 text-sm font-semibold py-2 border-b border-slate-800"
          >
            Sign In / Register
          </Link>
          <Link
            href="/track-order"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#F5C542] font-bold text-sm py-2 flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" /> Track Order Status
          </Link>
        </div>
      )}
    </header>
  );
}
