'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Header />
          <main id="content" className="flex-grow p-4">
            <Breadcrumb />
          </main>
          <Footer />
        </body>
      </html>
    );
  }
    )

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }

    // Load last visited menu from cookies
    const last = Cookies.get('activeMenu');
    if (last) setActiveRoute(last);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark');
  }

  function handleNavClick(path: string) {
    Cookies.set('activeMenu', path, { expires: 7 }); // cookie lasts 7 days
    setActiveRoute(path);
    setOpen(false);
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/escape-room', label: 'Escape Room' },
    { href: '/coding-races', label: 'Coding Races' },
    { href: '/court-room', label: 'Court Room' },
  ];

  return (
    <header className="flex items-center justify-between p-4 border-b bg-gray-100 dark:bg-gray-800">
      <span className="font-bold">Student #12345678</span>

      <button 
        className="sm:hidden border px-2 py-1" 
        onClick={() => setOpen(!open)}
        aria-controls="mobile-menu"
        aria-expanded={open}
      >
        ☰
      </button>

      <nav className={`sm:flex gap-4 ${open ? 'block' : 'hidden'}`} id="mobile-menu">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => handleNavClick(l.href)}
            className={activeRoute === l.href ? 'font-bold underline' : ''}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button onClick={toggleTheme} className="border px-2 py-1 ml-2">
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}

export default Header;
