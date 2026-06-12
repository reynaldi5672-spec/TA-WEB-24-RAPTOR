"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  return (
    <nav className="flex items-center space-x-2 py-4 px-4 md:px-8 max-w-7xl mx-auto w-full z-20 relative" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#ffcc00] transition-colors">
            <Home className="w-3.5 h-3.5 mr-2" />
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={href} className="inline-flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {isLast ? (
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffcc00]">
                  {label}
                </span>
              ) : (
                <Link href={href} className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#ffcc00] transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
