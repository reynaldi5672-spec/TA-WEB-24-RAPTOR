"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Defines the structure of the theme context data.
 */
interface ThemeContextType {
  /** Whether the dark mode is currently active. */
  isDarkMode: boolean;
  /** Function to update the dark mode state. */
  setIsDarkMode: (value: boolean) => void;
}

/**
 * Context for managing global UI theme (Dark/Light).
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * 
 * Wraps the application to provide theme state management. Handles hydration 
 * to ensure that initial server rendering matches client state (defaulting to dark).
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components to be rendered.
 * @returns {JSX.Element} The theme context provider wrapper.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /** Local state for dark mode toggle. Defaults to true (dark). */
  const [isDarkMode, setIsDarkMode] = useState(true);

  /** Flag to track if the component has mounted in the browser. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    /**
     * Prevents hydration mismatch by rendering a static placeholder until mounted.
     */
    return <div className="bg-[#050505] min-h-screen" />;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to easily access theme context anywhere in the application.
 * 
 * @throws {Error} If used outside of a ThemeProvider.
 * @returns {ThemeContextType} The current theme state and updater.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme harus digunakan di dalam ThemeProvider");
  return context;
}