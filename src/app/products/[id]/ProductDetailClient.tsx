"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS, Product, ProductColor, SIZES } from "@/data/products";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  Truck,
  Check,
  Phone,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  BedDouble,
  Heart,
  Share2,
  Maximize2,
} from "lucide-react";

export type StockBySize = { [size: string]: number };

export type MattressView = {
  src: string;
  label?: string;
  focus?: [number, number];
  zoom?: number;
  mirror?: boolean;
};

export type MattressVariant = {
  name: string;
  swatch: string;
  tint?: string;
  src: string;
  fabric?: string;
  gallery?: MattressView[];
  soldOut?: string[];
  stock?: StockBySize;
};

export type MattressSize = {
  label: string;
  dimensions?: string;
  soldOut?: boolean;
  price?: number;
  rating?: number;
  reviews?: number;
  stock?: number;
};

const STAR = "M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z";
const HEART_PATH =
  "M12 20.3l-1.4-1.3C5.4 14.3 2 11.2 2 7.4 2 4.4 4.4 2 7.4 2c1.7 0 3.4.8 4.6 2.1C13.2 2.8 14.9 2 16.6 2 19.6 2 22 4.4 22 7.4c0 3.8-3.4 6.9-8.6 11.6z";

const FRAMINGS: Omit<MattressView, "src">[] = [
  { label: "Master Suite Profile" },
  { label: "Damask Comfort Quilting", focus: [0.5, 0.35], zoom: 2.1 },
  { label: "Reinforced Edge Support", focus: [0.25, 0.75], zoom: 2.0 },
  { label: "Ergonomic Alignment Layer", focus: [0.75, 0.45], zoom: 1.9 },
  { label: "Jacquard Fabric Texture", focus: [0.5, 0.55], zoom: 2.4 },
  { label: "Opposite Perspective", mirror: true },
];

export function focusPosition(f: number, z: number) {
  if (z <= 1) return 50;
  const p = (f * z - 0.5) / (z - 1);
  return Math.round(Math.min(1, Math.max(0, p)) * 1000) / 10;
}

export function sizeStats(
  size: { price?: number; rating?: number; reviews?: number } | undefined,
  base: { price: number; rating: number; reviews: number }
) {
  return {
    price: size?.price ?? base.price,
    rating: Math.min(5, Math.max(0, size?.rating ?? base.rating)),
    reviews: size?.reviews ?? base.reviews,
  };
}

export function availability(
  size: { label: string; soldOut?: boolean; stock?: number } | undefined,
  variant: { soldOut?: string[]; stock?: StockBySize } | undefined
) {
  if (!size) return { soldOut: true, stock: 0 };
  const stock = variant?.stock?.[size.label] ?? size.stock ?? 8;
  const soldOut = !!size.soldOut || !!variant?.soldOut?.includes(size.label) || stock === 0;
  return { soldOut, stock: soldOut ? 0 : stock };
}

const REFLECT = 0.22;

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function viewStyle(v: MattressView): React.CSSProperties {
  const z = v.zoom ?? 1;
  const [fx, fy] = v.focus ?? [0.5, 0.5];
  return {
    backgroundImage: `url("${v.src}")`,
    backgroundSize: z <= 1 ? "cover" : `${z * 100}% auto`,
    backgroundPosition: `${focusPosition(fx, z)}% ${focusPosition(fy, z)}%`,
    transform: v.mirror ? "scaleX(-1)" : undefined,
  };
}

