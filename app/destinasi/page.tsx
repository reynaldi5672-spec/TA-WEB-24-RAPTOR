"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar'; 
import Breadcrumbs from '@/app/components/Breadcrumbs';
import DetailModal from '@/app/components/DetailModal'; 
import CompareModal from '@/app/components/CompareModal';
import Footer from '@/app/components/Footer';
// 1. IMPORT USETHEME GLOBAL DARI CONTEXT
import { useTheme } from '@/app/context/ThemeContext';
import { MapPin, Star, ArrowRight, Loader2, Search, Compass, Flame, Heart, Share2, GitCompare } from 'lucide-react';
import Swal from 'sweetalert2';

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

/**
 * DestinasiPage renders search inputs, filters, sort dropdowns, and results grid.
 */
export default function DestinasiPage() {
  // 2. GANTI STATE LOKAL LAMA DENGAN CONSUME THEME CONTEXT GLOBAL
  const { isDarkMode } = useTheme();
  
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]); // Primary data array from DB
  const [isLoading, setIsLoading] = useState(true); // Hydration loading spinner logic toggle
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const [activeCategory, setActiveCategory] = useState<"all" | "terpopuler" | "pantai" | "pemandangan" | "favorit">("all"); // Tracks currently filtered category tab
  const [showOnlyViral, setShowOnlyViral] = useState(false); // Filter toggle status for viral list only
  const [selectedDestinasi, setSelectedDestinasi] = useState<Destinasi | null>(null); // Holds current focused item for detail modal display
  const [sortBy, setSortBy] = useState<"default" | "rating-desc" | "rating-asc" | "name-asc" | "name-desc">("default"); // Active alphabetical or numerical sorting model
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<Destinasi[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (item: Destinasi) => {
    if (compareList.some((c) => c.id === item.id)) {
      setCompareList(compareList.filter((c) => c.id !== item.id));
    } else {
      if (compareList.length >= 3) {
        Swal.fire({
          title: "Batas Maksimal!",
          text: "Anda hanya dapat membandingkan maksimal 3 destinasi sekaligus.",
          icon: "warning",
          background: isDarkMode ? "#111" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          confirmButtonColor: "#ffcc00",
        });
        return;
      }
      setCompareList([...compareList, item]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter((c) => c.id !== id));
  };

  /**
   * Queries backend APIs for all tourism records stored in database
   */
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

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("visitbdl_favorites");
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }

      const storedSearches = localStorage.getItem("visitbdl_recent_searches");
      if (storedSearches) {
        try {
          setRecentSearches(JSON.parse(storedSearches));
        } catch (e) {
          console.error(e);
        }
      }
    }
  
    return () => {
      cancelAnimationFrame(animationFrameId);
      setMounted(false);
    };
  }, []);

  const toggleFavorite = (id: number) => {
    let updated: number[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("visitbdl_favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const handleSaveSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t !== trimmed);
      const updated = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem("visitbdl_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("visitbdl_recent_searches");
  };

  useEffect(() => {
    if (mounted && destinasi.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('id');
      if (urlId) {
        const found = destinasi.find(item => item.id === parseInt(urlId));
        if (found) {
          setSelectedDestinasi(found);
        }
      }
    }
  }, [mounted, destinasi]);

  /**
   * Shares individual destination web URLs via Native Share API
   */
  const handleShare = (item: Destinasi) => {
    const shareUrl = `${window.location.origin}/destinasi?id=${item.id}`;
    const shareText = `Yuk kunjungi destinasi seru "${item.nama}" di ${item.lokasi}!`;

    if (navigator.share) {
      navigator.share({
        title: item.nama,
        text: shareText,
        url: shareUrl,
      }).catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          Swal.fire({
            title: "Link Tersalin!",
            text: `Link untuk "${item.nama}" telah disalin ke papan klip.`,
            icon: "success",
            background: isDarkMode ? "#111" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            confirmButtonColor: "#ffcc00",
            timer: 2000,
            showConfirmButton: false
          });
        })
        .catch((err) => {
          console.error("Gagal menyalin link:", err);
        });
    }
  };

  const totalWisata = destinasi.length; // Total locations count statistic value
  const totalViral = destinasi.filter(item => item.is_viral).length;

  const filteredDestinasi = destinasi.filter(item => { // Apply category, viral status, and search keywords
    const matchesSearch = item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.lokasi?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
                            (activeCategory === "favorit" ? favorites.includes(item.id) : item.kategori === activeCategory);
    const matchesViral = !showOnlyViral || item.is_viral === true;
    return matchesSearch && matchesCategory && matchesViral;
  });

  const sortedDestinasi = [...filteredDestinasi].sort((a, b) => { // Sort destinations dynamically based on active key selection
    if (sortBy === "rating-desc") {
      return Number(b.rating) - Number(a.rating);
    }
    if (sortBy === "rating-asc") {
      return Number(a.rating) - Number(b.rating);
    }
    if (sortBy === "name-asc") {
      return a.nama.localeCompare(b.nama);
    }
    if (sortBy === "name-desc") {
      return b.nama.localeCompare(a.nama);
    }
    return 0;
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
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-10 pb-24 relative z-10">
        
        {/* --- WELCOME HERO BANNER & SEARCH BAR --- */}
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-14 border-b pb-12 text-left ${
          isDarkMode ? 'border-white/5' : 'border-black/5'
        }`}>
          <div className="space-y-4 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md shadow-sm transition-all duration-500 ${
              isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <Compass size={11} className="animate-spin [animation-duration:15s]" /> Selamat Datang di WISATA BANDAR LAMPUMNG
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
          <div className="relative w-full lg:w-96 flex flex-col gap-3 group text-left">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-[#ffcc00] transition-colors" size={16} />
              <input 
                type="text"
                placeholder="Cari pantai, bukit, kuliner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveSearch(searchTerm);
                  }
                }}
                className={`w-full py-4 pl-14 pr-6 rounded-2xl border transition-all duration-300 outline-none text-xs font-bold tracking-wider uppercase backdrop-blur-md ${
                  isDarkMode 
                  ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white placeholder-gray-600 shadow-2xl' 
                  : 'bg-white border-black/10 focus:border-[#ffcc00] text-black shadow-md placeholder-gray-400'
                }`}
              />
            </div>
            
            {/* Recent Searches Tags */}
            {recentSearches.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 px-1 animate-fadeIn">
                <span className={`text-[8px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Riwayat:
                </span>
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchTerm(term);
                      handleSaveSearch(term);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[8px] font-bold uppercase transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white' 
                        : 'bg-white border border-black/5 text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {term}
                  </button>
                ))}
                <button
                  onClick={handleClearSearches}
                  className="text-[8px] font-black uppercase text-red-500 hover:text-red-400 transition-colors ml-1 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            )}
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
              { id: 'pemandangan', label: '⛰️ Pemandangan' },
              { id: 'favorit', label: '❤️ Favorit Saya' }
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

          <div className="flex flex-wrap items-center gap-4">
            {/* Dropdown Urutan */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className={`px-4 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] outline-none border transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? 'bg-white/[0.01] border-white/10 text-gray-400 focus:border-[#ffcc00] focus:text-white'
                  : 'bg-transparent border-black/10 text-gray-500 focus:border-[#ffcc00] focus:text-black'
              }`}
            >
              <option value="default" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>🔄 Urutan: Default</option>
              <option value="rating-desc" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ Rating: Tertinggi</option>
              <option value="rating-asc" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ Rating: Terendah</option>
              <option value="name-asc" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>🔤 Nama: A - Z</option>
              <option value="name-desc" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>🔤 Nama: Z - A</option>
            </select>

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
        </div>

        {/* --- CONTENT AREA GRID --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-[#ffcc00] mb-4" size={40} />
            <p className="font-black tracking-[0.4em] text-[9px] uppercase text-gray-500 font-mono">Menghubungkan ke Database...</p>
          </div>
        ) : sortedDestinasi.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedDestinasi.map((item) => (
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
                  {/* --- REVISI UTAMA: AMBIL LINK GAMBAR PERTAMA DI SINI --- */}
                  <img 
                    src={item.gambar_url ? item.gambar_url.split(',')[0].trim() : 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={item.nama}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Badge Rating */}
                  <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[#ffcc00] text-xs font-black border border-white/10 shadow-lg">
                    <Star size={13} fill="#ffcc00" /> {Number(item.rating).toFixed(1)}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-6 left-6 z-20 p-2.5 rounded-xl bg-black/50 text-white hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 transition-all backdrop-blur-sm cursor-pointer border border-white/10 shadow-lg"
                  >
                    <Heart
                      size={14}
                      fill={favorites.includes(item.id) ? "#ef4444" : "none"}
                      className={favorites.includes(item.id) ? "text-red-500" : "text-white"}
                    />
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(item);
                    }}
                    className="absolute top-6 right-24 z-20 p-2.5 rounded-xl bg-black/50 text-white hover:bg-[#ffcc00] hover:text-black hover:scale-110 active:scale-90 transition-all backdrop-blur-sm cursor-pointer border border-white/10 shadow-lg"
                    title="Bagikan"
                  >
                    <Share2 size={14} />
                  </button>

                  {/* Badge Viral */}
                  {item.is_viral && (
                    <div className="absolute bottom-6 left-6 z-20 bg-red-600 text-white px-3.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.15em] border border-red-500 animate-pulse shadow-md">
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
                        {/* // {item.kategori} */}
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
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedDestinasi(item)}
                      className={`flex-1 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                        isDarkMode 
                        ? 'bg-white/5 hover:bg-[#ffcc00] hover:text-black border border-white/5 shadow-inner' 
                        : 'bg-[#1a1a1a] text-white hover:bg-[#ffcc00] hover:text-black shadow-md hover:shadow-xl'
                      }`}
                    >
                      Lihat Detail <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(item);
                      }}
                      className={`px-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        compareList.some((c) => c.id === item.id)
                          ? 'bg-[#ffcc00] border-[#ffcc00] text-black font-black shadow-lg shadow-[#ffcc00]/25'
                          : (isDarkMode
                              ? 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                              : 'bg-white border-black/10 text-gray-600 hover:bg-gray-50 hover:text-black')
                      }`}
                      title={compareList.some((c) => c.id === item.id) ? "Batal Bandingkan" : "Bandingkan"}
                    >
                      <GitCompare size={14} className={compareList.some((c) => c.id === item.id) ? "animate-pulse" : ""} />
                    </button>
                  </div>
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
            onClose={() => setSelectedDestinasi(null)} 
          />
        )}

        {/* --- FLOATING COMPARE DRAWER --- */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg transition-all duration-500 animate-in slide-in-from-bottom-12">
            <div className={`border p-4 rounded-[2rem] shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md ${
              isDarkMode 
                ? 'bg-black/80 border-white/10 text-white shadow-black/80' 
                : 'bg-white/95 border-black/5 text-[#1a1a1a] shadow-slate-200/80'
            }`}>
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Perbandingan</div>
                  <div className="text-xs font-black">{compareList.length} Destinasi Terpilih</div>
                </div>
                {/* Thumbnails */}
                <div className="flex -space-x-2.5 overflow-hidden">
                  {compareList.map((item) => {
                    const img = item.gambar_url ? item.gambar_url.split(',')[0].trim() : '';
                    return (
                      <img 
                        key={item.id}
                        src={img} 
                        alt={item.nama}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#ffcc00] object-cover"
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCompareList([])}
                  className={`px-3 py-2.5 rounded-xl font-bold text-[8px] uppercase tracking-wider transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-[#ffcc00] hover:scale-105 active:scale-95 transition-all text-black font-black text-[8px] uppercase tracking-widest px-4 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-[#ffcc00]/25"
                >
                  Bandingkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- COMPARE MODAL --- */}
        {showCompareModal && (
          <CompareModal
            items={compareList}
            onClose={() => setShowCompareModal(false)}
            onRemove={removeFromCompare}
          />
        )}

      </div>

      <Footer />
    </main>
  );
}