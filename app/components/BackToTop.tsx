"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

/**
 * Custom hook to manage scroll visibility.
 * @returns {boolean} Whether the component should be visible.
 */
function useScrollVisibility(threshold: number = 300) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
}

/**
 * BackToTop component displays an animated scroll to top arrow button.
 */
export default function BackToTop() {
  const { isDarkMode } = useTheme();
  const isVisible = useScrollVisibility();

  /**
   * Performs smooth navigation back to the top of the body viewport
   */
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
<<<<<<< HEAD
      <ArrowUp size={18} className="animate-pulse" />
=======
      <ArrowUp size={18} className="animate-pulse group-hover:-translate-y-1 transition-transform" /> /* Pulse animate icon to draw user attention */
>>>>>>> origin/main
    </button>
  );
}
