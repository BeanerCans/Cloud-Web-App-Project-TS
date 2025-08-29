'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center py-2">
        <div className="flex-1 text-center text-2xl font-semibold">Title</div>
        <div className="flex-1 text-right pr-4">Student No.</div>
      </div>
      <nav className="flex items-center border-t-4 border-b-4 border-black py-1 px-2">
        <div className="flex gap-2 flex-1">
          <Link href="/" className="border px-1">Tabs</Link>
          <span>|</span>
          <Link href="/prelab" className="">Pre-lab Questions</Link>
          <span>|</span>
          <Link href="/escape-room" className="">Escape Room</Link>
          <span>|</span>
          <Link href="/coding-races" className="">Coding Races</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/about" className="">About</Link>
          <button className="ml-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className="block border-b-2 border-black w-full"></span>
              <span className="block border-b-2 border-black w-full"></span>
              <span className="block border-b-2 border-black w-full"></span>
            </div>
          </button>
          <div className="flex items-center ml-4">
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
      </nav>
    </header>
  );
}