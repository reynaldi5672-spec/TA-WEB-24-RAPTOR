"use client";

import React from 'react';
import { X, Star, Flame, MapPin, Sparkles } from 'lucide-react';
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

interface CompareModalProps {
  items: Destinasi[];
  onClose: () => void;
  onRemove: (id: number) => void;
}

export default function CompareModal({ items, onClose, onRemove }: CompareModalProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Content Container */}
      <div className={`relative w-full max-w-5xl rounded-[2.5rem] border overflow-hidden max-h-[90vh] flex flex-col transition-all duration-500 shadow-2xl animate-in fade-in zoom-in duration-300 ${
        isDarkMode ? 'bg-[#0d0d0d] border-white/5 text-white' : 'bg-white border-black/5 text-[#1a1a1a]'
      }`}>
        
        {/* Header */}
        <div className={`p-6 md:p-8 flex items-center justify-between border-b ${
          isDarkMode ? 'border-white/5' : 'border-black/5'
        }`}>
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] mb-2 ${
              isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <Sparkles size={11} className="animate-pulse" /> Perbandingan Wisata
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
              Bandingkan Destinasi
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white' 
                : 'bg-black/5 border-black/5 hover:bg-black/10 text-gray-600 hover:text-black'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Comparison Table/Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 italic uppercase tracking-[0.2em] text-[10px] font-bold">
                Tidak ada destinasi untuk dibandingkan. Silakan pilih destinasi terlebih dahulu.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {items.map((item) => {
                const coverImage = item.gambar_url ? item.gambar_url.split(',')[0].trim() : 'https://via.placeholder.com/800x600?text=No+Image';
                return (
                  <div 
                    key={item.id}
                    className={`relative rounded-3xl border p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                      isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50/50 border-black/5'
                    }`}
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemove(item.id)}
                      className="absolute top-8 right-8 z-10 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
                      title="Hapus dari perbandingan"
                    >
                      <X size={12} />
                    </button>

                    <div className="space-y-4">
                      {/* Image Wrap */}
                      <div className="h-40 w-full relative rounded-2xl overflow-hidden bg-gray-900 shadow-inner">
                        <img 
                          src={coverImage} 
                          alt={item.nama}
                          className="w-full h-full object-cover"
                        />
                        {item.is_viral && (
                          <div className="absolute bottom-3 left-3 bg-red-600 text-white px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-[0.1em] border border-red-500">
                            🔥 VIRAL
                          </div>
                        )}
                      </div>

                      {/* General Info */}
                      <div className="space-y-2 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold tracking-widest text-[#ffcc00] uppercase flex items-center gap-1">
                            <MapPin size={10} /> {item.lokasi}
                          </span>
                          <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded border border-gray-500/20 uppercase bg-gray-500/5 text-gray-400">
                            {item.kategori || "Wisata"}
                          </span>
                        </div>
                        <h3 className="text-lg font-black uppercase italic tracking-tight leading-snug">
                          {item.nama}
                        </h3>
                      </div>

                      {/* Ratings & Quick Specs */}
                      <div className={`p-4 rounded-xl border space-y-2 text-xs font-bold ${
                        isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[10px] uppercase">Rating</span>
                          <span className="text-[#ffcc00] flex items-center gap-1 font-mono">
                            <Star size={12} fill="#ffcc00" /> {Number(item.rating).toFixed(1)} / 5.0
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[10px] uppercase">Tren</span>
                          <span className={item.is_viral ? "text-red-500 uppercase text-[10px]" : "text-gray-400 text-[10px]"}>
                            {item.is_viral ? "Populer / Viral" : "Standard"}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="text-left space-y-1">
                        <span className="text-gray-500 text-[9px] uppercase font-bold tracking-wider">Deskripsi</span>
                        <p className={`text-xs leading-relaxed font-medium line-clamp-6 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 md:p-8 border-t flex justify-end ${
          isDarkMode ? 'border-white/5 bg-[#0a0a0a]' : 'border-black/5 bg-gray-50'
        }`}>
          <button 
            onClick={onClose}
            className={`px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-[#1a1a1a] text-white hover:bg-black'
            }`}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
