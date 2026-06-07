export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-term-base text-term-text crt">
      <nav className="border-b border-term-surface px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/blog"
            className="text-term-mauve font-bold hover:text-term-pink transition-colors"
          >
            ~/blog
          </a>
          <a
            href="/"
            className="text-term-overlay hover:text-term-teal transition-colors text-sm"
          >
            cd ~
          </a>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
