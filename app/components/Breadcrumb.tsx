'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname(); // e.g., "/coding-races"
  if (!pathname) return null;

  // Split path into segments, filter out empty
  const segments = pathname.split('/').filter(Boolean);

  // If we're on home, no breadcrumb needed
  if (segments.length === 0) return null;

  // Build cumulative paths for each segment
  const crumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/');
    // Capitalize the segment name for display
    const label = seg
      .replace(/-/g, ' ')
      .replace(/^\w/, (c) => c.toUpperCase());
    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="my-2 text-sm">
      <ol className="list-reset flex text-gray-600">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {crumbs.map((c, idx) => (
          <li key={c.href} className="flex items-center gap-2">
            <span>/</span>
            {idx === crumbs.length - 1 ? (
              <span aria-current="page">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
