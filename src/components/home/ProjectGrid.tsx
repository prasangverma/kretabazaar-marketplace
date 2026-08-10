'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import { useStore } from '@/context/StoreContext';
import { SlidersHorizontal } from 'lucide-react';

export default function ProjectGrid() {
  const { products, activeCategory, searchQuery, sortBy, setSortBy } = useStore();

  const filteredProducts = products
    .filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Filter Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-900 dark:text-white">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
          </span>
          <span className="text-zinc-500">({filteredProducts.length} items)</span>
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-full px-3.5 py-1.5 outline-none cursor-pointer font-medium"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Behance Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 text-sm">
          No custom products found matching your search. Try resetting your query or choosing another category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProjectCard key={product.id} project={product} />
          ))}
        </div>
      )}
    </section>
  );
}
