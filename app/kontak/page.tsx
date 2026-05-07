import React from 'react';
import { Mail, MapPin, Send, Camera } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="bg-[#080808] min-h-screen">
      {/* --- NAVBAR FIXED --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          <Link href="/" className="text-xl font-black italic tracking-tighter text-white uppercase">
            FAZRI<span className="text-[#ff4d4d]">LUKMAN</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-[#ff4d4d] transition-all">
              Home
            </Link>
            <Link href="/destinasi" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-[#ff4d4d] transition-all">
              Destinasi
            </Link>
            <Link href="/kontak" className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#ff4d4d] transition-all">
              Contact
            </Link>
          </div>

          <Link href="/kontak" className="px-6 py-2.5 bg-[#ff4d4d] text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#e63e3e] transition-all">
            Hire Me
          </Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-32 pb-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header Section */}
          <div className="mb-16">
            <h4 className="text-[#ff4d4d] text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">
              Get In Touch
            </h4>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 text-white text-left">
              Mari Kita <span className="text-gray-800">Bicara.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed text-left">
              Punya ide projek atau sekadar ingin menyapa? Silakan kirim pesan melalui formulir di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            {/* Sisi Kiri: Info Kontak */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-10 backdrop-blur-sm">
                <div className="space-y-2">
                  <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-widest italic">Kontak Saya</h4>
                  <p className="text-xl font-bold text-white">fazrilukman.my.id</p>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-[#ff4d4d]/10 rounded-2xl text-[#ff4d4d] group-hover:bg-[#ff4d4d] group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Email Anda</p>
                    <p className="font-semibold text-white">halo@fazrilukman.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-[#ff4d4d]/10 rounded-2xl text-[#ff4d4d] group-hover:bg-[#ff4d4d] group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Lokasi</p>
                    <p className="font-semibold text-white">Bandar Lampung, Indonesia</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#ff4d4d] to-[#b32d2d] p-10 rounded-[2.5rem] shadow-2xl shadow-[#ff4d4d]/20 transition-transform hover:scale-[1.02] duration-500">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2 text-white">Tertarik Bekerja Sama?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Mari buat sesuatu yang luar biasa bersama-sama.</p>
              </div>
            </div>

            {/* Sisi Kanan: Form Kontak */}
            <div className="lg:col-span-8 bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Nama Anda *</label>
                    <input type="text" placeholder="Enter your name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#ff4d4d]/50 transition-all text-white placeholder:text-gray-700" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Email *</label>
                    <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#ff4d4d]/50 transition-all text-white placeholder:text-gray-700" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Message *</label>
                  <textarea rows={5} placeholder="Write your message here..." className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-6 focus:outline-none focus:border-[#ff4d4d]/50 transition-all text-white placeholder:text-gray-700 resize-none"></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Profile Photo (optional)</label>
                  <div className="relative group cursor-pointer">
                    <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl py-10 flex flex-col items-center justify-center gap-3 group-hover:bg-[#ff4d4d]/5 group-hover:border-[#ff4d4d]/30 transition-all">
                      <div className="p-3 bg-white/5 rounded-full text-gray-500 group-hover:text-[#ff4d4d] transition-colors">
                        <Camera size={28} />
                      </div>
                      <p className="text-sm font-bold text-gray-500">Choose Profile Photo</p>
                      <p className="text-[9px] text-gray-700 uppercase tracking-widest font-black">Max file size: 5MB</p>
                    </div>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto px-12 py-5 bg-[#ff4d4d] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-[#e63e3e] transition-all shadow-xl shadow-[#ff4d4d]/20 group">
                  Kirim Pesan <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#080808] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">FAZRI<span className="text-[#ff4d4d]">LUKMAN</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Membangun pengalaman digital yang luar biasa dengan fokus pada performa dan estetika.</p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Navigation</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-bold uppercase tracking-widest">
                <li><Link href="/" className="hover:text-[#ff4d4d] transition-colors">Home</Link></li>
                <li><Link href="/destinasi" className="hover:text-[#ff4d4d] transition-colors">Destinasi</Link></li>
                <li><Link href="/kontak" className="text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Connect</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Stay Updated</h4>
              <div className="flex flex-col gap-3">
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#ff4d4d]/50" />
                <button className="py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-[#ff4d4d] transition-all">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-gray-600 text-[9px] font-black uppercase tracking-[0.3em]">
            <p>© 2026 FAZRI LUKMAN. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;