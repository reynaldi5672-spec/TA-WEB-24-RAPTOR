"use client";

import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudRainWind, CloudLightning, HelpCircle, Wind, Droplets, RefreshCw } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

/**
 * Represents parsed meteorological parameters from Open-Meteo
 */
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export default function WeatherWidget() {
  const { isDarkMode } = useTheme();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-5.4292&longitude=105.2611&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
      );
      if (!res.ok) throw new Error("Gagal mengambil data cuaca");
      const data = await res.json();
      setWeather({
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
      });
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherDetails = (code: number) => {
    // Mapping weather codes (WMO standards)
    if (code === 0) return { label: "Cerah", icon: <Sun className="text-yellow-400 animate-spin [animation-duration:20s]" size={20} /> };
    if ([1, 2, 3].includes(code)) return { label: "Berawan", icon: <CloudSun className="text-blue-300" size={20} /> };
    if ([45, 48].includes(code)) return { label: "Berkabut", icon: <CloudFog className="text-gray-400" size={20} /> };
    if ([51, 53, 55].includes(code)) return { label: "Gerimis", icon: <CloudDrizzle className="text-teal-400" size={20} /> };
    if ([61, 63, 65].includes(code)) return { label: "Hujan", icon: <CloudRain className="text-blue-400" size={20} /> };
    if ([80, 81, 82].includes(code)) return { label: "Hujan Deras", icon: <CloudRainWind className="text-blue-500" size={20} /> };
    if ([95, 96, 99].includes(code)) return { label: "Hujan Petir", icon: <CloudLightning className="text-yellow-500 animate-bounce" size={20} /> };
    return { label: "Sebagian Berawan", icon: <Cloud className="text-gray-300" size={20} /> };
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
        isDarkMode ? 'bg-white/[0.02] border-white/5 text-gray-400' : 'bg-black/[0.01] border-black/5 text-gray-500'
      }`}>
        <RefreshCw size={14} className="animate-spin text-[#ffcc00]" />
        <span className="text-[10px] font-mono tracking-wider uppercase">Loading Cuaca...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`flex items-center justify-between gap-3 p-3 rounded-2xl border ${
        isDarkMode ? 'bg-red-500/5 border-red-500/20 text-red-400' : 'bg-red-500/10 border-red-500/20 text-red-600'
      }`}>
        <div className="flex items-center gap-2">
          <HelpCircle size={14} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Cuaca Offline</span>
        </div>
        <button onClick={fetchWeather} className="p-1 hover:scale-105 active:scale-95 transition-all">
          <RefreshCw size={12} />
        </button>
      </div>
    );
  }

  const weatherInfo = getWeatherDetails(weather.weatherCode);

  return (
    <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.02] ${
      isDarkMode 
        ? 'bg-[#121212]/90 border-white/5 text-white shadow-xl' 
        : 'bg-white border-black/5 text-[#1a1a1a] shadow-md'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl flex items-center justify-center ${
          isDarkMode ? 'bg-white/5' : 'bg-black/5'
        }`}>
          {weatherInfo.icon}
        </div>
        <div className="text-left">
          <div className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Cuaca Lampung</div>
          <div className="text-xs font-black flex items-center gap-1.5">
            <span>{weatherInfo.label}</span>
            <span className="text-[#ffcc00]">{weather.temperature.toFixed(1)}°C</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-right">
        <div className="text-[9px] font-medium text-gray-500 space-y-0.5">
          <div className="flex items-center justify-end gap-1">
            <Wind size={10} className="text-gray-400" />
            <span>{weather.windSpeed.toFixed(1)} km/h</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Droplets size={10} className="text-blue-400" />
            <span>{weather.humidity}% RH</span>
          </div>
        </div>
        <button 
          onClick={fetchWeather} 
          className={`p-1.5 rounded-lg border transition-all ${
            isDarkMode 
              ? 'hover:bg-white/5 border-white/10 text-gray-400 hover:text-white' 
              : 'hover:bg-black/5 border-black/5 text-gray-500 hover:text-black'
          }`}
          title="Refresh Cuaca"
        >
          <RefreshCw size={10} />
        </button>
      </div>
    </div>
  );
}
