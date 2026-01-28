import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',  // Direct vers backend
    timeout: 5000
});

// Token auto pour admin
api.interceptors.request.use(config => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;