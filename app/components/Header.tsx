'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Tabs' },
    { href: '/prelab', label: 'Pre-lab Questions' },
    { href: '/escape-room', label: 'Escape Room' },
    { href: '/coding-races', label: 'Coding Races' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="w-full">
      <div className="flex justify-between items-center py-2">
        <div className="flex-1 text-center text-2xl font-semibold">Matthew Elliott's CSE3CWA Assignment 1</div>
        <div className="flex-1 text-right pr-4">Student No: 22453699</div>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden ml-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center">
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>
      {/* Desktop nav */}
      <nav className="hidden sm:flex border-t-4 border-b-4 border-black py-1 px-2 justify-center gap-4">
        {navLinks.map((link, i) => (
          <span key={link.href} className="flex items-center">
            <Link href={link.href} className="px-1">{link.label}</Link>
            {i < navLinks.length - 1 && <span className="mx-2">|</span>}
          </span>
        ))}
      </nav>
      {/* Mobile nav */}
      {menuOpen && (
        <nav className="sm:hidden border-t-4 border-b-4 border-black py-1 px-2 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}