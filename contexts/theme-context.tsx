import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS_LIGHT, COLORS_DARK } from '../constants';

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(COLORS_LIGHT);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setTheme(COLORS_DARK);
      } else {
        setTheme(COLORS_LIGHT);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === COLORS_LIGHT ? COLORS_DARK : COLORS_LIGHT;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme === COLORS_LIGHT ? 'light' : 'dark');
  };

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };