import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import PageLayout from "@/app/components/PageLayout";
import BlogList from "@/views/components/blogs/BlogList";
import ProductList from "@/views/components/catalog/ProductList";
import { Divider } from "@mui/material";
import { getProductsSaleService, getProductsService } from "@/app/services/productService";
import ProductCountDown from "@/views/components/catalog/ProductCountDown";
import ProductsByCategory from "@/views/components/catalog/ProductsByCategory";
import { getCategoriesService } from "@/app/services/categoryService";
import { getSlideshowsService } from "@/app/services/slideshowService";
import Slideshows from "@/views/components/slideshow/Slideshows";
import InstagramLayout from "@/views/components/instagrams/Instagram";

export const metadata = {
  title: "MyWebsite – Mua Sắm Online Uy Tín & Giá Tốt",
  description:
    "MyWebsite cung cấp các sản phẩm thời trang, điện tử, đồ gia dụng chất lượng cao với giá tốt, giao hàng nhanh và hỗ trợ đổi trả dễ dàng.",
  openGraph: {
    title: "MyWebsite – Mua Sắm Online Uy Tín & Giá Tốt",
    description:
      "Khám phá các sản phẩm thời trang, điện tử, đồ gia dụng chất lượng tại MyWebsite. Giao hàng nhanh và hỗ trợ đổi trả 7 ngày.",
    url: "https://nextjs15typescript.vercel.app",
    images: [
      {
        url: "/images/website-homepage.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyWebsite – Mua Sắm Online Uy Tín & Giá Tốt",
    description:
      "Khám phá các sản phẩm thời trang, điện tử, đồ gia dụng chất lượng tại MyWebsite. Giao hàng nhanh và hỗ trợ đổi trả 7 ngày.",
    images: ["/images/website-homepage.jpg"],
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
  const productSale = await getProductsSaleService();
  const categories = await getCategoriesService();
  const slideshows = await getSlideshowsService();

  return (
    <PageLayout title={t("title")}>
      <Slideshows slideshows={slideshows} />
      <ProductCountDown productSale={productSale} />
      <ProductsByCategory categories={categories} />
      <ProductList products={productList} />
      <Divider sx={{ mt: 2 }} />
      <BlogList />
      <InstagramLayout />
    </PageLayout>
  );
}
