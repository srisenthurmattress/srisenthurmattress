"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration = 0.3,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== 0 && cursor.y !== 0) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage.toFixed(2)}%`,
        cy: `${cyPercentage.toFixed(2)}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 520 80"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer w-full", className)}
    >
      <defs>
        {/* Luxury Teal Shimmer Gradient */}
        <linearGradient
          id="senthurTextGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#EDF4F7" />
          <stop offset="25%" stopColor="#17637D" />
          <stop offset="50%" stopColor="#D1E2E8" />
          <stop offset="75%" stopColor="#2685A5" />
          <stop offset="100%" stopColor="#3F6474" />
        </linearGradient>

        {/* Dynamic Spotlight Radial Mask */}
        <radialGradient
          id="senthurRevealMask"
          gradientUnits="userSpaceOnUse"
          r="24%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
          style={{ transition: `cx ${duration}s ease-out, cy ${duration}s ease-out` }}
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>

        <mask id="senthurTextMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#senthurRevealMask)"
          />
        </mask>
      </defs>

      {/* Subtle Ghost Outline */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent stroke-[#EDF4F7]/10 font-serif text-4xl sm:text-5xl font-bold tracking-[0.2em] transition-opacity duration-500"
        style={{ opacity: hovered ? 0.35 : 0.15 }}
      >
        {text}
      </text>

      {/* Brand Accent Stroke */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#17637D]/50 font-serif text-4xl sm:text-5xl font-bold tracking-[0.2em] transition-all duration-700"
      >
        {text}
      </text>

      {/* Shimmer Fill Masked to Cursor Spotlight */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#senthurTextGradient)"
        strokeWidth="0.45"
        fill="url(#senthurTextGradient)"
        mask="url(#senthurTextMask)"
        className="font-serif text-4xl sm:text-5xl font-bold tracking-[0.2em]"
      >
        {text}
      </text>
    </svg>
  );
};

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0A181F] text-[#F4F8FA] border-t border-[#1C3B49]">
      {/* Primary Footer Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image
                  src="/ssm-logo.png"
                  alt="Sri Senthur Mattress"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain brightness-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-[0.16em] uppercase text-white font-semibold">
                  Sri Senthur
                </span>
                <span className="text-[8px] uppercase tracking-[0.28em] text-[#2685A5] -mt-0.5">
                  Mattress Atelier
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-[#D1E2E8]/70 leading-relaxed max-w-sm font-light">
              Architects of therapeutic rest. Handcrafted orthopedic mattresses,
              natural latex cores, and calibrated pocket springs built with
              uncompromising structural integrity in Tamil Nadu, India.
            </p>
            <p className="text-[11px] font-mono text-[#3F6474]">
              ESTABLISHED 1998 • ATELIER NO. 42
            </p>

            {/* Atelier Social Media Channels */}
            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#2685A5] block mb-3">
                Atelier Channels
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sri Senthur Mattress on Instagram"
                  title="Follow on Instagram"
                  className="w-9 h-9 border border-[#16303D] bg-[#0E202A] text-[#D1E2E8] hover:text-white hover:border-[#2685A5] hover:bg-[#17637D]/25 flex items-center justify-center transition-all duration-300 group"
                >
                  <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sri Senthur Mattress on YouTube"
                  title="Watch on YouTube"
                  className="w-9 h-9 border border-[#16303D] bg-[#0E202A] text-[#D1E2E8] hover:text-white hover:border-[#2685A5] hover:bg-[#17637D]/25 flex items-center justify-center transition-all duration-300 group"
                >
                  <YoutubeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sri Senthur Mattress on Facebook"
                  title="Follow on Facebook"
                  className="w-9 h-9 border border-[#16303D] bg-[#0E202A] text-[#D1E2E8] hover:text-white hover:border-[#2685A5] hover:bg-[#17637D]/25 flex items-center justify-center transition-all duration-300 group"
                >
                  <FacebookIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Collection Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#2685A5]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/products/celestial-orthopedic"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Celestial Orthopedic
                </Link>
              </li>
              <li>
                <Link
                  href="/products/royal-indulgence-hybrid"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Royal Indulgence Hybrid
                </Link>
              </li>
              <li>
                <Link
                  href="/products/serene-natural-latex"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Serene Natural Latex
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  View All Formulations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Atelier */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#2685A5]">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link
                  href="/about#craftsmanship"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Spine Alignment Science
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Bespoke Cot Sizing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#D1E2E8]/80 hover:text-white transition-colors"
                >
                  Concierge Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Concierge & Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#2685A5]">
              Direct Inquiries
            </h4>
            <p className="text-xs text-[#D1E2E8]/70 font-light">
              Direct consultation with our sleep engineers for custom dimensions or contract orders.
            </p>
            <div className="space-y-1 text-xs">
              <a
                href="tel:+919876543210"
                className="block font-mono text-white hover:text-[#2685A5] transition-colors"
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:srisenthurmattress@gmail.com"
                className="block text-[#D1E2E8]/80 hover:text-white transition-colors"
              >
                srisenthurmattress@gmail.com
              </a>
              <p className="text-[#3F6474] text-[11px] pt-1">
                Atelier Workshop: Tiruppur - Coimbatore Highway, Tamil Nadu
              </p>
            </div>

            {/* Subtle Minimal Form */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="relative flex items-center border-b border-[#2E5160] focus-within:border-[#17637D] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Join our private client register"
                  className="w-full bg-transparent py-2 text-xs text-white placeholder-[#3F6474] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="text-[#2685A5] hover:text-white transition-colors p-1"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-[#2685A5] font-mono mt-1">
                  Thank you. Your address is registered.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Interactive Text Gradient Display */}
      <div className="relative border-t border-[#16303D] py-8 sm:py-12 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-center">
          <TextHoverEffect text="SRI SENTHUR MATTRESS" className="h-16 sm:h-24 md:h-32 w-full max-w-5xl" />
        </div>
      </div>

      {/* Bottom Legal Sub-Footer */}
      <div className="border-t border-[#16303D] py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#3F6474]">
          <p>© {new Date().getFullYear()} SRI SENTHUR MATTRESS ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span>/</span>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
            <span>/</span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <span>/</span>
            <Link
              href="/privacy-policy"
              className="hover:text-[#D1E2E8] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>/</span>
            <Link
              href="/terms"
              className="hover:text-[#D1E2E8] transition-colors"
            >
              Terms & Conditions
            </Link>
            <span>/</span>
            <span>Crafted in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
