"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Calendar, Clock, 
  Send, ShieldCheck, HelpCircle, FileText,
  Globe, ArrowUp
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';
import Swal from 'sweetalert2';

export default function Footer() {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');

    Swal.fire({
      title: "Pendaftaran Berhasil!",
      text: "Terima kasih telah berlangganan info wisata terbaru Bandar Lampung.",
      icon: "success",
      background: isDarkMode ? "#111" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      confirmButtonColor: "#ffcc00",
      confirmButtonText: "Selesai",
      timer: 3000,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t transition-all duration-700 overflow-hidden ${
      isDarkMode 
        ? 'bg-[#030303] border-white/5 text-gray-400' 
        : 'bg-white border-black/5 text-gray-600 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]'
    }`}>
      
      {/* Decorative top glowing strip for dark mode */}
      {isDarkMode && (
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#ffcc00]/20 to-transparent"></div>
      )}

      {/* --- SECTION 1: CORPORATE STATS BANNER --- */}
      <div className={`border-b transition-colors duration-500 ${
        isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/[0.02] bg-gray-50/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isDarkMode ? 'bg-[#ffcc00]/5 text-[#ffcc00] border border-[#ffcc00]/10' : 'bg-[#ffcc00]/10 text-[#e6b800] border border-[#ffcc00]/20'
              } group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,204,0,0.15)]`}>
                <Globe size={20} className="animate-spin [animation-duration:20s]" />
              </div>
              <div>
                <h4 className={`text-2xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>50+ Destinasi</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Spot Wisata Terverifikasi</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isDarkMode ? 'bg-blue-500/5 text-blue-500 border border-blue-500/10' : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
              } group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]`}>
                <Mail size={20} />
              </div>
              <div>
                <h4 className={`text-2xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>15k+ Pengunjung</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Mengeksplorasi Setiap Bulan</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isDarkMode ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
              } group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]`}>
                <Clock size={20} />
              </div>
              <div>
                <h4 className={`text-2xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>24/7 Dukungan</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Layanan Informasi Terpadu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: MAIN CORPORATE LINKS & NEWSLETTER --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Company Brand Column (4 Columns) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,204,0,0.3)]">
                L
              </div>
              <span className={`font-black tracking-tighter text-2xl uppercase italic ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                Visit<span className="text-[#ffcc00]">BDL</span>
              </span>
            </Link>
            
            <p className="text-xs md:text-sm leading-relaxed">
              Platform resmi Dinas Pariwisata Kota Bandar Lampung untuk eksplorasi destinasi unggulan, keindahan alam bahari, serta warisan budaya lokal di Gerbang Sumatra.
            </p>

            {/* Office Hours Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50 border-black/5 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 text-left">
                <Calendar size={16} className="text-[#ffcc00]" />
                <div>
                  <h5 className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Jam Operasional Kantor</h5>
                  <p className="text-[11px] font-medium text-gray-500">Senin - Jumat: 08.00 - 16.00 WIB</p>
                </div>
              </div>
            </div>

            {/* Social Media Follow */}
            <div className="space-y-3">
              <span className={`text-[10px] font-black uppercase tracking-wider block ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Ikuti Media Sosial Kami</span>
              <div className="flex gap-3">
                {[
                  { icon: <FaInstagram size={16} />, href: "https://instagram.com", color: "hover:bg-[#e1306c] hover:text-white" },
                  { icon: <FaFacebookF size={16} />, href: "https://facebook.com", color: "hover:bg-[#1877f2] hover:text-white" },
                  { icon: <FaYoutube size={16} />, href: "https://youtube.com", color: "hover:bg-[#ff0000] hover:text-white" },
                  { icon: <FaTwitter size={16} />, href: "https://twitter.com", color: "hover:bg-[#1da1f2] hover:text-white" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20' 
                        : 'bg-white border-black/10 text-gray-500 hover:border-black/20 shadow-sm'
                    } ${social.color} hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Useful Links Columns (4 Columns total, split into two sets) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 text-left">
            <div className="space-y-5">
              <h4 className={`text-xs font-black uppercase tracking-[0.2em] border-b pb-2 ${isDarkMode ? 'text-white border-white/5' : 'text-black border-black/5'}`}>
                Layanan
              </h4>
              <ul className="space-y-3 text-xs font-semibold">
                <li>
                  <Link href="/destinasi" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Peta Wisata</span>
                  </Link>
                </li>
                <li>
                  <Link href="/destinasi" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Pemandu Lokal</span>
                  </Link>
                </li>
                <li>
                  <Link href="/destinasi" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Akomodasi</span>
                  </Link>
                </li>
                <li>
                  <Link href="/destinasi" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Transportasi</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className={`text-xs font-black uppercase tracking-[0.2em] border-b pb-2 ${isDarkMode ? 'text-white border-white/5' : 'text-black border-black/5'}`}>
                Perusahaan
              </h4>
              <ul className="space-y-3 text-xs font-semibold">
                <li>
                  <Link href="/kontak" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Profil Dinas</span>
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Visi & Misi</span>
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Kebijakan Privasi</span>
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-[#ffcc00] transition-colors flex items-center gap-1.5 group">
                    <span>Hubungi Kami</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column (4 Columns) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <h4 className={`text-xs font-black uppercase tracking-[0.2em] border-b pb-2 ${isDarkMode ? 'text-white border-white/5' : 'text-black border-black/5'}`}>
              Newsletter
            </h4>
            <p className="text-xs leading-relaxed">
              Berlangganan info wisata terbaru, agenda festival pariwisata, dan penawaran khusus dari Bandar Lampung langsung di kotak masuk Anda.
            </p>

            <form onSubmit={handleSubscribe} className="relative group flex flex-col gap-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Masukkan email Anda..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || isSubscribed}
                  className={`w-full py-4 pl-5 pr-14 rounded-2xl border transition-all duration-300 outline-none text-xs font-bold uppercase tracking-wider ${
                    isDarkMode 
                      ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white placeholder-gray-600' 
                      : 'bg-white border-black/10 focus:border-[#ffcc00] text-black shadow-sm placeholder-gray-400'
                  }`}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubscribed}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isSubscribed 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-[#ffcc00] hover:bg-[#ffb300] text-black hover:scale-105 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : isSubscribed ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
              <p className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <ShieldCheck size={11} className="text-[#ffcc00]" /> Privasi email Anda terjamin & aman.
              </p>
            </form>
          </div>

        </div>
      </div>

      {/* --- SECTION 3: COPYRIGHT & ADDRESS BAR --- */}
      <div className={`border-t transition-colors duration-500 py-8 ${
        isDarkMode ? 'border-white/5 bg-[#010101]' : 'border-black/5 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider">
              © {new Date().getFullYear()} VisitBDL. Hak Cipta Dilindungi Undang-Undang.
            </p>
            <p className="text-[9px] font-semibold text-gray-500 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={10} className="text-red-500" /> Jl. Jend. Sudirman No. 1, Bandar Lampung, Lampung, Indonesia
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <a href="mailto:info@wisata.bandarlampungkota.go.id" className="hover:text-[#ffcc00] flex items-center gap-1 transition-colors">
              <Mail size={11} /> info@wisata.bandarlampungkota.go.id
            </a>
            <a href="tel:+627211234567" className="hover:text-[#ffcc00] flex items-center gap-1 transition-colors">
              <Phone size={11} /> (0721) 123-4567
            </a>
            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white' 
                  : 'bg-white border-black/10 text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
              title="Kembali ke atas"
            >
              <ArrowUp size={12} />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
