// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Make this a client component because we need cookies/localStorage
export const metadata = {
  title: 'Assignment 1',
  description: 'Next.js app for La Trobe',
};

// We'll inject a client header/footer using children layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main id="content" className="flex-grow p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark');
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-gray-100 dark:bg-gray-800">
      <span className="font-bold">Student # 12345678</span>
      <button 
        className="sm:hidden border px-2 py-1" 
        onClick={() => setOpen(!open)}
        aria-controls="mobile-menu"
        aria-expanded={open}
      >
        ☰
      </button>
      <nav className={`sm:flex gap-4 ${open ? 'block' : 'hidden'}`} id="mobile-menu">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/escape-room">Escape Room</Link>
        <Link href="/coding-races">Coding Races</Link>
        <Link href="/court-room">Court Room</Link>
      </nav>
      <button onClick={toggleTheme} className="border px-2 py-1 ml-2">
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="p-4 border-t text-center bg-gray-100 dark:bg-gray-800">
      © {new Date().getFullYear()} Your Name – Student #12345678 – {new Date().toLocaleDateString()}
    </footer>
  );
}
