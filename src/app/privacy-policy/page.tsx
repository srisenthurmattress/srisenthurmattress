"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow pt-32 sm:pt-40 pb-28">
        <article className="max-w-3xl mx-auto px-6 sm:px-8">
          {/* Document Header */}
          <header className="pb-10 border-b border-[#D1E2E8]">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
              Legal & Discretion Protocol • Sri Senthur Atelier
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#112732] font-normal">
              Privacy & Data Policy
            </h1>
            <p className="mt-4 font-mono text-xs text-[#3F6474]">
              Effective Date: November 2026 • Document Ref. SSM-POL-2026-A
            </p>
          </header>

          {/* Document Body */}
          <div className="py-12 space-y-12 text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                1. Overview & Commitment to Discretion
              </h2>
              <p>
                At <strong>Sri Senthur Mattress</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), privacy is treated with the same meticulous care as our hand-tufted mattress cores. We value the confidence you place in our atelier when inquiring about bespoke mattress sizing, requesting fabric swatches, or purchasing our orthopedic formulations. This policy outlines how your data is treated with utmost discretion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                2. Information We Collect
              </h2>
              <p>
                We collect only the technical and logistical data required to engineer and deliver your bespoke sleep setup:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-[#1C3B49]">
                <li>
                  <strong>Contact Particulars:</strong> Full name, telephone number, WhatsApp handle, and email address provided during consultation requests.
                </li>
                <li>
                  <strong>Cot Specifications & Delivery Coordinates:</strong> Room placement floor, exact cot dimensions in millimetres, and physical destination address.
                </li>
                <li>
                  <strong>Orthopedic Consultation Notes:</strong> Sleep preferences, back or cervical support recommendations, and trial feedback.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                3. Purpose of Processing
              </h2>
              <p>
                Your data is processed strictly for:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-mono text-xs text-[#1C3B49]">
                <li>Manufacturing and tailoring mattresses to your specified dimensions.</li>
                <li>Coordinating white-glove master bedroom delivery logistics.</li>
                <li>Administering our 100-night sleep trial and 10 to 15-year warranty registers.</li>
              </ul>
              <p>
                We never monetize, license, or sell client data to third-party telemarketers or external advertising networks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                4. Data Security & Storage
              </h2>
              <p>
                All digital inquiries and consultation dossiers are transmitted via encrypted protocols and stored on restricted servers with strict access governance. Physical atelier worksheets are destroyed after final dispatch.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-serif text-[#112732] font-semibold">
                5. Client Rights & Inquiries
              </h2>
              <p>
                You may request access to, correction of, or permanent deletion of your customer profile at any point by directing an electronic transmission to:
              </p>
              <p className="font-mono text-xs text-[#17637D]">
                srisenthurmattress@gmail.com • Subject: Data Privacy Officer
              </p>
            </section>
          </div>

          <footer className="pt-8 border-t border-[#D1E2E8] text-[11px] font-mono text-[#3F6474] flex justify-between">
            <span>SRI SENTHUR MATTRESS ATELIER</span>
            <span>TAMIL NADU, INDIA</span>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
