import React from 'react';
import type { FilterType } from '../types';
import { Users, FileText, LayoutGrid } from 'lucide-react';

interface FilterBarProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
    const filters = [
        { key: 'all' as FilterType, label: 'All', icon: LayoutGrid },
        { key: 'users' as FilterType, label: 'Users', icon: Users },
        { key: 'posts' as FilterType, label: 'Posts', icon: FileText },
    ];

    const handleFilterClick = (filter: FilterType): void => {
        onFilterChange(filter);
    };

    return (
        <div className="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
            {filters.map(({ key, label, icon: Icon }) => (
                <button
                    key={key}
                    onClick={() => handleFilterClick(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        currentFilter === key
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                >
                    <Icon size={18} />
                    {label}
                </button>
            ))}
        </div>
    );
};
