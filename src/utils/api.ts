import axios from 'axios';

const api = axios.create({
    'https://jsonplaceholder.typicode.com',
})


export const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
}

export const fetchPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
}

export default api;