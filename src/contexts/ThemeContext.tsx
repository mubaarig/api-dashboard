import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Check localStorage first, then system preference
        const saved = localStorage.getItem('theme') as Theme;
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
            return saved;
        }
        return 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    // Function to update the theme
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove all theme classes
        root.classList.remove('light', 'dark');

        let currentResolvedTheme: 'light' | 'dark';

        if (theme === 'system') {
            // Use system preference
            currentResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        } else {
            // Use user selection
            currentResolvedTheme = theme;
        }

        setResolvedTheme(currentResolvedTheme);
        root.classList.add(currentResolvedTheme);

        console.log('Theme updated:', { theme, resolvedTheme: currentResolvedTheme });
    }, [theme]);

    // Listen for system theme changes when in system mode
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = () => {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');

            const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light';
            setResolvedTheme(newResolvedTheme);
            root.classList.add(newResolvedTheme);

            console.log('System theme changed to:', newResolvedTheme);
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
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
