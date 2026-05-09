"use client";
import React, { useState } from 'react';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import AdminDashboard from './AdminDashboard'; 

export default function AdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk menampung input
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah browser melakukan GET request otomatis
    setIsLoading(true);

    // Endpoint tujuan sesuai mode
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST', // Memastikan metode pengiriman adalah POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        if (isRegister) {
          setIsRegister(false); // Balik ke form login setelah daftar sukses
          setFormData({ username: '', password: '' }); // Reset form
        } else {
          setIsLoggedIn(true); // Masuk ke Dashboard
        }
      } else {
        // Menampilkan error dari database (misal: user sudah ada)
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Gagal konek ke API. Pastikan server & pgAdmin jalan!");
    } finally {
      setIsLoading(false);
    }
  };

  // Jika sudah login, tampilkan Dashboard
  if (isLoggedIn) return <AdminDashboard />;

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
        
        {/* Header Section */}
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

        {/* Form Section */}
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
              <>{isRegister ? 'Register' : 'Login'} <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <button 
            type="button" // Sangat penting agar tidak memicu form submit
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