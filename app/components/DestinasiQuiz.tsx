"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Star, MapPin, Compass, ShieldCheck, Share2 } from 'lucide-react';
import Link from 'next/link';

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

const FALLBACK_DESTINASI: Destinasi[] = [
  {
    id: 1,
    nama: "Pulau Pahawang",
    lokasi: "Pesawaran",
    deskripsi: "Surga snorkeling dengan keindahan terumbu karang dan pasir putih yang memukau.",
    gambar_url: "https://awsimages.detik.net.id/community/media/visual/2023/05/11/pulau-pahawang-lampung_169.jpeg?w=1200",
    rating: 4.8,
    is_viral: true,
    kategori: "pantai"
  },
  {
    id: 2,
    nama: "Pantai Gigi Hiu",
    lokasi: "Tanggamus",
    deskripsi: "Gugusan batu karang tajam yang berdiri kokoh menghadapi deburan ombak Samudra Hindia.",
    gambar_url: "https://awsimages.detik.net.id/community/media/visual/2023/09/14/pantai-gigi-hiu_169.jpeg?w=1200",
    rating: 4.7,
    is_viral: false,
    kategori: "pantai"
  },
  {
    id: 3,
    nama: "Way Kambas",
    lokasi: "Lampung Timur",
    deskripsi: "Pusat konservasi gajah sumatra yang ramah lingkungan dan kaya edukasi flora-fauna.",
    gambar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2LYAdUqyjuyydcRo_slrfg9Meoqe4d2V2xg&s",
    rating: 4.6,
    is_viral: true,
    kategori: "pemandangan"
  },
  {
    id: 4,
    nama: "Puncak Mas",
    lokasi: "Bandar Lampung",
    deskripsi: "Destinasi wisata perbukitan yang menawarkan spot foto instagramable dan pemandangan kota.",
    gambar_url: "https://awsimages.detik.net.id/community/media/visual/2023/05/11/pulau-pahawang-lampung_169.jpeg?w=1200",
    rating: 4.5,
    is_viral: false,
    kategori: "pemandangan"
  }
];

