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
  title: "Clay Nicholson",
  description: "MIT '29 · Electrical Engineering with Computing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
