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
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm cursor-pointer">
        {/* Featured / Discount Tag */}
        {project.originalPrice > project.price && (
          <span className="absolute top-3 left-3 z-10 bg-[#EF4444] text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
            -{Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}% OFF
          </span>
        )}

        <img
          src={project.primaryImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-[#0B192C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
          <div className="flex justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveProject(project.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved ? 'bg-[#F5C542] text-[#0B192C]' : 'bg-white/80 text-slate-900 hover:bg-white'
              }`}
              title="Save to Wishlist"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setQuickViewProduct(project)}
              className="px-3 py-1.5 rounded-full bg-white/90 text-[#0B192C] font-bold text-xs hover:bg-white transition-colors shadow-md flex items-center gap-1 shrink-0"
            >
              <Eye className="w-3.5 h-3.5" /> Inspect
            </button>

            {/* Quick Add to Cart Hover Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(project);
              }}
              className="px-4 py-1.5 rounded-full bg-[#F5C542] hover:bg-[#eab308] text-[#0B192C] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#F5C542]/30 shrink-0 transition-transform active:scale-95"
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
            className="w-6 h-6 rounded-full object-cover border border-[#F5C542] shrink-0"
          />
          <div className="min-w-0">
            <h5 className="font-bold text-slate-900 dark:text-white truncate hover:underline cursor-pointer">
              {project.title}
            </h5>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
              {project.seller.name}
            </span>
          </div>
        </div>

        {/* Product Price Display */}
        <div className="flex items-baseline gap-1.5 text-right shrink-0 ml-2">
          <span className="font-extrabold text-sm text-[#0B192C] dark:text-[#F5C542]">
            ${project.price.toFixed(2)}
          </span>
          {project.originalPrice > project.price && (
            <span className="text-[11px] text-slate-400 line-through hidden sm:inline">
              ${project.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
