'use client';

import React from 'react';
import { ShoppingBag, Eye, Bookmark, Sparkles } from 'lucide-react';
import { CustomProduct } from '@/types';
import { useStore } from '@/context/StoreContext';

export default function ProjectCard({ project }: { project: CustomProduct }) {
  const { addToCart, toggleSaveProject, savedProductIds, setQuickViewProduct } = useStore();

  const isSaved = savedProductIds.includes(project.id);

  return (
    <div className="group flex flex-col gap-2.5">
      {/* Thumbnail Card Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs cursor-pointer">
        {/* Featured / Discount Tag */}
        {project.originalPrice > project.price && (
          <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
            -{Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}% OFF
          </span>
        )}

        <img
          src={project.primaryImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
          <div className="flex justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveProject(project.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved ? 'bg-blue-600 text-white' : 'bg-white/80 text-zinc-900 hover:bg-white'
              }`}
              title="Save to Wishlist"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setQuickViewProduct(project)}
              className="px-3 py-1.5 rounded-full bg-white/90 text-zinc-900 font-bold text-xs hover:bg-white transition-colors shadow-md flex items-center gap-1 shrink-0"
            >
              <Eye className="w-3.5 h-3.5" /> Inspect
            </button>

            {/* Quick Add to Cart Hover Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(project);
              }}
              className="behance-btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="flex items-center justify-between text-xs px-1">
        {/* Seller Info & Product Name */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            src={project.seller.avatar}
            alt={project.seller.name}
            className="w-6 h-6 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 shrink-0"
          />
          <div className="min-w-0">
            <h5 className="font-bold text-zinc-900 dark:text-white truncate hover:underline cursor-pointer">
              {project.title}
            </h5>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block truncate">
              {project.seller.name}
            </span>
          </div>
        </div>

        {/* Product Price Display */}
        <div className="flex items-baseline gap-1.5 text-right shrink-0 ml-2">
          <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
            ${project.price.toFixed(2)}
          </span>
          {project.originalPrice > project.price && (
            <span className="text-[11px] text-zinc-400 line-through hidden sm:inline">
              ${project.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
