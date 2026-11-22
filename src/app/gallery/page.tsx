"use client";

import React, { useState, useId, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/products";
import {
    ArrowUpRight,
    Maximize2,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from "lucide-react";

/* ── 3D Image Stream Corridor (Kinetic Perspective Stream) ── */
export type CorridorPath = {
    perspective?: number;
    cardWidth?: number;
    cardHeight?: number;
    cardRadius?: number;
    birthHeight?: number;
    exitHeight?: number;
    railBirth?: number;
    railExit?: number;
    fan?: number;
    turnBirth?: number;
    turnExit?: number;
    stops?: number;
};

// Increased corridor geometry sizes for a larger, more immersive visual experience
const ENLARGED_PATH: Required<CorridorPath> = {
    perspective: 34,
    cardWidth: 23,
    cardHeight: 30,
    cardRadius: 0.7,
    birthHeight: 3.4,
    exitHeight: 52,
    railBirth: -12,
    railExit: 46,
    fan: 3.3,
    turnBirth: 6,
    turnExit: 28,
    stops: 24,
};

function generateCorridorKeyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
    const steps: string[] = [];
    for (let s = 0; s <= p.stops; s++) {
        const u = s / p.stops;
        const scale =
            (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
        const z = p.perspective * (1 - 1 / scale);
        const rail =
            p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
        const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
        steps.push(
            `${(u * 100).toFixed(2)}% {
        transform: translate3d(${(dir * rail).toFixed(
                2
            )}cqw, 0, ${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg);
      }`
        );
    }
    return `@keyframes ${name} { ${steps.join(" ")} }`;
}

export type StreamImage = {
    src: string;
    alt?: string;
    label?: string;
};

function ImageStreamHero({
    images,
    cards = 10,
    speed = 22,
    axis = 50,
    path,
    children,
    className = "",
}: {
    images: StreamImage[];
    cards?: number;
    speed?: number;
    axis?: number;
    path?: CorridorPath;
    children?: React.ReactNode;
    className?: string;
}) {
    const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
    const right = `ish-r-${rawId}`;
    const left = `ish-l-${rawId}`;
    const card = `ish-c-${rawId}`;

    const p = useMemo(() => ({ ...ENLARGED_PATH, ...path }), [path]);

    const css = useMemo(
        () =>
            `${generateCorridorKeyframes(1, right, p)} ${generateCorridorKeyframes(-1, left, p)} ` +
            `@media (prefers-reduced-motion: reduce) { .${card} { animation-play-state: paused; } }`,
        [right, left, card, p]
    );

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ containerType: "inline-size" }}
        >
            <style>{css}</style>

            {/* 3D Corridor Perspective Stage */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    perspective: `${p.perspective}cqw`,
                    perspectiveOrigin: `50% ${axis}%`,
                }}
            >
                <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {[right, left].map((name) =>
                        Array.from({ length: cards }, (_, i) => {
                            const img = images[i % Math.max(images.length, 1)];
                            return (
                                <div
                                    key={`${name}-${i}`}
                                    className={`${card} absolute overflow-hidden shadow-xl border border-[#D1E2E8] rounded-md bg-[#EDF4F7]`}
                                    style={{
                                        left: "50%",
                                        top: `${axis}%`,
                                        width: `${p.cardWidth}cqw`,
                                        height: `${p.cardHeight}cqw`,
                                        marginLeft: `${-p.cardWidth / 2}cqw`,
                                        marginTop: `${-p.cardHeight / 2}cqw`,
                                        borderRadius: `${p.cardRadius}cqw`,
                                        animation: `${name} ${speed}s linear infinite`,
                                        animationDelay: `${-(i * speed) / cards}s`,
                                        backfaceVisibility: "hidden",
                                    }}
                                >
                                    {img && (
                                        <img
                                            src={img.src}
                                            alt={img.alt ?? "Sri Senthur Mattress Atelier"}
                                            loading="eager"
                                            decoding="async"
                                            className="h-full w-full object-cover"
                                            draggable={false}
                                        />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {children}
        </div>
    );
}

/* ── Gallery Item Type ── */
interface GalleryItem {
    id: string;
    title: string;
    tagline: string;
    image: string;
    colorway: string;
    fabric: string;
    category: string;
    categoryLabel: string;
    productId: string;
}

export default function GalleryPage() {
    const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

    // Compile clean gallery listout items from all products and colorways
    const galleryItems: GalleryItem[] = useMemo(() => {
        const items: GalleryItem[] = [];

        PRODUCTS.forEach((product) => {
            product.colors.forEach((color, idx) => {
                items.push({
                    id: `${product.id}-${idx}`,
                    title: product.name,
                    tagline: product.tagline,
                    image: color.image,
                    colorway: color.name,
                    fabric: color.fabric,
                    category: product.category,
                    categoryLabel: product.categoryLabel,
                    productId: product.id,
                });
            });
        });

        // Master sanctuary and craft photography
        items.push({
            id: "sanctuary-residence-01",
            title: "Master Suite Sanctuary",
            tagline: "Architectural Residence Installation in Coimbatore",
            image: "https://www.sleepsia.in/cdn/shop/files/Family_Pillow_Set_1.webp?v=1765520601",
            colorway: "Oatmeal Linen",
            fabric: "Belgian Damask",
            category: "hybrid",
            categoryLabel: "Master Sanctuary",
            productId: "royal-indulgence-hybrid",
        });

        items.push({
            id: "atelier-craft-01",
            title: "Hand-Tufting Workshop Joinery",
            tagline: "Orthopedic Core Inspection at Tiruppur Workshop",
            image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=80",
            colorway: "Natural Canvas",
            fabric: "South Indian Organic Cotton",
            category: "orthopedic",
            categoryLabel: "Atelier Craft",
            productId: "spinealign-dual-comfort",
        });

        return items;
    }, []);

    // Corridor 3D stream images
    const streamImages: StreamImage[] = useMemo(() => {
        return galleryItems.map((item) => ({
            src: item.image,
            alt: `${item.title} — ${item.colorway}`,
            label: item.title,
        }));
    }, [galleryItems]);

    // Lightbox navigation
    const openLightbox = (index: number) => setActiveLightboxIndex(index);
    const closeLightbox = () => setActiveLightboxIndex(null);

    const prevLightbox = () => {
        if (activeLightboxIndex === null) return;
        setActiveLightboxIndex(
            (activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length
        );
    };

    const nextLightbox = () => {
        if (activeLightboxIndex === null) return;
        setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeLightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevLightbox();
            if (e.key === "ArrowRight") nextLightbox();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeLightboxIndex, galleryItems.length]);

    const activeItem =
        activeLightboxIndex !== null ? galleryItems[activeLightboxIndex] : null;

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
            <Header />

            <main className="flex-grow pt-16 sm:pt-20">
                {/* ===================== ENLARGED 3D PERSPECTIVE STREAM ANIMATION SECTION ===================== */}
                <section className="relative bg-[#F4F8FA] text-[#112732] border-b border-[#D1E2E8]">
                    <ImageStreamHero
                        images={streamImages}
                        cards={11}
                        speed={22}
                        axis={54}
                        className="min-h-[84vh] sm:min-h-[88vh] lg:min-h-[92vh] w-full flex flex-col items-center justify-start bg-[#F4F8FA]"
                    >
                        {/* Subtle Edge Transitions Matching #F4F8FA with Crystal Clear Image Center */}
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F4F8FA] to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F4F8FA] to-transparent pointer-events-none" />

                        {/* Top-Center Editorial Title Overlay */}
                        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col items-center text-center pt-8 sm:pt-12 lg:pt-16 pb-4">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#112732] max-w-4xl leading-[1.1] font-normal tracking-tight">
                                The Architecture of Pure Rest
                            </h1>
                        </div>
                    </ImageStreamHero>
                </section>

                {/* ===================== STYLISH EDITORIAL IMAGE GRID VIEW ===================== */}
                <section id="gallery-grid" className="py-20 sm:py-28 bg-[#F4F8FA]">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-[#D1E2E8] gap-4">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-1">
                                    Atelier Archive
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-serif text-[#112732]">
                                    Curated Mattress Compositions
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-[#3F6474] font-mono">
                                {galleryItems.length} Photographs • Tap to Expand
                            </p>
                        </div>

                        {/* Dynamic Asymmetric Editorial Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
                            {galleryItems.map((item, idx) => {
                                const patternIdx = idx % 12;

                                // Editorial rhythm configuration summing to 12 cols per row
                                let colSpan = "lg:col-span-4 md:col-span-1";
                                let heightClass = "h-[380px] sm:h-[420px]";

                                if (patternIdx === 0) {
                                    colSpan = "lg:col-span-8 md:col-span-2";
                                    heightClass = "h-[380px] sm:h-[480px]";
                                } else if (patternIdx === 1) {
                                    colSpan = "lg:col-span-4 md:col-span-2";
                                    heightClass = "h-[380px] sm:h-[480px]";
                                } else if (patternIdx === 2 || patternIdx === 3 || patternIdx === 4) {
                                    colSpan = "lg:col-span-4 md:col-span-1";
                                    heightClass = "h-[360px] sm:h-[420px]";
                                } else if (patternIdx === 5 || patternIdx === 6) {
                                    colSpan = "lg:col-span-6 md:col-span-1";
                                    heightClass = "h-[380px] sm:h-[440px]";
                                } else if (patternIdx === 7) {
                                    colSpan = "lg:col-span-4 md:col-span-2";
                                    heightClass = "h-[380px] sm:h-[480px]";
                                } else if (patternIdx === 8) {
                                    colSpan = "lg:col-span-8 md:col-span-2";
                                    heightClass = "h-[380px] sm:h-[480px]";
                                } else {
                                    colSpan = "lg:col-span-4 md:col-span-1";
                                    heightClass = "h-[360px] sm:h-[420px]";
                                }

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => openLightbox(idx)}
                                        className={`group relative overflow-hidden bg-[#EDF4F7] border border-[#D1E2E8] cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-500 rounded-sm ${colSpan} ${heightClass}`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={`${item.title} - ${item.colorway}`}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
                                        />

                                        {/* Top Subtle Label & Expand Button */}
                                        <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
                                            <span className="text-[9px] uppercase tracking-[0.22em] font-mono bg-[#0A181F]/80 text-[#D1E2E8] px-3 py-1 backdrop-blur-md border border-white/10">
                                                {item.categoryLabel}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white/95 text-[#112732] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                                                <Maximize2 className="w-3.5 h-3.5 text-[#17637D]" />
                                            </div>
                                        </div>

                                        {/* Gradient Overlay with Title and Texts Only */}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A181F]/95 via-[#0A181F]/45 to-transparent p-5 sm:p-7 pt-20 text-white flex flex-col justify-end transition-all duration-300">
                                            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal leading-tight text-white group-hover:text-[#2685A5] transition-colors">
                                                {item.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5 text-xs font-mono text-[#D1E2E8]/90">
                                                <span className="font-medium text-white">{item.colorway}</span>
                                                <span>•</span>
                                                <span>{item.fabric}</span>
                                            </div>

                                            <p className="text-[11px] sm:text-xs text-[#D1E2E8]/75 font-light mt-1.5 line-clamp-2 leading-relaxed">
                                                {item.tagline}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ===================== INTERACTIVE FULL-RESOLUTION LIGHTBOX ===================== */}
                {activeItem && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A181F]/90 backdrop-blur-md p-4 sm:p-6 lg:p-10"
                        onClick={closeLightbox}
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[92vh] bg-[#F4F8FA] border border-[#D1E2E8] shadow-2xl flex flex-col lg:flex-row overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={closeLightbox}
                                aria-label="Close photo preview"
                                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#112732] text-white hover:bg-[#17637D] flex items-center justify-center transition-colors shadow-md"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Main Image View */}
                            <div className="lg:w-3/5 bg-[#EDF4F7] relative flex items-center justify-center min-h-[42vh] lg:min-h-[65vh]">
                                <div className="relative w-full h-full min-h-[380px] lg:min-h-[580px]">
                                    <Image
                                        src={activeItem.image}
                                        alt={`${activeItem.title} - ${activeItem.colorway}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        priority
                                    />
                                </div>

                                {/* Left/Right Slide Controls */}
                                <button
                                    type="button"
                                    onClick={prevLightbox}
                                    aria-label="Previous photograph"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#112732] hover:bg-white hover:text-[#17637D] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextLightbox}
                                    aria-label="Next photograph"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#112732] hover:bg-white hover:text-[#17637D] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-4 left-4 z-10 bg-[#0A181F]/80 backdrop-blur-sm text-white px-3 py-1 font-mono text-[10px]">
                                    Frame {(activeLightboxIndex ?? 0) + 1} of {galleryItems.length}
                                </div>
                            </div>

                            {/* Dossier Side Panel */}
                            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[85vh]">
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-1">
                                            {activeItem.categoryLabel}
                                        </span>
                                        <h3 className="font-serif text-2xl sm:text-3xl text-[#112732]">
                                            {activeItem.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#2E5160] font-light mt-2 leading-relaxed">
                                            {activeItem.tagline}
                                        </p>
                                    </div>

                                    {/* Detail Row */}
                                    <div className="border-t border-b border-[#D1E2E8] py-4 space-y-2.5 font-mono text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#3F6474]">COLORWAY:</span>
                                            <span className="text-[#112732] font-semibold">{activeItem.colorway}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#3F6474]">FABRIC WEAVE:</span>
                                            <span className="text-[#112732] font-semibold">{activeItem.fabric}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
