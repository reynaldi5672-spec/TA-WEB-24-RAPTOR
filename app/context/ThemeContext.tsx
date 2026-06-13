"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} ThemeContextType
 * @property {boolean} isDarkMode - Indicates if dark mode is active.
 * @property {(value: boolean) => void} setIsDarkMode - Function to update the dark mode state.
 */

/**
 * Interface for ThemeContext values.
 */
interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

/**
 * Context for managing global UI theme (Dark/Light).
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component props.
 * 
 * @typedef {Object} ThemeProviderProps
 * @property {React.ReactNode} children - Child components to be wrapped by the provider.
 */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider Component
 * 
 * Wraps the application to provide theme state management. Handles hydration 
 * to ensure that initial server rendering matches client state (defaulting to dark).
 * 
 * @param {ThemeProviderProps} props - The component props.
 * @returns {JSX.Element} The theme context provider wrapper.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
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