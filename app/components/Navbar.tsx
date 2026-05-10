"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Wajib buat deteksi halaman
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const pathname = usePathname();

  // --- DEFINISI FUNGSI HANDLE CLICK (Taruh di sini) ---
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
    // Jika tidak di "/", dia bakal otomatis pindah ke "/" lewat href
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] backdrop-blur-md flex justify-between items-center p-8 md:px-20 py-6 border-b transition-all duration-500 ${
      isDarkMode ? 'bg-[#080808]/80 border-white/5' : 'bg-white/70 border-black/5 shadow-sm'
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
            className={`pb-1 hover:text-[#ffcc00] transition-all border-b-2 ${
              pathname === '/destinasi' 
              ? (isDarkMode ? 'text-white border-[#ffcc00]' : 'text-[#1a1a1a] border-[#ffcc00]') 
              : 'border-transparent'
            }`}
          >
            Destinasi
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
          className={`p-3 rounded-xl border transition-all duration-300 ${
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