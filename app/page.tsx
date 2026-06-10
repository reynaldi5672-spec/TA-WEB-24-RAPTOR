"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar'; 
import { useTheme } from '@/app/context/ThemeContext';
import WeatherWidget from '@/app/components/WeatherWidget';
import DetailModal from '@/app/components/DetailModal';
import { 
  Plane, Ship, ExternalLink, Mail, 
  Globe, Anchor, User, MessageSquare, Share2, Sparkles 
} from 'lucide-react';

// Data Foto Slide Destinasi Lampung
const DESTINASI_SLIDES = [
  {
    id: 1,
    title: "Pulau Pahawang",
    category: "Bahari",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2023/05/11/pulau-pahawang-lampung_169.jpeg?w=1200",
  },
  {
    id: 2,
    title: "Gigi Hiu",
    category: "Pantai Eksotis",
    image:
      "https://www.batiqa.com/upload/news/l/lampung-pantai-gigi-hiu_3mnwt.jpg",
  },
  {
    id: 3,
    title: "Taman Nasional Way Kambas",
    category: "Konservasi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaqyaLEfNgSUuxvLpZ_iFfdRy6PAXuJnGQ_Q&s",
  },
];

export default function PariwisataLampung() {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [destinasiList, setDestinasiList] = useState<any[]>([]);
  const [randomDestinasi, setRandomDestinasi] = useState<any | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    fetch('/api/destinasi')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDestinasiList(data);
        }
      })
      .catch(err => console.error("Gagal fetch destinasi:", err));

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleRandomInspirasi = () => {
    if (destinasiList.length === 0) return;
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * destinasiList.length);
      setRandomDestinasi(destinasiList[randomIndex]);
      setIsSpinning(false);
    }, 1200);
  };

  if (!mounted) return null;

  return (
    <main id="home" className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
      isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
    } selection:bg-[#ffcc00]/30`}>
      
      {/* --- BACKGROUND VECTOR DECORATION --- */}
      <div className="absolute top-0 inset-x-0 h-125 pointer-events-none opacity-40 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className={`absolute bottom-0 h-40 w-full bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-[#f8f9fa]'} to-transparent`}></div>
      </div>
      
      {/* Panggil Navbar Komponen */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      {/* SEBELUMNYA: max-w-1400px -> SEKARANG: max-w-7xl (Utility Standard) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-44 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <section className="text-left space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md shadow-sm transition-all duration-500 ${
              isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <Globe size={12} className="animate-pulse" /> The Gateway of Sumatra
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic tracking-tighter">
              Bandar <br /> 
              <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.25)]">Lampung</span>
            </h1>
            
            <div className="flex items-center gap-3">
              <h2 className={`text-xl md:text-2xl font-light tracking-wide transition-colors duration-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Explore Urban Tourism</h2>
              <span className="h-6 w-0.5 bg-[#ffcc00] animate-pulse"></span>
            </div>
            
            <p className={`max-w-lg leading-relaxed text-xs md:text-sm font-medium transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Rasakan perpaduan sempurna antara petualangan bahari yang eksotis dan gaya hidup urban yang hits di jantung kota Lampung.
            </p>

            {/* Buttons Group */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/destinasi">
                <button className={`px-8 py-4 rounded-2xl flex items-center gap-2.5 border transition-all duration-300 font-black text-[10px] uppercase tracking-wider cursor-pointer ${
                  isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white shadow-inner' 
                  : 'bg-white border-black/10 hover:bg-gray-50 shadow-md text-[#1a1a1a]'
                }`}>
                  DESTINASI LAMPUNG <ExternalLink size={14} />
                </button>
              </Link>
              <button 
                onClick={handleRandomInspirasi}
                className="bg-[#ffcc00] hover:bg-[#e6b800] px-8 py-4 rounded-2xl flex items-center gap-2.5 text-black font-black text-[10px] uppercase tracking-wider shadow-lg shadow-[#ffcc00]/25 hover:scale-105 transition-all cursor-pointer"
              >
                Cari Inspirasi <Sparkles size={14} />
              </button>
              <button className="bg-[#0055ff] hover:bg-[#0044cc] px-8 py-4 rounded-2xl flex items-center gap-2.5 text-white font-black text-[10px] uppercase tracking-wider shadow-lg shadow-[#0055ff]/20 hover:scale-105 transition-all cursor-pointer">
                Booking <Mail size={14} />
              </button>
            </div>

            {/* Sosmed Icons */}
            <div className={`flex gap-6 pt-6 transition-colors duration-500 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <User className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={20} />
              <MessageSquare className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={20} />
              <Share2 className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={20} />
            </div>
          </section>

          {/* RIGHT VISUAL INTERFACE */}
          <section className="relative">
            <div className={`absolute -inset-10 blur-[120px] rounded-full transition-all duration-700 pointer-events-none ${
              isDarkMode ? 'bg-[#ffcc00]/5' : 'bg-[#ffcc00]/15'
            }`}></div>
            
            <div className={`relative border rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 ${
              isDarkMode ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-md'
            }`}>
              <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 'font-mono' font-black">System Live</span>
                  </div>
                  <div className={`text-[9px] font-mono tracking-widest ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`}>REGION: BDL // 5.42S 105.26E</div>
              </div>

              {/* --- MAP CONTAINER DENGAN BACKGROUND EDITAN MAP REALISTIS & JANGKAR MATI NYALA --- */}
              {/* SEBELUMNYA: min-h-350px -> SEKARANG: min-h-80 (Utility Class Standard) */}
              <div className={`rounded-[2rem] p-8 border min-h-80 relative overflow-hidden transition-colors duration-500 ${
                isDarkMode ? 'bg-black/60 border-white/5' : 'bg-[#fcfcfc] border-black/5 shadow-inner'
              }`}>
                  
                  {/* Pola Garis Kontur Geografis / Peta Topografi */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="absolute inset-0 bg-[radial-gradient(#80808015_1.5px,transparent_1.5px)] bg-[size:24px_24px]"></div>
                      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M-100,200 Q100,100 300,250 T700,150 T1100,300" 
                          fill="none" 
                          stroke={isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"} 
                          strokeWidth="2" 
                          strokeDasharray="5,5"
                        />
                        <path 
                          d="M-50,280 Q200,180 450,320 T900,200 T1300,350" 
                          fill="none" 
                          stroke={isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"} 
                          strokeWidth="3" 
                        />
                        <path 
                          d="M100,50 Q400,200 600,100 T1200,220" 
                          fill="none" 
                          stroke={isDarkMode ? "rgba(255,204,0,0.03)" : "rgba(255,204,0,0.08)"} 
                          strokeWidth="1.5" 
                        />
                      </svg>
                  </div>

                  <div className="flex gap-2 mb-8 relative z-10">
                      <div className="w-12 h-1.5 bg-[#ffcc00] rounded-full"></div>
                      <div className={`w-6 h-1.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}></div>
                  </div>
                  
                  {/* Floating Cards - Airport (Stabil Kokoh) */}
                  <div className={`absolute top-10 right-6 border p-4 rounded-2xl shadow-xl flex items-center gap-4 transition-all duration-500 hover:scale-[1.02] relative z-10 ${
                    isDarkMode ? 'bg-[#1a1a1a]/90 backdrop-blur-md border-white/10 text-white' : 'bg-white/90 backdrop-blur-md border-black/5 text-[#1a1a1a]'
                  }`}>
                      <div className="p-2.5 bg-blue-500/10 rounded-xl"><Plane size={18} className="text-blue-400" /></div>
                      <div className="text-left">
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Airport</div>
                        <div className="text-xs font-black">Radin Inten II</div>
                      </div>
                  </div>

                  {/* Floating Cards - Harbor (Stabil Kokoh) */}
                  <div className={`absolute bottom-12 left-6 border p-4 rounded-2xl shadow-xl flex items-center gap-4 transition-all duration-500 hover:scale-[1.02] relative z-10 ${
                    isDarkMode ? 'bg-[#1a1a1a]/90 backdrop-blur-md border-white/10 text-white' : 'bg-white/90 backdrop-blur-md border-black/5 text-[#1a1a1a]'
                  }`}>
                      <div className="p-2.5 bg-green-500/10 rounded-xl"><Ship size={18} className="text-green-400" /></div>
                      <div className="text-left">
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Harbor</div>
                        <div className="text-xs font-black">Bakauheni</div>
                      </div>
                  </div>

                  {/* SIMBOL JANGKAR MATI NYALA (PULSE RADAR EFFECT) */}
                  <div className="absolute bottom-10 right-10 animate-pulse [animation-duration:2.5s] pointer-events-none select-none">
                    <Anchor 
                      size={130} 
                      className={`transition-colors duration-500 ${
                        isDarkMode 
                          ? 'text-white/[0.04] drop-shadow-[0_0_15px_rgba(255,255,255,0.02)]' 
                          : 'text-black/[0.03] drop-shadow-[0_0_10px_rgba(0,0,0,0.01)]'
                      }`} 
                    />
                  </div>
              </div>

              {/* Tourism Hub Footer Info */}
              <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffcc00]/10 border border-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00] animate-spin [animation-duration:15s]">
                      <Anchor size={20} />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em]">Tourism Hub</div>
                      <div className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>Bandar Lampung</div>
                    </div>
                  </div>
                  <div className="flex-1 md:max-w-xs w-full">
                    <WeatherWidget />
                  </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* --- POPUP MODAL RANDOM DETAIL --- */}
      {randomDestinasi && (
        <DetailModal 
          item={randomDestinasi} 
          onClose={() => setRandomDestinasi(null)} 
        />
      )}

      {/* --- SPINNING OVERLAY --- */}
      {isSpinning && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4 animate-bounce">
            <div className="w-16 h-16 rounded-3xl bg-[#ffcc00] flex items-center justify-center text-black shadow-2xl shadow-[#ffcc00]/30">
              <Sparkles size={32} className="animate-spin [animation-duration:3s]" />
            </div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]">
              Mencari Petualangan Anda...
            </p>
          </div>
        </div>
      )}

    </main>
  );
}