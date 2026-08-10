'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-12">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Haute Horlogerie Heritage</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mt-1">The Aethelgard Craftsmanship Story</h1>
        <p className="text-sm text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Founded with a relentless obsession for mechanical precision, audiophile acoustics, and aerospace grade materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 text-center">
          <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-white mb-2">Artisan Excellence</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every skeleton movement timepiece undergoes 120 hours of hand inspection and pressure testing before dispatch.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 text-center">
          <Globe className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-white mb-2">Direct Global Atelier</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            By eliminating traditional retail markups and connecting directly with CJ Dropshipping luxury ateliers, we deliver 5-star quality at fair prices.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 text-center">
          <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-white mb-2">2-Year International Guarantee</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every piece is backed by our serialized craftsmanship certificate and worldwide priority replacement policy.
          </p>
        </div>
      </div>
    </div>
  );
}
