'use client';

import React, { useState, useEffect } from 'react';
import { Search, Truck, Package, CheckCircle2, Clock, MapPin, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('DROP-89421');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders?query=${encodeURIComponent(searchQuery.trim())}`);
      const json = await res.json();
      if (json.success) {
        setOrder(json.data);
      } else {
        setOrder(null);
        setError(json.error || 'No active shipment found.');
      }
    } catch (e: any) {
      setError('Failed to fetch tracking data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking('DROP-89421');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(query);
  };

  const getStepStatus = (currentStatus: string, stepIndex: number) => {
    const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentIndex = statuses.indexOf(currentStatus.toUpperCase());
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
          <Truck className="w-3.5 h-3.5" /> Live Logistics Tracking Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
          Track Your Package
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          Enter your Order Number (e.g. DROP-89421) or Carrier Tracking Code to view real-time delivery status.
        </p>
      </div>

      {/* Input Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto w-full">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order # or Tracking Code (e.g. DROP-89421)"
            className="w-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 pl-10 pr-4 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 outline-none focus:border-blue-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="behance-btn-primary px-6 py-3 text-xs font-bold shrink-0 shadow-md shadow-blue-600/20"
        >
          {loading ? 'Tracking...' : 'Track Package'}
        </button>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 border border-red-200 dark:border-red-800 max-w-xl mx-auto w-full">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Order Tracking Milestone Dashboard */}
      {order && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl flex flex-col gap-8">
          {/* Top Order Summary Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold block">Order Number</span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">{order.orderNumber}</h3>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-zinc-400 block">Carrier & Tracking #</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> {order.carrier} • {order.trackingNumber}
              </span>
            </div>
          </div>

          {/* Delivery Milestone Stepper */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6">Delivery Progress</h4>
            <div className="grid grid-cols-4 gap-2 relative">
              {[
                { title: 'Order Placed', desc: 'Payment Verified' },
                { title: 'Processing', desc: 'Supplier Dispatch' },
                { title: 'Shipped', desc: order.carrier || 'FedEx Express' },
                { title: 'Delivered', desc: order.estimatedDelivery || 'Est. Delivery' }
              ].map((step, idx) => {
                const state = getStepStatus(order.fulfillmentStatus, idx);
                return (
                  <div key={idx} className="flex flex-col items-center text-center gap-2 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                        state === 'completed' || state === 'active'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-300 dark:border-zinc-700'
                      }`}
                    >
                      {state === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1">{step.title}</span>
                    <span className="text-[10px] text-zinc-500">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics Meta Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-zinc-500 font-medium block mb-1">Estimated Air Express Delivery:</span>
              <strong className="text-zinc-900 dark:text-white font-bold text-sm">{order.estimatedDelivery}</strong>
            </div>

            <div>
              <span className="text-zinc-500 font-medium block mb-1">Destination Address:</span>
              <strong className="text-zinc-900 dark:text-white font-bold">
                {order.shippingAddress?.fullName || 'Customer'}, {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
              </strong>
            </div>
          </div>

          {/* Order Items List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Package Items</h4>
            <div className="flex flex-col gap-3">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image || item.product?.primaryImage} alt="" className="w-12 h-12 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800" />
                    <div>
                      <h5 className="font-bold text-zinc-900 dark:text-white">{item.title}</h5>
                      <span className="text-zinc-500">Qty: {item.quantity} • SKU: {item.sku}</span>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
