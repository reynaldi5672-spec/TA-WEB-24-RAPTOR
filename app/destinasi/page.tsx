"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { MapPin, Star, ArrowRight, Loader2, Search } from 'lucide-react';

// 1. Definisi Interface agar TypeScript gak ngamuk
interface Destinasi {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  gambar_url: string;
  rating: number;
}

export default function DestinasiPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]); // Default awal array kosong
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
    fetchDestinasi();
  }, []);

  const fetchDestinasi = async () => {
    try {
      const response = await fetch('/api/destinasi');
      const data = await response.json();

      // --- SATPAM ANTI-ERROR ---
      // Jika data adalah array (berhasil), masukkan ke state.
      // Jika data bukan array (misal: object error {"message": "Gagal.."}), kasih array kosong.
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

  // 2. Filter data (Aman karena 'destinasi' dijamin selalu array)
  const filteredDestinasi = Array.isArray(destinasi) 
    ? destinasi.filter(item =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lokasi?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-[#080808] text-white' : 'bg-[#fafafa] text-[#1a1a1a]'
    }`}>
      
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="max-w-[1400px] mx-auto px-8 md:px-20 pt-44 pb-20">
        
        {/* --- HEADER & SEARCH --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4 ${
              isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/15 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              Discovery Mode
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              Daftar <span className="text-[#ffcc00]">Destinasi</span>
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Cari pantai, bukit, atau kuliner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-4 pl-12 pr-6 rounded-2xl border transition-all outline-none text-sm ${
                isDarkMode 
                ? 'bg-white/5 border-white/10 focus:border-[#ffcc00]/50 text-white' 
                : 'bg-white border-black/10 focus:border-[#ffcc00] text-black shadow-sm'
              }`}
            />
          </div>
        </div>

        {/* --- CONTENT --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-[#ffcc00] mb-4" size={48} />
            <p className="font-bold tracking-[0.3em] text-[10px] uppercase text-gray-500">Menghubungkan ke Database...</p>
          </div>
        ) : filteredDestinasi.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDestinasi.map((item) => (
              <div 
                key={item.id}
                className={`group rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:translate-y-[-8px] ${
                  isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-black/5 shadow-2xl shadow-black/[0.03]'
                }`}
              >
                <div className="h-72 bg-gray-900 relative overflow-hidden">
                  <img 
                    src={item.gambar_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={item.nama}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-[#ffcc00] text-sm font-black border border-white/10">
                    <Star size={16} fill="#ffcc00" /> {item.rating}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-[#ffcc00] text-[10px] font-black uppercase tracking-widest mb-4">
                    <MapPin size={14} /> {item.lokasi}
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight">{item.nama}</h3>
                  <p className={`text-sm leading-relaxed mb-8 line-clamp-3 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.deskripsi}
                  </p>
                  
                  <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                    isDarkMode 
                    ? 'bg-white/5 hover:bg-[#ffcc00] hover:text-black border border-white/5' 
                    : 'bg-[#1a1a1a] text-white hover:bg-[#ffcc00] hover:text-black'
                  }`}>
                    Lihat Detail <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-white/10 rounded-[3rem]">
            <p className="text-gray-500 italic uppercase tracking-widest text-xs">
              {searchTerm ? `Destinasi "${searchTerm}" tidak ditemukan` : "Database kosong atau koneksi bermasalah."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}