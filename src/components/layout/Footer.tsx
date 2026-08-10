'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-base flex items-center justify-center">
                K
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-white">
                Kreta<span className="text-blue-600">bazaar</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              The world's leading destination to showcase & discover creative work. Explore UI/UX design, 3D art, illustration, and branding portfolios.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white mb-3">Built for Creatives</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link href="/" className="hover:text-blue-600">Try Pro Features</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Create Portfolio</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Explore Moodboards</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Livestreams</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white mb-3">Hire Talent</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link href="/" className="hover:text-blue-600">Post a Job</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Search Designers</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Freelance Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-900 dark:text-white mb-3">Company</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link href="/" className="hover:text-blue-600">About Kretabazaar</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Careers</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Kretabazaar Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">English</Link>
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
