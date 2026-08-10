'use client';

import React from 'react';
import { DollarSign, ShoppingBag, Users, Sparkles, TrendingUp, Package } from 'lucide-react';
import { PRODUCTS, SELLERS } from '@/data/mockData';
import { useStore } from '@/context/StoreContext';

export default function AdminPage() {
  const { addToast } = useStore();
  const currentSeller = SELLERS[0];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Seller Studio Analytics
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">
            Kretabazaar Store Command Center
          </h1>
        </div>

        <button
          onClick={() => addToast('Product listing drawer opened!', 'info')}
          className="behance-btn-primary px-5 py-2 text-xs font-bold shadow-md shadow-blue-600/10"
        >
          + Add New Custom Product
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500 font-medium">Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">$48,920.00</span>
          <span className="text-[11px] text-emerald-500 flex items-center gap-1 mt-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +18.4% from last month
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500 font-medium">Orders Completed</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">642</span>
          <span className="text-[11px] text-emerald-500 flex items-center gap-1 mt-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +9.2% order growth
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500 font-medium">Seller Rating</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-blue-600">4.9 ★</span>
          <span className="text-[11px] text-zinc-500 mt-1 block">Verified Official Store</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500 font-medium">Active Stock</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">112 Items</span>
          <span className="text-[11px] text-emerald-500 font-semibold mt-1 block">In Stock & Ready</span>
        </div>
      </div>

      {/* Active Custom Products Table */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4">Active Custom Product Listings</h3>
        <div className="flex flex-col gap-4 text-xs">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={p.primaryImage} alt="" className="w-12 h-12 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800" />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{p.title}</h4>
                  <span className="text-zinc-500">{p.category} • Seller: {p.seller.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 font-bold">
                <span className="text-blue-600">${p.price.toFixed(2)}</span>
                <span className="text-zinc-400 font-normal">Stock: {p.stockCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
