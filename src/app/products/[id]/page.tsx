'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/mockData';
import { Star, ShieldCheck, ShoppingBag, Bookmark, Sparkles, Check, ChevronRight, Truck } from 'lucide-react';
import ProjectCard from '@/components/home/ProjectCard';
import { ProductVariant } from '@/types';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { addToCart, toggleSaveProject, savedProductIds } = useStore();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const activeVariant = selectedVariant || product.variants[0];
  const finalPrice = product.price + (activeVariant?.priceOffset || 0);

  const isSaved = savedProductIds.includes(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{product.title}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs relative">
            <img
              src={product.images[selectedImgIdx] || product.primaryImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIdx(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border shrink-0 transition-all ${
                  selectedImgIdx === idx ? 'border-blue-600 scale-105 shadow-xs' : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Buying Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 block mb-1">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">{product.title}</h1>
            <p className="text-xs text-zinc-500 mb-4">{product.subtitle}</p>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-6 text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="font-bold text-zinc-900 dark:text-white">{product.rating}</span>
              </div>
              <span className="text-zinc-400">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-blue-600">${finalPrice.toFixed(2)}</span>
              {product.originalPrice > finalPrice && (
                <span className="text-sm text-zinc-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-6">
              <img src={product.seller.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700" />
              <div className="text-xs">
                <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                  {product.seller.name} <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </h4>
                <span className="text-zinc-500">{product.seller.title}</span>
              </div>
            </div>

            {/* Variant Option Chooser */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-2">
                  Select Option: <span className="text-blue-600 font-bold">{activeVariant.name}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-2 transition-all ${
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
                onClick={() => addToCart(product, activeVariant, quantity)}
                className="behance-btn-primary flex-1 py-3.5 text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
              </button>
              <button
                onClick={() => toggleSaveProject(product.id)}
                className={`p-3.5 rounded-full border transition-colors ${
                  isSaved ? 'bg-blue-600 text-white border-blue-600' : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4">Product Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div key={key} className="flex justify-between p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 font-medium">{key}</span>
              <span className="text-zinc-900 dark:text-white font-bold">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">More Custom Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProjectCard key={rel.id} project={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
