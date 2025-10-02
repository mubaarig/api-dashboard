import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { Theme } from '../types';

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const themes: { key: Theme; label: string; icon: React.ReactNode }[] = [
        {
            key: 'light',
            label: 'Light',
            icon: <Sun size={18} />,
        },
        {
            key: 'dark',
            label: 'Dark',
            icon: <Moon size={18} />,
        },
        {
            key: 'system',
            label: 'System',
            icon: <Monitor size={18} />,
        },
    ];

    const handleThemeChange = (newTheme: Theme) => {
        console.log('Changing theme to:', newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {themes.map(({ key, label, icon }) => (
                <button
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        theme === key
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                    title={label}
                    aria-label={`Switch to ${label} theme`}
                    aria-pressed={theme === key}
                >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                </button>
            ))}
        </div>
    );
};
