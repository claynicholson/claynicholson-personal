import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Clay Nicholson",
  description: "ssh guest@claynicholson.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${ibmPlexMono.className} h-full bg-term-base`}>
        {children}
      </body>
    </html>
  );
}
