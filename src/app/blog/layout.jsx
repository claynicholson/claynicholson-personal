import "./blog.css";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function BlogLayout({ children }) {
  return (
    <div
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} blog-page`}
    >
      <nav className="blog-nav">
        <div className="blog-nav-inner">
          <a href="/blog" className="blog-nav-logo">
            Clay Nicholson
          </a>
          <div className="blog-nav-links">
            <a href="/blog">Research</a>
            <a href="/">Terminal</a>
          </div>
        </div>
      </nav>
      <main className="blog-main">{children}</main>
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <span>Clay Nicholson</span>
          <a href="/">claynicholson.com</a>
        </div>
      </footer>
    </div>
  );
}
