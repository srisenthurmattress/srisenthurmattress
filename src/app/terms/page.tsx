"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow pt-32 sm:pt-40 pb-28">
        <article className="max-w-3xl mx-auto px-6 sm:px-8">
          {/* Document Header */}
          <header className="pb-10 border-b border-[#D1E2E8]">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
              Atelier Standards & Governance • Sri Senthur Mattress
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#112732] font-normal">
              Terms & Conditions
            </h1>
            <p className="mt-4 font-mono text-xs text-[#3F6474]">
              Last Updated: November 2026 • Document Ref. SSM-TERMS-2026-B
            </p>
          </header>

          {/* Document Body */}
          <div className="py-12 space-y-12 text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                1. Acceptance of Terms
              </h2>
              <p>
                By commissioning a bespoke mattress, scheduling a consultation, or purchasing through our catalogue, you enter into a binding agreement governed by these terms and our manufacturing quality specifications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                2. 10 to 15-Year Factory Warranty Policy
              </h2>
              <p>
                Every mattress is engineered to architectural standards of durability. Our comprehensive warranty covers:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-[#1C3B49]">
                <li>
                  <strong>Structural Indentations:</strong> Any visible permanent body impression exceeding 25mm (1.0 inch) not associated with an uneven or broken cot base.
                </li>
                <li>
                  <strong>Coil & Spring Integrity:</strong> Pocketed spring breakage, internal tier separation, or localized collapse under normal sleep use.
                </li>
                <li>
                  <strong>Perimeter Stitching:</strong> Seam fraying, border piping detachment, or hand-tufting rosette failures due to manufacturing defects.
                </li>
              </ul>
              <p>
                <strong>Exclusions:</strong> Gradual natural softening of comfort layers that does not affect spine alignment, physical tears caused by sharp objects, burns, or liquid contamination occurring after delivery.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                3. The 100-Night In-Home Trial
              </h2>
              <p>
                Standard catalogue models are eligible for our 100-night trial. A minimum trial period of 30 nights is mandatory to allow cervical and spinal musculature to properly acclimate to correct ergonomic counter-force. Returns must be in clean, unsoiled condition.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                4. Bespoke Dimensional Orders
              </h2>
              <p>
                Custom mattresses crafted to client-provided non-standard millimetre specifications are hand-tailored individually. Because these pieces are uniquely built for specific furniture frames, cancellations or dimensional changes must be communicated within 24 hours of commission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                5. Jurisdiction & Governance
              </h2>
              <p>
                All contracts, disputes, and warranty claims are governed by the laws of India, with exclusive jurisdiction in the courts of Erode, Tamil Nadu.
              </p>
            </section>
          </div>

          <footer className="pt-8 border-t border-[#D1E2E8] text-[11px] font-mono text-[#3F6474] flex justify-between">
            <span>SRI SENTHUR MATTRESS ATELIER</span>
            <span>LEGAL JURISDICTION: COIMBATORE, INDIA</span>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
