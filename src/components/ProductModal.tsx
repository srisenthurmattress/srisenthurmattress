"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductColor, SIZES } from "@/data/products";
import { X, Check, ArrowUpRight, MessageSquare, ShieldCheck, Clock } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("King");

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];
  const activeImage = activeColor ? activeColor.image : product.colors[0]?.image;

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Sri Senthur Mattress, I am inquiring about "${product.name}" in ${selectedSize} size with "${activeColor?.name}" fabric styling. Please provide a formal quotation and delivery schedule.`
    );
    window.open(`https://wa.me/916369152486?text=${text}`, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#0A181F]/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#F4F8FA] border border-[#D1E2E8] shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Close Button */}
        <button
          onClick={onClose}
          aria-label="Close presentation"
          className="absolute top-4 right-4 z-20 p-2 text-[#112732] hover:text-[#17637D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Architectural Photo Showcase */}
        <div className="md:w-1/2 bg-[#EDF4F7] p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D1E2E8]">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#3F6474] uppercase tracking-wider mb-4">
              <span>{product.categoryLabel}</span>
              <span>{product.height}</span>
            </div>

            <div className="relative aspect-[16/11] w-full overflow-hidden bg-white border border-[#D1E2E8] mb-6">
              <Image
                key={activeImage}
                src={activeImage}
                alt={`${product.name} in ${activeColor?.name}`}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Colour Swatches & Fabric Note */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474] mb-2.5">
                Fabric Specification: <span className="text-[#112732] font-semibold">{activeColor?.name}</span> ({activeColor?.fabric})
              </p>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = activeColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`relative w-7 h-7 rounded-full border transition-all ${
                        isSelected
                          ? "ring-2 ring-[#17637D] scale-110 border-white shadow-sm"
                          : "border-[#D1E2E8] opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-[11px] font-mono text-[#3F6474]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#17637D]" />
              {product.warranty}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#17637D]" />
              {product.trial}
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Specifications & Inquiries */}
        <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#112732]">
                {product.name}
              </h2>
              <p className="text-xs text-[#3F6474] font-serif italic mt-1">
                {product.tagline}
              </p>
              <div className="mt-3 font-serif text-2xl text-[#112732] font-semibold">
                {product.startingPrice}
                <span className="text-xs font-sans text-[#3F6474] font-normal ml-2">
                  (Starting Base Rate)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#2E5160] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Select Bed Dimensions */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474] mb-2.5">
                Select Calibrated Cot Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SIZES.map((sizeOption) => (
                  <button
                    key={sizeOption.label}
                    type="button"
                    onClick={() => setSelectedSize(sizeOption.label)}
                    className={`py-2 px-3 text-left border transition-all ${
                      selectedSize === sizeOption.label
                        ? "border-[#17637D] bg-[#EDF4F7] text-[#112732] font-semibold"
                        : "border-[#D1E2E8] bg-transparent text-[#2E5160] hover:border-[#3F6474]"
                    }`}
                  >
                    <div className="text-xs">{sizeOption.label}</div>
                    <div className="text-[10px] font-mono text-[#3F6474] truncate">
                      {sizeOption.dimensions}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Layer Highlights */}
            <div className="border-t border-[#D1E2E8] pt-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#3F6474] mb-2">
                Key Architectural Attributes
              </h4>
              <ul className="space-y-1.5 text-xs text-[#2E5160]">
                {product.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#17637D] font-mono text-[11px]">&bull;</span>
                    <span className="font-light">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 space-y-2.5">
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3 bg-[#112732] text-white hover:bg-[#17637D] text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Inquire on WhatsApp</span>
            </button>

            <Link
              href={`/products/${product.id}`}
              onClick={onClose}
              className="w-full py-2.5 border border-[#112732] text-[#112732] hover:bg-[#112732] hover:text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Examine Complete Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
