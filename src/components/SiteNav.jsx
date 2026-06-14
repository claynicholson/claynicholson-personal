import StatusLight from "@/components/StatusLight";

// Shared navbar rendered once in the root layout, so /, /status and /blog all
// get the identical header.
export default function SiteNav() {
  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="site-nav-logo">
          Clay Nicholson
        </a>
        <div className="site-nav-links">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
        </div>
      </div>
      <StatusLight />
    </nav>
  );
}
