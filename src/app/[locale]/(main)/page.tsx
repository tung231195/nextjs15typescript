import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import PageLayout from "@/app/components/PageLayout";
import BlogList from "@/views/components/blogs/BlogList";
import ProductList from "@/views/components/catalog/ProductList";
import { Divider } from "@mui/material";

export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const t = useTranslations("IndexPage");

  return (
    <PageLayout title={t("title")}>
      <ProductList />
      <Divider sx={{ mt: 2 }} />
      <BlogList />
    </PageLayout>
  );
}
