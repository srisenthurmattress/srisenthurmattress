"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collection", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#F4F8FA]/98 backdrop-blur-md border-b border-[#D1E2E8] py-4"
            : "bg-gradient-to-b from-[#0A181F]/70 via-[#0A181F]/30 to-transparent border-b border-white/10 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
              <Image
                src="/ssm-logo.png"
                alt="Sri Senthur Mattress"
                width={36}
                height={36}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl tracking-[0.18em] uppercase transition-colors duration-300 font-semibold ${
                  isScrolled ? "text-[#112732]" : "text-white"
                }`}
              >
                Sri Senthur
              </span>
              <span
                className={`text-[8px] uppercase tracking-[0.3em] font-sans -mt-0.5 transition-colors duration-300 ${
                  isScrolled ? "text-[#3F6474]" : "text-[#D1E2E8]/80"
                }`}
              >
                Mattress Atelier
              </span>
            </div>
          </Link>

          {/* Minimal Editorial Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-colors relative py-1 ${
                    isScrolled
                      ? isActive
                        ? "text-[#17637D] font-semibold"
                        : "text-[#112732]/75 hover:text-[#112732]"
                      : isActive
                      ? "text-white font-semibold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#17637D]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Clean Corporate Contact */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+919876543210"
              className={`text-[11px] tracking-wider font-mono transition-colors ${
                isScrolled ? "text-[#3F6474] hover:text-[#112732]" : "text-[#D1E2E8] hover:text-white"
              }`}
            >
              +91 98765 43210
            </a>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] px-4 py-2 border transition-all duration-300 ${
                isScrolled
                  ? "border-[#112732] text-[#112732] hover:bg-[#112732] hover:text-[#F4F8FA]"
                  : "border-white/60 text-white hover:bg-white hover:text-[#0A181F]"
              }`}
            >
              <span>Consultation</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className={`md:hidden p-1 transition-colors ${
              isScrolled ? "text-[#112732]" : "text-white"
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Minimal Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0A181F]/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#F4F8FA] p-8 flex flex-col justify-between border-l border-[#D1E2E8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D1E2E8]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/ssm-logo.png"
                    alt="Sri Senthur Mattress"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-serif tracking-[0.16em] uppercase text-sm font-semibold text-[#112732]">
                    Sri Senthur
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#112732] hover:opacity-70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col space-y-6">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group flex items-baseline justify-between border-b border-[#D1E2E8]/60 pb-4"
                    >
                      <span className="font-serif text-2xl text-[#112732] group-hover:text-[#17637D] transition-colors">
                        {link.name}
                      </span>
                      <span className="font-mono text-xs text-[#3F6474]">
                        0{idx + 1}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-8 border-t border-[#D1E2E8] space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#3F6474]">
                Atelier Concierge
              </p>
              <a
                href="tel:+919876543210"
                className="block font-mono text-sm text-[#112732]"
              >
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs uppercase tracking-wider text-[#17637D] font-medium"
              >
                WhatsApp Direct Inquiries &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
