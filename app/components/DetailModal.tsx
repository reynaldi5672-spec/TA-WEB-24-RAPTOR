"use client";

import React, { useState, useEffect } from 'react';
import { X, MapPin, Star, Flame, Compass, ChevronLeft, ChevronRight, Send, Loader2, MessageSquare, Share2 } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane, FaTwitter, FaCopy } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';
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

interface Komentar {
  id: number;
  nama_user: string;
  isi_komentar: string;
  rating: number;
  created_at: string;
}

interface DetailModalProps {
  item: Destinasi;
  onClose: () => void;
}

/**
 * DetailModal displays detail view for a specific selected location.
 */
export default function DetailModal({ item, onClose }: DetailModalProps) {
  const { isDarkMode } = useTheme();
  
  // State untuk drawer sharing
  const [showShareDrawer, setShowShareDrawer] = useState(false);
  
  // State untuk Slider Gambar
  // Memecah gambar_url berdasarkan tanda koma (,). Jika cuma 1 gambar, array isinya tetap 1.
  const daftarGambar = item.gambar_url ? item.gambar_url.split(',').map(url => url.trim()) : ['https://via.placeholder.com/800x600?text=No+Image']; // Multi-image slider source list
  const [activeSlide, setActiveSlide] = useState(0); // Tracks current visible slide index

  // State untuk Data Komentar dari DB
  const [listKomentar, setListKomentar] = useState<Komentar[]>([]); // User feedback entries list state
  const [isCommentsLoading, setIsCommentsLoading] = useState(true); // Reviews section load control indicator

  // State untuk Form Input Review Baru
  const [formReview, setFormReview] = useState({ nama_user: '', isi_komentar: '', rating: 5 }); // New review details form model state
  const [isSubmittingReview, setIsSubmittingReview] = useState(false); // Review submit loading indicator state

  // URL sharing sosial media
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/destinasi?id=${item.id}` : "";
  const shareText = `Yuk kunjungi destinasi seru "${item.nama}" di ${item.lokasi}!`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  // Fetch komentar khusus destinasi ini saat modal terbuka
  const fetchKomentar = async () => {
    try {
      const res = await fetch(`/api/komentar?destinasi_id=${item.id}`);
      if (res.ok) {
        const data = await res.json();
        setListKomentar(data);
      }
    } catch (err) {
      console.error("Gagal memuat ulasan:", err);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchKomentar();
  }, [item.id]);

  // Handler Share Modal
  const handleShareModal = () => {
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

  // Handler Navigasi Slider Gambar
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === daftarGambar.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? daftarGambar.length - 1 : prev - 1));
  };

  // Handler Submit Review (Public Guest)
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formReview.nama_user.trim() || !formReview.isi_komentar.trim()) {
      Swal.fire({ title: 'Oops!', text: 'Nama dan ulasan wajib diisi!', icon: 'warning' });
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/komentar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinasi_id: item.id,
          ...formReview
        })
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Sukses!',
          text: data.message,
          icon: 'success',
          background: isDarkMode ? '#111' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
          confirmButtonColor: '#ffcc00'
        });
        // Reset form input ulasan
        setFormReview({ nama_user: '', isi_komentar: '', rating: 5 });
        // Ambil data komentar ulang secara live
        fetchKomentar();
      } else {
        throw new Error(data.message);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirim review';
      Swal.fire({ title: 'Error!', text: msg, icon: 'error' });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className={`w-full max-w-3xl rounded-[2.5rem] border overflow-hidden relative transition-all duration-500 max-h-[90vh] flex flex-col ${
          isDarkMode ? 'bg-[#111] border-white/10 text-white' : 'bg-white border-gray-200 text-black shadow-2xl'
        }`}
      >
        {/* Tombol Close Pojok Kanan Atas */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-[#ffcc00] hover:text-black transition-all z-50 backdrop-blur-sm cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Bagian Scrollable Content */}
        <div className="overflow-y-auto flex-1 global-scrollbar">
          
          {/* --- SLIDER CAROUSEL GAMBAR --- */}
          <div className="h-80 md:h-96 w-full relative bg-gray-900 group">
            <img 
              src={daftarGambar[activeSlide]} 
              alt={item.nama} 
              className="w-full h-full object-cover transition-all duration-500"
            />
            
            {/* Overlay Gradasi */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* Tombol Navigasi Slider (Hanya muncul kalau gambar lebih dari 1) */}
            {daftarGambar.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-[#ffcc00] hover:text-black transition-all cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-[#ffcc00] hover:text-black transition-all cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Indikator Dot Slider */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {daftarGambar.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-4 bg-[#ffcc00]' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Bagian Judul */}
            <div className="absolute bottom-8 left-8 right-8 text-left">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-[#ffcc00] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-md">
                  {item.kategori}
                </span>
                {item.is_viral && (
                  <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md animate-pulse flex items-center gap-1 shadow-md border border-red-500">
                    <Flame size={10} /> Viral Spot
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2 w-full">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-md flex-1">
                  {item.nama}
                </h2>
                <div className="flex flex-col items-end gap-2 relative">
                  {!showShareDrawer ? (
                    <button
                      onClick={() => setShowShareDrawer(true)}
                      className="px-4 py-2.5 rounded-xl bg-[#ffcc00] text-black hover:scale-105 active:scale-95 transition-all cursor-pointer font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg hover:shadow-[#ffcc00]/20 max-w-max self-start md:self-auto"
                    >
                      <Share2 size={13} /> Bagikan
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/60 border border-white/20 backdrop-blur-md animate-fadeIn">
                      <button
                        onClick={() => setShowShareDrawer(false)}
                        className="px-2 text-white hover:text-[#ffcc00] transition-colors cursor-pointer text-xs uppercase font-black"
                        title="Batal"
                      >
                        ✕
                      </button>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-green-500 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center animate-fadeIn"
                        title="Share ke WhatsApp"
                      >
                        <FaWhatsapp size={14} />
                      </a>
                      <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-blue-400 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center animate-fadeIn"
                        title="Share ke Twitter/X"
                      >
                        <FaTwitter size={14} />
                      </a>
                      <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-blue-500 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center animate-fadeIn"
                        title="Share ke Telegram"
                      >
                        <FaTelegramPlane size={14} />
                      </a>
                      <button
                        onClick={handleShareModal}
                        className="p-2.5 rounded-xl bg-[#ffcc00] text-black hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                        title="Salin Link"
                      >
                        <FaCopy size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Konten Teks Informasi Lengkap */}
          <div className="p-8 md:p-10 space-y-8 text-left">
            
            {/* Metadata (Lokasi & Rating) */}
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

            {/* Deskripsi */}
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

            <hr className={isDarkMode ? 'border-white/5' : 'border-gray-100'} />

            {/* --- REVISI: FORM INPUT RATING & KOMENTAR (PUBLIC GUEST) --- */}
            <div className="space-y-4">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                <MessageSquare size={12} /> Berikan Penilaian & Ulasan
              </span>
              
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <input 
                      type="text" 
                      placeholder="Nama kamu (Guest)" 
                      value={formReview.nama_user}
                      onChange={(e) => setFormReview({...formReview, nama_user: e.target.value})}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none border transition-all ${
                        isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#ffcc00]/50' : 'bg-gray-50 border-gray-200 text-black focus:border-[#ffcc00]'
                      }`}
                    />
                  </div>
                  <div className="col-span-1 space-y-1">
                    <select
                      value={formReview.rating}
                      onChange={(e) => setFormReview({...formReview, rating: parseInt(e.target.value)})}
                      className={`w-full py-3 px-3 rounded-xl text-xs font-black tracking-wide outline-none border cursor-pointer ${
                        isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#ffcc00]/50' : 'bg-gray-50 border-gray-200 text-black focus:border-[#ffcc00]'
                      }`}
                    >
                      <option value="5" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ 5 Bintang</option>
                      <option value="4" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ 4 Bintang</option>
                      <option value="3" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ 3 Bintang</option>
                      <option value="2" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ 2 Bintang</option>
                      <option value="1" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>⭐ 1 Bintang</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea 
                    rows={2}
                    placeholder="Tulis ulasan menarik kamu di sini..." 
                    value={formReview.isi_komentar}
                    onChange={(e) => setFormReview({...formReview, isi_komentar: e.target.value})}
                    className={`w-full py-3 pl-4 pr-14 rounded-xl text-xs font-medium outline-none border resize-none transition-all ${
                      isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#ffcc00]/50' : 'bg-gray-50 border-gray-200 text-black focus:border-[#ffcc00]'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#ffcc00] text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmittingReview ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                  </button>
                </div>
              </form>
            </div>

            {/* --- REVISI: DAFTAR KOMENTAR LIVE DARI DATABASE --- */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] block">
                💬 Ulasan Pengunjung ({listKomentar.length})
              </span>

              {isCommentsLoading ? (
                <div className="flex items-center gap-2 py-4 justify-center text-xs text-gray-500 font-mono">
                  <Loader2 className="animate-spin text-[#ffcc00]" size={14} /> LOADING REVIEWS...
                </div>
              ) : listKomentar.length === 0 ? (
                <p className="text-xs italic text-gray-500 py-2">Belum ada ulasan untuk tempat ini. Jadilah yang pertama!</p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 global-scrollbar">
                  {listKomentar.map((komentar) => (
                    <div 
                      key={komentar.id} 
                      className={`p-4 rounded-xl border text-left space-y-1.5 transition-colors ${
                        isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50/50 border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-black text-xs uppercase tracking-tight text-gray-400">
                          👤 {komentar.nama_user}
                        </span>
                        <div className="flex gap-0.5 text-[#ffcc00]">
                          {[...Array(komentar.rating)].map((_, i) => (
                            <Star key={i} size={10} fill="#ffcc00" stroke="none" />
                          ))}
                        </div>
                      </div>
                      <p className={`text-xs md:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        "{komentar.isi_komentar}"
                      </p>
                      <span className="text-[8px] font-mono text-gray-500 block">
                        {new Date(komentar.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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