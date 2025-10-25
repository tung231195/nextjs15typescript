import { getPostService } from "@/app/services/postService";
import PostDetail from "@/views/components/blogs/BlogDetail";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params; // ✅ phải await
  const blog = await getPostService(id);

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://your-domain.com/${locale}/blog/${id}`,
      images: [{ url: blog.image ?? "/default.jpg", width: 800, height: 450 }],
      type: "article",
    },
    twitter: { card: "summary_large_image" },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        image: blog.image,
        author: { "@type": "Person", name: blog.author },
        publisher: {
          "@type": "Organization",
          name: "SmartBlog",
          logo: { "@type": "ImageObject", url: "https://your-domain.com/logo.png" },
        },
        datePublished: blog.publishedAt,
      }),
    },
  };
}

// ✅ Page component
export default async function PostDetailPage({ params }: Props) {
  const { id } = await params; // ✅ phải await
  const blog = await getPostService(id);
  return <PostDetail blog={blog} />;
}