export default function DestinasiQuiz() {
  const { isDarkMode } = useTheme();
  const [destinasi, setDestinasi] = useState<Destinasi[]>(FALLBACK_DESTINASI);
  const [step, setStep] = useState(1);
  
  // Answers state
  const [prefType, setPrefType] = useState<"bahari" | "alam" | "urban" | null>(null);
  const [prefCompanion, setPrefCompanion] = useState<"solo" | "couple" | "family" | null>(null);
  const [prefBudget, setPrefBudget] = useState<"low" | "mid" | "high" | null>(null);

  const [recommended, setRecommended] = useState<(Destinasi & { matchScore: number })[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchDestinasi = async () => {
      try {
        const response = await fetch('/api/destinasi');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setDestinasi(data);
        }
      } catch (err) {
        console.error("Gagal memuat destinasi untuk kuis, menggunakan fallback.", err);
      }
    };
    fetchDestinasi();
  }, []);

  const handleCalculate = () => {
    if (!prefType || !prefCompanion || !prefBudget) return;

    // Scoring logic
    const scored = destinasi.map((item) => {
      let score = 50; // base score

      // Category match logic
      const cat = item.kategori.toLowerCase();
      if (prefType === "bahari" && (cat.includes("pantai") || cat.includes("bahari") || cat.includes("laut"))) {
        score += 30;
      } else if (prefType === "alam" && (cat.includes("pemandangan") || cat.includes("bukit") || cat.includes("alam") || cat.includes("hutan"))) {
        score += 30;
      } else if (prefType === "urban" && (cat.includes("kuliner") || cat.includes("kota") || cat.includes("belanja") || cat.includes("sejarah"))) {
        score += 30;
      } else {
        score += 10; // partial category match points
      }

      // Companion adjustments
      if (prefCompanion === "family" && (item.is_viral || item.rating >= 4.5)) {
        score += 10; // families love high rating & popular places
      } else if (prefCompanion === "solo" && !item.is_viral) {
        score += 5; // solo travelers like quiet hidden gems
      } else if (prefCompanion === "couple" && cat.includes("pantai")) {
        score += 10; // romantic couple sunset walks
      }

      // Budget score helper
      if (prefBudget === "low") {
        if (!item.is_viral) score += 5; // non-viral is usually cheaper entry fees
      } else if (prefBudget === "high") {
        if (item.is_viral) score += 5; // premium tourists love popular spots
      }

      // Rating modifier (adds up to 10 points)
      score += Math.round((item.rating - 4.0) * 10);

      // Max score cap
      const matchScore = Math.min(100, Math.max(0, score));

      return {
        ...item,
        matchScore
      };
    });

    // Sort by match score desc and take top 3
    const sorted = scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
    setRecommended(sorted);
    setStep(4); // Go to results
  };

  const handleReset = () => {
    setPrefType(null);
    setPrefCompanion(null);
    setPrefBudget(null);
    setStep(1);
    setRecommended([]);
  };

  const handleShareQuiz = () => {
    if (recommended.length === 0) return;
    const listText = recommended.map((item, idx) => `${idx + 1}. ${item.nama} (${item.matchScore}% Cocok)`).join('\n');
    const shareText = `Hasil Kuis Destinasi Wisata Bandar Lampung saya:\n${listText}\n\nTemukan destinasi idealmu juga di Wisata Bandar Lampung!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert("Hasil rekomendasi kuis berhasil disalin ke papan klip!");
        })
        .catch(err => {
          console.error("Gagal menyalin ulasan kuis:", err);
        });
    } else {
      alert("Fitur salin tidak didukung pada browser Anda.");
    }
  };

  if (!mounted) return null;

  return (
    <div className={`p-6 md:p-10 rounded-[2.5rem] border text-left transition-all duration-500 ${
      isDarkMode ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-xl'
    }`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-6 border-gray-500/10">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
            isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
          }`}>
            <Compass size={22} className="animate-spin [animation-duration:20s]" />
          </div>
          <div>
            <span className="text-[#ffcc00] text-[9px] font-black uppercase tracking-[0.2em]">Pencarian Destinasi Cerdas</span>
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight leading-none">
              Kuis <span className="text-[#ffcc00]">Cari Destinasi</span> Idealmu
            </h2>
          </div>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="text-[10px] font-black tracking-widest text-[#ffcc00] uppercase font-mono">
            Langkah {step} / 3
          </div>
        )}
      </div>

      {/* Progress Line */}
      {step < 4 && (
        <div className={`h-1 w-full rounded-full mb-8 overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
          <div 
            className="h-full bg-[#ffcc00] transition-all duration-500 rounded-full"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>
      )}

      {/* STEP 1: Preference Type */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className={`text-sm md:text-base font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
            1. Tipe liburan seperti apa yang paling Anda dambakan?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: "bahari", title: "🌊 Wisata Bahari & Pantai", desc: "Menikmati pasir putih, deburan ombak besar, dan keindahan bawah laut snorkeling." },
              { id: "alam", title: "⛰️ Alam Bebas & Bukit", desc: "Melihat lanskap pemandangan dari ketinggian bukit, cagar alam, dan udara sejuk." },
              { id: "urban", title: "🏢 Kuliner & Urban City", desc: "Mencicipi makanan khas daerah, nongkrong di kafe hits, dan wisata belanja kota." }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPrefType(opt.id as any)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 ${
                  prefType === opt.id
                    ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00]'
                    : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/20' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wider">{opt.title}</div>
                <div className="text-[10px] text-gray-500 leading-relaxed font-medium mt-3">{opt.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              disabled={!prefType}
              onClick={() => setStep(2)}
              className="bg-[#ffcc00] hover:bg-[#ffb300] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
            >
              Lanjutkan <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Preference Companion */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className={`text-sm md:text-base font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
            2. Dengan siapa Anda akan merencanakan perjalanan ini?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: "solo", title: "🎒 Solo Traveler", desc: "Petualangan mandiri, menyukai ketenangan, kebebasan, dan eksplorasi tersembunyi." },
              { id: "couple", title: "❤️ Pasangan Romantis", desc: "Menikmati waktu berdua, pemandangan estetik, sunset indah, dan suasana tenang." },
              { id: "family", title: "👨‍👩‍👧‍👦 Keluarga / Teman", desc: "Perjalanan rombongan, ramah anak-anak, fasilitas lengkap, dan aktivitas seru bersama." }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPrefCompanion(opt.id as any)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 ${
                  prefCompanion === opt.id
                    ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00]'
                    : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/20' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wider">{opt.title}</div>
                <div className="text-[10px] text-gray-500 leading-relaxed font-medium mt-3">{opt.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className={`px-6 py-3.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
                isDarkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={14} /> Kembali
            </button>
            <button
              disabled={!prefCompanion}
              onClick={() => setStep(3)}
              className="bg-[#ffcc00] hover:bg-[#ffb300] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
            >
              Lanjutkan <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Preference Budget */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className={`text-sm md:text-base font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
            3. Berapa anggaran per orang yang Anda alokasikan?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: "low", title: "🪙 Backpacker / Hemat", desc: "Mencari tempat murah meriah, gratis masuk, atau tiket terjangkau (< Rp 20rb)." },
              { id: "mid", title: "💵 Sedang / Fleksibel", desc: "Nyaman dengan tiket standar, sewa fasilitas penunjang, budget rekreasi menengah." },
              { id: "high", title: "💎 Premium / Mewah", desc: "Siap menikmati paket trip kapal privat, penginapan mewah, kuliner eksklusif." }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPrefBudget(opt.id as any)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 ${
                  prefBudget === opt.id
                    ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00]'
                    : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/20' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wider">{opt.title}</div>
                <div className="text-[10px] text-gray-500 leading-relaxed font-medium mt-3">{opt.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className={`px-6 py-3.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
                isDarkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={14} /> Kembali
            </button>
            <button
              disabled={!prefBudget}
              onClick={handleCalculate}
              className="bg-[#ffcc00] hover:bg-[#ffb300] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-[#ffcc00]/20"
            >
              Hitung Hasil <Sparkles size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Results */}
      {step === 4 && (
        <div className="space-y-8 animate-fadeIn text-center">
          <div className="space-y-2">
            <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.25em]">Hasil Pencocokan Kuis</span>
            <h3 className={`text-2xl font-black uppercase italic tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Rekomendasi <span className="text-[#ffcc00]">Destinasi Cocok</span> Untuk Anda
            </h3>
            <p className={`text-xs max-w-lg mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Berdasarkan jawaban Anda, kami telah memindai data destinasi dan mencocokkannya dengan rating serta kategori terbaik.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-4 text-left">
            {recommended.map((item) => {
              const mainImg = item.gambar_url ? item.gambar_url.split(',')[0].trim() : '';
              return (
                <div 
                  key={item.id}
                  className={`group rounded-[2rem] overflow-hidden border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                    isDarkMode 
                      ? 'bg-white/[0.01] border-white/5 hover:border-white/10' 
                      : 'bg-white border-black/[0.04] shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="h-44 w-full relative overflow-hidden bg-gray-900">
                    <img 
                      src={mainImg} 
                      alt={item.nama}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Match Score Badge */}
                    <div className="absolute top-4 left-4 bg-emerald-600 border border-emerald-500 text-white px-3 py-1 rounded-xl text-[9px] font-black tracking-widest uppercase">
                      🎯 {item.matchScore}% Cocok
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 text-[#ffcc00] text-[10px] font-black border border-white/10">
                      <Star size={10} fill="#ffcc00" /> {Number(item.rating).toFixed(1)}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-[#ffcc00] text-[8px] font-black uppercase tracking-wider">
                        <MapPin size={10} /> {item.lokasi}
                      </div>
                      <h4 className="text-base font-black uppercase tracking-tight italic transition-colors group-hover:text-[#ffcc00]">
                        {item.nama}
                      </h4>
                      <p className={`text-[11px] leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.deskripsi}
                      </p>
                    </div>

                    <Link href={`/destinasi?id=${item.id}`}>
                      <button className={`w-full py-3 rounded-lg font-black text-[8px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        isDarkMode 
                          ? 'bg-white/5 hover:bg-[#ffcc00] hover:text-black border border-white/5' 
                          : 'bg-[#1a1a1a] text-white hover:bg-[#ffcc00] hover:text-black'
                      }`}>
                        Selengkapnya <ArrowRight size={10} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 pt-4 border-t border-gray-500/10">
            <button
              onClick={handleShareQuiz}
              className={`px-6 py-3.5 rounded-xl border text-xs font-black uppercase tracking-widest flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00] hover:bg-[#ffcc00]/10' 
                  : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00] hover:bg-[#ffcc00]/20'
              }`}
            >
              <Share2 size={14} /> Bagikan Hasil
            </button>
            <button
              onClick={handleReset}
              className={`px-6 py-3.5 rounded-xl border text-xs font-black uppercase tracking-widest flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                  : 'bg-white border-black/10 hover:bg-gray-50 text-gray-700 shadow-sm'
              }`}
            >
              <RefreshCw size={14} /> Ulangi Kuis
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
