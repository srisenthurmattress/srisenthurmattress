export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  fabric: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "orthopedic" | "pocket-spring" | "latex" | "hybrid" | "dual-comfort";
  categoryLabel: string;
  firmness: string;
  firmnessScore: number; // 1 to 10
  height: string;
  warranty: string;
  trial: string;
  startingPrice: string;
  description: string;
  fullDescription: string;
  features: string[];
  materials: { layer: string; detail: string }[];
  idealFor: string[];
  colors: ProductColor[];
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "celestial-orthopedic",
    name: "The Celestial Orthopedic",
    tagline: "Precision 5-Zone Spine Alignment & Therapeutic Relief",
    category: "orthopedic",
    categoryLabel: "Orthopedic Care",
    firmness: "Medium Firm (7.5/10)",
    firmnessScore: 7.5,
    height: "10 Inches (25 cm)",
    warranty: "10 Years Limited Warranty",
    trial: "100 Nights Risk-Free Trial",
    startingPrice: "₹24,999",
    description: "Engineered in collaboration with spine specialists, featuring high-density rebonded core and multi-zone pressure alleviation.",
    fullDescription: "The Celestial Orthopedic is Sri Senthur's flagship spine-care mattress. Designed specifically to relieve morning stiffness and align your lumbar curvature naturally, it utilizes our proprietary High-Density OrthoCore™ enveloped in breathable Belgian damask quilting. Each zone provides calibrated counter-pressure to shoulders, hips, and lower back.",
    features: [
      "5-Zone targeted ergonomic spine support",
      "High-density bonded core prevents sagging over decades",
      "Hypoallergenic anti-dust mite Belgian Jacquard ticking",
      "Active edge-to-edge support prevents perimeter roll-off",
      "Zero harmful VOCs, certified non-toxic foams"
    ],
    materials: [
      { layer: "Top Comfort Quilt", detail: "400 GSM Belgian Damask Quilted with Breathable Cloud Foam" },
      { layer: "Transition Layer", detail: "2-Inch Pressure-Relieving High Resilience Adaptive Foam" },
      { layer: "Core Support Base", detail: "6-Inch Medical-Grade High-Density Rebonded Orthopedic Core" },
      { layer: "Reinforced Under-layer", detail: "Anti-Skid Organic Cotton Base with Reinforced Piping" }
    ],
    idealFor: [
      "Individuals experiencing lower back, neck, or joint pain",
      "Side and back sleepers requiring firm spinal support",
      "Those who prefer a structured, posture-perfect sleep surface"
    ],
    colors: [
      {
        name: "Ivory Pearl",
        hex: "#F4F8FA",
        fabric: "Belgian Damask Jacquard",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Oatmeal Beige",
        hex: "#D1E2E8",
        fabric: "Organic Linen Weave",
        image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Espresso Trim",
        hex: "#112732",
        fabric: "Hand-Stitched Suede Edge",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Muted Sand",
        hex: "#C8DCE3",
        fabric: "Brushed Cotton Twill",
        image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    featured: true
  },
  {
    id: "royal-indulgence-hybrid",
    name: "The Royal Indulgence Hybrid",
    tagline: "Individually Encased Pocket Springs Meets Adaptive Cloud Foam",
    category: "hybrid",
    categoryLabel: "Luxury Hybrid",
    firmness: "Balanced Plush (5.5/10)",
    firmnessScore: 5.5,
    height: "12 Inches (30 cm)",
    warranty: "12 Years Warranty",
    trial: "100 Nights Risk-Free Trial",
    startingPrice: "₹34,500",
    description: "The pinnacle of zero-motion luxury. Independent tempered steel coils cradle your body without disturbing your partner.",
    fullDescription: "Experience hotel-grade sleep every single night. The Royal Indulgence Hybrid pairs up to 1,200 individually wrapped Swedish pocket coils with cooling gel-infused memory foam. Whether you toss or turn, your partner remains undisturbed thanks to true motion isolation and whisper-quiet response.",
    features: [
      "Over 1,000 independent pocket coils for zero motion transfer",
      "Infused cooling gel memory foam dissipates excess body heat",
      "Euro-top plush quilting provides immediate enveloping comfort",
      "Triple-stitch reinforced border for lasting architectural shape",
      "Natural airflow channels keep the mattress cool in warm climates"
    ],
    materials: [
      { layer: "Crown Euro-Top", detail: "2-Inch Euro-Pillow Top Quilted with Cashmere-Silk Blend" },
      { layer: "Cooling Comfort", detail: "2-Inch Gel-Infused Memory Foam for Instant Pressure Relief" },
      { layer: "Motion Isolation", detail: "7-Inch Individually Pocketed High-Tensile Steel Springs" },
      { layer: "Heavy Support", detail: "High-Density Foam Encasement on all 4 Perimeters" }
    ],
    idealFor: [
      "Couples seeking undisturbed, zero-motion sleep",
      "Sleepers who crave five-star luxury hotel plushness",
      "Hot sleepers requiring continuous thermal dissipation"
    ],
    colors: [
      {
        name: "Champagne Cream",
        hex: "#EAF2F5",
        fabric: "Cashmere Silk Damask",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Warm Mocha",
        hex: "#2E5160",
        fabric: "Tailored Velveteen Border",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Soft Beige",
        hex: "#D1E2E8",
        fabric: "Belgian Woven Chenille",
        image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    featured: true
  },
  {
    id: "serene-natural-latex",
    name: "The Serene Natural Latex",
    tagline: "100% Organic Tree-Tapped Latex with Breathable Bamboo Weave",
    category: "latex",
    categoryLabel: "Organic Botanical",
    firmness: "Gentle Responsive (6.0/10)",
    firmnessScore: 6.0,
    height: "8 Inches (20 cm)",
    warranty: "15 Years Warranty",
    trial: "100 Nights Risk-Free Trial",
    startingPrice: "₹38,900",
    description: "Sustainably harvested from certified rubber plantations, offering buoyant natural elasticity and lifetime breathability.",
    fullDescription: "Crafted purely from botanical rubber tree milk, The Serene Natural Latex delivers an uplifting, buoyant feel with zero synthetic chemicals. The natural pin-core perforation ensures active air convection with every breath, keeping you naturally cool throughout sultry tropical nights.",
    features: [
      "100% GOLS-certified organic natural Dunlop latex",
      "Thousands of natural ventilation channels for passive cooling",
      "Naturally anti-microbial, dust mite resistant, and hypoallergenic",
      "Instant buoyancy and responsive bounce without sagging",
      "Removable and washable organic bamboo fiber cover"
    ],
    materials: [
      { layer: "Surface Cover", detail: "Organic Bamboo Silk Fabric with Zipper Closure" },
      { layer: "Natural Cushion", detail: "2-Inch Soft Natural Latex Contour Topper" },
      { layer: "Botanical Core", detail: "6-Inch 7-Zone Pin-Core Natural Dunlop Latex Block" },
      { layer: "Base Shield", detail: "Unbleached Natural Cotton Canvas Base" }
    ],
    idealFor: [
      "Health-conscious families and allergy-sensitive individuals",
      "Eco-friendly homes prioritizing 100% natural, biodegradable sleep",
      "Sleepers who dislike sinking in memory foam and prefer gentle bounce"
    ],
    colors: [
      {
        name: "Natural Ecru",
        hex: "#EAF2F5",
        fabric: "Organic Bamboo Silk",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Linen Cream",
        hex: "#C8DCE3",
        fabric: "Unbleached Natural Flax",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Forest Earth",
        hex: "#1C3B49",
        fabric: "Artisanal Jute Piping",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    featured: true
  },
  {
    id: "senthur-signature-dual",
    name: "The Senthur Dual Comfort",
    tagline: "Two Sleeping Experiences in One Reversible Masterpiece",
    category: "dual-comfort",
    categoryLabel: "Dual Comfort",
    firmness: "Reversible: Medium Soft (5/10) & Firm (8/10)",
    firmnessScore: 6.5,
    height: "8 Inches (20 cm)",
    warranty: "8 Years Warranty",
    trial: "100 Nights Risk-Free Trial",
    startingPrice: "₹18,500",
    description: "Flip as seasons change or guest preferences dictate. Medium-soft comfort on one side, firm orthopedic support on the other.",
    fullDescription: "Versatility meets precision craftsmanship. The Senthur Dual Comfort eliminates guesswork by giving you two calibrated sleeping sensations in a single mattress. One side offers gentle body-cradling contouring, while the opposite side provides rigid, orthopedically sound spinal stabilization.",
    features: [
      "Dual-sided reversible utility: Gentle Comfort or Firm Support",
      "High Resilience Profile Foam promotes active airflow",
      "Reinforced center-third support for hips and lower back",
      "Durable contrast-piping clearly delineates each firmness level",
      "Lightweight yet remarkably robust core allows easy flipping"
    ],
    materials: [
      { layer: "Soft Side Cover", detail: "Ultra-Soft Knitted Jacquard Quilted with 1-Inch Soft Foam" },
      { layer: "Plush Layer", detail: "2.5-Inch High-Resilience Cloud Foam (Side A)" },
      { layer: "Firm Layer", detail: "4.5-Inch High-Density Rebonded Firm Core (Side B)" },
      { layer: "Firm Side Cover", detail: "Heavy-Duty Woven Damask Fabric Quilted with Firm Foam" }
    ],
    idealFor: [
      "Guests rooms catering to diverse comfort preferences",
      "Sleepers whose firmness needs shift across different seasons",
      "First-time buyers looking for the safest, most adaptable choice"
    ],
    colors: [
      {
        name: "Ivory & Camel",
        hex: "#D1E2E8",
        fabric: "Dual Knitted Cotton Blend",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Desert Sand",
        hex: "#C8DCE3",
        fabric: "Textured Heather Weave",
        image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Deep Chocolate",
        hex: "#112732",
        fabric: "Reinforced Suede Border",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    featured: true
  },
  {
    id: "cloud-luxe-pillow-top",
    name: "The Cloud Luxe Pillow Top",
    tagline: "Ultra-Plush Hotel Grand Suite Experience with Cashmere Jacquard",
    category: "pocket-spring",
    categoryLabel: "Pocket Spring Suite",
    firmness: "Gentle Cloud Plush (4.5/10)",
    firmnessScore: 4.5,
    height: "14 Inches (35 cm)",
    warranty: "12 Years Warranty",
    trial: "100 Nights Risk-Free Trial",
    startingPrice: "₹42,000",
    description: "Designed for those who desire zero pressure points and the sumptuous float of pure luxury bedding.",
    fullDescription: "Step into cloud-like grandeur. The Cloud Luxe features an authentic 3-inch tailored Euro pillow top filled with micro-down alternative fibers and open-cell aerated latex foam, resting above a double-tempered carbon steel pocket spring matrix.",
    features: [
      "3-Inch deep tailored Euro pillow top for weightless cradling",
      "Carbon-tempered steel pocket coils with targeted hip support",
      "Pure cashmere and organic cotton surface weave",
      "Integrated dual perimeter handles for effortless bed making",
      "Hand-tufted rosettes prevent internal layer shifting"
    ],
    materials: [
      { layer: "Surface", detail: "Pure Cashmere & Wool-Infused Jacquard" },
      { layer: "Pillow Topper", detail: "3-Inch Aerated Latex & Micro-Gel Down Alternative" },
      { layer: "Support Core", detail: "8-Inch Heavy Gauge Calibrated Pocketed Coils" },
      { layer: "Encasement", detail: "High-Density Foam Guard Perimeter Walls" }
    ],
    idealFor: [
      "Master bedroom suites seeking supreme visual grandeur",
      "Side sleepers suffering from hip, shoulder, or sciatic pressure",
      "Anyone who loves sinking into an ultra-fluffy, plush cloud"
    ],
    colors: [
      {
        name: "Pure Alabaster",
        hex: "#EDF4F7",
        fabric: "Cashmere Wool Blend",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Warm Gold Trim",
        hex: "#17637D",
        fabric: "Satin Thread Embroidery",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Classic Beige",
        hex: "#D1E2E8",
        fabric: "Belgian Chenille",
        image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    featured: false
  },
  {
    id: "spinepro-coir-ortho",
    name: "The SpinePro Coir & Rebonded",
    tagline: "Natural Pollachi Coir & High-Density Rebonded Therapeutic Core",
    category: "orthopedic",
    categoryLabel: "Coir Orthopedic",
    firmness: "Firm & Posture Correction (8.5/10)",
    firmnessScore: 8.5,
    height: "6 Inches (15 cm)",
    warranty: "7 Years Warranty",
    trial: "100 Nights Risk-Free Trial",
    startingPrice: "₹14,999",
    description: "Time-tested natural coir combined with medical rebonded foam, naturally cool and uncompromisingly firm.",
    fullDescription: "Rooted in traditional South Indian sleep wisdom and upgraded with modern orthopedic density engineering. The SpinePro combines rubberized coconut coir sourced from Pollachi with high-density rebonded foam to ensure your spine remains in absolute horizontal alignment.",
    features: [
      "Natural rubberized coir provides organic ventilation and firm support",
      "Eliminates pelvis sinking to reduce early morning back stiffness",
      "Naturally cooling structure ideal for warm and tropical weather",
      "Treated with anti-fungal and anti-dust mite botanical shields",
      "High-durability border tape with reinforced double needlework"
    ],
    materials: [
      { layer: "Cover Quilt", detail: "Heavy-Duty Floral Jacquard Fabric Quilted with Soft Foam" },
      { layer: "Breathable Layer", detail: "1-Inch Natural Rubberized Coconut Coir Pad" },
      { layer: "Core Support", detail: "4-Inch High-Density Rebonded Medical Foam" },
      { layer: "Base Layer", detail: "1-Inch Rubberized Coir with Protective Under-cloth" }
    ],
    idealFor: [
      "Seniors and individuals who advise from doctors for firm bed",
      "People who prefer a traditional, non-sinking sleeping surface",
      "Residents of warm, humid climates wanting cool natural coir airflow"
    ],
    colors: [
      {
        name: "Heritage Beige",
        hex: "#D1E2E8",
        fabric: "Floral Cotton Jacquard",
        image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Warm Earth Brown",
        hex: "#3F6474",
        fabric: "Heavy Weave Canvas Border",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Deep Cocoa",
        hex: "#112732",
        fabric: "Reinforced Twill Edge",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    featured: false
  }
];

export const SIZES = [
  { label: "King", dimensions: '78" x 72" (198 x 183 cm)', desc: "Spacious luxury for couples & master suites" },
  { label: "Queen", dimensions: '78" x 60" (198 x 152 cm)', desc: "Most popular choice for modern bedrooms" },
  { label: "Double", dimensions: '75" x 48" (190 x 122 cm)', desc: "Ideal for cozy bedrooms & guest rooms" },
  { label: "Single", dimensions: '75" x 36" (190 x 91 cm)', desc: "Perfect for single sleepers, kids, & daybeds" },
  { label: "Custom Size", dimensions: "Tailored to your exact bed frame", desc: "Crafted to any millimetre specification" },
];
