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
      <header className="blog-article-header">
        <h1 className="blog-article-title">{post.title}</h1>
        <div className="blog-article-meta">
          <span className="blog-article-date">Published {post.date}</span>
          {post.tags.length > 0 && (
            <div className="blog-article-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-article-tag">
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

      <Link href="/blog" className="blog-article-back">
        &larr; All posts
      </Link>
    </article>
  );
}
