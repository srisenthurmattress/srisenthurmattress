"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowUpRight, X, Phone, MessageSquare, MapPin } from "lucide-react";

// Register GSAP CustomEase plugin safely on client
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(CustomEase);
  } catch (e) {
    console.warn("GSAP CustomEase initialization notice:", e);
  }
}

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Initial GSAP Setup & Interactive Shape Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer
          ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`)
          : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Kinetic Menu Open / Close Animation Timeline
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" }).set(menu, { xPercent: 0 }, "<");

        // Animate Button Text Swapping: Menu -> Close
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.15 }, "<");
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, duration: 0.4 }, "<");
        }

        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "<")
          .fromTo(
            bgPanels,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" },
            "<"
          )
          .fromTo(
            menuLinks,
            { yPercent: 120, rotate: 6, autoAlpha: 0 },
            { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5, ease: "power3.out" },
            "<+=0.25"
          );

        if (fadeTargets.length) {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 30 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.05, clearProps: "all" },
            "<+=0.2"
          );
        }
      } else {
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        tl.to(overlay, { autoAlpha: 0, duration: 0.3 })
          .to(menu, { xPercent: 120, duration: 0.45, ease: "power2.in" }, "<");

        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0, duration: 0.3 }, "<");
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0, duration: 0.3 }, "<");
        }

        tl.set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Keyboard Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Standard existing navbar links
  const standardNavLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Collection", href: "/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  // Fullscreen kinetic drawer links
  const kineticNavLinks = [
    { name: "Home", href: "/", shape: "1", subtext: "Sanctuary & Engineering" },
    { name: "About Us", href: "/about", shape: "2", subtext: "Heritage, Craft & Pure Latex" },
    { name: "Collections", href: "/products", shape: "3", subtext: "Curated Mattress Formulations" },
    { name: "Gallery Archive", href: "/gallery", shape: "4", subtext: "Visual Monograph & 3D Stream" },
    { name: "Contact Atelier", href: "/contact", shape: "5", subtext: "Bhavani, Erode Workshop Direct" },
  ];

  return (
    <div ref={containerRef}>
      {/* ===================== EXISTING NAVBAR UI STYLE ===================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#F4F8FA]/98 backdrop-blur-md border-b border-[#D1E2E8] py-4 shadow-sm"
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
                className={`font-serif text-lg sm:text-xl tracking-[0.18em] uppercase transition-colors duration-300 font-semibold ${isScrolled ? "text-[#112732]" : "text-white"
                  }`}
              >
                Sri Senthur
              </span>
              <span
                className={`text-[8px] uppercase tracking-[0.3em] font-sans -mt-0.5 transition-colors duration-300 ${isScrolled ? "text-[#3F6474]" : "text-[#D1E2E8]/80"
                  }`}
              >
                Mattress Atelier
              </span>
            </div>
          </Link>

          {/* Minimal Editorial Navigation (Existing Navbar UI Style) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {standardNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-colors relative py-1 ${isScrolled
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
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#17637D]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Clean Corporate Contact & Kinetic Menu Trigger */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Newly Added Kinetic Menu Trigger Button (Matched to Existing Navbar Style) */}
            <button
              type="button"
              role="button"
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              className={`nav-close-btn flex items-center gap-2.5 px-3.5 py-2 border transition-all duration-300 cursor-pointer ${isMenuOpen
                ? "border-white bg-white text-[#112732]"
                : isScrolled
                  ? "border-[#112732] text-[#112732] hover:bg-[#112732] hover:text-white"
                  : "border-white/60 text-white hover:bg-white hover:text-[#0A181F]"
                }`}
            >
              <div className="menu-button-text">
                <p className="p-large font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">
                  Menu
                </p>
                <p className="p-large font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">
                  Close
                </p>
              </div>
              <div className="icon-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="menu-button-icon w-3.5 h-3.5"
                >
                  <path
                    d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ===================== STERLING GATE KINETIC NAVIGATION OVERLAY ===================== */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          {/* Backdrop scrim */}
          <div className="overlay" onClick={closeMenu} />

          {/* Kinetic Menu Container */}
          <nav className="menu-content">
            {/* Multi-layered sliding background curtains */}
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer third" />

              {/* Interactive Ambient Background Shapes */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Natural Latex Comfort Spheres */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 600 600" fill="none">
                  <circle className="shape-element" cx="120" cy="180" r="70" fill="rgba(23,99,125,0.35)" />
                  <circle className="shape-element" cx="440" cy="140" r="95" fill="rgba(38,133,165,0.25)" />
                  <circle className="shape-element" cx="300" cy="420" r="120" fill="rgba(209,226,232,0.18)" />
                  <circle className="shape-element" cx="500" cy="460" r="50" fill="rgba(23,99,125,0.3)" />
                </svg>

                {/* Shape 2: Spine Mechanics Harmonic Waves */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 600 600" fill="none">
                  <path
                    className="shape-element"
                    d="M0 240 Q150 120, 300 240 T 600 240"
                    stroke="rgba(38,133,165,0.35)"
                    strokeWidth="80"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 380 Q150 260, 300 380 T 600 380"
                    stroke="rgba(23,99,125,0.25)"
                    strokeWidth="50"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: 5-Zone Pocketed Coil Matrix */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 600 600" fill="none">
                  {[80, 200, 320, 440].map((x, xi) =>
                    [100, 220, 340, 460].map((y, yi) => (
                      <circle
                        key={`${xi}-${yi}`}
                        className="shape-element"
                        cx={x}
                        cy={y}
                        r={10 + ((xi + yi) % 3) * 4}
                        fill={yi % 2 === 0 ? "rgba(38,133,165,0.35)" : "rgba(209,226,232,0.28)"}
                      />
                    ))
                  )}
                </svg>

                {/* Shape 4: Ergonomic Contours */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 600 600" fill="none">
                  <path
                    className="shape-element"
                    d="M140 140 Q220 70, 300 140 Q380 210, 300 280 Q220 350, 140 280 Q60 210, 140 140"
                    fill="rgba(23,99,125,0.3)"
                  />
                  <path
                    className="shape-element"
                    d="M360 280 Q440 210, 520 280 Q600 350, 520 420 Q440 490, 360 420 Q280 350, 360 280"
                    fill="rgba(38,133,165,0.22)"
                  />
                </svg>

                {/* Shape 5: Hand-Tufting Architectural Beams */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 600 600" fill="none">
                  <line
                    className="shape-element"
                    x1="0"
                    y1="150"
                    x2="450"
                    y2="600"
                    stroke="rgba(23,99,125,0.35)"
                    strokeWidth="45"
                  />
                  <line
                    className="shape-element"
                    x1="150"
                    y1="0"
                    x2="600"
                    y2="450"
                    stroke="rgba(38,133,165,0.28)"
                    strokeWidth="35"
                  />
                  <line
                    className="shape-element"
                    x1="300"
                    y1="0"
                    x2="600"
                    y2="300"
                    stroke="rgba(209,226,232,0.2)"
                    strokeWidth="25"
                  />
                </svg>
              </div>
            </div>

            {/* Content Wrapper */}
            <div className="menu-content-wrapper">
              {/* Header Row inside Drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Image
                    src="/ssm-logo.png"
                    alt="Sri Senthur Mattress"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif tracking-[0.16em] uppercase text-sm font-semibold text-white">
                      Sri Senthur
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#D1E2E8]/70">
                      Mattress Atelier
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Kinetic Navigation Link List */}
              <div className="my-auto py-8">
                <ul className="menu-list">
                  {kineticNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.name} className="menu-list-item" data-shape={link.shape}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="nav-link w-inline-block group"
                        >
                          <div className="flex flex-col">
                            <span
                              className={`nav-link-text ${isActive ? "!text-[#2685A5]" : ""
                                }`}
                            >
                              {link.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#D1E2E8]/60 uppercase tracking-[0.2em] mt-1 group-hover:text-white transition-colors">
                              {link.subtext}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <ArrowUpRight
                              className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 ${isActive ? "!text-[#2685A5]" : ""
                                }`}
                            />
                          </div>

                          <div className="nav-link-hover-bg" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Concierge & Contact Bar inside Menu */}
              <div className="pt-6 border-t border-white/10 space-y-4" data-menu-fade>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#D1E2E8]/60 block">
                      Direct Telephony
                    </span>
                    <a
                      href="tel:+916369152486"
                      className="font-mono text-xs sm:text-sm text-white hover:text-[#2685A5] flex items-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#2685A5]" />
                      <span>+91 63691 52486</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#D1E2E8]/60 block">
                      Workshop Location
                    </span>
                    <p className="font-mono text-xs text-white/80 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#2685A5] shrink-0" />
                      <span>Mettur main road, Krishnapuram, Kuppichipalayam, Bhavani - (TK), Erode - (DT).</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="https://wa.me/916369152486"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#17637D] hover:bg-[#2685A5] text-white text-xs uppercase tracking-wider font-medium transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge Direct</span>
                  </a>

                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 border border-white/25 hover:border-white text-white text-xs uppercase tracking-wider font-medium transition-colors"
                  >
                    <span>Request Quotation</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* ===================== SCOPED STERLING GATE STYLES ===================== */}
      <style jsx>{`
        /* Trigger Button Text Rotator */
        .menu-button-text {
          height: 16px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-align: right;
        }
        .menu-button-text p {
          margin: 0;
          line-height: 16px;
          height: 16px;
          display: block;
        }

        /* Fullscreen Kinetic Overlay Structure */
        .fullscreen-menu-container {
          position: relative;
        }
        .nav-overlay-wrapper {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: none;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 24, 31, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
          z-index: 10;
        }

        /* Menu Panel Slider */
        .menu-content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(840px, 100vw);
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
        }

        /* Multi-layered Sliding Backdrop Curtains */
        .menu-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .backdrop-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .backdrop-layer.first {
          background: #17637D;
          z-index: 1;
        }
        .backdrop-layer.second {
          background: #112732;
          z-index: 2;
        }
        .backdrop-layer.third {
          background: #0A181F;
          z-index: 3;
        }

        /* Interactive Ambient Background Shapes */
        .ambient-background-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 4;
        }
        .bg-shape {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.45s cubic-bezier(0.65, 0.01, 0.05, 0.99);
        }
        .bg-shape.active {
          opacity: 1;
        }

        /* Content Container */
        .menu-content-wrapper {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 32px;
          overflow-y: auto;
        }
        @media (min-width: 640px) {
          .menu-content-wrapper {
            padding: 48px 48px;
          }
        }

        /* Navigation List & Links */
        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .menu-list-item {
          position: relative;
          overflow: hidden;
        }
        .nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 8px;
          position: relative;
          transition: all 0.3s ease;
        }
        .nav-link-text {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 600;
          color: #F4F8FA;
          margin: 0;
          transition: transform 0.35s ease, color 0.35s ease;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .nav-link:hover .nav-link-text {
          transform: translateX(10px);
          color: #2685A5;
        }
        .nav-link-hover-bg {
          position: absolute;
          inset: 0;
          background: rgba(23, 99, 125, 0.16);
          border-left: 3px solid #2685A5;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 6px;
          pointer-events: none;
        }
        .nav-link:hover .nav-link-hover-bg {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
