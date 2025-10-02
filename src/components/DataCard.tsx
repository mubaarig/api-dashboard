import React from 'react';
import type { User, Post } from '../types';
import { User as UserIcon, FileText } from 'lucide-react';

interface DataCardProps {
    data: User | Post;
    type: 'user' | 'post';
}

export const DataCard: React.FC<DataCardProps> = ({ data, type }) => {
    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-200 border border-gray-200 dark:border-gray-700"
            data-testid={`${type}-card`}
        >
            <div className="flex items-center gap-3 mb-4">
                {type === 'user' ? (
                    <>
                        <UserIcon className="text-blue-600 dark:text-blue-400" size={24} />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {(data as User).name}
                        </h3>
                    </>
                ) : (
                    <>
                        <FileText className="text-green-600 dark:text-green-400" size={24} />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                            {(data as Post).title}
                        </h3>
                    </>
                )}
            </div>

            {type === 'user' ? (
                <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">📧 {(data as User).email}</p>
                    <p className="text-gray-600 dark:text-gray-400">📞 {(data as User).phone}</p>
                    <p className="text-gray-600 dark:text-gray-400">🌐 {(data as User).website}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                        🏢 {(data as User).company.name}
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        User ID: {(data as Post).userId}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {(data as Post).body}
                    </p>
                </div>
            )}
        </div>
    );
};
