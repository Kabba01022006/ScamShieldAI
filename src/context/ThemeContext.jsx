import React, { createContext, useContext, useState, useEffect } from 'react';

// Controls light/dark mode for the whole site and remembers the user's choice.

const ThemeContext = createContext();
const THEME_KEY = 'scamshield_theme';

export const ThemeProvider = ({ children }) => {
  // Restore saved theme on load; default to 'light' if nothing is saved.
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Whenever theme changes: (1) toggle the "dark" class on <html>, which is
  // what makes Tailwind's `dark:` classes activate across the whole app,
  // and (2) save the choice so it persists after a refresh.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
