"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import { PRODUCTS } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Formulations" },
    { id: "orthopedic", label: "Orthopedic Care" },
    { id: "hybrid", label: "Luxury Hybrid" },
    { id: "latex", label: "Natural Latex" },
    { id: "dual-comfort", label: "Dual Comfort" },
    { id: "pocket-spring", label: "Pocket Spring" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow pt-24 sm:pt-28">
        {/* ===================== CATALOGUE COVER BANNER ===================== */}
        <section className="relative min-h-[44vh] sm:min-h-[50vh] flex items-end justify-start overflow-hidden pb-12 sm:pb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2200&q=85"
              alt="Sri Senthur Mattress Collection Showcase"
              fill
              priority
              className="object-cover object-center filter brightness-[0.85]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A181F]/90 via-[#0A181F]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#D1E2E8] block mb-2">
              Atelier Catalogue • Edition 2026
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-white max-w-2xl font-normal leading-[1.1]">
              The Mattress Formulations
            </h1>
            <p className="text-xs sm:text-sm text-[#D1E2E8]/80 font-light max-w-xl mt-3 leading-relaxed">
              Every formulation is engineered around specific spinal curvature requirements, botanical breathability, and zero kinetic disturbance.
            </p>
          </div>
        </section>

        {/* ===================== MINIMAL CATEGORY FILTER ===================== */}
        <section className="bg-[#F4F8FA] border-b border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between overflow-x-auto py-5 gap-8 scrollbar-none">
              <div className="flex items-center gap-8 shrink-0">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-xs uppercase tracking-[0.16em] transition-colors relative pb-1 shrink-0 ${
                        isActive
                          ? "text-[#112732] font-semibold"
                          : "text-[#3F6474] hover:text-[#112732]"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#17637D]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <span className="text-[11px] font-mono text-[#3F6474] shrink-0 hidden md:inline">
                {filteredProducts.length} PIECES ON SHOW
              </span>
            </div>
          </div>
        </section>

        {/* ===================== PRODUCT CATALOGUE GRID ===================== */}
        <section className="py-20 sm:py-24 bg-[#F4F8FA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== BESPOKE ATELIER CALLOUT ===================== */}
        <section className="py-20 bg-[#EDF4F7] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block">
                  Bespoke Cot Tailoring Service
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#112732]">
                  Require Non-Standard Cot Dimensions?
                </h3>
                <p className="text-xs sm:text-sm text-[#2E5160] max-w-xl font-light leading-relaxed">
                  We build custom mattresses calibrated to any length, width, and depth in millimetres. Perfect for antique heirloom beds, imported European frames, or architectural built-in sleeping alcoves.
                </p>
              </div>

              <div className="lg:col-span-4 flex items-center lg:justify-end">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Sri%20Senthur%20Mattress,%20I%20need%20custom%20dimension%20tailoring%20for%20my%20bed%20frame."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#112732] text-white hover:bg-[#17637D] text-xs uppercase tracking-[0.16em] font-medium transition-colors"
                >
                  <span>Submit Custom Dimensions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
