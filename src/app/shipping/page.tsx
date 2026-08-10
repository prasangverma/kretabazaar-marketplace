'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col gap-10">
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Policy & Guarantees</span>
        <h1 className="text-3xl font-serif font-bold text-white mt-1">Shipping, Delivery & Returns</h1>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-6 text-xs text-zinc-300 leading-relaxed">
        <section>
          <h3 className="text-sm font-serif font-bold text-amber-400 mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4" /> Priority Express Air Delivery
          </h3>
          <p>
            All Aethelgard products are dispatched directly from our CJ Dropshipping priority fulfillment hubs using international express air couriers (FedEx Air Cargo / DHL Express).
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
            <li>United States & Canada: 3 to 4 business days</li>
            <li>Europe & United Kingdom: 3 to 5 business days</li>
            <li>Rest of World: 4 to 7 business days</li>
          </ul>
        </section>

        <section className="pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-serif font-bold text-amber-400 mb-2 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> 30-Day Risk-Free Return Guarantee
          </h3>
          <p>
            If you are not 100% delighted with your timepieces or accessories, simply contact our concierge team within 30 days of delivery. We will issue a prepaid return courier shipping label and provide a full 100% refund.
          </p>
        </section>

        <section className="pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-serif font-bold text-amber-400 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> 2-Year International Craftsmanship Warranty
          </h3>
          <p>
            Every product includes a serialized warranty card. Should any mechanical defect or movement irregularity occur within 2 years, we will repair or replace your item free of charge.
          </p>
        </section>
      </div>
    </div>
  );
}
