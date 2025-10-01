export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export type FilterType = 'all' | 'users' | 'posts';

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

export interface FetchOptions {
    timeout?: number;
    retries?: number;
}

export type ApiResult<T> = { success: true; data: T } | { success: false; error: ApiError };

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}
