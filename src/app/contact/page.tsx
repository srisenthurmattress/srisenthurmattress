"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    mattressType: "The Celestial Orthopedic",
    size: "King Size (78\" x 72\")",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please provide the required contact details.");
      return;
    }

    // Format all form data into a clean, comprehensive WhatsApp message
    const lines = [
      "🛎️ *NEW CONSULTATION REQUEST - SRI SENTHUR MATTRESS*",
      "──────────────────────────────",
      `*Client Name:* ${formData.name}`,
      `*Phone / WhatsApp:* ${formData.phone}`,
      `*Email Address:* ${formData.email}`,
      `*Mattress Formulation:* ${formData.mattressType}`,
      `*Bed Dimensions:* ${formData.size}`,
      `*Spinal / Frame Notes:* ${formData.message.trim() || "No additional notes specified."}`,
      "──────────────────────────────",
      "Sent via Sri Senthur Mattress Atelier Website",
    ];

    const messageText = lines.join("\n");
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`;

    setSubmittedWhatsAppUrl(whatsappUrl);

    // Open WhatsApp in a new tab/window
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: "Can I order custom cot dimensions for an antique or bespoke bed frame?",
      a: "Yes. Sri Senthur Mattress specializes in bespoke atelier tailoring. You can specify exact length, width, and height in millimetres, and our craftsmen build the internal coil and foam architecture to fit without structural distortion."
    },
    {
      q: "How does the 100-Night In-Home Sleep Trial operate?",
      a: "Every standard mattress comes with a 100-night trial in the privacy of your own bedroom. We recommend sleeping on the piece for at least 30 nights to allow spinal musculature to adapt to correct horizontal support. If you are unsatisfied, we arrange collection and full refund."
    },
    {
      q: "Do you provide white-glove bedroom delivery across India?",
      a: "Yes. For Tamil Nadu, Bangalore, and major metropolitan centres, our dedicated logistics team delivers directly into your master bedroom, unboxes the mattress, places it on your cot, and removes all protective transit packaging."
    },
    {
      q: "What does the 10-15 Year Warranty coverage entail?",
      a: "The warranty covers structural indentation greater than 1 inch, pocketed coil failure, rebonded foam breakdown, and perimeter border seam defects. We guarantee enduring architectural shape."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FA] text-[#112732]">
      <Header />

      <main className="flex-grow pt-24 sm:pt-28">
        {/* ===================== EDITORIAL BANNER ===================== */}
        <section className="relative min-h-[44vh] sm:min-h-[50vh] flex items-end justify-start overflow-hidden pb-12 sm:pb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://www.duroflexworld.com/cdn/shop/articles/1_13_d9ab07c4-be2e-44a7-b7d3-625fbd0bef19.png?v=1771240050"
              alt="Sri Senthur Mattress Experience Center"
              fill
              priority
              className="object-cover object-center filter brightness-[0.85]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A181F]/90 via-[#0A181F]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#D1E2E8] block mb-2">
              Atelier Concierge & Showroom
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-white max-w-2xl font-normal leading-[1.1]">
              Consultation & Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-[#D1E2E8]/80 font-light max-w-xl mt-3 leading-relaxed">
              Schedule a private sleep consultation at our Coimbatore showroom, submit bespoke dimensions, or speak directly with our senior orthopedic bedding craftsmen.
            </p>
          </div>
        </section>

        {/* ===================== TWO-COLUMN EDITORIAL CONTACT SECTION ===================== */}
        <section className="py-24 sm:py-32 bg-[#F4F8FA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Left Column: Enhanced Corporate & Workshop Details */}
              <div className="lg:col-span-5 space-y-10">
                {/* Section Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#17637D] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#17637D] font-semibold">
                      Live Workshop & Showroom
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-serif text-[#112732] leading-tight">
                    The Coimbatore Atelier
                  </h2>

                  <p className="text-xs sm:text-sm text-[#2E5160] font-light leading-relaxed">
                    Our flagship experience center and production atelier are situated in Western Tamil Nadu. Discerning homeowners, orthopedic consultants, and interior architects are welcome for private trial sessions and custom dimensional tailoring.
                  </p>
                </div>

                {/* Structured Contact Touchpoints */}
                <div className="space-y-6 border-t border-[#D1E2E8] pt-8">
                  {/* Physical Address */}
                  <div className="group flex items-start gap-4 pb-6 border-b border-[#D1E2E8]/60">
                    <div className="w-9 h-9 shrink-0 bg-[#EDF4F7] border border-[#D1E2E8] flex items-center justify-center text-[#17637D] transition-colors group-hover:bg-[#17637D] group-hover:text-white">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6474] block">
                        Experience Center & Works
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-[#112732] leading-relaxed font-normal">
                        Avinashi Road, Near Hope College, Peelamedu, Coimbatore, Tamil Nadu 641004
                      </p>
                      <a
                        href="https://maps.google.com/?q=Peelamedu,Coimbatore,Tamil+Nadu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#17637D] hover:underline pt-1"
                      >
                        <span>View on Google Maps</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Direct Telephony */}
                  <div className="group flex items-start gap-4 pb-6 border-b border-[#D1E2E8]/60">
                    <div className="w-9 h-9 shrink-0 bg-[#EDF4F7] border border-[#D1E2E8] flex items-center justify-center text-[#17637D] transition-colors group-hover:bg-[#17637D] group-hover:text-white">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6474] block">
                        Direct Telephony
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <a
                          href="tel:+919876543210"
                          className="font-mono text-sm text-[#112732] hover:text-[#17637D] transition-colors font-medium"
                        >
                          +91 98765 43210 <span className="text-[10px] font-sans text-[#3F6474] font-normal">(Concierge Mobile)</span>
                        </a>
                        <a
                          href="tel:+914222578900"
                          className="font-mono text-sm text-[#112732] hover:text-[#17637D] transition-colors"
                        >
                          +91 422 257 8900 <span className="text-[10px] font-sans text-[#3F6474] font-normal">(Showroom Desk)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Electronic Correspondence */}
                  <div className="group flex items-start gap-4 pb-6 border-b border-[#D1E2E8]/60">
                    <div className="w-9 h-9 shrink-0 bg-[#EDF4F7] border border-[#D1E2E8] flex items-center justify-center text-[#17637D] transition-colors group-hover:bg-[#17637D] group-hover:text-white">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6474] block">
                        Electronic Inquiries & Blueprints
                      </span>
                      <a
                        href="mailto:srisenthurmattress@gmail.com"
                        className="font-mono text-xs sm:text-sm text-[#112732] hover:text-[#17637D] transition-colors block"
                      >
                        srisenthurmattress@gmail.com
                      </a>
                      <p className="text-[10px] text-[#3F6474] font-light">
                        For bespoke cot drawings and corporate specifications.
                      </p>
                    </div>
                  </div>

                  {/* Visiting Hours */}
                  <div className="group flex items-start gap-4 pb-6 border-b border-[#D1E2E8]/60">
                    <div className="w-9 h-9 shrink-0 bg-[#EDF4F7] border border-[#D1E2E8] flex items-center justify-center text-[#17637D] transition-colors group-hover:bg-[#17637D] group-hover:text-white">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F6474] block">
                        Atelier Operating Hours
                      </span>
                      <p className="font-mono text-xs sm:text-sm text-[#112732]">
                        Monday – Saturday: 09:30 – 20:30 IST
                      </p>
                      <p className="font-mono text-xs text-[#3F6474]">
                        Sunday: 10:30 – 18:00 IST <span className="text-[10px] font-sans italic">(By Prior Appointment)</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Concierge Box */}
                <div className="p-6 bg-[#EDF4F7] border border-[#D1E2E8] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] uppercase tracking-[0.22em] font-mono text-[#17637D] font-semibold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Master Craftsman Desk
                    </span>
                    <span className="text-[9px] font-mono text-[#3F6474] bg-[#F4F8FA] px-2 py-0.5 border border-[#D1E2E8]">
                      Avg. Reply &lt; 15 Mins
                    </span>
                  </div>

                  <p className="text-xs text-[#2E5160] font-light leading-relaxed">
                    Prefer direct messaging? Send your bed dimensions, mattress requirements, or room photos directly to our senior master bedmaker.
                  </p>

                  <a
                    href="https://wa.me/919876543210?text=Hello%20Sri%20Senthur%20Mattress,%20I%20would%20like%20to%20consult%20regarding%20mattress%20formulations."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-3 bg-[#112732] text-white hover:bg-[#17637D] text-xs uppercase tracking-[0.14em] font-medium transition-colors"
                  >
                    <span>Message WhatsApp Concierge</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 3-Point White-Glove Guarantee Strip */}
                <div className="grid grid-cols-3 gap-4 pt-2 font-mono text-[10px] text-[#3F6474]">
                  <div className="space-y-1 border-t border-[#D1E2E8] pt-3">
                    <span className="text-[#17637D] block font-semibold">100-NIGHT</span>
                    <span>In-Home Sleep Trial</span>
                  </div>
                  <div className="space-y-1 border-t border-[#D1E2E8] pt-3">
                    <span className="text-[#17637D] block font-semibold">WHITE-GLOVE</span>
                    <span>Bedroom Delivery</span>
                  </div>
                  <div className="space-y-1 border-t border-[#D1E2E8] pt-3">
                    <span className="text-[#17637D] block font-semibold">15-YEAR</span>
                    <span>Core Warranty</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Refined Corporate Form */}
              <div className="lg:col-span-7 bg-[#EDF4F7] p-8 sm:p-12 border border-[#D1E2E8]">
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-1">
                    Formal Request
                  </span>
                  <h3 className="text-2xl font-serif text-[#112732]">
                    Atelier Consultation Dossier
                  </h3>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-5">
                    <CheckCircle2 className="w-12 h-12 text-[#17637D] mx-auto" />
                    <h4 className="text-xl sm:text-2xl font-serif text-[#112732]">
                      Your Consultation Request is Registered
                    </h4>
                    <p className="text-xs sm:text-sm text-[#2E5160] max-w-md mx-auto leading-relaxed font-light">
                      Your inquiry details have been formulated and forwarded to our WhatsApp atelier concierge. A senior bedding craftsman from our Coimbatore workshop will review your cot dimensions promptly.
                    </p>

                    {submittedWhatsAppUrl && (
                      <div className="pt-2">
                        <a
                          href={submittedWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#17637D] text-white hover:bg-[#112732] text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-sm"
                        >
                          <span>Open Inquiry in WhatsApp</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            mattressType: "The Celestial Orthopedic",
                            size: "King Size (78\" x 72\")",
                            message: "",
                          });
                        }}
                        className="inline-flex text-xs uppercase tracking-wider text-[#3F6474] hover:text-[#112732] border-b border-[#3F6474] pb-0.5 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474]">
                          Client Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. S. Anandhan"
                          className="w-full bg-[#F4F8FA] border border-[#D1E2E8] px-4 py-3 text-xs text-[#112732] focus:outline-none focus:border-[#17637D] transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474]">
                          Telephone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 00000"
                          className="w-full bg-[#F4F8FA] border border-[#D1E2E8] px-4 py-3 text-xs text-[#112732] focus:outline-none focus:border-[#17637D] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474]">
                        Electronic Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@residence.com"
                        className="w-full bg-[#F4F8FA] border border-[#D1E2E8] px-4 py-3 text-xs text-[#112732] focus:outline-none focus:border-[#17637D] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474]">
                          Mattress Formulation
                        </label>
                        <select
                          value={formData.mattressType}
                          onChange={(e) => setFormData({ ...formData, mattressType: e.target.value })}
                          className="w-full bg-[#F4F8FA] border border-[#D1E2E8] px-4 py-3 text-xs text-[#112732] focus:outline-none focus:border-[#17637D] transition-colors"
                        >
                          <option>The Celestial Orthopedic</option>
                          <option>The Royal Indulgence Hybrid</option>
                          <option>The Serene Natural Latex</option>
                          <option>The Imperial Pocket Spine</option>
                          <option>The Dual Balance Comfort</option>
                          <option>The Heritage Ortho-Coir</option>
                          <option>Undecided / Require Consultation</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474]">
                          Bed Dimensions
                        </label>
                        <select
                          value={formData.size}
                          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                          className="w-full bg-[#F4F8FA] border border-[#D1E2E8] px-4 py-3 text-xs text-[#112732] focus:outline-none focus:border-[#17637D] transition-colors"
                        >
                          <option>King Size (78" x 72")</option>
                          <option>Queen Size (78" x 60")</option>
                          <option>Double Size (75" x 48")</option>
                          <option>Single Size (75" x 36")</option>
                          <option>Bespoke Custom Dimensions</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-mono text-[#3F6474]">
                        Specific Spinal Requirements or Frame Notes
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please note any back pain history, desired firmness, or custom length and width specifications..."
                        className="w-full bg-[#F4F8FA] border border-[#D1E2E8] px-4 py-3 text-xs text-[#112732] focus:outline-none focus:border-[#17637D] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#112732] text-white hover:bg-[#17637D] text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Transmit Consultation Request</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== FAQ ACCORDION (HAIRLINE EDITORIAL) ===================== */}
        <section className="py-24 bg-[#EDF4F7] border-t border-[#D1E2E8]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="mb-14 text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#3F6474] block mb-2">
                Frequently Addressed Queries
              </span>
              <h2 className="text-3xl font-serif text-[#112732]">
                Atelier Questions & Protocols
              </h2>
            </div>

            <div className="divide-y divide-[#D1E2E8] border-y border-[#D1E2E8]">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="py-6">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-4 group"
                    >
                      <span className="font-serif text-lg sm:text-xl text-[#112732] group-hover:text-[#17637D] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#3F6474] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#17637D]" : ""
                          }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pt-3 text-xs sm:text-sm text-[#2E5160] leading-relaxed font-light">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== MAP / LOCATION MONOGRAPH ===================== */}
        <section className="bg-[#F4F8FA] border-t border-[#D1E2E8] py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#3F6474]">
            <div>
              <span className="font-serif text-base text-[#112732] block font-semibold mb-0.5">
                Sri Senthur Mattress Experience Atelier
              </span>
              <span>GPS Coordinates: 11.0260° N, 77.0118° E • Peelamedu, Coimbatore</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 uppercase tracking-wider text-[#17637D] hover:text-[#112732] transition-colors"
            >
              <span>View On Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
