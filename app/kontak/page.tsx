"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { useTheme } from '@/app/context/ThemeContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, Map } from 'lucide-react';
import Swal from 'sweetalert2';

export default function KontakPage() {
  const { isDarkMode } = useTheme();
=======
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";

import { useTheme } from "@/app/context/ThemeContext";
import { Mail, Phone, MapPin, Send, Loader2, Compass } from "lucide-react"; // Hapus Tiktok & Youtube yang merah di sini
import { FaTiktok, FaYoutube } from "react-icons/fa"; // <--- TULIS DI SINI YA!
import Swal from "sweetalert2";

export default function KontakPage() {
  const { isDarkMode } = useTheme();

>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

<<<<<<< HEAD
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: 'Pesan Terkirim!',
        text: 'Terima kasih sudah menghubungi VisitBDL. Kami akan segera membalasnya.',
        icon: 'success',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#ffcc00',
        confirmButtonText: 'Oke Sip!'
=======
    try {
      const res = await fetch("/api/komentar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_user: formData.name,
          email: formData.email,
          subjek: formData.subject,
          isi_komentar: formData.message,
        }),
      });

      Swal.fire(
        "Berhasil!",
        "Pesan sudah masuk ke dashboard admin.",
        "success",
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan sistem.", "error");
    } finally {
      setIsLoading(false);
    }

    // Simulasi pengiriman pesan
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Pesan Terkirim!",
        text: "Terima kasih sudah menghubungi VisitBDL. Kami akan segera membalasnya.",
        icon: "success",
        background: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        confirmButtonColor: "#ffcc00",
        confirmButtonText: "Oke Sip!",
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  if (!mounted) return null;

  return (
<<<<<<< HEAD
    <main className="min-h-screen relative overflow-hidden bg-[#050709] text-white font-sans selection:bg-[#ffcc00] selection:text-black">
      
      {/* --- BACKGROUND IMAGE WITH OVERLAY --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-1000 scale-105 opacity-40 mix-blend-lighten"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')` 
        }}
      />
      {/* Vignette & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050709]/80 via-[#050709]/60 to-[#050709] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050709_80%)] z-0" />

      <Navbar />

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-36 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ================= LEFT SIDE: INFO CARDS ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Info Card (Image Hybrid) */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#11161a]/60 backdrop-blur-xl p-8 flex-1 flex flex-col justify-between shadow-2xl group transition-all duration-500 hover:border-white/20">
              {/* Mini Card Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1171&auto=format&fit=crop')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11161a] via-transparent to-transparent" />
              
              <div className="relative z-10 space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-[#ffcc00] tracking-wider uppercase">
                  <MessageSquare size={10} className="text-[#ffcc00]" /> Get In Touch
                </div>
                
                {/* Title dengan Seni Tipografi */}
                <div className="space-y-1">
                  <h1 className="text-5xl md:text-6xl font-serif italic font-normal tracking-wide text-white leading-tight">
                    Hubungi
                  </h1>
                  <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-[#ffcc00] drop-shadow-[0_0_20px_rgba(255,204,0,0.2)]">
                    Kami
                  </h2>
                </div>
              </div>

              <p className="relative z-10 text-xs text-gray-400 font-medium leading-relaxed max-w-sm pt-8">
                Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau kerja sama bareng VisitBDL? Langsung aja drop pesan di samping ya!
              </p>
            </div>

            {/* Bottom Info Card (Directory) */}
            <div className="rounded-[2rem] border border-white/5 bg-[#0b0f12]/80 backdrop-blur-md p-8 shadow-xl space-y-5">
              {[
                { icon: Mail, label: 'EMAIL RESMI', value: 'hello@visitbdl.com', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                { icon: Phone, label: 'WHATSAPP BISNIS', value: '+62 812 3456 7890', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
                { icon: MapPin, label: 'KANTOR PUSAT', value: 'Bandar Lampung, Indonesia', color: 'bg-red-500/10 text-red-400 border-red-500/20', actionIcon: Map },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-white/[0.02] hover:bg-white/[0.02] transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} shadow-inner`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-bold tracking-widest uppercase mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold tracking-tight text-gray-200 group-hover:text-white transition-colors">{item.value}</div>
                    </div>
                  </div>
                  {item.actionIcon && (
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#ffcc00] hover:bg-white/10 transition-all cursor-pointer">
                      <item.actionIcon size={14} />
=======
    <main
      className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-[#f8f9fa] text-[#1a1a1a]"
      }`}
    >
      {/* ---  BACKGROUND & OVERLAY --- */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 z-0"
        style={{
          backgroundImage: `linear-gradient(${
            isDarkMode
              ? "rgba(5, 7, 10, 0.85), rgba(5, 10, 15, 0.92)"
              : "rgba(248, 249, 250, 0.80), rgba(240, 244, 248, 0.90)"
          }), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      <Navbar />

      {/* --- LAYOUT GRID  --- */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-16 pt-36 pb-16 relative z-10 my-auto">
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-5 space-y-4">
            {/* KARTU ATAS: HUBUNGI KAMI */}
            <div
              className={`p-8 rounded-[2rem] border backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500 ${
                isDarkMode
                  ? "bg-black/30 border-white/10 shadow-black/40"
                  : "bg-white/40 border-black/5 shadow-slate-200/40"
              }`}
              style={{
                backgroundImage: `linear-gradient(${
                  isDarkMode
                    ? "rgba(0,0,0,0.65), rgba(0,0,0,0.75)"
                    : "rgba(255,255,255,0.6), rgba(255,255,255,0.7)"
                }), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-sm mb-6 ${
                  isDarkMode
                    ? "bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#ffcc00]"
                    : "bg-[#ffcc00]/20 border-[#ffcc00]/40 text-[#bf9600]"
                }`}
              >
                <Compass
                  size={13}
                  className="animate-[spin_8s_linear_infinite]"
                />{" "}
                Get In Touch
              </div>

              <div className="space-y-1 mb-6">
                <h1
                  className="text-5xl md:text-6xl font-normal leading-none tracking-wide text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  style={{ fontFamily: "'Kaushan Script', cursive" }}
                >
                  Hubungi
                </h1>
                <h1
                  className="text-6xl md:text-7xl font-normal leading-none tracking-wide text-[#ffcc00] drop-shadow-[0_4px_12px_rgba(255,204,0,0.3)]"
                  style={{ fontFamily: "'Kaushan Script', cursive" }}
                >
                  Kami
                </h1>
              </div>

              <p
                className={`text-sm font-medium leading-relaxed ${isDarkMode ? "text-gray-200" : "text-slate-800"}`}
              >
                Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau
                kerja sama bareng VisitBDL? Langsung aja drop pesan di samping
                ya!
              </p>
            </div>

            {/* INFO ALAMAT & SOSMED  */}
            <div
              className={`p-4 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 space-y-2.5 ${
                isDarkMode
                  ? "bg-black/20 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                  : "bg-white/30 border-blue-400/20 shadow-sm"
              }`}
            >
              {[
                {
                  icon: Mail,
                  label: "Email Resmi",
                  value: "@wisata_bandar_lampung",
                  iconColor: "text-blue-400",
                },
                {
                  icon: FaTiktok,
                  label: "tiktok",
                  value: "wisata_bandar_lampung",
                  iconColor: "text-emerald-400",
                },
                {
                  icon: FaYoutube,
                  label: "youtube",
                  value: "Bandar Lampung, Indonesia",
                  iconColor: "text-rose-400",
                  hasMapIcon: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isDarkMode ? "border-white/[0.02] hover:bg-white/5" : "border-black/[0.02] hover:bg-black/5"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDarkMode ? "bg-black/30 border-white/5" : "bg-white border-black/5 shadow-sm"}`}
                    >
                      <item.icon size={18} className={item.iconColor} />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm font-bold tracking-tight">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  {item.hasMapIcon && (
                    <div className="text-amber-400 p-2 bg-amber-400/10 rounded-lg border border-amber-400/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                        <line x1="9" y1="3" x2="9" y2="18"></line>
                        <line x1="15" y1="6" x2="15" y2="21"></line>
                      </svg>
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          {/* ================= RIGHT SIDE: FORM BLOCK ================= */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-[#11161a]/60 backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col justify-center transition-all duration-500 hover:border-white/15">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Nama & Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Nama Lengkap</label>
                    <input 
=======
          <section className="lg:col-span-7 w-full">
            <div
              className={`relative p-6 md:p-10 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 shadow-2xl ${
                isDarkMode
                  ? "bg-black/40 border-white/10 shadow-black/50"
                  : "bg-white/60 border-black/5 shadow-slate-200/50"
              }`}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5 text-left w-full"
              >
                {/* 1. NAMA & EMAIL  */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">
                      Nama Lengkap
                    </label>
                    <input
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
<<<<<<< HEAD
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
=======
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                        isDarkMode
                          ? "bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600"
                          : "bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400"
                      }`}
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                    />
                  </div>

                  <div className="space-y-2">
<<<<<<< HEAD
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                    <input 
=======
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">
                      Email Address
                    </label>
                    <input
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
<<<<<<< HEAD
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
=======
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                        isDarkMode
                          ? "bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600"
                          : "bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400"
                      }`}
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                    />
                  </div>
                </div>

<<<<<<< HEAD
                {/* Row 2: Subjek */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Subjek Pesan</label>
                  <input 
=======
                {/* 2. SUBJEK PESAN */}
                <div className="space-y-2 w-full">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Subjek Pesan
                  </label>
                  <input
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                    type="text"
                    required
                    placeholder="Apa yang ingin Anda tanyakan?"
                    value={formData.subject}
<<<<<<< HEAD
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                  />
                </div>

                {/* Row 3: Isi Pesan */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Isi Pesan</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Tulis detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                  />
                </div>

                {/* Submit Button Neon Glow */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffcc00] hover:bg-[#e6b800] text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(255,204,0,0.15)] hover:shadow-[0_4px_25px_rgba(255,204,0,0.35)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
=======
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                      isDarkMode
                        ? "bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600"
                        : "bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400"
                    }`}
                  />
                </div>

                {/* 3. ISI PESAN */}
                <div className="space-y-2 w-full">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Isi Pesan
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tulis detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 resize-none ${
                      isDarkMode
                        ? "bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600"
                        : "bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#ffcc00] to-amber-400 text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.25em] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[#ffcc00]/20 disabled:opacity-50 cursor-pointer"
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
<<<<<<< HEAD
                    <>Kirim Pesan Sekarang <Send size={12} className="fill-current" /></>
=======
                    <>
                      Kirim Pesan Sekarang <Send size={13} />
                    </>
>>>>>>> 34588445d02562076c85b039caf7d6a85df2c78d
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
