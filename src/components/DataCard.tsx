import React from 'react';
import type { User, Post } from '../types';
import { User as UserIcon, FileText } from 'lucide-react';

interface DataCardProps {
    data: User | Post;
    type: 'user' | 'post';
}

export const DataCard: React.FC<DataCardProps> = ({ data, type }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
                {type === 'user' ? (
                    <>
                        <UserIcon className="text-blue-600" size={24} />
                        <h3 className="text-lg font-semibold text-gray-800">
                            {(data as User).name}
                        </h3>
                    </>
                ) : (
                    <>
                        <FileText className="text-green-600" size={24} />
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                            {(data as Post).title}
                        </h3>
                    </>
                )}
            </div>

            {type === 'user' ? (
                <div className="space-y-2 text-sm text-gray-600">
                    <p>📧 {(data as User).email}</p>
                    <p>📞 {(data as User).phone}</p>
                    <p>🌐 {(data as User).website}</p>
                    <p>🏢 {(data as User).company.name}</p>
                </div>
            ) : (
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">User ID: {(data as Post).userId}</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{(data as Post).body}</p>
                </div>
            )}
        </div>
    );
};
