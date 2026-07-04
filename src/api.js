import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backend-7q2n.onrender.com/api',
  timeout: 30000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401 && !error.config?.url?.includes('/auth/admin/login')) {
    localStorage.removeItem('adminToken');
    window.dispatchEvent(new Event('admin-unauthorized'));
  }
  return Promise.reject(error);
});

export const login = (credentials) => API.post('/auth/admin/login', credentials);
export const getStats = () => API.get('/admin/stats');
export const getBookings = () => API.get('/admin/bookings');
export const getProviders = (status) => API.get('/admin/providers', { params: status ? { status } : {} });
export const updateProviderStatus = (id, status, rejectionReason) => API.put(`/admin/providers/${id}/status`, { status, rejectionReason });
export const approveProvider = (id) => updateProviderStatus(id, 'active');
export const getServices = () => API.get('/services', { params: { includeInactive: true } });
export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
export const getComplaints = () => API.get('/complaints/admin/all');
export const resolveComplaint = (id, resolution) => API.put(`/complaints/admin/${id}/resolve`, { resolution });
export const getNotifications = () => API.get('/notifications');
export const createNotification = (data) => API.post('/notifications', data);
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);
export const getBanners = () => API.get('/config/banners');
export const updateBanners = (data) => API.put('/config/banners', data);

export default API;
