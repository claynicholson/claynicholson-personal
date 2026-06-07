import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog — Clay Nicholson",
  description: "Writing about code, AI, and things that shouldn't work but do.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-term-mauve mb-2">~/blog/*</h1>
      <p className="text-term-overlay mb-8">
        writing about code, ai, and things that shouldn&apos;t work but do.
      </p>

      {posts.length === 0 ? (
        <p className="text-term-overlay">no posts yet. check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-term-surface rounded-lg p-5 hover:border-term-mauve/50 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-term-text group-hover:text-term-mauve transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-term-overlay mt-1 text-sm">
                      {post.description}
                    </p>
                  </div>
                  <time className="text-term-overlay text-sm whitespace-nowrap">
                    {post.date}
                  </time>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-term-surface text-term-teal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
