import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const THEME_STORAGE_KEY = 'limitededition-theme-mode';
const ThemeContext = createContext(null);

const getSystemTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return { theme: 'light', preference: 'system' };

  const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedPreference === 'light' || storedPreference === 'dark') {
    return { theme: storedPreference, preference: storedPreference };
  }

  return { theme: getSystemTheme(), preference: 'system' };
};

export const ThemeProvider = ({ children }) => {
  const initialTheme = getInitialTheme();
  const [theme, setTheme] = useState(initialTheme.theme);
  const [preference, setPreference] = useState(initialTheme.preference);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      if (preference !== 'system') return;
      setTheme(event.matches ? 'dark' : 'light');
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preference]);

  const value = useMemo(() => {
    const setMode = (nextPreference) => {
      setPreference(nextPreference);
      if (nextPreference === 'system') {
        const nextTheme = getSystemTheme();
        setTheme(nextTheme);
        window.localStorage.removeItem(THEME_STORAGE_KEY);
        return;
      }

      setTheme(nextPreference);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    };

    return {
      theme,
      preference,
      isDark: theme === 'dark',
      isSystem: preference === 'system',
      setMode,
      toggleTheme: () => setMode(theme === 'dark' ? 'light' : 'dark'),
    };
  }, [theme, preference]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
