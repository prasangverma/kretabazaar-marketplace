'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useStore();

  const categories = [
    'All',
    'Apparel',
    'Electronics',
    'Digital Goods',
    'Accessories',
    'Home & Studio',
    'Audio'
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-16 z-30 transition-colors py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
