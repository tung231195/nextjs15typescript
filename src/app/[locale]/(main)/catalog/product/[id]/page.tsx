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
      name: product.brand ?? "Shopping",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: "VND",
      price: product.price,
      availability: product.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Demo Shopping",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "VND",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "VN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
      },
    },
    aggregateRating: product.ratingValue && {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: product.reviewCount || 1,
    },
  };
  const breadCrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://nextjs15typescript.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Danh mục",
        item: "https://nextjs15typescript.vercel.app/catalog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://nextjs15typescript.vercel.app/catalog/product/${id}`,
      },
    ],
  };
  return (
    <>
      <StructuredData data={productSchema} />
      <StructuredData data={breadCrumbSchema} />
      <ProductDetail />
    </>
  );
}
