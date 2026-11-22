"use client";

import React from "react";

export default function WhyChooseUs() {
  const principles = [
    {
      num: "01",
      title: "Botanical & Calibrated Materiality",
      detail:
        "From certified 100% natural organic latex and high-GSM Belgian jacquards to carbon-tempered Swedish coils, every component is rigorously tested for zero off-gassing and pure thermal breathability."
    },
    {
      num: "02",
      title: "Targeted 5-Zone Spine Mechanics",
      detail:
        "Calibrated counter-pressure that adapts to individual pelvic, shoulder, and lumbar weight distributions, eliminating morning stiffness and joint stress."
    },
    {
      num: "03",
      title: "Lifetime Architectural Resilience",
      detail:
        "Reinforced perimeter high-density foam encasements, hand-anchored internal tufting, and double-piped borders eliminate perimeter roll-off and guarantee decades of structural form."
    },
    {
      num: "04",
      title: "Quiet Luxury Aesthetics",
      detail:
        "Subtle tailoring, hand-stitched rosette anchors, and muted neutral colorways designed to blend harmoniously into refined master bedrooms and architect-designed sanctuaries."
    },
    {
      num: "05",
      title: "100-Night Home Sleep Trial",
      detail:
        "We believe true restorative sleep can only be judged in the intimacy of your private bedroom. Tested over 100 nights, backed by up to 15 years of factory warranty."
    }
  ];

  return (
    <section className="py-24 bg-[#F4F8FA] border-t border-[#D1E2E8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D1E2E8] gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
              02 / Atelier Principles
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#112732] max-w-xl">
              The Architecture of Restorative Sleep
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2E5160] max-w-md leading-relaxed font-light">
            Sri Senthur mattresses reject mass industrial foam cutting. Every mattress is constructed with clinical orthopedic calibration and hand-finished upholstery in our Tamil Nadu workshop.
          </p>
        </div>

        {/* Editorial Principles Grid - Asymmetrical Hairline Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12">
          {principles.map((item, idx) => (
            <div
              key={item.num}
              className={`border-b border-[#D1E2E8] pb-10 ${
                idx === 0 || idx === 1
                  ? "md:col-span-6"
                  : "md:col-span-4"
              }`}
            >
              <div className="font-mono text-xs text-[#17637D] font-semibold mb-3">
                {item.num}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#112732] mb-3">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#2E5160] leading-relaxed font-light">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
