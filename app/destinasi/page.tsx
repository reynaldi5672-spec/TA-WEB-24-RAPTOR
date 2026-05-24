"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar'; 
import DetailModal from '@/app/components/DetailModal'; 
// 1. IMPORT USETHEME GLOBAL DARI CONTEXT
import { useTheme } from '@/app/context/ThemeContext';
import { MapPin, Star, ArrowRight, Loader2, Search, Compass, Flame } from 'lucide-react';

interface Destinasi {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  gambar_url: string;
  rating: number;
  is_viral: boolean;
  kategori: string;
}

export default function DestinasiPage() {
  // 2. GANTI STATE LOKAL LAMA DENGAN CONSUME THEME CONTEXT GLOBAL
  const { isDarkMode } = useTheme();
  
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [activeCategory, setActiveCategory] = useState<"all" | "terpopuler" | "pantai" | "pemandangan">("all");
  const [showOnlyViral, setShowOnlyViral] = useState(false);
  const [selectedDestinasi, setSelectedDestinasi] = useState<Destinasi | null>(null);

  const fetchDestinasi = async () => {
    try {
      const response = await fetch('/api/destinasi');
      const data = await response.json();
      if (Array.isArray(data)) {
        setDestinasi(data);
      } else {
        console.error("API tidak mengembalikan array:", data);
        setDestinasi([]); 
      }
    } catch (error) {
      console.error("Gagal fetch data:", error);
      setDestinasi([]); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });
  
    fetchDestinasi();
  
    return () => {
      cancelAnimationFrame(animationFrameId);
      setMounted(false);
    };
  }, []);

  const totalWisata = destinasi.length;
  const totalViral = destinasi.filter(item => item.is_viral).length;

  const filteredDestinasi = destinasi.filter(item => {
    const matchesSearch = item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.lokasi?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.kategori === activeCategory;
    const matchesViral = !showOnlyViral || item.is_viral === true;
    return matchesSearch && matchesCategory && matchesViral;
  });

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
      isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
    }`}>
      
      {/* --- BACKGROUND VECTOR DECORATION --- */}
      <div className="absolute top-0 inset-x-0 h-125 pointer-events-none opacity-40 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className={`absolute bottom-0 h-40 w-full bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-[#f8f9fa]'} to-transparent`}></div>
      </div>
      
      {/* 3. HAPUS PROPS PROPS LAMA PADA NAVBAR KARENA NAVBAR SUDAH OTOMATIS BACA GLOBAL */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-40 pb-24 relative z-10">
        
        {/* --- WELCOME HERO BANNER & SEARCH BAR --- */}
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-14 border-b pb-12 text-left ${
          isDarkMode ? 'border-white/5' : 'border-black/5'
        }`}>
          <div className="space-y-4 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md shadow-sm transition-all duration-500 ${
              isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <Compass size={11} className="animate-spin [animation-duration:15s]" /> Selamat Datang di VisitBDL
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              Jelajahi <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.15)]">Destinasi Terbaik</span> Lampung
            </h1>
            <p className={`text-xs md:text-sm font-medium max-w-xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Temukan surga tersembunyi, hamparan pantai pasir putih, hingga spot pemandangan paling hits. 
              Saat ini mengelola <span className="text-[#ffcc00] font-bold">{totalWisata} lokasi wisata</span> aktif and <span className="text-red-500 font-bold">{totalViral} spot viral</span> terverifikasi.
            </p>
          </div>

          {/* Search Input Card */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-[#ffcc00] transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Cari pantai, bukit, kuliner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-4 pl-14 pr-6 rounded-2xl border transition-all duration-300 outline-none text-xs font-bold tracking-wider uppercase backdrop-blur-md ${
                isDarkMode 
                ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white placeholder-gray-600 shadow-2xl' 
                : 'bg-white border-black/10 focus:border-[#ffcc00] text-black shadow-md placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* --- NAVIGASI FILTER KATEGORI ULTRA CLEAN --- */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b pb-8 ${
          isDarkMode ? 'border-white/5' : 'border-black/5'
        }`}>
          {/* Tab Kategori Utama */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'all', label: '✨ Semua' },
              { id: 'terpopuler', label: '⭐ Terpopuler' },
              { id: 'pantai', label: '🌊 Pantai' },
              { id: 'pemandangan', label: '⛰️ Pemandangan' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#ffcc00] text-black shadow-xl scale-105'
                    : (isDarkMode ? 'bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/20' : 'bg-white border border-black/5 text-gray-600 hover:bg-gray-50 hover:text-black')
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tombol Cepat Filter Viral */}
          <button
            onClick={() => setShowOnlyViral(!showOnlyViral)}
            className={`px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 border cursor-pointer ${
              showOnlyViral
                ? 'bg-red-600 border-red-500 text-white shadow-xl scale-105'
                : (isDarkMode ? 'bg-white/[0.01] border-white/10 text-gray-500 hover:text-white hover:border-white/30' : 'bg-transparent border-black/10 text-gray-400 hover:text-black hover:border-black/30')
            }`}
          >
            <Flame size={12} className={showOnlyViral ? 'animate-bounce' : ''} /> Tren Viral {showOnlyViral ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* --- CONTENT AREA GRID --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-[#ffcc00] mb-4" size={40} />
            <p className="font-black tracking-[0.4em] text-[9px] uppercase text-gray-500 font-mono">Menghubungkan ke Database...</p>
          </div>
        ) : filteredDestinasi.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDestinasi.map((item) => (
              <div 
                key={item.id}
                className={`group rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-[#0d0d0d] border-white/5 hover:border-white/10' 
                    : 'bg-white border-black/[0.04] shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Image Wrap */}
                <div className="h-72 w-full relative overflow-hidden bg-gray-900">
                  <img 
                    src={item.gambar_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={item.nama}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Badge Rating */}
                  <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[#ffcc00] text-xs font-black border border-white/10 shadow-lg">
                    <Star size={13} fill="#ffcc00" /> {Number(item.rating).toFixed(1)}
                  </div>

                  {/* Badge Viral */}
                  {item.is_viral && (
                    <div className="absolute top-6 left-6 bg-red-600 text-white px-3.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.15em] border border-red-500 animate-pulse shadow-md">
                      🔥 VIRAL
                    </div>
                  )}
                </div>

                {/* Info Card Content */}
                <div className="p-8 flex-1 flex flex-col justify-between text-left space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.15em]">
                        <MapPin size={13} /> {item.lokasi}
                      </div>
                      
                      {/* Neon Monochrome Label */}
                      <span className={`text-[8px] font-black font-mono uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border ${
                        isDarkMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50 border-black/5 text-gray-500'
                      }`}>
                        // {item.kategori}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight leading-snug transition-colors group-hover:text-[#ffcc00]">
                      {item.nama}
                    </h3>
                    <p className={`text-xs md:text-sm leading-relaxed font-medium line-clamp-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {item.deskripsi}
                    </p>
                  </div>
                  
                  {/* Action Interactive Button */}
                  <button 
                    onClick={() => setSelectedDestinasi(item)}
                    className={`w-full py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                      isDarkMode 
                      ? 'bg-white/5 hover:bg-[#ffcc00] hover:text-black border border-white/5 shadow-inner' 
                      : 'bg-[#1a1a1a] text-white hover:bg-[#ffcc00] hover:text-black shadow-md hover:shadow-xl'
                    }`}
                  >
                    Lihat Detail <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Bordered Empty State */
          <div className={`text-center py-36 border-2 border-dashed rounded-[2.5rem] ${
            isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-gray-50/50'
          }`}>
            <p className="text-gray-500 italic uppercase tracking-[0.25em] text-[10px] font-bold">
              {searchTerm ? `Destinasi "${searchTerm}" tidak ditemukan` : "Belum ada destinasi untuk kategori ini di database."}
            </p>
          </div>
        )}

        {/* --- POPUP MODAL DETAIL REAL-TIME --- */}
        {selectedDestinasi && (
          <DetailModal 
            item={selectedDestinasi} 
            isDarkMode={isDarkMode} 
            onClose={() => setSelectedDestinasi(null)} 
          />
        )}

      </div>
    </main>
  );
}