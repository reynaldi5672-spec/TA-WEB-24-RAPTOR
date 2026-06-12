"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { ShoppingBag, Plus, Trash2, RotateCcw, Check, Sparkles, Download } from 'lucide-react';

/**
 * Valid activity types for the packing list templates.
 */
type ActivityType = "bahari" | "alam" | "urban";

/**
 * Represents an individual item in the packing checklist.
 */
interface PackingItem {
  /** Unique identifier for the item. */
  id: string;
  /** Human-readable name of the item. */
  name: string;
  /** Whether the item has been packed by the user. */
  packed: boolean;
  /** Flag indicating if the item was added manually by the user. */
  isCustom?: boolean;
}

const DEFAULT_ITEMS: Record<ActivityType, string[]> = {
  bahari: [
    "Baju Renang & Pakaian Ganti",
    "Kacamata Hitam & Topi Pantai",
    "Sunscreen / Tabir Surya (SPF 50+)",
    "Sandal Jepit / Sandal Pantai",
    "Handuk Cepat Kering",
    "Kantong Plastik / Dry Bag (Tas Anti Air)",
    "Kamera Aksi / Waterproof Case HP",
    "Obat Anti Mabuk Laut / Plaster Luka"
  ],
  alam: [
    "Jaket Gunung / Jaket Anti Angin",
    "Sepatu Outdoor / Sandal Gunung",
    "Kaus Kaki Tebal Cadangan",
    "Jas Hujan Ringan / Ponco",
    "Senter / Headlamp + Baterai Cadangan",
    "Powerbank Kapasitas Besar",
    "Botol Minum Isi Ulang (Tumbler)",
    "Cemilan Tinggi Kalori (Cokelat/Kacang)"
  ],
  urban: [
    "Pakaian Santai / Kasual",
    "Sepatu Kets Nyaman untuk Berjalan",
    "Uang Tunai Pecahan Kecil (untuk Jajanan Lokal)",
    "Hand Sanitizer & Tisu Basah",
    "Payung Lipat Kecil",
    "Obat Lambung / Pencernaan (untuk Wisata Kuliner)",
    "Tas Selempang Ringan (Sling Bag)",
    "Charger HP & Kabel Data"
  ]
};

/**
 * PackingList Component
 * 
 * An interactive checklist tool that provides predefined templates based on the type of 
 * activity (Coastal, Nature, Urban). It allows users to track their packing progress, 
 * add custom items, and persists the state in localStorage.
 * 
 * @returns {JSX.Element | null} The rendered packing list component.
 */
