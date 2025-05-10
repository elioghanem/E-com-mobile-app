import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  error: string;
}

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const lightColors = {
  background: '#FFFFFF',
  text: '#333333',
  primary: '#FF3B30',
  secondary: '#FF9500',
  border: '#FFE5E5',
  inputBackground: '#FFF5F5',
  error: '#FF0000',
  success: '#FF9500',
};

const darkColors = {
  background: '#1A1A1A',
  text: '#FFFFFF',
  primary: '#FF453A',
  secondary: '#FF9F0A',
  border: '#4D0000',
  inputBackground: '#2A0000',
  error: '#FF3B30',
  success: '#FF9F0A',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 