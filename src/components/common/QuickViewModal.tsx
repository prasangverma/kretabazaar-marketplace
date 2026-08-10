'use client';

import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingBag, Bookmark, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductVariant } from '@/types';
import Link from 'next/link';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleSaveProject,
    savedProductIds,
    addToast
  } = useStore();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    quickViewProduct?.variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isSaved = savedProductIds.includes(quickViewProduct.id);
  const activeVariant = selectedVariant || quickViewProduct.variants[0];
  const finalPrice = quickViewProduct.price + (activeVariant?.priceOffset || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col items-center justify-between border-r border-zinc-200 dark:border-zinc-800">
          <div className="w-full aspect-square rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-4 bg-white dark:bg-zinc-900">
            <img
              src={quickViewProduct.images[selectedImgIdx] || quickViewProduct.primaryImage}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2">
            {quickViewProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIdx(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${
                  selectedImgIdx === idx
                    ? 'border-blue-600 scale-105 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Specs & Buying Actions */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            {/* Category & Seller */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-wider uppercase font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                {quickViewProduct.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-zinc-400">({quickViewProduct.reviewsCount})</span>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-1">{quickViewProduct.title}</h2>
            <p className="text-xs text-zinc-500 mb-4">{quickViewProduct.subtitle}</p>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${finalPrice.toFixed(2)}</span>
              {quickViewProduct.originalPrice > finalPrice && (
                <span className="text-sm text-zinc-400 line-through">
                  ${quickViewProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Urgency Meter */}
            <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Hurry! Only <strong>{quickViewProduct.stockCount}</strong> remaining in seller atelier!</span>
            </div>

            {/* Seller Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
              <img
                src={quickViewProduct.seller.avatar}
                alt={quickViewProduct.seller.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
              />
              <div className="flex-1 text-xs">
                <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                  {quickViewProduct.seller.name}
                  {quickViewProduct.seller.badge && (
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </h4>
                <span className="text-zinc-500">{quickViewProduct.seller.title}</span>
              </div>
            </div>

            {/* Variant Switcher */}
            {quickViewProduct.variants.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-2">
                  Select Option: <span className="text-blue-600 font-bold">{activeVariant.name}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-2 transition-all ${
                        activeVariant.id === v.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {v.color && (
                        <span className="w-3 h-3 rounded-full border border-zinc-300" style={{ backgroundColor: v.color }} />
                      )}
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, activeVariant, quantity);
                  setQuickViewProduct(null);
                }}
                className="behance-btn-primary flex-1 py-3 text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
              </button>
              <button
                onClick={() => toggleSaveProject(quickViewProduct.id)}
                className={`p-3 rounded-full border transition-colors ${
                  isSaved ? 'bg-blue-600 text-white border-blue-600' : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
