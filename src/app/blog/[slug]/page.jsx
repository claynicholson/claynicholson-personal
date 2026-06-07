import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: `${post.title} — Clay Nicholson`,
      description: post.description,
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function BlogPost({ params }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <header className="mb-8 pb-6 border-b border-term-surface">
        <h1 className="text-2xl sm:text-3xl font-bold text-term-text mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <time className="text-term-overlay">{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-term-surface text-term-teal"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-12 pt-6 border-t border-term-surface">
        <Link
          href="/blog"
          className="text-term-teal hover:text-term-blue transition-colors"
        >
          &larr; back to ~/blog
        </Link>
      </footer>
    </article>
  );
}
