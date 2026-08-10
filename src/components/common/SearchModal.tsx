'use client';

import React, { useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, products, setQuickViewProduct } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim() === ''
    ? products.slice(0, 3)
    : products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search custom products, headphones, Figma kits, sellers..."
            className="w-full bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 text-sm outline-none font-sans"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setQuickViewProduct(product);
                setIsSearchOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.primaryImage}
                  alt={product.title}
                  className="w-12 h-12 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.title}
                  </h4>
                  <span className="text-xs text-zinc-400">{product.seller.name} • {product.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-xs text-blue-600">${product.price.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
