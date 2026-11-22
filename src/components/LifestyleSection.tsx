"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function LifestyleSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#EDF4F7] border-t border-[#D1E2E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Index */}
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
            03 / Sanctum & Form
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#112732] max-w-2xl leading-[1.15]">
            A Sanctuary Sculpted for Deep Regeneration
          </h2>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Large Master Bedroom Photography */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-white border border-[#D1E2E8]">
              <Image
                src="https://www.sleepsia.in/cdn/shop/files/Family_Pillow_Set_1.webp?v=1765520601"
                alt="Tranquil master bedroom interior with Sri Senthur Mattress"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <p className="text-[11px] font-mono text-[#3F6474] mt-3">
              FIG. 01 — ARCHITECTURAL RESIDENCE, COIMBATORE. THE ROYAL INDULGENCE HYBRID IN OATMEAL LINEN.
            </p>
          </div>

          {/* Right Column: Text & Inset Detail */}
          <div className="lg:col-span-5 space-y-10 lg:pt-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif text-[#112732]">
                Silence, Equilibrium, and Pure Airflow
              </h3>
              <p className="text-xs sm:text-sm text-[#2E5160] leading-relaxed font-light">
                True luxury is an absence: the absence of pressure points, the absence of motion transfer, the absence of synthetic chemical off-gassing. When your spine rests in natural alignment, the nervous system completely relaxes.
              </p>
            </div>

            {/* Inset Macro Detail Image */}
            <div className="border-t border-[#D1E2E8] pt-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-white border border-[#D1E2E8] mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80"
                  alt="Detail of hand-stitched Belgian Damask Jacquard quilting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="text-xs text-[#2E5160] font-light leading-relaxed">
                Every edge is reinforced with double-needle border piping and anchored with internal tufts, eliminating reliance on industrial chemical adhesives.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#112732] hover:text-[#17637D] font-medium transition-colors border-b border-[#112732] pb-1"
              >
                <span>Read Our Material Philosophy</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
