'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/**
 * Header component.
 * Displays the site title, student number, navigation links, hamburger menu, and dark mode toggle.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Persist dark mode in localStorage and apply class to <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // On mount, check localStorage for theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  // Navigation links for the menu
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
        {/* Dark mode toggle */}
        <div className="ml-4 flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
            <div className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 ${dark ? 'bg-black' : ''}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${dark ? 'translate-x-4' : ''}`}></div>
            </div>
            <span className="ml-2">Dark Mode</span>
          </label>
        </div>
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