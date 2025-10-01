import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as Theme) || 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove previous theme classes
        root.classList.remove('light', 'dark');

        // Calculate resolved theme
        let resolved: 'light' | 'dark';
        if (theme === 'system') {
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            resolved = theme;
        }

        setResolvedTheme(resolved);
        root.classList.add(resolved);

        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                const root = window.document.documentElement;
                root.classList.remove('light', 'dark');
                const resolved = mediaQuery.matches ? 'dark' : 'light';
                setResolvedTheme(resolved);
                root.classList.add(resolved);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const value: ThemeContextType = {
        theme,
        setTheme,
        resolvedTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
