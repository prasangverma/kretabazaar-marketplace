'use client';

import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function TrackingPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col gap-8">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Client Dashboard</span>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Project Milestone Status</h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col gap-6 text-xs">
        <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-blue-600 font-bold">Project #HIRE-99210</span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">Apex OS — Spatial Design Contract</h3>
          </div>
          <span className="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 font-bold px-3 py-1 rounded-full">
            In Progress
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <h5 className="font-bold text-zinc-900 dark:text-white">Design Brief & Wireframes Approved</h5>
              <span className="text-zinc-500 text-[10px]">Completed Aug 4, 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <h5 className="font-bold text-zinc-900 dark:text-white">High-Fidelity 3D Assets & Spatial UI</h5>
              <span className="text-zinc-500 text-[10px]">Completed Aug 7, 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <h5 className="font-bold text-blue-600">Final Interactive Prototype Handoff</h5>
              <span className="text-zinc-500 text-[10px]">Due Aug 12, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
