import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import PageLayout from "@/app/components/PageLayout";
import BlogList from "@/views/components/blogs/BlogList";
import ProductList from "@/views/components/catalog/ProductList";
import { Divider } from "@mui/material";
import { getProductsService } from "@/app/services/productService";

export const metadata = {
  title: "Hướng dẫn SEO Next.js: Meta, Open Graph & App Router | MyWebsite",
  description:
    "Hướng dẫn tối ưu SEO với App Router, meta description, H1, Open Graph, sitemap và redirects.",
  openGraph: {
    title: "Tối ưu SEO cho Next.js App Router",
    description:
      "Hướng dẫn tối ưu SEO với App Router, meta description, H1, Open Graph, sitemap và redirects.",
    url: "https://example.com",
    images: [{ url: "/images/seo-image.jpg", width: 800, height: 450 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};
type TPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function IndexPage({ params }: TPageProps) {
  const { locale } = await params;

  setRequestLocale(locale as Locale);

  const t = await getTranslations("IndexPage");
  const productList = await getProductsService();
  return (
    <PageLayout title={t("title")}>
      <ProductList products={productList} />
      <Divider sx={{ mt: 2 }} />
      <BlogList />
    </PageLayout>
  );
}
