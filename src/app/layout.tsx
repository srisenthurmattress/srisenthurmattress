import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Senthur Mattress | Luxury Mattresses & Artisanal Sleep Craft",
  description:
    "Experience Comfort. Sleep Better. Live Better. Sri Senthur Mattress crafts bespoke, premium orthopedic, pocket spring, and natural latex mattresses.",
  keywords:
    "Sri Senthur Mattress, luxury mattress, orthopedic mattress, natural latex mattress, pocket spring, bedroom comfort, premium bedding India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F4F8FA] text-[#112732] font-sans antialiased selection:bg-[#17637D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
