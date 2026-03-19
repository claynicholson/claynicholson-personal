import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Clay Nicholson",
  description: "ssh guest@claynicholson.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${spaceMono.className} h-full bg-term-base crt`}>
        {children}
      </body>
    </html>
  );
}
