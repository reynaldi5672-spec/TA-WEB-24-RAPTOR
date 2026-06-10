"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useTheme } from "@/app/context/ThemeContext";
import { Mail, MapPin, Send, Loader2, Compass } from "lucide-react"; 
import { FaTiktok, FaYoutube } from "react-icons/fa"; 
import Swal from "sweetalert2";

const FAQ_ITEMS = [
  {
    question: "Kapan waktu terbaik untuk berkunjung ke Bandar Lampung?",
    answer: "Waktu terbaik berkunjung adalah di musim kemarau antara bulan Mei hingga September. Cuacanya bersahabat, sangat cocok untuk menjelajahi pantai eksotis seperti Pahawang, Gigi Hiu, maupun melihat gajah di Way Kambas."
  },
  {
    question: "Bagaimana cara menuju Bandar Lampung dari Jakarta?",
    answer: "Anda bisa menggunakan jalur udara (penerbangan ±45 menit dari Soekarno-Hatta ke Bandara Radin Inten II BDL) atau jalur darat + laut (mobil/bus travel melewati Tol Trans-Sumatra dan menyeberang via kapal feri dari Pelabuhan Merak ke Bakauheni)."
  },
  {
    question: "Apakah destinasi wisata pantai di Lampung aman untuk keluarga?",
    answer: "Sebagian besar pantai di Teluk Lampung seperti Pahawang, Mutun, dan Sari Ringgung berarus tenang dan sangat aman untuk keluarga & anak-anak. Namun, untuk beberapa pantai lepas seperti Gigi Hiu atau Tanjung Setia, ombaknya cenderung besar dan lebih disarankan untuk fotografi atau berselancar."
  },
  {
    question: "Apakah situs ini menyediakan pemesanan tiket / booking akomodasi secara langsung?",
    answer: "Untuk saat ini, VisitBDL berfungsi sebagai media pemandu wisata dan pusat informasi destinasi Lampung secara live. Untuk pemesanan tiket resmi atau akomodasi, Anda akan diarahkan ke partner resmi kami melalui tombol booking di portal detail destinasi."
  }
];

/**
 * KontakPage enables visitors to submit feedback and view FAQs.
 */
export default function KontakPage() {
  const { isDarkMode } = useTheme();

  const [mounted, setMounted] = useState(false); // Client hydration lock state indicator
  const [isLoading, setIsLoading] = useState(false); // Contact form submit button loading tracker
  const [openFaq, setOpenFaq] = useState<number | null>(null); // Stores currently active expanded FAQ index

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

  /**
   * Dispatches user message payload details to database API handler via POST method requests
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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

      if (res.ok) {
        Swal.fire({
          title: "Berhasil!", // Success confirmation popup title config
          text: "Pesan sudah masuk ke dashboard admin.",
          icon: "success",
          background: isDarkMode ? "#111" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          confirmButtonColor: "#ffcc00",
          confirmButtonText: "Oke Sip!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Gagal mengirim pesan");
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal!", // Error notification configuration configs
        text: "Terjadi kesalahan sistem.",
        icon: "error",
        background: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                className={`text-sm font-medium leading-relaxed ${
                  isDarkMode ? "text-gray-200" : "text-slate-800"
                }`}
              >
                Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau
                kerja sama bareng VisitBDL? Langsung aja drop pesan di samping
                ya!
              </p>
            </div>

            {/* INFO ALAMAT & SOSMED */}
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
                  label: "Tiktok",
                  value: "wisata_bandar_lampung",
                  iconColor: "text-emerald-400",
                },
                {
                  icon: FaYoutube,
                  label: "Youtube",
                  value: "Wisata Bandar Lampung",
                  iconColor: "text-rose-400",
                  hasMapIcon: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode
                      ? "border-white/[0.02] hover:bg-white/5"
                      : "border-black/[0.02] hover:bg-black/5"
                  }`}
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
                      <div className="text-sm font-bold tracking-tight">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  {item.hasMapIcon && (
                    <div className="text-amber-400 p-2 bg-amber-400/10 rounded-lg border border-amber-400/20">
                      <MapPin size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ================= RIGHT SIDE: FORM BLOCK ================= */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-[#11161a]/60 backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col justify-center transition-all duration-500 hover:border-white/15">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Nama & Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">
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
                      className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                    />
                  </div>
                </div>

                {/* Row 2: Subjek */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">
                    Subjek Pesan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apa yang ingin Anda tanyakan?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                  />
                </div>

                {/* Row 3: Isi Pesan */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">
                    Isi Pesan
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tulis detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
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

        {/* ================= BOTTOM SIDE: FAQ SECTION ================= */}
        <section className="mt-20 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Pertanyaan <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.15)]">Sering Diajukan</span>
            </h2>
            <p className={`text-xs md:text-sm max-w-xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Temukan jawaban atas berbagai pertanyaan umum dari para pelancong mengenai destinasi pariwisata di Bandar Lampung.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, index) => { /* Maps global Accordion FAQ items layout elements */
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? (isDarkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-black/10 shadow-lg') 
                      : (isDarkMode ? 'bg-black/20 border-white/5 hover:border-white/10' : 'bg-white/40 border-black/5 hover:bg-white/60')
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer outline-none"
                  >
                    <span className="text-xs md:text-sm font-black uppercase tracking-wider">
                      {faq.question}
                    </span>
                    <span className={`text-[#ffcc00] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${
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
        </section>

      </div>
    </main>
  );
}