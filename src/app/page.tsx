"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import LifestyleSection from "@/components/LifestyleSection";
import CTASection from "@/components/CTASection";
import { PRODUCTS } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow">
        {/* ===================== CINEMATIC EDITORIAL HERO ===================== */}
        <section className="relative min-h-[96vh] flex items-end justify-start overflow-hidden pb-16 sm:pb-24 pt-32">
          {/* Large Cinematic Master Bedroom Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=85"
              alt="Sri Senthur Mattress — Art of Rest"
              fill
              priority
              className="object-cover object-center filter brightness-[0.82] contrast-[1.05]"
              sizes="100vw"
            />
            {/* Cinematic Editorial Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A181F]/90 via-[#0A181F]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A181F]/60 via-transparent to-transparent" />
          </div>

          {/* Hero Content — Luxury Campaign Typography */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-mono text-[#D1E2E8]">
                <span>Sri Senthur Atelier</span>
                <span className="text-[#2685A5]">•</span>
                <span>Tamil Nadu, India</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-normal leading-[1.05] tracking-tight">
                Sleep is an Art. <br />
                <span className="italic font-light text-[#D1E2E8]">Comfort is Our Craft.</span>
              </h1>

              <p className="text-xs sm:text-base text-[#D1E2E8]/80 font-light max-w-xl leading-relaxed">
                Handcrafted orthopedic mattresses, botanical organic latex, and pocketed coil systems calibrated specifically for posture equilibrium and lifetime rejuvenation.
              </p>
            </div>

            {/* Micro Stats Bar */}
            <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-left font-mono">
              <div>
                <span className="block text-xl sm:text-2xl font-serif text-[#2685A5]">100%</span>
                <span className="text-[10px] tracking-wider text-[#D1E2E8]/70 uppercase">Natural Raw Botanical Core</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif text-[#2685A5]">25+ Yrs</span>
                <span className="text-[10px] tracking-wider text-[#D1E2E8]/70 uppercase">Master Spine Craftsmanship</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif text-[#2685A5]">100 Nights</span>
                <span className="text-[10px] tracking-wider text-[#D1E2E8]/70 uppercase">In-Home Sanctuary Trial</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif text-[#2685A5]">50,000+</span>
                <span className="text-[10px] tracking-wider text-[#D1E2E8]/70 uppercase">Restful Indian Sleepers</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 01 / BRAND INTRODUCTION ===================== */}
        <section className="py-24 sm:py-32 bg-[#F4F8FA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Asymmetrical Photo Collage */}
              <div className="lg:col-span-6 relative space-y-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDF4F7] border border-[#D1E2E8]">
                  <Image
                    src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=80"
                    alt="Sri Senthur Mattress atelier craftsmanship"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <p className="text-[10px] font-mono text-[#3F6474]">
                  STUDIO ARCHIVE NO. 08 — CLINICAL SPINAL POSTURE ASSESSMENT, TIRUPPUR ATELIER.
                </p>
              </div>

              {/* Narrative Content */}
              <div className="lg:col-span-6 space-y-8 lg:pt-4">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block">
                    01 / Brand Introduction
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif text-[#112732] leading-[1.15]">
                    Reverence for Human Anatomy and Natural Equilibrium.
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
                  <p>
                    Founded in 1998, <strong>Sri Senthur Mattress</strong> rejected the prevailing industrial practice of gluing synthetic poly-foam blocks. We recognized that true therapeutic rejuvenation requires zoned spinal counter-force, breathable botanical fibers, and zero chemical off-gassing.
                  </p>
                  <p>
                    Every formulation is constructed in our Tamil Nadu workshop. We pair natural organic rubber latex from Pollachi plantations with Swedish tempered carbon steel coils and Belgian damask ticking—hand-tufted to prevent shift and sag over decades of nightly rest.
                  </p>
                </div>

                {/* Editorial Checklist */}
                <div className="border-t border-[#D1E2E8] pt-6 space-y-3 font-mono text-xs text-[#112732]">
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Targeted 5-Zone Cervical & Lumbar Support</span>
                    <span className="text-[#17637D] font-bold">&check;</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Organic Belgian Jacquards (Zero Toxic VOCs)</span>
                    <span className="text-[#17637D] font-bold">&check;</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#D1E2E8]/60">
                    <span>Custom Millimetre Tailoring for Heritage Bed Frames</span>
                    <span className="text-[#17637D] font-bold">&check;</span>
                  </div>
                </div>

                <div>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#112732] hover:text-[#17637D] font-medium border-b border-[#112732] pb-1 transition-colors"
                  >
                    <span>Read The Company Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== FEATURED PRODUCTS CATALOGUE ===================== */}
        <section className="py-24 sm:py-32 bg-[#EDF4F7] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#D1E2E8] gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                  Curated Catalog • Flagship Formulations
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#112732]">
                  Selected Mattress Collections
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#17637D] hover:text-[#112732] font-medium transition-colors"
              >
                <span>View All Collections ({PRODUCTS.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Product Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== WHY CHOOSE US ===================== */}
        <WhyChooseUs />

        {/* ===================== LIFESTYLE / SANCTUARY STUDY ===================== */}
        <LifestyleSection />

        {/* ===================== WORDS OF REST (EDITORIAL CLIENT TESTIMONIALS) ===================== */}
        <section className="py-24 bg-[#F4F8FA] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-14">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                04 / Client Impressions
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#112732]">
                Words on Restorative Awakening
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="border-t border-[#D1E2E8] pt-6 space-y-3">
                <p className="font-mono text-[11px] text-[#17637D]">
                  DR. S. MEENAKSHI • ORTHOPEDIC CONSULTANT
                </p>
                <p className="text-xs sm:text-sm text-[#2E5160] font-serif italic leading-relaxed">
                  &ldquo;I have recommended Sri Senthur’s Celestial Orthopedic formulation to patients recovering from chronic lumbar strain. The 5-zone rebonded core maintains clinical horizontal alignment throughout the night.&rdquo;
                </p>
                <p className="text-[10px] font-mono text-[#3F6474]">
                  COIMBATORE • CELESTIAL ORTHOPEDIC (KING)
                </p>
              </div>

              <div className="border-t border-[#D1E2E8] pt-6 space-y-3">
                <p className="font-mono text-[11px] text-[#17637D]">
                  R. VENKATESH • ARCHITECT & RESIDENTIAL DESIGNER
                </p>
                <p className="text-xs sm:text-sm text-[#2E5160] font-serif italic leading-relaxed">
                  &ldquo;When furnishing luxury villas in Ooty and Bangalore, we require custom dimensional tailoring without compromising internal coil mechanics. Sri Senthur builds bespoke mattresses with immaculate tailoring.&rdquo;
                </p>
                <p className="text-[10px] font-mono text-[#3F6474]">
                  BANGALORE • BESPOKE HYBRID COT
                </p>
              </div>

              <div className="border-t border-[#D1E2E8] pt-6 space-y-3">
                <p className="font-mono text-[11px] text-[#17637D]">
                  PRIYA & KARTHIK ANAND • CHENNAI RESIDENCE
                </p>
                <p className="text-xs sm:text-sm text-[#2E5160] font-serif italic leading-relaxed">
                  &ldquo;The motion isolation on the Swedish pocket springs is astonishing. One partner rising early never disturbs the other. The cooling latex layer remains remarkably temperate in coastal humidity.&rdquo;
                </p>
                <p className="text-[10px] font-mono text-[#3F6474]">
                  CHENNAI • ROYAL INDULGENCE HYBRID
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 05: YOUTUBE ATELIER DOCUMENTARIES ===================== */}
        <section className="py-24 sm:py-32 bg-[#EDF4F7] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D1E2E8] gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                  05 / Cinema & Sleep Science
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#112732] max-w-xl">
                  Glimpse Inside Our Atelier
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#2E5160] max-w-md font-light leading-relaxed">
                Step behind closed workshop doors. Explore the physiological science, hand-tufting joinery, and pure organic botanicals behind every Sri Senthur mattress formulation.
              </p>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-12">
              {[
                {
                  id: "video-1",
                  title: "The Art of Hand-Tufted Mattress Craftsmanship",
                  category: "Atelier Documentaries",
                  badge: "Workshop Craft • 04:30 Min",
                  embedUrl: "https://www.youtube-nocookie.com/embed/jfKfPfyJRdk",
                  watchUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
                  description:
                    "Witness master craftsmen hand-tuft internal rebonded cores, Swedish pocket coils, and organic Belgian damask covers with surgical precision.",
                },
                {
                  id: "video-2",
                  title: "5-Zone Spinal Ergonomics & Clinical Motion Isolation",
                  category: "Sleep Science",
                  badge: "Orthopedic Study • 05:45 Min",
                  embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
                  watchUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  description:
                    "A clinical exploration of how zoned resistance eliminates hip and lumbar sinking, preserving natural horizontal spinal alignment all night.",
                },
                {
                  id: "video-3",
                  title: "100% Pure Botanical Kerala Latex Extraction",
                  category: "Raw Material Integrity",
                  badge: "Estate Harvest • 03:20 Min",
                  embedUrl: "https://www.youtube-nocookie.com/embed/2Vv-BfVoq4g",
                  watchUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
                  description:
                    "Travel to South Indian rubber plantations to see how pure sap is harvested, whipped into micro-cellular foam, and cured without toxic chemicals.",
                },
              ].map((video) => (
                <article
                  key={video.id}
                  className="bg-[#F4F8FA] border border-[#D1E2E8] p-5 sm:p-6 flex flex-col justify-between group hover:border-[#17637D] transition-colors"
                >
                  <div className="space-y-4">
                    {/* Responsive 16:9 Video Embed Frame */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A181F] border border-[#D1E2E8]">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full object-cover border-0"
                      />
                    </div>

                    {/* Metadata & Tag */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#17637D] font-semibold">
                        {video.category}
                      </span>
                      <span className="text-[9px] font-mono text-[#3F6474] bg-[#EDF4F7] px-2 py-0.5 border border-[#D1E2E8]">
                        {video.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#112732] group-hover:text-[#17637D] transition-colors leading-snug">
                      {video.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#2E5160] font-light leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 border-t border-[#D1E2E8]/60 mt-6">
                    <a
                      href={video.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#17637D] hover:text-[#112732] font-medium transition-colors"
                    >
                      <span>Watch Full Film on YouTube</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Atelier YouTube Channel Banner */}
            <div className="mt-14 p-8 bg-[#F4F8FA] border-l-2 border-[#17637D] border-y border-r border-[#D1E2E8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#17637D] block font-semibold">
                  Official Atelier Broadcasts
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#112732]">
                  Subscribe for weekly sleep hygiene documentaries, mattress care guides & factory walkthroughs.
                </p>
              </div>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#112732] text-white hover:bg-[#17637D] text-xs uppercase tracking-[0.16em] font-medium transition-colors shrink-0 shadow-sm"
              >
                <span>Visit YouTube Channel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ===================== FINAL ATELIER CTA ===================== */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
