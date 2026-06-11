"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useTheme } from "@/app/context/ThemeContext";
import { Mail, MapPin, Send, Loader2, Compass, Search, MessageSquare, Check, AlertCircle, HelpCircle } from "lucide-react"; 
import { FaTiktok, FaYoutube, FaWhatsapp, FaInstagram } from "react-icons/fa"; 
import Swal from "sweetalert2";

const FAQ_ITEMS = [
  {
    category: "Destinasi",
    question: "Kapan waktu terbaik untuk berkunjung ke Bandar Lampung?",
    answer: "Waktu terbaik berkunjung adalah di musim kemarau antara bulan Mei hingga September. Cuacanya bersahabat, sangat cocok untuk menjelajahi pantai eksotis seperti Pahawang, Gigi Hiu, maupun melihat gajah di Way Kambas."
  },
  {
    category: "Rute",
    question: "Bagaimana cara menuju Bandar Lampung dari Jakarta?",
    answer: "Anda bisa menggunakan jalur udara (penerbangan ±45 menit dari Soekarno-Hatta ke Bandara Radin Inten II BDL) atau jalur darat + laut (mobil/bus travel melewati Tol Trans-Sumatra dan menyeberang via kapal feri dari Pelabuhan Merak ke Bakauheni)."
  },
  {
    category: "Destinasi",
    question: "Apakah destinasi wisata pantai di Lampung aman untuk keluarga?",
    answer: "Sebagian besar pantai di Teluk Lampung seperti Pahawang, Mutun, dan Sari Ringgung berarus tenang dan sangat aman untuk keluarga & anak-anak. Namun, untuk beberapa pantai lepas seperti Gigi Hiu atau Tanjung Setia, ombaknya cenderung besar dan lebih disarankan untuk fotografi atau berselancar."
  },
  {
    category: "Umum",
    question: "Apakah situs ini menyediakan pemesanan tiket / booking akomodasi secara langsung?",
    answer: "Untuk saat ini, VisitBDL berfungsi sebagai media pemandu wisata dan pusat informasi destinasi Lampung secara live. Untuk pemesanan tiket resmi atau akomodasi, Anda akan diarahkan ke partner resmi kami melalui tombol booking di portal detail destinasi."
  }
];

const SUBJECT_PRESETS = [
  "Tanya Wisata 🏖️",
  "Kemitraan/Kerjasama 🤝",
  "Kritik & Saran 💬",
  "Laporan Masalah ⚠️"
];

/**
 * KontakPage enables visitors to submit feedback and view FAQs.
 */
