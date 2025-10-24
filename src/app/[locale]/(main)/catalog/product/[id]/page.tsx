import StructuredData from "@/app/components/StructuredData";
import { getProductService } from "@/app/services/productService";
import ProductDetail from "@/views/components/catalog/product/ProductDetail";
type TProductProps = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_NGOX || "http://localhost:3000";
export async function generateMetadata({ params }: TProductProps) {
  const { id } = await params;
  const product = await getProductService(id);
  if (!product) return { title: "Sản phẩm không tồn tại" };
  return {
    title: `${product.name}`,
    description: product.description,
    alternates: {
      canonical: `${baseUrl}/products/${id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${baseUrl}/products/${id}`,
      siteName: "SmartShop.vn",
      images: [
        {
          url: `${baseUrl}${product.image}`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [`${baseUrl}${product.image}`],
    },
    metadataBase: new URL(baseUrl),
  };
}
export default async function ProductPage({ params }: TProductProps) {
  const { id } = await params;
  // ✅ 3️⃣ Structured Data JSON-LD cho Google
  const product = await getProductService(id);
  console.log("product data", product, id);
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product?.name,
    image: [`${baseUrl}${product.images[0]}`],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: "VND",
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "SmartShop.vn",
      },
    },
    aggregateRating: product.ratingValue && {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount || 1,
    },
    review: product.reviews?.map((r: any) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.body,
      name: r.title,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
    })),
  };

  return (
    <>
      <StructuredData data={productSchema} />
      <ProductDetail />
    </>
  );
}
