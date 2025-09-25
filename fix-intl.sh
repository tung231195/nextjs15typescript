#!/bin/bash
set -e

# Thêm file next-intl.config.ts
cat > next-intl.config.ts << 'EOF'
import { locales, defaultLocale } from './src/i18n';

export default {
  locales,
  defaultLocale
};
EOF

# Thêm middleware.ts
cat > middleware.ts << 'EOF'
import createMiddleware from 'next-intl/middleware';
import intlConfig from './next-intl.config';

export default createMiddleware(intlConfig);

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
EOF

# Chỉnh app/[locale]/layout.tsx
cat > src/app/[locale]/layout.tsx << 'EOF'
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Locale } from '@/i18n';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
EOF

# Chỉnh app/[locale]/page.tsx
cat > src/app/[locale]/page.tsx << 'EOF'
'use client';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4">{t('welcome')}</p>
    </div>
  );
}
EOF

# Đóng gói lại thành ZIP
cd ..
zip -r nextjs15intl-fixed.zip nextjs15intl
echo "✅ Project đã được fix và đóng gói thành nextjs15intl-fixed.zip"
