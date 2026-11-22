"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      num: "01",
      title: "Botanical Material Integrity",
      desc: "We exclusively utilize 100% natural organic latex tapped from certified South Indian rubber plantations, natural coir from Pollachi, and high-GSM Belgian damask jacquards. Free from heavy metals, formaldehyde, and toxic VOC off-gassing."
    },
    {
      num: "02",
      title: "5-Zone Ergonomic Mechanics",
      desc: "Our mattresses reject flat-slab construction. We calibrate differential counter-force across cervical curves, thoracic vertebrae, and pelvic weight points to maintain clinical horizontal spine alignment throughout sleep."
    },
    {
      num: "03",
      title: "Hand-Tufting Standards",
      desc: "Rather than relying on chemical adhesives that break down into dust and cause sagging, our artisans hand-tuft internal cores with structural rosettes, locking resilient layers permanently in position."
    },
    {
      num: "04",
      title: "Climatic Thermoregulation",
      desc: "Engineered specifically for warm tropical and temperate conditions. Open-cell foam structures and organic linen weaves promote continuous passive airflow, banishing trapped heat and night sweats."
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Raw Material Elasticity Testing",
      detail: "Latex density and tensile coil resilience are verified before entering the workshop."
    },
    {
      step: "02",
      title: "Orthopedic Core Calibration",
      detail: "Rebonded high-density zones are matched with pocketed Swedish steel springs."
    },
    {
      step: "03",
      title: "Double-Piping Perimeter Assembly",
      detail: "Perimeter borders are tailored by senior seamstresses to eliminate edge collapse."
    },
    {
      step: "04",
      title: "Dynamic Compression Certification",
      detail: "Every piece undergoes 100-cycle load deflection testing before white-glove packaging."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow pt-24 sm:pt-28">
        {/* ===================== EDITORIAL BANNER ===================== */}
        <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-end justify-start overflow-hidden pb-12 sm:pb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=2200&q=85"
              alt="Sri Senthur Mattress atelier and luxury bedroom craft"
              fill
              priority
              className="object-cover object-center filter brightness-[0.85]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A181F]/90 via-[#0A181F]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#D1E2E8] block mb-2">
              Corporate Profile & Provenance
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-white max-w-2xl font-normal leading-[1.1]">
              A Quarter-Century of Orthopedic Mastery.
            </h1>
            <p className="text-xs sm:text-sm text-[#D1E2E8]/80 font-light max-w-xl mt-3 leading-relaxed">
              Founded in 1998 in the textile heartland of Tamil Nadu, Sri Senthur Mattress crafts bespoke sleep sanctuaries with medical spine science and artisanal pride.
            </p>
          </div>
        </section>

        {/* ===================== CHAPTER 01: ORIGIN & PROVENANCE ===================== */}
        <section className="py-24 sm:py-32 bg-[#F4F8FA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Portrait & Studio Photo */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDF4F7] border border-[#D1E2E8]">
                  <Image
                    src="https://universalmattress.in/product-images/pfps3-88e1ed.webp"
                    alt="Sri Senthur Mattress master atelier"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <p className="text-[10px] font-mono text-[#3F6474]">
                  FINISHED HIGH-RESILIENCE ORTHOPEDIC CORE PRIOR TO QUILTING.
                </p>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-7 space-y-8 lg:pt-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block">
                  Company Story
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#112732] leading-[1.15]">
                  Born from a Disdain for Mass-Produced Foam.
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
                  <p>
                    In the late 1990s, the Indian bedding market was flooded with generic polyurethane foam slabs wrapped in synthetic nylon covers. These mattresses trap body heat, sag prematurely within two years, and force the human spine into unnatural sagging arcs that trigger chronic lower-back and cervical stiffness.
                  </p>
                  <p>
                    <strong>Sri Senthur Mattress</strong> was established with an uncompromising architectural thesis: a mattress is not a decorative soft cushion, but a critical orthopedic apparatus that directly governs musculoskeletal health, deep REM cycles, and daily vitality.
                  </p>
                  <p>
                    Drawing upon Tamil Nadu’s deep textile lineage, we combined indigenous natural fibers—such as organic coconut coir and botanical rubber latex—with precision high-tensile pocket coil mechanics. Over 25 years, our workshop has grown from a bespoke custom cot studio into an acclaimed manufacturer trusted by leading orthopedic surgeons and discerning residential clients.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D1E2E8] grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
                  <div>
                    <span className="block font-serif text-2xl text-[#17637D] font-bold">1998</span>
                    <span className="text-[10px] text-[#3F6474] uppercase">Founding Year</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl text-[#17637D] font-bold">50,000+</span>
                    <span className="text-[10px] text-[#3F6474] uppercase">Bespoke Pieces</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl text-[#17637D] font-bold">100%</span>
                    <span className="text-[10px] text-[#3F6474] uppercase">Indian Owned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CHAPTER 02: MATERIAL PHILOSOPHY ===================== */}
        <section className="py-24 sm:py-32 bg-[#EDF4F7] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D1E2E8] gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                  Material Integrity
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#112732] max-w-xl">
                  Four Tenets of Sleep Science
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#2E5160] max-w-md font-light leading-relaxed">
                We select raw fibers and core alloys for physiological equilibrium, environmental safety, and thermal neutrality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="border-b border-[#D1E2E8] pb-10 space-y-3">
                  <h3 className="font-serif text-2xl text-[#112732]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CHAPTER 03: THE ATELIER METHODOLOGY ===================== */}
        <section className="py-24 bg-[#F4F8FA] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-14">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                Craft Protocol
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#112732]">
                From Raw Ingot to Master Sanctuary
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodology.map((m) => (
                <div key={m.step} className="border-t border-[#D1E2E8] pt-6 space-y-2">
                  <h4 className="font-serif text-lg text-[#112732]">
                    {m.title}
                  </h4>
                  <p className="text-xs text-[#2E5160] font-light leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CHAPTER 04: MISSION & VISION ===================== */}
        <section className="py-24 sm:py-32 bg-[#EDF4F7] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D1E2E8] gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                  Purpose & Strategic Horizon
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#112732] max-w-xl">
                  Our Mission & Vision
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#2E5160] max-w-md font-light leading-relaxed">
                Guided by over two decades of ergonomic research and traditional Indian mattress craft, our guiding principles define every stitch, coil, and latex layer.
              </p>
            </div>

            {/* Mission & Vision Two-Column Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-16">
              {/* Mission Card */}
              <div className="bg-[#F4F8FA] p-8 sm:p-12 border border-[#D1E2E8] space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D1E2E8]">
                    <span className="font-mono text-xs text-[#17637D] font-bold tracking-wider">
                      OUR MISSION
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#3F6474]">
                      Everyday Commitment
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#112732] leading-snug">
                    Architecting Restorative Sleep for Every Spine
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
                    Our mission is to eliminate sleep debt and chronic musculoskeletal fatigue by engineering mattresses calibrated to the human anatomy. We reject toxic adhesives, synthetic shortcuts, and inflated middleman markups, ensuring every family receives heirloom-grade orthopedic support directly from our Bhavani, Erode workshop.
                  </p>
                </div>

                {/* Key Mission Pillars */}
                <div className="border-t border-[#D1E2E8] pt-6 space-y-3 font-mono text-xs text-[#112732]">
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Targeted 5-Zone Spine Alignment</span>

                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>100% Botanical Kerala Latex & Pollachi Coir</span>

                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Direct Factory Atelier Honesty</span>

                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-[#F4F8FA] p-8 sm:p-12 border border-[#D1E2E8] space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D1E2E8]">
                    <span className="font-mono text-xs text-[#17637D] font-bold tracking-wider">
                      OUR VISION
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#3F6474]">
                      Future Horizon
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#112732] leading-snug">
                    To Be India&apos;s Most Trusted Bespoke Sleep Atelier
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
                    We envision a future where bedrooms across the nation are recognized as personal health sanctuaries. By uniting time-honoured artisanal hand-tufting with continuous spinal research, we strive to lead the country in custom cot tailoring, zero-VOC materials, and sustainable sleep architecture.
                  </p>
                </div>

                {/* Key Vision Pillars */}
                <div className="border-t border-[#D1E2E8] pt-6 space-y-3 font-mono text-xs text-[#112732]">
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Pioneering Zero-VOC Botanical Standards</span>

                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Custom Millimetre Tailoring for Heritage Frames</span>

                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Generational 15+ Year Structural Durability</span>

                  </div>
                </div>
              </div>
            </div>

            {/* Atelier Epigraph Callout */}
            <div className="mt-14 p-8 bg-[#F4F8FA] border-l-2 border-[#17637D] border-y border-r border-[#D1E2E8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="font-serif text-lg sm:text-xl text-[#112732] italic">
                  &ldquo;A well-crafted mattress is not merely furniture—it is silent medicine that restores body and mind each night.&rdquo;
                </p>
                <p className="text-[11px] font-mono text-[#17637D] uppercase tracking-wider">
                  Sri Senthur Mattress Master Craftsmen • Bhavani, Erode Atelier
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#112732] hover:text-[#17637D] font-medium border-b border-[#112732] pb-1 transition-colors shrink-0"
              >
                <span>Explore Formulations</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