function Stars({ value }: { value: number }) {
  const row = (fill: boolean) =>
    [0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className="w-4 h-4">
        <path
          d={STAR}
          fill={fill ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ));
  return (
    <span className="snp-stars" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <span className="snp-starrow text-[#D1E2E8]">{row(false)}</span>
      <span
        className="snp-starrow snp-starfill text-[#17637D]"
        style={{ clipPath: `inset(0 ${100 - value * 20}% 0 0)` }}
      >
        {row(true)}
      </span>
    </span>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  // Parse base starting price from string like "₹24,999"
  const rawBasePrice = parseInt(product.startingPrice.replace(/[^0-9]/g, ""), 10) || 24999;

  // Build sizes array with realistic price multipliers
  const sizeMultipliers: Record<string, number> = {
    King: 1.0,
    Queen: 0.88,
    Double: 0.78,
    Single: 0.64,
    "Custom Size": 1.12,
  };

  const sizes: MattressSize[] = SIZES.map((s, idx) => ({
    label: s.label,
    dimensions: s.dimensions,
    price: Math.round(rawBasePrice * (sizeMultipliers[s.label] || 1.0)),
    rating: 4.9,
    reviews: 142 - idx * 12,
    stock: idx === 3 ? 3 : 9,
  }));

  // Build variants from product.colors
  const variants: MattressVariant[] = product.colors.map((c) => ({
    name: c.name,
    swatch: c.hex,
    tint: c.hex,
    src: c.image,
    fabric: c.fabric,
    gallery: [{ src: c.image, label: `${product.name} — ${c.name} (${c.fabric || "Belgian Jacquard"})` }],
  }));

  const count = variants.length;
  const [active, setActive] = React.useState(0);
  const avail = (vi: number, label: string) =>
    availability(sizes.find((s) => s.label === label), variants[vi]);
  const firstFree = (vi: number) => sizes.find((s) => !avail(vi, s.label).soldOut)?.label ?? "King";
  const [size, setSize] = React.useState("King");
  const [cart, setCart] = React.useState<"idle" | "busy" | "done">("idle");
  const cartTimers = React.useRef<number[]>([]);
  const [vZoom, setVZoom] = React.useState(false);
  const [hintSeen, setHintSeen] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [likeMsg, setLikeMsg] = React.useState("");
  const [toastNote, setToastNote] = React.useState("");
  const [viewer, setViewer] = React.useState<number | null>(null);
  const [thumbSet, setThumbSet] = React.useState(active);

  const stats = sizeStats(
    sizes.find((s) => s.label === size),
    { price: rawBasePrice, rating: 4.9, reviews: 142 }
  );

  const mattressRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const wordRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const reflectRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const tiltRef = React.useRef<HTMLDivElement | null>(null);
  const sheenRef = React.useRef<HTMLSpanElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const loupeRef = React.useRef<HTMLSpanElement | null>(null);
  const loupeImgRef = React.useRef<HTMLSpanElement | null>(null);
  const holding = React.useRef(false);
  const lastPointer = React.useRef("mouse");
  const reflectWrapRef = React.useRef<HTMLDivElement | null>(null);
  const floatRef = React.useRef<HTMLDivElement | null>(null);
  const floorRef = React.useRef<HTMLSpanElement | null>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);
  const thumbsRef = React.useRef<HTMLSpanElement | null>(null);
  const priceRef = React.useRef<HTMLSpanElement | null>(null);
  const countRef = React.useRef<HTMLSpanElement | null>(null);
  const likeRef = React.useRef<HTMLButtonElement | null>(null);
  const burstRef = React.useRef<HTMLSpanElement | null>(null);
  const pillRef = React.useRef<HTMLSpanElement | null>(null);
  const toastRef = React.useRef<HTMLDivElement | null>(null);
  const toastTimer = React.useRef<gsap.core.Tween | null>(null);
  const boxRef = React.useRef<HTMLDivElement | null>(null);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const opener = React.useRef<HTMLElement | null>(null);
  const shown = React.useRef(active);
  const first = React.useRef(stats);

  // Initial visibility
  React.useLayoutEffect(() => {
    mattressRefs.current.forEach(
      (el, i) => el && gsap.set(el, { yPercent: 0, rotation: 0, autoAlpha: i === shown.current ? 1 : 0 })
    );
    wordRefs.current.forEach(
      (el, i) => el && gsap.set(el, { yPercent: 0, autoAlpha: i === shown.current ? 1 : 0 })
    );
    reflectRefs.current.forEach(
      (el, i) => el && gsap.set(el, { autoAlpha: i === shown.current ? REFLECT : 0 })
    );
  }, [count]);

  // Gentle float motion for luxury presentation
  React.useEffect(() => {
    const wrap = floatRef.current;
    const floor = floorRef.current;
    const root = rootRef.current;
    if (!wrap || !floor || !root || prefersReduced()) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 3.2, ease: "sine.inOut" } });
    tl.to(wrap, { y: "-1cqw" }, 0).to(floor, { scaleX: 0.92, opacity: 0.6 }, 0);
    if (reflectWrapRef.current) tl.to(reflectWrapRef.current, { y: "1cqw" }, 0);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.resume() : tl.pause()));
    io.observe(root);
    return () => {
      io.disconnect();
      tl.kill();
    };
  }, []);

  React.useEffect(
    () => () => {
      toastTimer.current?.kill();
      cartTimers.current.forEach(clearTimeout);
    },
    []
  );

  // 3D tilt tracking with cursor
  React.useEffect(() => {
    const root = rootRef.current;
    const tilt = tiltRef.current;
    const floor = floorRef.current;
    if (!root || !tilt || !floor || prefersReduced() || !window.matchMedia("(pointer: fine)").matches)
      return;
    gsap.set(tilt, { transformPerspective: 1200 });
    const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
    const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
    const fx = gsap.quickTo(floor, "x", { duration: 0.9, ease: "power3.out" });
    const glow = { x: 0, y: 0 };
    const drift = (x: number, y: number) =>
      gsap.to(glow, {
        x,
        y,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          root.style.setProperty("--mx", glow.x.toFixed(2) + "%");
          root.style.setProperty("--my", glow.y.toFixed(2) + "%");
        },
      });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const r = (stageRef.current ?? root).getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      const k = holding.current ? 0 : 1;
      ry(nx * 8 * k);
      rx(-ny * 5 * k);
      fx(-nx * 10 * k);
      drift(nx * 8, ny * 6);
    };
    const onLeave = () => {
      ry(0);
      rx(0);
      fx(0);
      drift(0, 0);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(glow);
    };
  }, []);

  // Light sweep on colour change
  const sweep = (delay: number) => {
    const sh = sheenRef.current;
    if (!sh || prefersReduced()) return;
    gsap.fromTo(
      sh,
      { backgroundPosition: "130% 0%" },
      { backgroundPosition: "-30% 0%", duration: 1.2, ease: "power2.inOut", delay }
    );
  };
  React.useEffect(() => sweep(0.6), []);

  // Price roll animation
  const shownStats = React.useRef(stats);
  React.useEffect(() => {
    const from = shownStats.current;
    shownStats.current = stats;
    const p = priceRef.current;
    const c = countRef.current;
    if (!p || !c) return;
    const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
    if (prefersReduced()) {
      p.textContent = fmt(stats.price);
      c.textContent = `(${stats.reviews})`;
      return;
    }
    const o = { price: from.price, reviews: from.reviews };
    const tw = gsap.to(o, {
      price: stats.price,
      reviews: stats.reviews,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        p.textContent = fmt(o.price);
        c.textContent = `(${Math.round(o.reviews)})`;
      },
    });
    if (from.price !== stats.price)
      gsap.fromTo(
        p,
        { y: stats.price > from.price ? 8 : -8, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    return () => {
      tw.kill();
    };
  }, [stats.price, stats.reviews]);

  // Pick variant colorway
  const pick = (next: number) => {
    const prev = shown.current;
    if (next === prev) return;
    setActive(next);
    shown.current = next;
    if (avail(next, size).soldOut) setSize(firstFree(next));
    const refl = reflectRefs.current;
    const rm = prefersReduced();
    refl.forEach((el) => el && gsap.killTweensOf(el));
    if (refl[prev]) gsap.to(refl[prev], { autoAlpha: 0, duration: rm ? 0 : 0.25 });
    if (refl[next])
      gsap.to(refl[next], { autoAlpha: REFLECT, duration: rm ? 0 : 0.6, delay: rm ? 0 : 0.45 });
    const reduce = prefersReduced();
    const mattresses = mattressRefs.current;
    const words = wordRefs.current;
    [mattresses, words].forEach((list) =>
      list.forEach((el, i) => {
        if (!el) return;
        gsap.killTweensOf(el);
        if (i !== prev && i !== next) gsap.set(el, { autoAlpha: 0, yPercent: 0, rotation: 0 });
      })
    );
    if (reduce) {
      [mattresses, words].forEach((list) => {
        if (list[prev]) gsap.set(list[prev], { autoAlpha: 0, yPercent: 0, rotation: 0 });
        if (list[next]) gsap.set(list[next], { autoAlpha: 1, yPercent: 0, rotation: 0 });
      });
      setThumbSet(next);
      return;
    }

    if (mattresses[prev])
      gsap.to(mattresses[prev], {
        yPercent: -120,
        rotation: -4,
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.in",
      });
    if (mattresses[next])
      gsap.fromTo(
        mattresses[next],
        { yPercent: 120, rotation: 4, autoAlpha: 0 },
        { yPercent: 0, rotation: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(1.2)", delay: 0.06 }
      );
    sweep(0.55);
    if (words[prev])
      gsap.to(words[prev], { yPercent: -70, autoAlpha: 0, duration: 0.55, ease: "power2.in" });
    if (words[next])
      gsap.fromTo(
        words[next],
        { yPercent: 70, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );
    const thumbs = thumbsRef.current;
    if (thumbs)
      gsap.to(thumbs, {
        autoAlpha: 0,
        x: -8,
        duration: 0.16,
        ease: "power1.in",
        onComplete: () => {
          setThumbSet(next);
          gsap.fromTo(thumbs, { autoAlpha: 0, x: 8 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" });
        },
      });
    else setThumbSet(next);
  };

  const like = () => {
    const next = !liked;
    setLiked(next);
    setLikeMsg(next ? "Added to Wishlist" : "Removed from Wishlist");
    const from = likeRef.current;
    const pill = pillRef.current;
    if (!from || !pill) return;
    gsap.killTweensOf(pill);
    if (prefersReduced()) {
      gsap.set(pill, { autoAlpha: 1, y: 0 });
      gsap.to(pill, { autoAlpha: 0, duration: 0, delay: 1.6 });
      return;
    }
    gsap
      .timeline()
      .fromTo(
        pill,
        { autoAlpha: 0, y: 6, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }
      )
      .to(pill, { autoAlpha: 0, y: -10, duration: 0.4, ease: "power2.in" }, "+=1.1");
    gsap.fromTo(
      from.firstElementChild,
      { scale: next ? 0.5 : 1.2 },
      { scale: 1, duration: 0.55, ease: "back.out(3)" }
    );
    const burst = burstRef.current;
    if (!next || !burst) return;
    Array.from(burst.children).forEach((h, i) => {
      const a = (-90 + (i - 3) * 26 + gsap.utils.random(-8, 8)) * (Math.PI / 180);
      const d = gsap.utils.random(26, 46);
      gsap.fromTo(
        h,
        { x: 0, y: 0, scale: 0.4, autoAlpha: 1, rotation: 0 },
        {
          x: Math.cos(a) * d,
          y: Math.sin(a) * d,
          scale: gsap.utils.random(0.6, 1),
          rotation: gsap.utils.random(-30, 30),
          autoAlpha: 0,
          duration: gsap.utils.random(0.6, 0.9),
          ease: "power2.out",
        }
      );
    });
  };

  const addToCart = () => {
    if (cart !== "idle" || avail(shown.current, size).soldOut) return;
    const reduce = prefersReduced();
    const later = (ms: number, fn: () => void) => cartTimers.current.push(window.setTimeout(fn, ms));
    setCart(reduce ? "done" : "busy");
    later(reduce ? 0 : 650, () => {
      setCart("done");
      showToast();
    });
    later(reduce ? 1600 : 2100, () => setCart("idle"));
  };

  const showToast = () => {
    const variant = variants[shown.current];
    setToastNote(variant ? `${variant.name} · ${size} Size` : "");
    const t = toastRef.current;
    if (!t) return;
    toastTimer.current?.kill();
    gsap.killTweensOf(t);
    if (prefersReduced()) {
      gsap.set(t, { autoAlpha: 1, y: 0 });
      toastTimer.current = gsap.delayedCall(3, () => gsap.set(t, { autoAlpha: 0 }));
      return;
    }
    gsap.fromTo(t, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
    toastTimer.current = gsap.delayedCall(3, () =>
      gsap.to(t, { autoAlpha: 0, y: 8, duration: 0.35, ease: "power2.in" })
    );
  };

  // Loupe zoom interaction
  const placeLoupe = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    const img = mattressRefs.current[shown.current];
    const lp = loupeRef.current;
    const li = loupeImgRef.current;
    if (!stage || !img || !lp || !li) return;
    const st = stage.getBoundingClientRect();
    const r = img.getBoundingClientRect();
    const L = lp.offsetWidth;
    const Z = 2.2;
    gsap.set(lp, { x: e.clientX - st.left - L / 2, y: e.clientY - st.top - L / 2 });
    li.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
    li.style.backgroundPosition = `${-((e.clientX - r.left) * Z - L / 2)}px ${-(
      (e.clientY - r.top) * Z -
      L / 2
    )}px`;
  };

  const onStageDown = (e: React.PointerEvent) => {
    lastPointer.current = e.pointerType;
    if (e.pointerType === "touch" || e.button !== 0) return;
    const lp = loupeRef.current;
    const li = loupeImgRef.current;
    const cur = variants[shown.current];
    if (!lp || !li || !cur) return;
    holding.current = true;
    setHintSeen(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    li.style.backgroundImage = `url("${cur.src}")`;
    if (tiltRef.current) gsap.to(tiltRef.current, { rotationX: 0, rotationY: 0, duration: 0.3 });
    placeLoupe(e);
    gsap.fromTo(
      lp,
      { autoAlpha: 0, scale: 0.6 },
      { autoAlpha: 1, scale: 1, duration: prefersReduced() ? 0 : 0.3, ease: "back.out(2)" }
    );
  };

  const onStageMove = (e: React.PointerEvent) => {
    if (holding.current) placeLoupe(e);
  };

  const onStageUp = () => {
    if (!holding.current) return;
    holding.current = false;
    if (loupeRef.current)
      gsap.to(loupeRef.current, { autoAlpha: 0, scale: 0.7, duration: prefersReduced() ? 0 : 0.2 });
  };

  const v = variants[active] ?? variants[0];
  const views: MattressView[] = variants.map((vv) => ({
    src: vv.src,
    label: `${product.name} — ${vv.name} (${vv.fabric || "Belgian Jacquard"})`,
    focus: [0.5, 0.5],
    zoom: 1,
  }));

  // Gallery viewer modal
  const openViewer = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setViewer(i);
    pick(i);
  };
  const closeViewer = React.useCallback(() => {
    setViewer(null);
    setVZoom(false);
    opener.current?.focus();
  }, []);
  const step = React.useCallback(
    (d: number) => {
      setVZoom(false);
      setViewer((i) => {
        if (i === null) return i;
        const next = (i + d + views.length) % views.length;
        pick(next);
        return next;
      });
    },
    [views.length]
  );

  React.useEffect(() => {
    if (viewer === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer, closeViewer, step]);

  const isOpen = viewer !== null;
  React.useLayoutEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    if (!prefersReduced() && boxRef.current)
      gsap.fromTo(
        boxRef.current,
        { autoAlpha: 0, scale: 0.94, y: 16 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
  }, [isOpen]);

  const frameRef = React.useRef<HTMLDivElement | null>(null);
  React.useLayoutEffect(() => {
    if (viewer === null || prefersReduced() || !frameRef.current) return;
    gsap.fromTo(
      frameRef.current,
      { autoAlpha: 0.2, scale: 0.985 },
      { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [viewer]);

  const tintOf = (vv: MattressVariant) => vv.tint ?? vv.swatch;
  const here = avail(active, size);
  const stockTone = here.soldOut ? "out" : here.stock !== undefined && here.stock <= 4 ? "low" : "ok";
  const stockText =
    stockTone === "out"
      ? "Custom crafted on request"
      : stockTone === "low"
        ? `Limited Atelier Run · ${here.stock} left in ${size}`
        : "In Stock · Direct Factory Dispatch in 48 Hours";

  // WhatsApp Inquiry Handler
  const handleWhatsAppEnquiry = () => {
    const activeColor = variants[active]?.name || product.colors[0]?.name;
    const text = encodeURIComponent(
      `Hello Sri Senthur Mattress, I am inquiring about "${product.name}" in ${size} size with "${activeColor}" fabric styling. Please provide a formal quotation, current offers, and delivery schedule to my address.`
    );
    window.open(`https://wa.me/916369152486?text=${text}`, "_blank");
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow pt-24">
        {/* ===================== BREADCRUMBS ===================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#3F6474]">
            <Link href="/" className="hover:text-[#112732] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#17637D]" />
            <Link href="/products" className="hover:text-[#112732] transition-colors">
              Mattress Collection
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#17637D]" />
            <span className="font-medium text-[#112732] truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* ===================== SNEAKER-HERO STYLE PRODUCT DETAIL SECTION ===================== */}
        <section
          ref={rootRef}
          className="snp-root"
          style={{
            ["--snp-like" as string]: "#17637D",
            ["--snp-tint" as string]: v ? tintOf(variants[active] ?? v) : "#D1E2E8",
          }}
          aria-label={product.name}
        >
          <style>{`
            .snp-root {
              position: relative;
              display: flex;
              flex-direction: column;
              width: 100%;
              container-type: inline-size;
              overflow: hidden;
              isolation: isolate;
              color: #112732;
              background: #F4F8FA;
              font-family: inherit;
              -webkit-font-smoothing: antialiased;
            }
            :where(.snp-root) :where(*, *::before, *::after) {
              box-sizing: border-box;
            }
            :where(.snp-root) :where(button) {
              font: inherit;
              color: inherit;
              background: none;
              border: 0;
              padding: 0;
              margin: 0;
              cursor: pointer;
            }
            .snp-root img {
              max-width: none;
              display: block;
            }
            .snp-bg {
              position: absolute;
              inset: 0;
              z-index: -1;
              opacity: 0;
              transition: opacity 0.8s ease;
              pointer-events: none;
              background: radial-gradient(var(--snp-gs, 48% 62%) at calc(50% + var(--mx, 0%)) calc(var(--snp-gy, 52%) + var(--my, 0%)), color-mix(in oklab, var(--t) 36%, transparent), transparent 72%),
                color-mix(in oklab, var(--t) 12%, #F4F8FA);
            }
            .snp-bg[data-on="true"] {
              opacity: 1;
            }
            .snp-body {
              position: relative;
              flex: 1;
              display: grid;
              grid-template-columns: 21cqw minmax(0, 1fr) 20cqw;
              column-gap: 3.5cqw;
              align-items: start;
              align-content: center;
              padding: 3cqw 6cqw 5cqw 6cqw;
              overflow: hidden;
            }
            .snp-info {
              align-self: start;
              position: relative;
              z-index: 1;
            }
            .snp-eyebrow {
              margin: 0;
              font-size: max(11px, 1.25cqw);
              letter-spacing: 0.15em;
              text-transform: uppercase;
              font-weight: 600;
              color: #3F6474;
            }
            .snp-title {
              margin: 1.5cqw 0 0;
              font-family: 'Poppins', sans-serif;
              font-size: max(26px, 2.8cqw);
              line-height: 1.15;
              font-weight: 700;
              color: #112732;
              letter-spacing: -0.01em;
              text-wrap: balance;
            }
            .snp-desc {
              margin: 2.2cqw 0 0;
              font-size: max(12px, 1.05cqw);
              line-height: 1.55;
              color: #2E5160;
            }
            .snp-badge-strip {
              display: flex;
              flex-wrap: wrap;
              gap: 0.8cqw;
              margin-top: 2cqw;
            }
            .snp-badge-pill {
              display: inline-flex;
              align-items: center;
              gap: 0.4cqw;
              padding: 0.4cqw 0.8cqw;
              background: #EDF4F7;
              border: 1px solid #D1E2E8;
              border-radius: 999px;
              font-size: max(10px, 0.85cqw);
              color: #112732;
              font-weight: 500;
            }
            .snp-thumbs {
              display: flex;
              align-items: center;
              gap: 1.8cqw;
              margin-top: 3.5cqw;
            }
            .snp-thumbset {
              display: flex;
              align-items: center;
              gap: inherit;
            }
            .snp-thumb {
              flex: none;
              width: 5.2cqw;
              height: 3.6cqw;
              overflow: hidden;
              border-radius: 6px;
              border: 1px solid #D1E2E8;
              box-shadow: 0 4px 12px rgba(17, 39, 50, 0.08);
              transition: transform 0.25s, border-color 0.25s;
            }
            .snp-thumb:hover {
              transform: translateY(-2px);
              border-color: #17637D;
            }
            .snp-view {
              display: block;
              width: 100%;
              height: 100%;
              background-repeat: no-repeat;
            }
            .snp-more {
              flex: none;
              width: 3.6cqw;
              height: 3.6cqw;
              display: grid;
              place-items: center;
              background: #112732;
              color: #F4F8FA;
              border-radius: 6px;
              font-size: max(11px, 1cqw);
              font-weight: 600;
              transition: transform 0.25s, background-color 0.25s;
            }
            .snp-more:hover {
              transform: scale(1.06);
              background: #3F6474;
            }
            .snp-stage {
              position: relative;
              align-self: stretch;
              max-height: 48cqw;
              min-height: 32cqw;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .snp-word {
              position: absolute;
              left: 50%;
              top: 5%;
              translate: -50% -10%;
              font-family: 'Poppins', sans-serif;
              font-size: 8.5cqw;
              line-height: 1;
              font-weight: 800;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              white-space: nowrap;
              color: color-mix(in oklab, var(--t) 28%, transparent);
              pointer-events: none;
              user-select: none;
            }
            .snp-float {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .snp-tilt {
              position: absolute;
              inset: 0;
              transform-style: preserve-3d;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .snp-reflects {
              position: absolute;
              inset: 0;
              pointer-events: none;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .snp-mattress.snp-reflect {
              transform: scaleY(-1);
              transform-origin: 50% 86%;
              filter: blur(1.2px);
              -webkit-mask-image: linear-gradient(to bottom, transparent 48%, #000 85%);
              mask-image: linear-gradient(to bottom, transparent 48%, #000 85%);
            }
            .snp-mattress.snp-sheen {
              display: block;
              pointer-events: none;
              filter: none;
              background: linear-gradient(100deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%) 130% 0 / 300% 100% no-repeat;
              -webkit-mask-size: 100% 100%;
              mask-size: 100% 100%;
              -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
            }
            .snp-loupe {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 3;
              width: max(150px, 16cqw);
              aspect-ratio: 1;
              border-radius: 50%;
              overflow: hidden;
              visibility: hidden;
              opacity: 0;
              pointer-events: none;
              background: #F4F8FA;
              border: 3px solid #17637D;
              box-shadow: 0 20px 50px -10px rgba(17, 39, 50, 0.45);
            }
            .snp-loupe > span {
              position: absolute;
              inset: 0;
              background-repeat: no-repeat;
            }
            .snp-hint {
              position: absolute;
              left: 3%;
              bottom: 4%;
              transition: opacity 0.5s;
              font-size: max(10px, 0.85cqw);
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: #3F6474;
              font-weight: 600;
              pointer-events: none;
            }
            .snp-hint-touch {
              display: none;
            }
            .snp-hint[data-seen="true"] {
              opacity: 0;
            }
            @media(pointer: fine) {
              .snp-stage {
                cursor: zoom-in;
              }
            }
            @media(pointer: coarse) {
              .snp-hint-fine {
                display: none;
              }
              .snp-hint-touch {
                display: inline;
              }
            }
            .snp-mattress {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 92%;
              height: auto;
              aspect-ratio: 16 / 10;
              object-fit: cover;
              border-radius: 12px;
              translate: -50% -50%;
              box-shadow: 0 25px 60px -15px rgba(17, 39, 50, 0.22);
            }
            .snp-floor {
              position: absolute;
              left: 12%;
              right: 12%;
              top: 50%;
              height: 5cqw;
              translate: 0 11cqw;
              border-radius: 50%;
              background: radial-gradient(closest-side, rgba(17, 39, 50, 0.28), transparent);
              filter: blur(6px);
            }
            .snp-buy {
              align-self: start;
              font-size: max(11px, 1.15cqw);
              position: relative;
              z-index: 1;
              background: rgba(255, 255, 255, 0.65);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              padding: 2.2cqw;
              border-radius: 16px;
              border: 1px solid rgba(232, 222, 208, 0.8);
              box-shadow: 0 15px 35px -10px rgba(17, 39, 50, 0.08);
            }
            .snp-label {
              display: block;
              font-size: max(11px, 1.1cqw);
              letter-spacing: 0.12em;
              text-transform: uppercase;
              font-weight: 600;
              color: #3F6474;
            }
            .snp-sizes {
              display: flex;
              flex-wrap: wrap;
              gap: 0.8cqw;
              margin-top: 1cqw;
            }
            .snp-size {
              padding: 0.6cqw 1cqw;
              border-radius: 8px;
              display: grid;
              place-items: center;
              border: 1.5px solid #D1E2E8;
              background: #EDF4F7;
              font-size: max(11px, 1cqw);
              font-weight: 600;
              color: #112732;
              transition: all 0.25s ease;
            }
            .snp-size:not(:disabled):hover {
              transform: translateY(-1px);
              border-color: #17637D;
            }
            .snp-size[aria-pressed="true"] {
              background: #112732;
              color: #F4F8FA;
              border-color: #112732;
            }
            .snp-size:disabled {
              opacity: 0.35;
              cursor: not-allowed;
            }
            .snp-stock {
              display: flex;
              align-items: center;
              gap: 0.6cqw;
              margin-top: 1.2cqw;
              font-size: max(10px, 0.95cqw);
              color: #2E5160;
              font-weight: 500;
            }
            .snp-stock::before {
              content: "";
              width: max(6px, 0.55cqw);
              height: max(6px, 0.55cqw);
              border-radius: 50%;
              background: #15803d;
            }
            .snp-stock[data-tone="low"] {
              color: #c2410c;
            }
            .snp-stock[data-tone="low"]::before {
              background: #ea580c;
            }
            .snp-stock[data-tone="out"]::before {
              background: #3F6474;
            }
            .snp-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 2cqw;
              padding-top: 1.5cqw;
              border-top: 1px solid #D1E2E8;
            }
            .snp-rating {
              display: flex;
              align-items: center;
              gap: 0.5cqw;
            }
            .snp-stars {
              position: relative;
              display: inline-block;
            }
            .snp-starrow {
              display: flex;
              gap: 0.3cqw;
            }
            .snp-starfill {
              position: absolute;
              inset: 0;
              transition: clip-path 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            .snp-count {
              font-size: max(10px, 0.9cqw);
              color: #3F6474;
              font-variant-numeric: tabular-nums;
            }
            .snp-price {
              display: inline-block;
              font-family: 'Poppins', sans-serif;
              font-weight: 700;
              font-size: max(22px, 2.2cqw);
              color: #112732;
              font-variant-numeric: tabular-nums;
            }
            .snp-colour {
              margin-top: 2cqw;
              padding-top: 1.5cqw;
              border-top: 1px solid #D1E2E8;
            }
            .snp-swatches {
              display: flex;
              align-items: center;
              gap: 1.2cqw;
              margin-top: 1cqw;
            }
            .snp-swatch {
              width: max(30px, 2.8cqw);
              height: max(30px, 2.8cqw);
              border-radius: 50%;
              background: var(--sw);
              border: 1px solid rgba(17, 39, 50, 0.2);
              box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
              transition: transform 0.2s, box-shadow 0.25s;
            }
            .snp-swatch:hover {
              transform: scale(1.12);
            }
            .snp-swatch[aria-pressed="true"] {
              box-shadow: 0 0 0 2px #F4F8FA, 0 0 0 4px #17637D;
              transform: scale(1.1);
            }
            .snp-actions {
              position: relative;
              display: flex;
              flex-direction: column;
              gap: 1.2cqw;
              margin-top: 2.4cqw;
            }
            .snp-cta {
              height: max(44px, 4cqw);
              padding: 0 2cqw;
              background: #112732;
              color: #F4F8FA;
              font-weight: 600;
              font-size: max(11px, 1.05cqw);
              letter-spacing: 0.08em;
              text-transform: uppercase;
              white-space: nowrap;
              border-radius: 8px;
              position: relative;
              display: grid;
              place-items: center;
              overflow: hidden;
              transition: transform 0.15s, background-color 0.35s;
              box-shadow: 0 10px 25px -5px rgba(17, 39, 50, 0.25);
            }
            .snp-cta:hover {
              background: #0A181F;
            }
            .snp-cta:active {
              transform: scale(0.97);
            }
            .snp-cta > span {
              grid-area: 1 / 1;
              display: inline-flex;
              align-items: center;
              gap: 0.6em;
              transition: opacity 0.25s, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            .snp-cta-busy, .snp-cta-done {
              opacity: 0;
              transform: translateY(70%);
            }
            .snp-cta[data-state="busy"] .snp-cta-idle,
            .snp-cta[data-state="done"] .snp-cta-idle {
              opacity: 0;
              transform: translateY(-70%);
            }
            .snp-cta[data-state="busy"] .snp-cta-busy,
            .snp-cta[data-state="done"] .snp-cta-done {
              opacity: 1;
              transform: none;
            }
            .snp-cta[data-state="done"] {
              background: #15803d;
              color: #fff;
            }
            .snp-cta-busy i {
              width: 1.15em;
              height: 1.15em;
              border-radius: 50%;
              border: 2px solid currentColor;
              border-right-color: transparent;
              animation: snp-spin 0.7s linear infinite;
            }
            @keyframes snp-spin {
              to {
                transform: rotate(360deg);
              }
            }
            .snp-cta-done svg {
              width: 1.25em;
              height: 1.25em;
              fill: none;
              stroke: currentColor;
              stroke-width: 2.6;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-dasharray: 24;
              stroke-dashoffset: 24;
              transition: stroke-dashoffset 0.45s 0.12s ease;
            }
            .snp-cta[data-state="done"] .snp-cta-done svg {
              stroke-dashoffset: 0;
            }
            .snp-whatsapp-btn {
              height: max(44px, 4cqw);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.8cqw;
              background: #25D366;
              color: #FFFFFF;
              font-weight: 600;
              font-size: max(11px, 1.05cqw);
              letter-spacing: 0.05em;
              text-transform: uppercase;
              border-radius: 8px;
              transition: all 0.25s ease;
              box-shadow: 0 8px 20px -4px rgba(37, 211, 102, 0.35);
            }
            .snp-whatsapp-btn:hover {
              background: #20BA5A;
              transform: translateY(-1px);
            }
            .snp-action-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 1cqw;
            }
            .snp-like {
              position: relative;
              width: max(32px, 2.6cqw);
              height: max(32px, 2.6cqw);
              display: grid;
              place-items: center;
              border-radius: 50%;
              border: 1px solid #D1E2E8;
              background: #EDF4F7;
              color: #3F6474;
              transition: all 0.25s ease;
            }
            .snp-like:hover {
              border-color: #17637D;
              color: #112732;
            }
            .snp-like > svg {
              width: 60%;
              height: 60%;
              overflow: visible;
            }
            .snp-like > svg path {
              fill: none;
              stroke: currentColor;
              stroke-width: 1.8;
              transition: fill 0.3s, stroke 0.3s;
            }
            .snp-like[aria-pressed="true"] > svg path {
              fill: #17637D;
              stroke: #17637D;
            }
            .snp-burst {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 0;
              height: 0;
              pointer-events: none;
            }
            .snp-burst svg {
              position: absolute;
              left: -6px;
              top: -6px;
              width: 12px;
              height: 12px;
              color: #17637D;
              opacity: 0;
            }
            .snp-pill {
              position: absolute;
              right: 0;
              bottom: calc(100% + 1cqw);
              padding: 0.6cqw 1.2cqw;
              border-radius: 999px;
              white-space: nowrap;
              background: #112732;
              color: #F4F8FA;
              font-size: max(10px, 0.95cqw);
              font-weight: 500;
              visibility: hidden;
              opacity: 0;
              pointer-events: none;
              box-shadow: 0 4px 15px rgba(17, 39, 50, 0.2);
            }
            .snp-pill b {
              color: #17637D;
              font-weight: 700;
            }
            .snp-toast {
              position: absolute;
              left: 50%;
              bottom: 3cqw;
              translate: -50% 0;
              display: flex;
              align-items: center;
              gap: 1cqw;
              padding: 1cqw 2cqw;
              border-radius: 999px;
              background: #112732;
              color: #F4F8FA;
              font-size: max(11px, 1cqw);
              font-weight: 500;
              white-space: nowrap;
              box-shadow: 0 10px 30px rgba(17, 39, 50, 0.3);
              visibility: hidden;
              opacity: 0;
              z-index: 20;
            }
            .snp-toast i {
              width: max(9px, 0.8cqw);
              height: max(9px, 0.8cqw);
              border-radius: 50%;
              background: #22c55e;
              box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
            }
            .snp-toast small {
              font-size: inherit;
              color: #D1E2E8;
              font-weight: 400;
            }
            .snp-viewer {
              position: fixed;
              inset: 0;
              z-index: 60;
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              place-items: center;
              padding: 24px;
            }
            .snp-scrim {
              position: absolute;
              inset: 0;
              background: rgba(10, 24, 31, 0.85);
              backdrop-filter: blur(14px);
              -webkit-backdrop-filter: blur(14px);
              cursor: zoom-out;
            }
            .snp-box {
              position: relative;
              width: min(920px, 100%);
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .snp-frame {
              position: relative;
              aspect-ratio: 16 / 10;
              max-height: 72vh;
              width: 100%;
              border-radius: 14px;
              overflow: hidden;
              background: #EDF4F7;
              box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5);
              cursor: zoom-in;
            }
            .snp-frame[data-zoom="true"] {
              cursor: zoom-out;
            }
            .snp-frame .snp-view {
              position: absolute;
              inset: 0;
              width: auto;
              height: auto;
              transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            .snp-vbar {
              display: flex;
              align-items: center;
              gap: 12px;
              font-size: 14px;
              color: #F4F8FA;
            }
            .snp-vbar strong {
              font-weight: 600;
            }
            .snp-vbar span {
              color: #D1E2E8;
              font-variant-numeric: tabular-nums;
            }
            .snp-vbtn {
              width: 42px;
              height: 42px;
              border-radius: 50%;
              display: grid;
              place-items: center;
              background: #F4F8FA;
              color: #112732;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
              transition: transform 0.2s, background-color 0.2s;
            }
            .snp-vbtn:hover {
              transform: scale(1.08);
              background: #EDF4F7;
            }
            .snp-vbtn svg {
              width: 20px;
              height: 20px;
            }
            .snp-nav-l, .snp-nav-r {
              position: absolute;
              top: 50%;
              translate: 0 -50%;
            }
            .snp-nav-l {
              left: 16px;
            }
            .snp-nav-r {
              right: 16px;
            }
            .snp-close {
              margin-left: auto;
            }
            .snp-rail {
              display: flex;
              gap: 10px;
              overflow-x: auto;
              padding: 4px;
            }
            .snp-rail button {
              flex: none;
              width: 80px;
              height: 52px;
              border-radius: 8px;
              overflow: hidden;
              opacity: 0.6;
              transition: opacity 0.2s, box-shadow 0.2s;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .snp-rail button[aria-current="true"] {
              opacity: 1;
              box-shadow: 0 0 0 2px #17637D;
            }
            @media (max-width: 990px), @container (max-width: 990px) {
              .snp-root {
                overflow-x: hidden !important;
                width: 100% !important;
                max-width: 100vw !important;
              }
              .snp-body {
                display: flex !important;
                flex-direction: column !important;
                grid-template-columns: 1fr !important;
                grid-template-rows: auto !important;
                padding: 16px 16px 48px !important;
                gap: 20px !important;
                width: 100% !important;
                max-width: 100% !important;
                overflow: hidden !important;
              }
              .snp-stage {
                order: -1 !important;
                width: 100% !important;
                height: 62vw !important;
                min-height: 220px !important;
                max-height: 360px !important;
                position: relative !important;
                overflow: hidden !important;
                margin: 0 auto !important;
              }
              .snp-word {
                display: none !important;
              }
              .snp-reflects, .snp-mattress.snp-reflect {
                display: none !important;
              }
              .snp-floor {
                display: none !important;
              }
              .snp-mattress {
                width: 96% !important;
                max-width: 480px !important;
                height: auto !important;
                aspect-ratio: 16 / 10 !important;
                border-radius: 8px !important;
                box-shadow: 0 12px 32px -8px rgba(17, 39, 50, 0.2) !important;
              }
              .snp-info {
                order: 1 !important;
                width: 100% !important;
                padding-top: 4px !important;
              }
              .snp-title {
                font-size: 24px !important;
                line-height: 1.2 !important;
                margin-top: 8px !important;
              }
              .snp-desc {
                font-size: 13px !important;
                line-height: 1.6 !important;
                margin-top: 10px !important;
                max-width: 100% !important;
              }
              .snp-badge-strip {
                margin-top: 14px !important;
                gap: 6px !important;
              }
              .snp-badge-pill {
                padding: 4px 10px !important;
                font-size: 10.5px !important;
              }
              .snp-thumbs {
                margin-top: 14px !important;
                gap: 8px !important;
                overflow-x: auto !important;
                padding-bottom: 4px !important;
                -webkit-overflow-scrolling: touch !important;
              }
              .snp-thumb {
                width: 64px !important;
                height: 44px !important;
                border-radius: 6px !important;
                flex-shrink: 0 !important;
              }
              .snp-more {
                width: 44px !important;
                height: 44px !important;
                border-radius: 6px !important;
                flex-shrink: 0 !important;
              }
              .snp-buy {
                order: 2 !important;
                width: 100% !important;
                padding: 18px !important;
                border-radius: 12px !important;
                margin-top: 4px !important;
              }
              .snp-sizes {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)) !important;
                gap: 8px !important;
                margin-top: 8px !important;
              }
              .snp-size {
                padding: 8px 10px !important;
                font-size: 11px !important;
                border-radius: 6px !important;
                text-align: center !important;
              }
              .snp-swatches {
                gap: 10px !important;
                margin-top: 8px !important;
              }
              .snp-swatch {
                width: 32px !important;
                height: 32px !important;
              }
              .snp-actions {
                margin-top: 18px !important;
                gap: 10px !important;
                width: 100% !important;
              }
              .snp-cta, .snp-whatsapp-btn {
                height: 46px !important;
                min-height: 46px !important;
                font-size: 11.5px !important;
                border-radius: 6px !important;
                width: 100% !important;
              }
              .snp-hint {
                display: none !important;
              }
              .snp-viewer {
                padding: 12px !important;
              }
              .snp-box {
                width: 100% !important;
                gap: 10px !important;
              }
              .snp-frame {
                aspect-ratio: 16 / 11 !important;
                max-height: 60vh !important;
              }
              .snp-nav-l {
                left: 8px !important;
              }
              .snp-nav-r {
                right: 8px !important;
              }
              .snp-vbtn {
                width: 36px !important;
                height: 36px !important;
              }
              .snp-rail button {
                width: 60px !important;
                height: 40px !important;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .snp-root * {
                transition: none !important;
                animation: none !important;
              }
            }
          `}</style>

          {variants.map((vv, i) => (
            <span
              key={i}
              className="snp-bg"
              data-on={i === active}
              style={{ ["--t" as string]: tintOf(vv) }}
              aria-hidden="true"
            />
          ))}

          <div className="snp-body">
            {/* Column 1: Info & Editorial Descriptions */}
            <div className="snp-info">
              <p className="snp-eyebrow">{product.categoryLabel}</p>
              <h1 className="snp-title">{product.name}</h1>
              <p className="snp-desc">{product.description}</p>

              <div className="snp-badge-strip">
                <span className="snp-badge-pill">
                  <Sparkles className="w-3.5 h-3.5 text-[#17637D]" />
                  {product.firmness}
                </span>
                <span className="snp-badge-pill">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#17637D]" />
                  {product.warranty}
                </span>
                <span className="snp-badge-pill">
                  <Clock className="w-3.5 h-3.5 text-[#17637D]" />
                  {product.height}
                </span>
              </div>

              {/* Color Variation Product Image Thumbnails */}
              <div className="mt-8 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] uppercase tracking-[0.2em] font-mono text-[#3F6474]">
                    Colorway Variations ({variants.length})
                  </span>
                  <span className="text-[10px] font-mono text-[#17637D] font-medium">
                    {variants[active]?.name} • {variants[active]?.fabric}
                  </span>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {variants.map((vv, i) => {
                    const isSelected = i === active;
                    return (
                      <button
                        key={vv.name}
                        type="button"
                        onClick={() => pick(i)}
                        title={`${vv.name} - ${vv.fabric || "Premium Fabric"}`}
                        aria-pressed={isSelected}
                        className={`group relative flex-shrink-0 w-20 sm:w-24 aspect-[16/11] border rounded-md overflow-hidden transition-all ${
                          isSelected
                            ? "border-[#17637D] ring-2 ring-[#17637D]/35 shadow-md scale-105"
                            : "border-[#D1E2E8] opacity-75 hover:opacity-100 hover:border-[#3F6474]"
                        }`}
                      >
                        <Image
                          src={vv.src}
                          alt={vv.name}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                        <div className="absolute top-1.5 left-1.5 z-10">
                          <span
                            className="block w-2.5 h-2.5 rounded-full border border-white/80 shadow-sm"
                            style={{ backgroundColor: vv.swatch }}
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A181F]/90 via-[#0A181F]/40 to-transparent px-1.5 py-1">
                          <span className="text-[9px] font-mono text-white block truncate leading-tight">
                            {vv.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => openViewer(active)}
                    title="Enlarge Product Image"
                    className="flex-shrink-0 w-10 sm:w-11 aspect-[16/11] bg-[#112732] text-white hover:bg-[#17637D] transition-colors rounded-md border border-[#112732] flex flex-col items-center justify-center gap-0.5 text-[9px] font-mono uppercase"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: 3D Stage with Floating Mattress */}
            <div
              className="snp-stage"
              ref={stageRef}
              onPointerDown={onStageDown}
              onPointerMove={onStageMove}
              onPointerUp={onStageUp}
              onPointerCancel={onStageUp}
              onClick={() => {
                if (lastPointer.current === "touch") openViewer(0);
              }}
            >
              {variants.map((vv, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="snp-word"
                  style={{
                    ["--t" as string]: tintOf(vv),
                    visibility: i === active ? "visible" : "hidden",
                  }}
                  aria-hidden="true"
                >
                  {vv.name}
                </span>
              ))}

              <span className="snp-floor" ref={floorRef} aria-hidden="true" />

              <div className="snp-reflects" ref={reflectWrapRef} aria-hidden="true">
                {variants.map((vv, i) => (
                  <img
                    key={i}
                    ref={(el) => {
                      reflectRefs.current[i] = el;
                    }}
                    className="snp-mattress snp-reflect"
                    src={vv.src}
                    alt=""
                    draggable={false}
                    style={{ visibility: i === active ? "visible" : "hidden" }}
                  />
                ))}
              </div>

              <div className="snp-float" ref={floatRef}>
                <div className="snp-tilt" ref={tiltRef}>
                  {variants.map((vv, i) => (
                    <img
                      key={i}
                      ref={(el) => {
                        mattressRefs.current[i] = el;
                      }}
                      className="snp-mattress"
                      src={vv.src}
                      alt={i === active ? `${product.name} in ${vv.name}` : ""}
                      aria-hidden={i === active ? undefined : true}
                      draggable={false}
                      style={{ visibility: i === active ? "visible" : "hidden" }}
                    />
                  ))}
                  <span
                    className="snp-mattress snp-sheen"
                    ref={sheenRef}
                    aria-hidden="true"
                    style={{
                      WebkitMaskImage: `url("${variants[active]?.src}")`,
                      maskImage: `url("${variants[active]?.src}")`,
                    }}
                  />
                </div>
              </div>

              <span className="snp-loupe" ref={loupeRef} aria-hidden="true">
                <span ref={loupeImgRef} />
              </span>

              <span className="snp-hint" data-seen={hintSeen} aria-hidden="true">
                <span className="snp-hint-fine">Hold pointer to examine texture</span>
                <span className="snp-hint-touch">Tap photo for atelier gallery</span>
              </span>
            </div>

            {/* Column 3: Customization, Sizes, Pricing & Actions */}
            <div className="snp-buy">
              <span className="snp-label">SELECT BED SIZE</span>
              <div className="snp-sizes" role="group" aria-label="Bed Size">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="snp-size"
                    aria-pressed={size === s.label}
                    disabled={avail(active, s.label).soldOut}
                    aria-label={
                      avail(active, s.label).soldOut
                        ? `Size ${s.label}, sold out`
                        : `Size ${s.label}`
                    }
                    onClick={() => setSize(s.label)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <span className="snp-stock" data-tone={stockTone} aria-live="polite">
                {stockText}
              </span>

              <div className="snp-row">
                <span className="snp-label">RATING</span>
                <span className="snp-rating">
                  <Stars value={stats.rating} />
                  <span className="snp-count" ref={countRef} aria-label="reviews">
                    ({first.current.reviews})
                  </span>
                </span>
              </div>

              <div className="snp-row" aria-live="polite">
                <span className="snp-label">PRICE (INCL. TAXES)</span>
                <span className="snp-price" ref={priceRef}>
                  {"₹" + first.current.price.toLocaleString("en-IN")}
                </span>
              </div>

              <span className="snp-label snp-colour">
                FABRIC & COLORWAY: <strong className="text-[#112732] font-semibold">{variants[active]?.name}</strong>
              </span>
              <div className="snp-swatches" role="group" aria-label="Colorway">
                {variants.map((vv, i) => (
                  <button
                    key={i}
                    type="button"
                    className="snp-swatch"
                    aria-pressed={i === active}
                    aria-label={vv.name}
                    style={{ ["--sw" as string]: vv.swatch }}
                    onClick={() => pick(i)}
                  />
                ))}
              </div>

              <div className="snp-actions">
                <button
                  type="button"
                  className="snp-cta"
                  data-state={cart}
                  onClick={addToCart}
                  disabled={here.soldOut}
                  aria-live="polite"
                >
                  <span className="snp-cta-idle">
                    {here.soldOut ? "SOLD OUT" : "INQUIRE / ADD TO CART"}
                  </span>
                  <span className="snp-cta-busy" aria-hidden="true">
                    <i />
                  </span>
                  <span className="snp-cta-done">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.2 4.2L19 7" />
                    </svg>
                    ADDED TO CART
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="snp-whatsapp-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  Order via WhatsApp
                </button>

                <div className="snp-action-row">
                  <span className="text-xs text-[#3F6474]">Save to Bedroom Wishlist</span>
                  <button
                    ref={likeRef}
                    type="button"
                    className="snp-like"
                    aria-pressed={liked}
                    aria-label="Save to favourites"
                    onClick={like}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={HEART_PATH} />
                    </svg>
                    <span className="snp-burst" ref={burstRef} aria-hidden="true">
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <svg key={i} viewBox="0 0 24 24">
                          <path d={HEART_PATH} fill="currentColor" />
                        </svg>
                      ))}
                    </span>
                  </button>
                </div>

                <span className="snp-pill" ref={pillRef} role="status" aria-live="polite">
                  {liked ? <b>♥ </b> : null}
                  {likeMsg}
                </span>
              </div>
            </div>

            <div className="snp-toast" ref={toastRef} role="status" aria-live="polite">
              <i aria-hidden="true" />
              Item Added to Cart
              {toastNote && <small>· {toastNote}</small>}
            </div>
          </div>

          {/* Full Photo Modal Viewer */}
          {viewer !== null && views[viewer] && (
            <div
              className="snp-viewer"
              role="dialog"
              aria-modal="true"
              aria-label={`${product.name} gallery`}
            >
              <button
                type="button"
                className="snp-scrim"
                aria-label="Close photos"
                tabIndex={-1}
                onClick={closeViewer}
              />
              <div className="snp-box" ref={boxRef}>
                <div className="snp-vbar">
                  <strong>{views[viewer].label ?? "Atelier Photo"}</strong>
                  <span>
                    {viewer + 1} / {views.length}
                  </span>
                  <button
                    ref={closeRef}
                    type="button"
                    className="snp-vbtn snp-close"
                    aria-label="Close photos"
                    onClick={closeViewer}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
                <div
                  className="snp-frame"
                  ref={frameRef}
                  data-zoom={vZoom}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("button")) return;
                    setVZoom((z) => !z);
                  }}
                  onPointerMove={(e) => {
                    if (!vZoom) return;
                    const r = e.currentTarget.getBoundingClientRect();
                    const el = e.currentTarget.firstElementChild as HTMLElement | null;
                    if (el)
                      el.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${(
                        (e.clientY - r.top) /
                        r.height
                      ) * 100}%`;
                  }}
                >
                  <span
                    className="snp-view"
                    style={{
                      ...viewStyle(views[viewer]),
                      transform: `${views[viewer].mirror ? "scaleX(-1) " : ""}scale(${vZoom ? 2.2 : 1
                        })`,
                    }}
                    role="img"
                    aria-label={`${v?.name} ${views[viewer].label ?? ""}`}
                  />
                  <button
                    type="button"
                    className="snp-vbtn snp-nav-l"
                    aria-label="Previous photo"
                    onClick={() => step(-1)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M15 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="snp-vbtn snp-nav-r"
                    aria-label="Next photo"
                    onClick={() => step(1)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="snp-rail">
                  {views.map((vw, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show ${vw.label ?? `photo ${i + 1}`}`}
                      aria-current={i === viewer}
                      onClick={() => {
                        setVZoom(false);
                        setViewer(i);
                        pick(i);
                      }}
                    >
                      <span className="snp-view" style={viewStyle(vw)} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
        {/* ===================== SIGNATURE ATTRIBUTES & GUARANTEES ===================== */}
        <section className="py-20 bg-[#F4F8FA] border-t border-[#D1E2E8]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#D1E2E8] gap-4 mb-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                  Atelier Standards
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#112732]">
                  Pure Sleep Without Compromise
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#2E5160] font-light max-w-md">
                Every Sri Senthur mattress formulation is subject to rigorous dynamic deflection testing before packaging.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-t border-[#D1E2E8] pt-6 space-y-2">
                <h3 className="font-serif text-xl text-[#112732]">{product.warranty}</h3>
                <p className="text-xs text-[#2E5160] font-light leading-relaxed">
                  Every mattress undergoes 100-cycle mechanical roller tests to verify zero sag and lifetime architectural core stability.
                </p>
              </div>

              <div className="border-t border-[#D1E2E8] pt-6 space-y-2">
                <h3 className="font-serif text-xl text-[#112732]">Direct White-Glove Dispatch</h3>
                <p className="text-xs text-[#2E5160] font-light leading-relaxed">
                  Delivered safely into your private master bedroom and placed onto your bed frame, with all transit wrap removed.
                </p>
              </div>

              <div className="border-t border-[#D1E2E8] pt-6 space-y-2">
                <h3 className="font-serif text-xl text-[#112732]">{product.trial}</h3>
                <p className="text-xs text-[#2E5160] font-light leading-relaxed">
                  Experience your mattress in the quiet of your bedroom for 100 nights. If your body is not fully rested, our team assists you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
