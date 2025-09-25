import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/app/components/PageLayout';
import BlogList from '@/views/components/blogs/BlogList';

export default function IndexPage({params}: PageProps<'/[locale]'>) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const t = useTranslations('IndexPage');

  return (
    <PageLayout title={t('title')}>
        <BlogList />
    </PageLayout>
  );
}
