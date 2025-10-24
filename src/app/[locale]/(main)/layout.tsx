import { notFound } from "next/navigation";
import { Locale, hasLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import "normalize.css";
import "../../global.css";
import { Container } from "@mui/material";
import HeaderLayout from "@/app/components/HeaderLayout";
import FooterLayout from "@/app/components/FooterLayout";
import StructuredData from "@/app/components/StructuredData";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<LayoutProps<"/[locale]">, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "LocaleLayout",
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_NGOX || "http://localhost:3000";
  const metadata = {
    metadataBase: new URL(baseUrl),
    title: "Next.js SEO Template",
    description: "Template Next.js chuẩn SEO với App Router.",
    icons: {
      icon: "/images/favicon.ico",
      apple: "/images/favicon32x32.png",
    },
  };
  return metadata;
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Next.js SEO Template",
    url: process.env.NEXT_PUBLIC_BASE_URL_NGOX,
    logo: `${process.env.NEXT_PUBLIC_BASE_URL_NGOX}/images/logo.png`,
    sameAs: ["https://facebook.com/smartshopvn", "https://www.instagram.com/smartshopvn/"],
  };

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <Container maxWidth="xl">
      <header>
        <h1>Next.js SEO Template</h1>
        <StructuredData data={schemaOrg} />
      </header>
      <HeaderLayout />
      {children}
      <FooterLayout />
    </Container>
  );
}
