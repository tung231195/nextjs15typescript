import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import HeaderLayout from '../components/HeaderLayout';
import FooterLayout from '../components/FooterLayout';
import "normalize.css";
import "./global.css"
import { Container} from '@mui/material';
import { AppThemeProvider } from '../context/ThemeContext';
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>
) {
  const {locale} = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'LocaleLayout'
  });

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body>
        <AppThemeProvider>
          <NextIntlClientProvider>
              <Container maxWidth="xl">
                <HeaderLayout />
                {children}
                <FooterLayout />
              </Container>
          </NextIntlClientProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
