import React, { createContext, useContext, useEffect } from 'react';

export type Theme = 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * Light-only theme provider.
 * Kept for backwards compatibility — the site is intentionally
 * always light mode. No toggle, no dark class, no listeners.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
    try {
      localStorage.setItem('sara-theme', 'light');
    } catch {
      // storage unavailable — ignore
    }
  }, []);

  return <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
