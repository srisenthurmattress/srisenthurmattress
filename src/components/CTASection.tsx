"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#0A181F] text-[#F4F8FA] border-t border-[#1C3B49]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end justify-between">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#2685A5] block">
              Private Consultation & Custom Tailoring
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white max-w-2xl leading-[1.1]">
              Transform Sleep from a Routine into an Art.
            </h2>
            <p className="text-xs sm:text-sm text-[#D1E2E8]/70 max-w-xl font-light leading-relaxed pt-2">
              Whether you need bespoke millimetre sizing for an antique teakwood bed frame or a tailored multi-zone orthopedic formulation, our master artisans craft each piece directly to your posture requirements.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between px-6 py-4 bg-[#17637D] text-white hover:bg-[#2685A5] text-xs uppercase tracking-[0.16em] font-medium transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-6 py-4 border border-[#2E5160] hover:border-white text-xs uppercase tracking-[0.16em] font-medium text-white transition-colors"
            >
              <span>WhatsApp Concierge</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Minimal Baseline Credits */}
        <div className="mt-16 pt-8 border-t border-[#16303D] flex flex-wrap items-center justify-between gap-6 text-[10px] font-mono text-[#3F6474]">
          <span>HANDCRAFTED IN TAMIL NADU</span>
          <span>100-NIGHT IN-HOME SLEEP TRIAL</span>
          <span>COMPLIMENTARY WHITE-GLOVE LOGISTICS</span>
        </div>
      </div>
    </section>
  );
}
