import { notFound } from "next/navigation";
import { Locale, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import "normalize.css";
import "../../global.css";
import { Container } from "@mui/material";
import HeaderLayout from "@/app/components/HeaderLayout";
import FooterLayout from "@/app/components/FooterLayout";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<LayoutProps<"/[locale]">, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "LocaleLayout",
  });

  return {
    title: t("title"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <Container maxWidth="xl">
      <HeaderLayout />
      {children}
      <FooterLayout />
    </Container>
  );
}
