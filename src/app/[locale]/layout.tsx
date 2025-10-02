import { notFound } from "next/navigation";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./global.css";
import toast, { Toaster } from "react-hot-toast";
import { AuthConextProvider } from "../context/AuthContext";
import { AppThemeProvider } from "../context/ThemeContext";
import { ProviderReduxt } from "../components/ProviderReduxt";

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
    <html className="h-full" lang={locale}>
      <body>
        <AuthConextProvider>
          <AppThemeProvider>
            <NextIntlClientProvider>
              <ProviderReduxt>{children}</ProviderReduxt>
            </NextIntlClientProvider>
          </AppThemeProvider>
          <Toaster
            containerStyle={{
              top: 20,
              bottom: 20,
              right: 20,
            }}
            toastOptions={{
              success: {
                style: {
                  background: "green",
                },
              },
              error: {
                style: {
                  background: "red",
                },
              },
            }}
          />
        </AuthConextProvider>
      </body>
    </html>
  );
}