export default function KontakPage() {
  const { isDarkMode } = useTheme();

  const [mounted, setMounted] = useState(false); // Client hydration lock state indicator
  const [isLoading, setIsLoading] = useState(false); // Contact form submit button loading tracker
  const [openFaq, setOpenFaq] = useState<number | null>(null); // Stores currently active expanded FAQ index

  // Search & Categories for FAQ
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Dynamic public guestbook feed states
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [formData, setFormData] = useState({ // Forms binding states
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

  // Fetch guestbook messages list on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessagesList(data);
      }
    } catch (err) {
      console.error("Gagal mengambil ulasan pengunjung:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Dispatches user message payload details to database API handler via POST method requests
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(formData.email)) {
      Swal.fire({
        title: "Format Email Salah!",
        text: "Silakan masukkan alamat email yang valid.",
        icon: "warning",
        background: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        confirmButtonColor: "#ffcc00",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        Swal.fire({
          title: "Berhasil!", // Success confirmation popup title config
          text: "Pesan Anda telah disimpan di database dan dikirim ke admin.",
          icon: "success",
          background: isDarkMode ? "#111" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          confirmButtonColor: "#ffcc00",
          confirmButtonText: "Sip, Mantap!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Refresh guestbook list instantly
        fetchMessages();
      } else {
        throw new Error("Gagal mengirim pesan");
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal!", // Error notification configuration configs
        text: "Terjadi kesalahan sistem saat mengirim pesan.",
        icon: "error",
        background: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter FAQs based on active category and search query
  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = activeCategory === "Semua" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <main
      className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-[#f8f9fa] text-[#1a1a1a]"
      }`}
    >
      {/* --- BACKGROUND & OVERLAY --- */}
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

      {/* --- LAYOUT GRID --- */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-16 pt-36 pb-16 relative z-10 my-auto">
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-5 space-y-6">
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
                Hubungi Kami
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
                className={`text-xs md:text-sm font-medium leading-relaxed ${
                  isDarkMode ? "text-gray-200" : "text-slate-800"
                }`}
              >
                Punya pertanyaan seputar pariwisata di Bandar Lampung? Atau ingin melakukan kerja sama dengan VisitBDL? Kirimkan pesan Anda melalui form di samping!
              </p>
            </div>

            {/* INFO ALAMAT & SOSMED DENGAN EFEK GLOW HARI INI */}
            <div
              className={`p-4 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 space-y-2.5 ${
                isDarkMode
                  ? "bg-black/20 border-white/5 shadow-2xl"
                  : "bg-white/30 border-black/5 shadow-sm"
              }`}
            >
              {[
                {
                  icon: Mail,
                  label: "Email Resmi",
                  value: "dispar@bandarlampungkota.go.id",
                  link: "mailto:dispar@bandarlampungkota.go.id",
                  iconColor: "text-blue-400",
                  glowClass: "hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
                },
                {
                  icon: FaInstagram,
                  label: "Instagram Resmi",
                  value: "@pariwisata_bandarlampung",
                  link: "https://instagram.com",
                  iconColor: "text-pink-400",
                  glowClass: "hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
                },
                {
                  icon: FaTiktok,
                  label: "Tiktok",
                  value: "@wisata_bandar_lampung",
                  link: "https://tiktok.com",
                  iconColor: "text-emerald-400",
                  glowClass: "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
                },
                {
                  icon: FaYoutube,
                  label: "Youtube Channel",
                  value: "Wisata Bandar Lampung",
                  link: "https://youtube.com",
                  iconColor: "text-rose-400",
                  glowClass: "hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
                },
                {
                  icon: FaWhatsapp,
                  label: "WhatsApp Hotline",
                  value: "+62 812-7474-0010",
                  link: "https://wa.me/6281274740010",
                  iconColor: "text-green-400",
                  glowClass: "hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 block cursor-pointer ${
                    isDarkMode
                      ? "border-white/[0.02] hover:bg-white/5"
                      : "border-black/[0.02] hover:bg-black/[0.02]"
                  } ${item.glowClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        isDarkMode
                          ? "bg-black/30 border-white/5"
                          : "bg-white border-black/5 shadow-sm"
                      }`}
                    >
                      <item.icon size={18} className={item.iconColor} />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-xs font-bold tracking-tight">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* PETA LOKASI KANTOR DINAS PARIWISATA */}
            <div
              className={`p-4 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 space-y-3 ${
                isDarkMode
                  ? "bg-black/20 border-white/5 shadow-2xl"
                  : "bg-white/30 border-black/5 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2 px-2">
                <MapPin className="text-[#ffcc00]" size={16} />
                <h3 className="text-xs font-black uppercase tracking-wider">Lokasi Kantor Dinas</h3>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 relative group h-[200px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1648083658514!2d105.24718427453664!3d-5.407085753896585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dad6e1db0b37%3A0xc3b8a1c97a2cbefb!2sDinas%20Pariwisata%20Kota%20Bandar%20Lampung!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                ></iframe>
                <div className="absolute bottom-3 right-3">
                  <a
                    href="https://maps.app.goo.gl/t9uXQ1eW9T3QfX6t5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/80 hover:bg-black text-[#ffcc00] border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 backdrop-blur-sm transition-all"
                  >
                    Petunjuk Arah
                  </a>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-normal px-2">
                Jl. Tjut Nyak Dien No.23, Durian Payung, Kec. Tj. Karang Pusat, Kota Bandar Lampung, Lampung 35114
              </p>
            </div>
          </section>

          {/* ================= RIGHT SIDE: FORM BLOCK ================= */}
          <div className="lg:col-span-7">
            <div className={`h-full rounded-[2.5rem] border backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col justify-center transition-all duration-500 ${
              isDarkMode 
                ? "bg-[#11161a]/60 border-white/10 hover:border-white/15" 
                : "bg-white/70 border-black/5 hover:border-black/10 shadow-slate-200/40"
            }`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Nama & Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${
                      isDarkMode ? "text-gray-400" : "text-slate-600"
                    }`}>
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full border rounded-xl py-3.5 px-5 text-xs font-medium outline-none transition-all duration-300 ${
                        isDarkMode
                          ? "bg-[#090d10]/60 border-white/10 focus:border-[#ffcc00]/40 text-white placeholder-gray-600 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                          : "bg-white border-black/10 focus:border-[#ffcc00]/40 text-[#1a1a1a] placeholder-gray-400 focus:bg-white focus:shadow-[0_4px_15px_rgba(255,204,0,0.08)]"
                      }`}
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <div className="flex justify-between items-center ml-1">
                      <label className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDarkMode ? "text-gray-400" : "text-slate-600"
                      }`}>
                        Email Address
                      </label>
                      {formData.email && (
                        <span className="flex items-center gap-0.5 text-[8px] font-black uppercase tracking-wider">
                          {isValidEmail(formData.email) ? (
                            <span className="text-emerald-500 flex items-center gap-0.5"><Check size={10} /> VALID</span>
                          ) : (
                            <span className="text-red-500 flex items-center gap-0.5"><AlertCircle size={10} /> TIDAK VALID</span>
                          )}
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full border rounded-xl py-3.5 px-5 text-xs font-medium outline-none transition-all duration-300 ${
                        isDarkMode
                          ? "bg-[#090d10]/60 border-white/10 focus:border-[#ffcc00]/40 text-white placeholder-gray-600 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                          : "bg-white border-black/10 focus:border-[#ffcc00]/40 text-[#1a1a1a] placeholder-gray-400 focus:bg-white focus:shadow-[0_4px_15px_rgba(255,204,0,0.08)]"
                      }`}
                    />
                  </div>
                </div>

                {/* Row 2: Preset Pilihan Subjek Cepat */}
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${
                    isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}>
                    Pilihan Subjek Cepat
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUBJECT_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, subject: preset });
                        }}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 border cursor-pointer active:scale-95 ${
                          formData.subject === preset
                            ? "bg-[#ffcc00] text-black border-[#ffcc00] shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                            : isDarkMode
                            ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                            : "bg-white border-black/10 text-gray-700 hover:bg-gray-50 hover:border-black/20 shadow-sm"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 3: Subjek */}
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${
                    isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}>
                    Subjek Pesan Kustom
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apa yang ingin Anda tanyakan?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={`w-full border rounded-xl py-3.5 px-5 text-xs font-medium outline-none transition-all duration-300 ${
                      isDarkMode
                        ? "bg-[#090d10]/60 border-white/10 focus:border-[#ffcc00]/40 text-white placeholder-gray-600 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                        : "bg-white border-black/10 focus:border-[#ffcc00]/40 text-[#1a1a1a] placeholder-gray-400 focus:bg-white focus:shadow-[0_4px_15px_rgba(255,204,0,0.08)]"
                    }`}
                  />
                </div>

                {/* Row 4: Isi Pesan */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className={`text-[10px] font-bold uppercase tracking-wider ${
                      isDarkMode ? "text-gray-400" : "text-slate-600"
                    }`}>
                      Isi Pesan
                    </label>
                    <span className={`text-[9px] font-bold tracking-wider ${
                      formData.message.length >= 450 ? 'text-red-500' : formData.message.length >= 350 ? 'text-amber-500' : 'text-gray-500'
                    }`}>
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    required
                    maxLength={500}
                    placeholder="Tulis detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full border rounded-xl py-3.5 px-5 text-xs font-medium outline-none transition-all duration-300 resize-none ${
                      isDarkMode
                        ? "bg-[#090d10]/60 border-white/10 focus:border-[#ffcc00]/40 text-white placeholder-gray-600 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                        : "bg-white border-black/10 focus:border-[#ffcc00]/40 text-[#1a1a1a] placeholder-gray-400 focus:bg-white focus:shadow-[0_4px_15px_rgba(255,204,0,0.08)]"
                    }`}
                  />
                </div>

                {/* Submit Button Neon Glow */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffcc00] hover:bg-[#e6b800] text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(255,204,0,0.15)] hover:shadow-[0_4px_25px_rgba(255,204,0,0.35)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Kirim Pesan Sekarang{" "}
                      <Send size={12} className="fill-current" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ================= GUESTBOOK SECTION ================= */}
        <section className="mt-20 space-y-8">
          <div className="text-center space-y-3">
            <div className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.2em]">Buku Tamu Publik</div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Buku Tamu <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.15)]">Pengunjung</span>
            </h2>
            <p className={`text-xs md:text-sm max-w-xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ulasan, masukan, dan saran terpublikasi yang dikirimkan oleh para wisatawan Lampung di VisitBDL.
            </p>
          </div>

          {loadingMessages ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin text-[#ffcc00]" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-gray-500">Memuat Buku Tamu...</p>
            </div>
          ) : messagesList.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {messagesList.slice(0, 6).map((msg, idx) => {
                const emailParts = msg.email ? msg.email.split('@') : [];
                const redactedEmail = emailParts.length === 2 
                  ? `${emailParts[0].charAt(0)}***${emailParts[0].charAt(emailParts[0].length - 1)}@${emailParts[1]}`
                  : "user***@email.com";
                  
                return (
                  <div 
                    key={msg.id || idx}
                    className={`p-6 rounded-[2rem] border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4 ${
                      isDarkMode 
                        ? 'bg-[#11161a]/40 border-white/5 hover:border-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                        : 'bg-white border-black/5 shadow-sm hover:shadow-lg hover:border-black/10'
                    }`}
                  >
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black uppercase bg-[#ffcc00]/10 text-[#ffcc00] border border-[#ffcc00]/20 px-2.5 py-0.5 rounded-md">
                          {msg.subject || "Umum"}
                        </span>
                        <span className="text-[8px] text-gray-500 font-mono">
                          {msg.created_at ? new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed italic line-clamp-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        "{msg.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t pt-3 border-gray-500/10 text-left">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                        isDarkMode ? 'bg-[#ffcc00]/10 text-[#ffcc00]' : 'bg-[#ffcc00]/20 text-[#bf9600]'
                      }`}>
                        {msg.name ? msg.name.charAt(0) : "A"}
                      </div>
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          {msg.name || "Anonim"}
                        </h4>
                        <p className="text-[9px] text-gray-500 font-mono">{redactedEmail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-[2rem] border-gray-500/20 max-w-xl mx-auto">
              <MessageSquare className="mx-auto text-gray-500 mb-2" size={32} />
              <p className="text-gray-500 text-xs italic font-bold uppercase tracking-widest">Belum ada pesan tamu publik.</p>
            </div>
          )}
        </section>

        {/* ================= BOTTOM SIDE: FAQ SECTION ================= */}
        <section className="mt-24 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Pertanyaan <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.15)]">Sering Diajukan</span>
            </h2>
            <p className={`text-xs md:text-sm max-w-xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Temukan jawaban atas berbagai pertanyaan umum dari para pelancong mengenai destinasi pariwisata di Bandar Lampung.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search and Category filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-4 border-b border-gray-500/10">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 order-2 md:order-1">
                {["Semua", "Destinasi", "Rute", "Umum"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#ffcc00] text-black border-[#ffcc00] shadow-[0_4px_12px_rgba(255,204,0,0.15)]"
                        : isDarkMode
                        ? "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                        : "bg-white border-black/5 text-gray-700 hover:bg-gray-50 hover:border-black/10 shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-80 order-1 md:order-2">
                <input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none transition-all duration-300 ${
                    isDarkMode
                      ? "bg-[#090d10]/40 border-white/10 focus:border-[#ffcc00]/40 text-white placeholder-gray-500 focus:bg-[#090d10]/60"
                      : "bg-white border-black/10 focus:border-[#ffcc00]/40 text-[#1a1a1a] placeholder-gray-400 focus:shadow-sm"
                  }`}
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              </div>
            </div>

            {/* Accordion Lists */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => {
                  const globalIndex = FAQ_ITEMS.findIndex((f) => f.question === faq.question);
                  const isOpen = openFaq === globalIndex;
                  return (
                    <div 
                      key={index}
                      className={`rounded-2xl border transition-all duration-300 text-left ${
                        isOpen 
                          ? (isDarkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-black/10 shadow-lg') 
                          : (isDarkMode ? 'bg-black/20 border-white/5 hover:border-white/10' : 'bg-white/40 border-black/5 hover:bg-white/60')
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                            faq.category === "Destinasi" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                            faq.category === "Rute" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                            "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          }`}>
                            {faq.category}
                          </span>
                          <span className="text-xs md:text-sm font-black uppercase tracking-wider">
                            {faq.question}
                          </span>
                        </div>
                        <span className={`text-[#ffcc00] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      <div className={`overflow-hidden transition-all duration-350 ease-in-out ${
                        isOpen ? 'max-h-60 border-t' : 'max-h-0'
                      } ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                        <p className={`p-6 text-xs md:text-sm leading-relaxed font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-[2rem] border-gray-500/20">
                <HelpCircle className="mx-auto text-gray-500 mb-2" size={32} />
                <p className="text-gray-500 text-xs italic font-bold uppercase tracking-widest">Tidak ada pertanyaan yang cocok dengan pencarian Anda.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}