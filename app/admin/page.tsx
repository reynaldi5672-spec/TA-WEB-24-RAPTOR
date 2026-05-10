"use client";
import React, { useState, useEffect } from 'react';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import AdminDashboard from './AdminDashboard'; 
import Swal from 'sweetalert2';

export default function AdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Gunakan await pada Swal.fire agar transisi halaman menunggu alert selesai/ditutup
        await Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          background: '#111',
          color: '#fff',
          confirmButtonColor: '#ffcc00',
          confirmButtonText: 'Mantap!',
          timer: 1500,
          showConfirmButton: false // Biar lebih smooth, biarkan timer yang menutup
        });

        if (isRegister) {
          setIsRegister(false);
          setFormData({ username: '', password: '' });
        } else {
          // Hanya ganti state jika komponen masih terpasang
          setIsLoggedIn(true);
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Ada yang salah nih!',
          icon: 'error',
          background: '#111',
          color: '#fff',
          confirmButtonColor: '#d33'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Crash!',
        text: 'Gagal konek ke server. Cek pgAdmin kamu!',
        icon: 'warning',
        background: '#111',
        color: '#fff'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render logic guard
  if (!mounted) return null;
  
  // Jika sudah login, langsung tampilkan dashboard tanpa merender form login lagi
  if (isLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-6 font-sans text-left">
      <div className="w-full max-w-md bg-[#111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#ffcc00] rounded-2xl flex items-center justify-center text-black mx-auto mb-6 shadow-[0_0_30px_rgba(255,204,0,0.3)]">
            <Lock size={30} />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            {isRegister ? 'Create' : 'Admin'} <span className="text-[#ffcc00]">{isRegister ? 'Account' : 'Login'}</span>
          </h2>
          <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">
            {isRegister ? 'Join Administration' : 'Secure Access Point'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                required
                disabled={isLoading}
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="AdminID" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#ffcc00]/50 text-white transition-all disabled:opacity-50" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                required
                disabled={isLoading}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[#ffcc00]/50 text-white transition-all disabled:opacity-50" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#ffcc00] text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#ffcc00]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>{isRegister ? 'Register Now' : 'Login'} <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <button 
            type="button" 
            onClick={() => setIsRegister(!isRegister)}
            className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#ffcc00] transition-colors"
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </main>
  );
}