"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, Globe 
} from 'lucide-react';

const daftarWisata = [
  // --- KATEGORI: TERPOPULER ---
  { 
    id: 1, category: 'terpopuler', title: 'Puncak Mas', src: '/puncak-mas.jpg', tag: 'CITY VIEW',
    subTitle: 'Selamat Datang di', desc: 'Pemandangan kota Bandar Lampung dari ketinggian.', quote: 'Pesona alam Lampung.'
  },
  { 
    id: 2, category: 'terpopuler', title: 'Bukit Aslan', src: '/bukit-aslan.jpg', tag: 'ART & NATURE',
    subTitle: 'Eksplorasi Estetika', desc: 'Perpaduan seni instalasi dengan view Teluk Lampung.', quote: 'Seni di atas bukit.'
  },
  { 
    id: 3, category: 'terpopuler', title: 'Lembah Hijau', src: '/lembah-hijau.jpg', tag: 'FAMILY PARK',
    subTitle: 'Wisata Keluarga', desc: 'Taman satwa dan waterboom di jantung kota.', quote: 'Kegembiraan keluarga.'
  },
  // --- KATEGORI: PANTAI ---
  { 
    id: 4, category: 'pantai', title: 'Pantai Mutun', src: '/pantai-mutun.jpg', tag: 'BEACH',
    subTitle: 'Pasir Putih', desc: 'Dekat dengan pusat kota dan pulau terdekat.', quote: 'Deburan ombak tenang.'
  },
  { 
    id: 5, category: 'pantai', title: 'Pantai Sari Ringgit', src: '/sari-ringgit.jpg', tag: 'DOCK VIEW',
    subTitle: 'Dermaga Cantik', desc: 'Gerbang menuju Pulau Mahitam dan spot snorkeling.', quote: 'Bahari yang memikat.'
  },
  { 
    id: 6, category: 'pantai', title: 'Pantai Sebalang', src: '/sebalang.jpg', tag: 'SUNSET SPOT',
    subTitle: 'Senja di Pesisir', desc: 'Tempat hits untuk menikmati matahari terbenam.', quote: 'Kopi dan senja.'
  },
  // --- KATEGORI: PEMANDANGAN ---
  { 
    id: 7, category: 'pemandangan', title: 'Lengkung Langit', src: '/lengkung-langit.jpg', tag: 'HITS',
    subTitle: 'Spot Foto Terbaik', desc: 'View kota yang estetik dari ketinggian.', quote: 'Abadikan momenmu.'
  },
  { 
    id: 8, category: 'pemandangan', title: 'Tahura Wan Abdul', src: '/tahura.jpg', tag: 'NATURE',
    subTitle: 'Hutan Raya', desc: 'Konservasi alam yang hijau dan asri.', quote: 'Kembali ke alam.'
  },
  { 
    id: 9, category: 'pemandangan', title: 'Bukit Sakura', src: '/bukit-sakura.jpg', tag: 'JAPANESE VIBE',
    subTitle: 'Nuansa Jepang', desc: 'Pemandangan laut dan kota dengan dekorasi unik.', quote: 'Sakura di Lampung.'
  }
];

export default function DestinasiLampung() {
  const [activeCategory, setActiveCategory] = useState('terpopuler');

  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const infoAktif = daftarWisata.find(item => item.category === activeCategory) || daftarWisata[0];

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#080808]/80 backdrop-blur-md flex justify-between items-center p-8 md:px-20 py-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,204,0,0.3)]">L</div>
          <span className="font-black tracking-tighter text-2xl uppercase italic">Visit<span className="text-[#ffcc00]">BDL</span></span>
        </Link>
        <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <a href="#destinasi" onClick={(e) => handleScroll(e, 'destinasi')} className="text-white border-b-2 border-[#ff4d4d] pb-1">Destinasi</a>
          <Link href="/kontak" className="hover:text-[#ffcc00] transition-colors">Kontak</Link>
        </div>
      </nav>

      {/* --- SECTION DESTINASI --- */}
      <section id="destinasi" className="py-32 scroll-mt-20 px-8 md:px-20">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header & Filter */}
          <div className="text-center mb-16">
            <h2 className="text-[#ff4d4d] text-5xl md:text-6xl font-black mb-10 uppercase italic tracking-tighter">
              Portfolio <span className="text-white">Showcase</span>
            </h2>
            
            <div className="flex justify-center gap-3 flex-wrap">
              {['terpopuler', 'pantai', 'pemandangan'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                    ${activeCategory === cat 
                      ? 'bg-[#ff4d4d] text-white shadow-lg shadow-[#ff4d4d]/20' 
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-[#ff4d4d]/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Utama: 1 Kolom Teks, Lalu Grid Gambar di Bawahnya agar Baris ke Samping Luas */}
          <div className="flex flex-col gap-16">
            
            {/* Bagian Deskripsi Singkat */}
            <div className="max-w-3xl border-l-4 border-[#ff4d4d] pl-8">
              <h3 className="text-[#ff4d4d] text-2xl font-bold mb-2 italic">{infoAktif.subTitle}</h3>
              <h2 className="text-5xl font-black mb-6 uppercase italic leading-none">{infoAktif.category} lampung</h2>
              <p className="text-gray-400 text-lg leading-relaxed italic">&quot;{infoAktif.quote}&quot;</p>
            </div>

            {/* --- GRID GAMBAR (3 KOLOM KE SAMPING) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {daftarWisata
                .filter((item) => item.category === activeCategory)
                .map((wisata) => (
                  <div key={wisata.id} className="group relative rounded-[2rem] overflow-hidden aspect-video border border-white/10 shadow-2xl bg-[#111]">
                    <img 
                      src={wisata.src} 
                      alt={wisata.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    />
                    
                    {/* Overlay Informasi Gambar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                      <div className="mb-3">
                        <span className="bg-[#ff4d4d] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {wisata.tag}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-[#ff4d4d] transition-colors">
                        {wisata.title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {wisata.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 bg-[#080808] text-center">
        <h2 className="text-2xl font-black italic mb-4 uppercase">Visit<span className="text-[#ff4d4d]">BDL</span></h2>
        <div className="opacity-20 text-[10px] tracking-[1.5em] uppercase font-bold text-white mb-4">Bandar Lampung — 2026</div>
        <div className="h-[1px] w-20 bg-[#ff4d4d]/30 mx-auto"></div>
      </footer>

    </main>
  );
}