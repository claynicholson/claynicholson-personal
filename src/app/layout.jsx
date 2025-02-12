import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] }); // Specify font weights if needed


export const metadata = {
  title: 'Clay Nicholson',
  description: 'Personal Website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={ibmPlexMono.className}>
          {children}
        </div>
      </body>
    </html>
  );
}
