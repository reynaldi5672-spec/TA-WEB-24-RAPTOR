"use client";

import React from 'react';
import { X, MapPin, Star, Flame, Compass } from 'lucide-react';
// 1. IMPORT USETHEME GLOBAL
import { useTheme } from '@/app/context/ThemeContext';

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

interface DetailModalProps {
  item: Destinasi;
  onClose: () => void; // Hapus isDarkMode dari interface props
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  // 2. CONSUME TEMA GLOBAL DI SINI
  const { isDarkMode } = useTheme();

  return (
    /* PERBAIKAN: Mengganti kelas backdrop kurung siku manual dengan utility standar Tailwind */
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className={`w-full max-w-3xl rounded-[2.5rem] border overflow-hidden relative transition-all duration-500 max-h-[90vh] flex flex-col ${
          isDarkMode ? 'bg-[#111] border-white/10 text-white' : 'bg-white border-gray-200 text-black shadow-2xl'
        }`}
      >
        {/* Tombol Close Pojok Kanan Atas */}
        {/* PERBAIKAN: Menghapus z-5xl ilegal, diganti dengan z-10 standar */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-[#ffcc00] hover:text-black transition-all z-10 backdrop-blur-sm cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Bagian Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Gambar Besar */}
          <div className="h-80 md:h-96 w-full relative bg-gray-900">
            <img 
              src={item.gambar_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
              alt={item.nama} 
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradasi Biar Keren */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* Bagian Judul yang Menempel di Gambar */}
            <div className="absolute bottom-8 left-8 right-8 text-left">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-[#ffcc00] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-md font-mono">
                  // {item.kategori}
                </span>
                {item.is_viral && (
                  <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md animate-pulse flex items-center gap-1 shadow-md border border-red-500">
                    <Flame size={10} /> Viral Spot
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-md">
                {item.nama}
              </h2>
            </div>
          </div>

          {/* Konten Teks Info Lengkap */}
          <div className="p-8 md:p-10 space-y-6 text-left">
            {/* Baris Meta Data (Lokasi & Rating) */}
            <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl border ${
              isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            }`}>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Wilayah / Kabupaten</span>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <MapPin size={16} className="text-[#ffcc00]" /> {item.lokasi}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Penilaian Turis</span>
                <div className="flex items-center gap-1.5 font-black text-sm text-[#ffcc00]">
                  <Star size={16} fill="#ffcc00" /> {Number(item.rating).toFixed(1)} <span className="text-gray-500 font-normal text-xs">/ 5.0</span>
                </div>
              </div>
            </div>

            {/* Deskripsi Lengkap */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Compass size={12} /> Narasi & Deskripsi Wisata
              </span>
              <p className={`text-sm md:text-base leading-relaxed font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {item.deskripsi}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className={`p-6 border-t flex justify-end ${
          isDarkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100'
        }`}>
          <button 
            onClick={onClose}
            className={`px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-white/5 hover:bg-white/10 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            Tutup Informasi
          </button>
        </div>

      </div>
    </div>
  );
}