'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Your Cart Bag</h2>
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full font-sans">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-zinc-50 dark:bg-zinc-900/80 px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 text-xs">
            {distanceToFreeShipping > 0 ? (
              <p className="text-zinc-600 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Add <strong className="text-blue-600">${distanceToFreeShipping.toFixed(2)}</strong> more for <strong className="text-zinc-900 dark:text-white">Free Priority Express Shipping</strong>
              </p>
            ) : (
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Unlocked Free Express Delivery!
              </p>
            )}
            <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-200 dark:border-zinc-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  Explore custom audio gear, Figma UI kits, titanium EDC wallets, and oversized apparel.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="behance-btn-primary px-6 py-2.5 text-xs shadow-md shadow-blue-600/10"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 items-center justify-between"
                >
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{item.product.title}</h4>
                    {item.selectedVariant && (
                      <p className="text-xs text-blue-600 font-semibold">{item.selectedVariant.name}</p>
                    )}
                    <p className="text-xs text-zinc-500 font-medium">${item.product.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-zinc-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. KRETA15)"
                    className="w-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 pl-8 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-lg shrink-0"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span>Coupon <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountPercent}% OFF)</span>
                  <button onClick={removeCoupon} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-bold">✕</button>
                </div>
              )}

              {/* Subtotal breakdown */}
              <div className="flex flex-col gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-900 dark:text-white font-semibold">${cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-blue-600 font-semibold">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {distanceToFreeShipping === 0 ? 'FREE Express' : '$12.00'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white border-t border-zinc-200 dark:border-zinc-800 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Protected by 256-Bit SSL Encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
