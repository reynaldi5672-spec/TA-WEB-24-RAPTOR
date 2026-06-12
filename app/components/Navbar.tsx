"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Sun, Moon } from 'lucide-react';
// 1. IMPORT USETHME GLOBAL DARI CONTEXT
import { useTheme } from '@/app/context/ThemeContext';

/**
 * Navbar Component
 * 
 * Provides the main navigation menu, theme switcher, and language toggle.
 * It also tracks the number of favorite destinations from localStorage.
 * 
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export default function Navbar() {
  /**
   * Current URL pathname from Next.js navigation.
   * Used to highlight the active menu item.
   */
  const pathname = usePathname(); 
  
  /**
   * Global theme context state.
   */
  const { isDarkMode, setIsDarkMode } = useTheme(); 

  /**
   * Local state for the currently selected language (mocked).
   */
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');

  /**
   * Local state for the number of favorited items stored in the browser.
   */
  const [favoritesCount, setFavoritesCount] = useState(0); 

  useEffect(() => {
    /**
     * Synchronizes the favorites count from localStorage to local state.
     */
    const updateFavoritesCount = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("visitbdl_favorites");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setFavoritesCount(parsed.length);
            }
          } catch (e) {
            console.error("Error parsing favorites:", e);
          }
        } else {
          setFavoritesCount(0);
        }
      }
    };

    updateFavoritesCount(); 

    window.addEventListener('favorites-updated', updateFavoritesCount); 
    return () => {
      window.removeEventListener('favorites-updated', updateFavoritesCount);
    };
  }, []);

  /**
   * Handles navigation behavior when clicking the Home link.
   * If already on the homepage, it performs a smooth scroll to the top section.
   * 
   * @param {React.MouseEvent} e - The mouse click event.
   */
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/' /* Check if currently on the homepage */) {
      e.preventDefault();
      const element = document.getElementById('home');
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Smooth animated page scrolling
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    /* PERBAIKAN: z-'100' diubah menjadi z-50 standar utility bawaan Tailwind */
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md flex justify-between items-center p-8 md:px-20 py-6 border-b transition-all duration-500 ${
      isDarkMode ? 'bg-[#050505]/80 border-white/5' : 'bg-white/70 border-black/5 shadow-sm'
    }`}>
      
      {/* Logo */}
      <Link href="/" onClick={handleHomeClick} className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
        <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,204,0,0.3)]">
          L
        </div>
        <span className={`font-black tracking-tighter text-sm sm:text-lg md:text-xl uppercase italic ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
          Wisata<span className="text-[#ffcc00]"> Bandar Lampung</span>
        </span>
      </Link>

      <div className="flex items-center gap-10">
        {/* Menu Navigasi */}
        <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
          <Link 
            href="/" 
            onClick={handleHomeClick}
            className={`pb-1 cursor-pointer hover:text-[#ffcc00] transition-all border-b-2 ${
              pathname === '/' 
              ? (isDarkMode ? 'text-white border-[#ffcc00]' : 'text-[#1a1a1a] border-[#ffcc00]') 
              : 'border-transparent'
            }`}
          >
            Home
          </Link>

          <Link 
            href="/destinasi" 
            className={`pb-1 hover:text-[#ffcc00] transition-all border-b-2 flex items-center gap-1.5 ${
              pathname === '/destinasi' /* Check if currently on the destinations page */ 
              ? (isDarkMode ? 'text-white border-[#ffcc00]' : 'text-[#1a1a1a] border-[#ffcc00]') 
              : 'border-transparent'
            }`}
          >
            Destinasi
            {favoritesCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white animate-pulse">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link 
            href="/planner" 
            className={`pb-1 hover:text-[#ffcc00] transition-all border-b-2 ${
              pathname === '/planner' 
              ? (isDarkMode ? 'text-white border-[#ffcc00]' : 'text-[#1a1a1a] border-[#ffcc00]') 
              : 'border-transparent'
            }`}
          >
            Alat Travel
          </Link>

          <Link 
            href="/kontak" 
            className={`pb-1 hover:text-[#ffcc00] transition-all border-b-2 ${
              pathname === '/kontak' 
              ? (isDarkMode ? 'text-white border-[#ffcc00]' : 'text-[#1a1a1a] border-[#ffcc00]') 
              : 'border-transparent'
            }`}
          >
            Kontak
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button 
            onClick={() => setCurrentLang(currentLang === 'ID' ? 'EN' : 'ID')}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-black transition-all duration-300 cursor-pointer ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20' 
                : 'bg-black/5 border-black/5 text-[#1a1a1a] hover:bg-black/10 hover:border-black/20'
            }`}
          >
            {currentLang}
          </button>

          {/* Toggle Theme Button */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 text-[#ffcc00] hover:bg-white/10' 
              : 'bg-black/5 border-black/5 text-[#e6b800] hover:bg-black/10'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}