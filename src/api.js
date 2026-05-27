import axios from 'axios';

const API = axios.create({
    baseURL: 'https://backend-7q2n.onrender.com/api',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials) => API.post('/auth/admin/login', credentials);
export const getStats = () => API.get('/admin/stats');
export const getBookings = () => API.get('/bookings');
export const getProviders = () => API.get('/admin/providers');
export const approveProvider = (id) => API.put(`/admin/providers/${id}/approve`);
export const getServices = () => API.get('/services');
export const getNotifications = () => API.get('/notifications');
export const createNotification = (data) => API.post('/notifications', data);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);

export default API;
