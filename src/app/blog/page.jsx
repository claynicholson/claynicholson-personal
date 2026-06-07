import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Research — Clay Nicholson",
  description: "Writing about code, reverse engineering, and tools.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="blog-index-title">Research</h1>
      <p className="blog-index-subtitle">
        Writing about code, reverse engineering, and tools.
      </p>

      {posts.length === 0 ? (
        <p style={{ color: "#999" }}>No posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-post-card"
            >
              <div className="blog-post-card-date">{post.date}</div>
              <div className="blog-post-card-title">{post.title}</div>
              <div className="blog-post-card-description">
                {post.description}
              </div>
              {post.tags.length > 0 && (
                <div className="blog-post-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-post-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
