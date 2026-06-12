"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = (totalScroll / windowHeight) * 100;
      setScrollProgress(scrollValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
      <div 
        className={`h-full bg-[#ffcc00] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,204,0,0.5)]`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
