import "./globals.css";
import Link from "next/link";
import FloatingBackground from "@/components/FloatingBackground";
import { Providers } from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Irfan Ripat | Software Engineer",
  description: "Irfan Ripat is a Backend Engineer based in Indonesia, specializing in building scalable distributed systems with Golang.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <FloatingBackground />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <nav className="nav">
              <Link href="/" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Irfan Ripat</Link>
              <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link href="/blog">Blog</Link>
                <ThemeToggle />
              </div>
            </nav>
            <main>{children}</main>
            <footer className="footer">
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                <a href="https://github.com/irfanripat" target="_blank">GitHub</a>
                <a href="https://linkedin.com/in/irfanripat" target="_blank">LinkedIn</a>
                <a href="https://www.instagram.com/irfanripat/" target="_blank">Instagram</a>
              </div>
              <p>&copy; {new Date().getFullYear()} Irfan Ripat. Built with Next.js.</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
