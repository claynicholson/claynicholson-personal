import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata = {
  metadataBase: new URL("https://claynicholson.com"),
  title: "Clay Nicholson",
  description:
    "MIT student (EECS, Course 6-5) and software engineer at Hack Club. Founder of Hack Club Blueprint and co-founder of Green Mountain Robotics.",
};

// Identity links (rel="me"). Next's metadata API has no field for these.
const ME_LINKS = [
  "https://github.com/claynicholson",
  "https://www.linkedin.com/in/claynicholson/",
  "https://x.com/claynicholsonvt",
  "https://www.wikidata.org/wiki/Q142215948",
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        {ME_LINKS.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
      </head>
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
