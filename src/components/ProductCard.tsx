"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  const displayImage = product.colors[activeColorIdx]?.image || product.colors[0]?.image;

  return (
    <article className="group flex flex-col justify-between border-b border-[#D1E2E8] pb-10 transition-colors">
      <div>
        {/* Product Image Frame - Links directly to Product Detail Page */}
        <Link
          href={`/products/${product.id}`}
          className="cursor-pointer block relative aspect-[16/11] w-full overflow-hidden bg-[#EDF4F7]"
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Minimal Category & Spec Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono bg-[#0A181F]/90 text-white px-2.5 py-1">
              {product.categoryLabel}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="text-[10px] uppercase tracking-[0.16em] font-mono bg-[#F4F8FA]/90 text-[#112732] px-2.5 py-1 border border-[#D1E2E8]">
              {product.height.split(" ")[0]} {product.height.split(" ")[1]}
            </span>
          </div>

          {/* Minimal Swatches Strip */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#0A181F]/70 backdrop-blur-sm px-2.5 py-1.5 z-10">
            {product.colors.map((color, idx) => (
              <button
                type="button"
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveColorIdx(idx);
                }}
                title={color.name}
                className={`w-2.5 h-2.5 rounded-full border transition-transform ${
                  activeColorIdx === idx
                    ? "scale-125 border-white ring-1 ring-[#17637D]"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </Link>

        {/* Product Details Header */}
        <div className="pt-6 space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <Link
              href={`/products/${product.id}`}
              className="text-xl sm:text-2xl font-serif text-[#112732] group-hover:text-[#17637D] transition-colors"
            >
              {product.name}
            </Link>
            <span className="font-serif text-lg text-[#112732] font-semibold flex-shrink-0">
              {product.startingPrice}
            </span>
          </div>

          <p className="text-xs text-[#3F6474] font-serif italic">
            {product.tagline}
          </p>

          <p className="text-xs text-[#2E5160] leading-relaxed line-clamp-2 pt-1 font-light">
            {product.description}
          </p>

          {/* Technical Spec Row */}
          <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#3F6474] border-t border-[#D1E2E8]/60 mt-4">
            <span>FIRMNESS: {product.firmness.split(" ")[0]} ({product.firmnessScore}/10)</span>
            <span>{product.warranty.split(" ")[0]} {product.warranty.split(" ")[1]} GUARANTEE</span>
          </div>
        </div>
      </div>

      {/* Action Button - Direct navigation to Product Detail Page */}
      <div className="pt-6">
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#17637D] text-white hover:bg-[#112732] text-xs uppercase tracking-[0.16em] font-medium transition-colors w-full justify-center group/btn shadow-sm"
        >
          <span>View Product Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