export default function PackingList() {
  /** Theme context for adaptive styling. */
  const { isDarkMode } = useTheme();

  /** Currently selected activity template. */
  const [activity, setActivity] = useState<ActivityType>("bahari");

  /** List of items to be packed for the current activity. */
  const [items, setItems] = useState<PackingItem[]>([]);

  /** Input state for adding new custom items. */
  const [newItemText, setNewItemText] = useState("");

  /** Hydration safety flag for client-side rendering. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`visitbdl_packing_${activity}`);
      if (stored) {
        try {
          setItems(JSON.parse(stored));
        } catch (e) {
          console.error("Error loading packing list from storage:", e);
          loadDefaults(activity);
        }
      } else {
        loadDefaults(activity);
      }
    }
  }, [activity]);

  /**
   * Updates the local state and synchronizes it with localStorage.
   * 
   * @param {PackingItem[]} newItems - The updated list of packing items.
   */
  const saveToStorage = (newItems: PackingItem[]) => {
    setItems(newItems);
    localStorage.setItem(`visitbdl_packing_${activity}`, JSON.stringify(newItems));
  };

  /**
   * Replaces the current list with default items defined for the specified activity.
   * 
   * @param {ActivityType} act - The activity type to load defaults for.
   */
  const loadDefaults = (act: ActivityType) => {
    const list = DEFAULT_ITEMS[act].map((name, index) => ({
      id: `${act}-${index}-${Date.now()}`,
      name,
      packed: false
    }));
    saveToStorage(list);
  };

  /**
   * Toggles the 'packed' status of a specific item.
   * 
   * @param {string} id - The unique ID of the item to toggle.
   */
  const toggleItem = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    saveToStorage(updated);
  };

  /**
   * Adds a new custom item to the current packing list.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name: newItemText.trim(),
      packed: false,
      isCustom: true
    };

    saveToStorage([...items, newItem]);
    setNewItemText("");
  };

  /**
   * Removes a specific item from the packing list.
   * 
   * @param {string} id - The unique ID of the item to delete.
   */
  const deleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  /**
   * Resets the current list to its default template after user confirmation.
   */
  const resetList = () => {
    if (window.confirm("Apakah Anda yakin ingin mengatur ulang daftar barang bawaan ini ke bawaan pabrik?")) {
      loadDefaults(activity);
    }
  };

  /**
   * Downloads the current packing list as a formatted text file (.txt).
   */
  const downloadList = () => {
    if (items.length === 0) {
      alert("Daftar barang bawaan kosong, tidak ada yang bisa diunduh.");
      return;
    }
    const textContent = `DAFTAR BARANG BAWAAN WISATA - WISATA BANDAR LAMPUNG\n` +
      `Kategori: ${activity.toUpperCase()}\n` +
      `Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}\n` +
      `Progress: ${packedItems}/${totalItems} (${progressPercent}%)\n` +
      `=============================================\n\n` +
      items.map(item => `[${item.packed ? 'X' : ' '}] ${item.name} ${item.isCustom ? '(Kustom)' : ''}`).join('\n') +
      `\n\nSelamat berlibur di Bandar Lampung!`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daftar-bawaan-${activity}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const progressPercent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <div className={`p-6 md:p-10 rounded-[2.5rem] border text-left transition-all duration-500 ${
      isDarkMode ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-xl'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
            isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
          }`}>
            <ShoppingBag size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[#ffcc00] text-[9px] font-black uppercase tracking-[0.2em]">Asisten Persiapan Barang</span>
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight leading-none">
              Daftar <span className="text-[#ffcc00]">Bawaan</span> Wisata
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={downloadList}
            className={`px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00] hover:bg-[#ffcc00]/10' 
                : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00] hover:bg-[#ffcc00]/20'
            }`}
          >
            <Download size={12} /> Unduh (.txt)
          </button>
          <button
            onClick={resetList}
            className={`px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                : 'bg-gray-100 border-black/5 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <RotateCcw size={12} /> Reset Template
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Tabs (4 Columns) */}
        <div className="lg:col-span-4 space-y-3">
          <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Pilih Jenis Wisata Anda
          </span>
          <div className="flex flex-col gap-2">
            {[
              { id: "bahari", label: "🌊 Wisata Bahari / Pantai", desc: "Pahawang, Gigi Hiu, Mutun" },
              { id: "alam", label: "⛰️ Alam & Konservasi", desc: "Way Kambas, Puncak Mas" },
              { id: "urban", label: "🏢 Urban, Mall & Kuliner", desc: "Bakso, Keripik Pisang, Cafe" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActivity(t.id as ActivityType)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col ${
                  activity === t.id
                    ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00]'
                    : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/20' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                }`}
              >
                <span className="text-xs font-black uppercase tracking-wider">{t.label}</span>
                <span className={`text-[8px] uppercase tracking-widest font-bold mt-1 ${
                  activity === t.id ? 'text-[#ffcc00]/80' : 'text-gray-500'
                }`}>{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Checklist Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Progress Indicator */}
          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Kemajuan Packing Anda
              </span>
              <span className="text-xs font-black text-[#ffcc00] font-mono">
                {packedItems} / {totalItems} ({progressPercent}%)
              </span>
            </div>
            <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
              <div 
                className="h-full bg-gradient-to-r from-[#ffcc00] to-[#ffb300] rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Form Add Custom Item */}
          <form onSubmit={addItem} className="flex gap-2">
            <input
              type="text"
              placeholder="Tambahkan barang bawaan kustom sendiri (contoh: Kacamata Hitam)..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              className={`flex-1 py-3 px-5 rounded-xl border text-xs font-bold outline-none transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 text-white placeholder-gray-600' 
                  : 'bg-white border-black/10 focus:border-[#ffcc00] text-black placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              className="bg-[#ffcc00] hover:bg-[#ffb300] text-black px-4 rounded-xl flex items-center justify-center transition-all cursor-pointer font-bold"
            >
              <Plus size={18} />
            </button>
          </form>

          {/* Checklist List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 group ${
                  item.packed
                    ? 'opacity-50 line-through border-transparent bg-emerald-500/5 text-emerald-500/70'
                    : (isDarkMode ? 'border-white/5 bg-white/[0.01] hover:border-white/10' : 'border-black/5 bg-white hover:bg-gray-50/50 shadow-sm')
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    item.packed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : (isDarkMode ? 'border-white/20' : 'border-black/20 group-hover:border-[#ffcc00]')
                  }`}>
                    {item.packed && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className={`text-xs font-bold tracking-wide ${
                    item.packed ? 'text-emerald-500/80 line-through' : (isDarkMode ? 'text-white' : 'text-gray-800')
                  }`}>
                    {item.name}
                  </span>
                  {item.isCustom && (
                    <span className="text-[7px] font-black uppercase bg-[#ffcc00]/10 text-[#ffcc00] px-1.5 py-0.5 rounded border border-[#ffcc00]/20">
                      Kustom
                    </span>
                  )}
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className={`p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer`}
                  title="Hapus barang"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-10 border border-dashed rounded-xl border-gray-500/20">
                <p className="text-gray-500 text-xs italic font-bold uppercase tracking-widest">Daftar bawaan kosong.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
