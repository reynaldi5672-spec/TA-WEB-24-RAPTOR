"use client";
import React from 'react';
import { Edit3, Trash2, Eye } from 'lucide-react';

export default function AdminTable({ theme }: { theme: string }) {
  const isDark = theme === 'dark';
  
  // Data dummy (nanti ambil dari API PostgreSQL kamu)
  const data = [
    { id: 1, name: 'Bukit Aslan', cat: 'Terpopuler', status: 'Active' },
    { id: 2, name: 'Pantai Sebalang', cat: 'Pantai', status: 'Active' },
  ];

  return (
    <div className={`rounded-3xl border overflow-hidden shadow-2xl ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
      <table className="w-full text-left">
        <thead>
          <tr className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
            <th className="p-6">Destinasi</th>
            <th className="p-6">Kategori</th>
            <th className="p-6">Status</th>
            <th className="p-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item) => (
            <tr key={item.id} className={`group transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
              <td className="p-6 font-bold italic uppercase tracking-tighter">{item.name}</td>
              <td className="p-6">
                <span className="text-[9px] font-black px-3 py-1 bg-[#ffcc00]/10 text-[#ffcc00] rounded-full uppercase italic">
                  {item.cat}
                </span>
              </td>
              <td className="p-6 text-xs text-green-500 font-mono">● {item.status}</td>
              <td className="p-6">
                <div className="flex justify-center gap-4 text-gray-500">
                  <button className="hover:text-[#ffcc00] transition-colors"><Edit3 size={18} /></button>
                  <button className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}