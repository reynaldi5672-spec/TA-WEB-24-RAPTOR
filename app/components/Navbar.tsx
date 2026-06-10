"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Sun, Moon } from 'lucide-react';
// 1. IMPORT USETHME GLOBAL DARI CONTEXT
import { useTheme } from '@/app/context/ThemeContext';

/**
 * Navbar component handles global site navigation, links mapping, and the theme switcher toggle.
 */
export default function Navbar() {
  const pathname = usePathname();
  
  // 2. CONSUME STATE TEMA GLOBAL (Hapus interface NavbarProps di atas)
  const { isDarkMode, setIsDarkMode } = useTheme();

  // State untuk jumlah favorit
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
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
            console.error(e);
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

  // --- DEFINISI FUNGSI HANDLE CLICK ---
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('home');
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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
      <Link href="/" onClick={handleHomeClick} className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,204,0,0.3)]">
          L
        </div>
        <span className={`font-black tracking-tighter text-2xl uppercase italic ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
          Visit<span className="text-[#ffcc00]">BDL</span>
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
              pathname === '/destinasi' 
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