'use client';

import React from 'react';
import { Search, Sparkles, Flame, TrendingUp } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function HeroSection() {
  const { searchQuery, setSearchQuery, setIsSearchOpen } = useStore();

  const popularTags = ['UI/UX', '3D Art', 'Spatial Computing', 'Figma', 'Blender', 'Branding', 'Mobile App'];

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 border-b border-zinc-200 dark:border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>The Creative Portfolio Marketplace</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          Discover & Showcase <br className="hidden sm:inline" />
          <span className="text-blue-600">World-Class Creative Work</span>
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          Explore millions of UI/UX designs, 3D motion artworks, digital illustrations, and branding case studies created by top designers around the globe.
        </p>

        {/* Search Bar Input */}
        <div className="w-full max-w-2xl relative">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 pl-4 rounded-full border border-zinc-300 dark:border-zinc-700 shadow-lg shadow-zinc-200/50 dark:shadow-none cursor-pointer hover:border-blue-500 transition-colors"
          >
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={searchQuery}
              placeholder="Search by creative tag, tool (Figma, Blender), or designer..."
              className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none cursor-pointer"
            />
            <button className="behance-btn-primary px-6 py-2.5 text-xs font-bold shrink-0">
              Search
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-zinc-500 pt-2">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
