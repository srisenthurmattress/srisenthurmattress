import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found | Sri Senthur Mattress",
    };
  }

  return {
    title: `${product.name} | Sri Senthur Mattress`,
    description: `${product.tagline}. ${product.description}`,
    openGraph: {
      title: `${product.name} | Sri Senthur Mattress`,
      description: product.description,
      images: [
        {
          url: product.colors[0]?.image || "",
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
