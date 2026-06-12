"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  return (
    <nav className="flex items-center space-y-2 py-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#ffcc00] dark:text-gray-400 dark:hover:text-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
