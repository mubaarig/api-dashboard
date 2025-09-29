import React, { useState } from 'react';
import { useApiData } from '../hooks/useApiData';
import { FilterBar } from './FilterBar';
import { DataCard } from './DataCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import type { FilterType } from '../types';

export const Dashboard: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>('all');
    const { users, posts } = useApiData(filter);

    const showUsers = filter === 'all' || filter === 'users';
    const showPosts = filter === 'all' || filter === 'posts';

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Interactive API Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Explore users and posts from JSONPlaceholder API
                    </p>
                </header>

                <FilterBar currentFilter={filter} onFilterChange={setFilter} />

                <div className="grid gap-6">
                    {showUsers && (
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Users ({users.data?.length || 0})
                            </h2>
                            {users.loading && <LoadingSpinner />}
                            {users.error && <ErrorMessage message={users.error} />}
                            {users.data && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {users.data.map(user => (
                                        <DataCard key={user.id} data={user} type="user" />
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {showPosts && (
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Posts ({posts.data?.length || 0})
                            </h2>
                            {posts.loading && <LoadingSpinner />}
                            {posts.error && <ErrorMessage message={posts.error} />}
                            {posts.data && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {posts.data.slice(0, 9).map(post => (
                                        <DataCard key={post.id} data={post} type="post" />
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
