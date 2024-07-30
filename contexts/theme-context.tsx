import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
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
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme === 'light' ? COLORS_LIGHT : COLORS_DARK);
        }
      } catch (e) {
        console.error('Failed to load theme.');
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === COLORS_LIGHT ? COLORS_DARK : COLORS_LIGHT;
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme === COLORS_LIGHT ? 'light' : 'dark');
    } catch (e) {
      console.error('Failed to save theme.');
    }
  };

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <StatusBar style={theme === COLORS_LIGHT ? 'dark' : 'light'} />
        {children}
      </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
