"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { Calculator, Users, Calendar, Home, Car, Utensils, HelpCircle, AlertCircle, ArrowRight } from 'lucide-react';

/**
 * Represents a destination object used for calculating estimated entrance fees.
 */
interface Destinasi {
  /** Unique identifier for the destination. */
  id: number;
  /** Name of the destination. */
  nama: string;
  /** City or region where the destination is located. */
  lokasi: string;
  /** Average user rating. */
  rating: number;
  /** Category type (e.g., "bahari", "eksotis") used for price estimation. */
  kategori: string;
}

const FALLBACK_DESTINASI: Destinasi[] = [
  { id: 1, nama: "Pulau Pahawang", lokasi: "Pesawaran", rating: 4.8, kategori: "bahari" },
  { id: 2, nama: "Pantai Gigi Hiu", lokasi: "Tanggamus", rating: 4.7, kategori: "eksotis" },
  { id: 3, nama: "Way Kambas", lokasi: "Lampung Timur", rating: 4.6, kategori: "konservasi" },
  { id: 4, nama: "Puncak Mas", lokasi: "Bandar Lampung", rating: 4.5, kategori: "pemandangan" },
];

/**
 * CostEstimator Component
 * 
 * An interactive tool for travelers to estimate their vacation budget in Bandar Lampung.
 * Calculates costs for accommodation, transportation, food, and entrance fees based on
 * user inputs like the number of travelers, duration, and service tiers.
 * 
 * @returns {JSX.Element} The rendered cost estimator tool.
 */
export default function CostEstimator() {
  /** Theme context for adaptive styling. */
  const { isDarkMode } = useTheme();

  /** State for the list of available destinations. */
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>(FALLBACK_DESTINASI);

  /** Currently selected destination ID for specific ticket pricing. */
  const [selectedDestinasiId, setSelectedDestinasiId] = useState<string>("custom");

  /** Number of people traveling. */
  const [travelers, setTravelers] = useState<number>(2);

  /** Duration of the trip in days. */
  const [days, setDays] = useState<number>(2);
  
  /** Tier of accommodation selected (budget, mid, luxury). */
  const [accommodationTier, setAccommodationTier] = useState<"budget" | "mid" | "luxury">("mid");

  /** Mode of transportation selected (public, car, tour). */
  const [transportTier, setTransportTier] = useState<"public" | "car" | "tour">("public");

  /** Tier of food and activities selected (budget, mid, premium). */
  const [foodTier, setFoodTier] = useState<"budget" | "mid" | "premium">("mid");

  /** 
   * Accommodation base prices in IDR per night.
   * @constant 
   */
  const ACCOMMODATION_COSTS = {
    budget: 150000,   // Homestay / Hostel
    mid: 450000,      // Guest House / Hotel *3
    luxury: 1350000   // Resort / Hotel *5
  };

  /** 
   * Transportation base prices in IDR per day.
   * @constant 
   */
  const TRANSPORT_COSTS = {
    public: 75000,    // Scooter Rent / Public Trans
    car: 550000,      // Rental Car + Driver
    tour: 1200000     // Private Boat / Tour Package
  };

  /** 
   * Food and activity base prices in IDR per person per day.
   * @constant 
   */
  const FOOD_COSTS = {
    budget: 80000,    // Local street food / warung
    mid: 200000,      // Cafes & standard restaurants
    premium: 450000   // Seafood feasts & fine dining
  };

  useEffect(() => {
    /**
     * Fetches real destination data from the API to populate the selection dropdown.
     */
    const fetchDestinasi = async () => {
      try {
        const res = await fetch('/api/destinasi');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setDestinasiList(data);
        }
      } catch (e) {
        console.error("Gagal memuat destinasi untuk estimator, menggunakan fallback.", e);
      }
    };
    fetchDestinasi();
  }, []);

  /**
   * Calculates the estimated ticket price based on the selected destination's category.
   * 
   * @returns {number} The total estimated ticket cost in IDR.
   */
  const getTicketPrice = () => {
    if (selectedDestinasiId === "custom") return 25000 * travelers;
    const dest = destinasiList.find(d => d.id.toString() === selectedDestinasiId);
    if (!dest) return 20000 * travelers;
    
    // Estimate by category
    const cat = dest.kategori.toLowerCase();
    if (cat.includes("pantai") || cat.includes("bahari")) return 50000 * travelers; // Boat / entrance
    if (cat.includes("konservasi") || cat.includes("hiu")) return 75000 * travelers;
    return 15000 * travelers;
  };

  // Calculate totals
  const accommodationTotal = ACCOMMODATION_COSTS[accommodationTier] * Math.max(0, days - 1);
  const transportTotal = TRANSPORT_COSTS[transportTier] * days;
  const foodTotal = FOOD_COSTS[foodTier] * days * travelers;
  const ticketTotal = getTicketPrice();
  const grandTotal = accommodationTotal + transportTotal + foodTotal + ticketTotal;

  /**
   * Helper function to format numeric values into Indonesian Rupiah (IDR) currency strings.
   * 
   * @param {number} num - The numeric value to format.
   * @returns {string} The formatted currency string.
   */
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className={`p-6 md:p-10 rounded-[2.5rem] border text-left transition-all duration-500 ${
      isDarkMode ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-xl'
    }`}>
      
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
          isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
        }`}>
          <Calculator size={22} className="animate-pulse" />
        </div>
        <div>
          <span className="text-[#ffcc00] text-[9px] font-black uppercase tracking-[0.2em]">Estimator Anggaran</span>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight leading-none">
            Rencana <span className="text-[#ffcc00]">Biaya</span> Wisata
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Destination Dropdown */}
          <div className="space-y-2">
            <label className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Pilih Destinasi Utama
            </label>
            <select
              value={selectedDestinasiId}
              onChange={(e) => setSelectedDestinasiId(e.target.value)}
              className={`w-full p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider outline-none border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/10 text-white focus:border-[#ffcc00]' 
                  : 'bg-gray-50 border-black/10 text-black focus:border-[#ffcc00]'
              }`}
            >
              <option value="custom" className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>📝 Custom / Rencana Umum</option>
              {destinasiList.map((dest) => (
                <option key={dest.id} value={dest.id.toString()} className={isDarkMode ? 'bg-[#111]' : 'bg-white'}>
                  📍 {dest.nama} ({dest.lokasi})
                </option>
              ))}
            </select>
          </div>

          {/* Steppers: Travelers & Days */}
          <div className="grid grid-cols-2 gap-4">
            {/* Travelers */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Users size={12} /> Jumlah Orang
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setTravelers(prev => Math.max(1, prev - 1))}
                  className={`w-11 h-11 border rounded-l-xl flex items-center justify-center font-bold text-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-gray-100'
                  }`}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                  className={`w-full h-11 text-center font-bold border-y text-xs outline-none ${
                    isDarkMode ? 'bg-transparent border-white/10' : 'bg-transparent border-black/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setTravelers(prev => Math.min(100, prev + 1))}
                  className={`w-11 h-11 border rounded-r-xl flex items-center justify-center font-bold text-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-gray-100'
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Days */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Calendar size={12} /> Durasi (Hari)
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setDays(prev => Math.max(1, prev - 1))}
                  className={`w-11 h-11 border rounded-l-xl flex items-center justify-center font-bold text-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-gray-100'
                  }`}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className={`w-full h-11 text-center font-bold border-y text-xs outline-none ${
                    isDarkMode ? 'bg-transparent border-white/10' : 'bg-transparent border-black/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setDays(prev => Math.min(90, prev + 1))}
                  className={`w-11 h-11 border rounded-r-xl flex items-center justify-center font-bold text-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-gray-100'
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Tiers Toggles */}
          <div className="space-y-4 pt-2">
            {/* Accommodation Tier */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Home size={12} /> Kelas Akomodasi ({days > 1 ? `${days - 1} Malam` : 'Tanpa Menginap'})
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "budget", label: "Budget", desc: "Homestay / Hostel" },
                  { id: "mid", label: "Standard", desc: "Guest House / Bintang 3" },
                  { id: "luxury", label: "Luxury", desc: "Resort / Bintang 5" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    disabled={days <= 1}
                    onClick={() => setAccommodationTier(t.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      days <= 1 ? 'opacity-40 cursor-not-allowed' : ''
                    } ${
                      accommodationTier === t.id && days > 1
                        ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00] font-bold shadow-[0_0_15px_rgba(255,204,0,0.1)]'
                        : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase tracking-wider">{t.label}</div>
                    <div className="text-[8px] text-gray-500 font-medium mt-0.5 leading-none">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transport Tier */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Car size={12} /> Mode Transportasi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "public", label: "Hemat", desc: "Sewa Motor / Umum" },
                  { id: "car", label: "Mobil", desc: "Rental Mobil + Driver" },
                  { id: "tour", label: "Paket Kapal", desc: "Sewa Kapal / Open Trip" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTransportTier(t.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      transportTier === t.id
                        ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00] font-bold shadow-[0_0_15px_rgba(255,204,0,0.1)]'
                        : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase tracking-wider">{t.label}</div>
                    <div className="text-[8px] text-gray-500 font-medium mt-0.5 leading-none">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Tier */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Utensils size={12} /> Konsumsi & Aktivitas
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "budget", label: "Lokal", desc: "Warung / Kuliner Khas" },
                  { id: "mid", label: "Kafe", desc: "Resto / Kafe Estetik" },
                  { id: "premium", label: "Pesta Seafood", desc: "Seafood / Kuliner Mewah" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFoodTier(t.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      foodTier === t.id
                        ? 'border-[#ffcc00] bg-[#ffcc00]/5 text-[#ffcc00] font-bold shadow-[0_0_15px_rgba(255,204,0,0.1)]'
                        : (isDarkMode ? 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white' : 'border-black/5 bg-gray-50 text-gray-600 hover:bg-gray-100')
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase tracking-wider">{t.label}</div>
                    <div className="text-[8px] text-gray-500 font-medium mt-0.5 leading-none">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown & Grand Total (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
          }`}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Rincian Pengeluaran
            </h3>
            
            <div className="space-y-4 text-xs font-bold tracking-wide">
              {/* Accomodation */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Akomodasi</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>
                  {days > 1 ? formatIDR(accommodationTotal) : "Rp 0 (One-day Trip)"}
                </span>
              </div>

              {/* Transport */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Transportasi</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{formatIDR(transportTotal)}</span>
              </div>

              {/* Food & Activity */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Konsumsi ({travelers} Org × {days} Hari)</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{formatIDR(foodTotal)}</span>
              </div>

              {/* Tickets */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Estimasi Tiket & Masuk</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{formatIDR(ticketTotal)}</span>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="mt-6 space-y-3">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest block">Proporsi Pengeluaran</span>
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-gray-500/10">
                  {accommodationTotal > 0 && (
                    <div 
                      style={{ width: `${(accommodationTotal / grandTotal) * 100}%` }} 
                      className="h-full bg-blue-500 transition-all duration-500" 
                      title={`Akomodasi: ${Math.round((accommodationTotal / grandTotal) * 100)}%`}
                    />
                  )}
                  {transportTotal > 0 && (
                    <div 
                      style={{ width: `${(transportTotal / grandTotal) * 100}%` }} 
                      className="h-full bg-[#ffcc00] transition-all duration-500" 
                      title={`Transportasi: ${Math.round((transportTotal / grandTotal) * 100)}%`}
                    />
                  )}
                  {foodTotal > 0 && (
                    <div 
                      style={{ width: `${(foodTotal / grandTotal) * 100}%` }} 
                      className="h-full bg-emerald-500 transition-all duration-500" 
                      title={`Konsumsi: ${Math.round((foodTotal / grandTotal) * 100)}%`}
                    />
                  )}
                  {ticketTotal > 0 && (
                    <div 
                      style={{ width: `${(ticketTotal / grandTotal) * 100}%` }} 
                      className="h-full bg-purple-500 transition-all duration-500" 
                      title={`Tiket: ${Math.round((ticketTotal / grandTotal) * 100)}%`}
                    />
                  )}
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[8px] font-black uppercase tracking-wider text-gray-400">
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Akomodasi ({grandTotal > 0 ? Math.round((accommodationTotal / grandTotal) * 100) : 0}%)</div>
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcc00]" /> Transport ({grandTotal > 0 ? Math.round((transportTotal / grandTotal) * 100) : 0}%)</div>
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Konsumsi ({grandTotal > 0 ? Math.round((foodTotal / grandTotal) * 100) : 0}%)</div>
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Tiket ({grandTotal > 0 ? Math.round((ticketTotal / grandTotal) * 100) : 0}%)</div>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-px my-4 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>

              {/* Grand Total */}
              <div className="flex flex-col text-left space-y-1.5 pt-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Estimasi Total Biaya</span>
                <span className="text-3xl font-black text-[#ffcc00] italic drop-shadow-[0_4px_12px_rgba(255,204,0,0.15)]">
                  {formatIDR(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Alert / Tips Card */}
          <div className={`p-5 rounded-3xl border flex gap-3 text-left ${
            isDarkMode ? 'bg-blue-500/5 border-blue-500/20 text-blue-300' : 'bg-blue-500/10 border-blue-500/20 text-blue-800'
          }`}>
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-wider mb-1">Tips Hemat Wisata BDL</h4>
              <p className="text-[10px] leading-relaxed opacity-85">
                Lakukan pemesanan homestay jauh-jauh hari dan sewa sepeda motor jika Anda bepergian dalam grup kecil (1-2 orang) untuk menekan anggaran transportasi hingga 80%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
