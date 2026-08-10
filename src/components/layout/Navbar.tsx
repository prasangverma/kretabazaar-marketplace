'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Command, Plus, User, Menu, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, setIsSearchOpen, setIsAuthOpen, user, addToast } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSellProduct = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      addToast('Seller Studio opened! Upload your custom product listing.', 'info');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white font-sans">
              Kreta<span className="text-blue-600">bazaar</span>
            </span>
          </Link>

          {/* Nav Category Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <Link
              href="/"
              className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600 font-bold' : ''}`}
            >
              Discover
            </Link>
            <Link
              href="/products?category=Apparel"
              className="hover:text-blue-600 transition-colors"
            >
              Apparel
            </Link>
            <Link
              href="/products?category=Electronics"
              className="hover:text-blue-600 transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/products?category=Digital%20Goods"
              className="hover:text-blue-600 transition-colors"
            >
              Digital Assets
            </Link>
          </nav>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 px-3.5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <span className="flex-1">Search custom products, tools & sellers...</span>
              <kbd className="hidden lg:flex items-center gap-0.5 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] px-1.5 py-0.5 rounded font-mono border border-zinc-200 dark:border-zinc-700 shadow-xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Drawer Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Sell Product Button */}
            <button
              onClick={handleSellProduct}
              className="behance-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/10"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Sell Product</span>
            </button>

            {/* Auth User Button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {user ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                />
              ) : (
                <span className="px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200">
                  Sign In
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold py-2 border-b border-zinc-100 dark:border-zinc-900"
          >
            Discover Products
          </Link>
          <Link
            href="/products?category=Apparel"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold py-2 border-b border-zinc-100 dark:border-zinc-900"
          >
            Apparel
          </Link>
          <Link
            href="/products?category=Electronics"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold py-2 border-b border-zinc-100 dark:border-zinc-900"
          >
            Electronics
          </Link>
          <Link
            href="/products?category=Digital%20Goods"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold py-2"
          >
            Digital Assets
          </Link>
        </div>
      )}
    </header>
  );
}
