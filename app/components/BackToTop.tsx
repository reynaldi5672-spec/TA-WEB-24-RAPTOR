"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

/**
 * BackToTop component displays an animated scroll to top arrow button.
 */
export default function BackToTop() {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl border transition-all duration-500 transform cursor-pointer shadow-2xl backdrop-blur-md ${
        isVisible ? 'translate-y-0 opacity-100 scale-100 hover:scale-110 active:scale-95' : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
      } ${
        isDarkMode
          ? 'bg-black/60 border-white/10 text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black shadow-black/50'
          : 'bg-white/80 border-black/5 text-[#e6b800] hover:bg-[#ffcc00] hover:text-black shadow-slate-300/50'
      }`}
      aria-label="Kembali ke atas"
    >
      <ArrowUp size={18} className="animate-pulse" />
    </button>
  );
}
