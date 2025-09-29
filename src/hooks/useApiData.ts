import { useState, useEffect } from 'react';
import { User, Post, ApiResponse, FilterType } from '../types';
import { fetchUsers, fetchPosts } from '../utils/api';

export const useApiData = (filter: FilterType) => {
    const [users, setUsers] = useState<ApiResponse<User[]>>({
        data: null,
        loading: true,
        error: null,
    });
    const [posts, setPosts] = useState<ApiResponse<Post[]>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                if (filter === 'all' || filter === 'users') {
                    const usersData = await fetchUsers();
                    setUsers({ data: usersData, loading: false, error: null });
                }

                if (filter === 'all' || filter === 'posts') {
                    const postsData = await fetchPosts();
                    setPosts({ data: postsData, loading: false, error: null });
                }
            } catch (error) {
                setUsers(prev => ({ ...prev, loading: false, error: 'Failed to fetch data' }));
                setPosts(prev => ({ ...prev, loading: false, error: 'Failed to fetch data' }));
            }
        };

        loadData();
    }, [filter]);

    return { users, posts };
};
