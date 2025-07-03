import axios from 'axios';

// In production (single container), use relative paths
// In development, use the environment variable or default to localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Plants API
export const plantsApi = {
  getAll: (params) => api.get('/plants', { params }),
  getById: (id) => api.get(`/plants/${id}`),
  create: (data) => api.post('/plants', data),
  update: (id, data) => api.put(`/plants/${id}`, data),
  delete: (id) => api.delete(`/plants/${id}`),
  getGrowTents: () => api.get('/plants/grow-tents'),
  archive: (id, data) => api.post(`/plants/${id}/archive`, data),
  unarchive: (archivedGrowId) => api.post(`/plants/archived/${archivedGrowId}/unarchive`),
  getArchivedGrows: () => api.get('/plants/archived'),
  getArchivedGrow: (id) => api.get(`/plants/archived/${id}`),
  exportArchivedGrow: (id) => {
    return api.get(`/plants/archived/${id}/export`, { 
      responseType: 'blob',
      headers: { 'Accept': 'text/csv' }
    });
  },
  exportArchivedTent: (tentName) => {
    return api.get(`/plants/archived/tent/${encodeURIComponent(tentName)}/export`, { 
      responseType: 'blob',
      headers: { 'Accept': 'text/csv' }
    });
  },
  clearTentEnvironmentData: (tentName, confirm = true) => {
    return api.delete(`/plants/tent/${encodeURIComponent(tentName)}/environment`, { 
      data: { confirm } 
    });
  },
  getTentSummary: (tentName) => {
    return api.get(`/plants/tent/${encodeURIComponent(tentName)}/summary`);
  },
};

// Logs API
export const logsApi = {
  getAll: (params) => api.get('/logs', { params }),
  getById: (id) => api.get(`/logs/${id}`),
  create: (data) => api.post('/logs', data),
  update: (id, data) => api.put(`/logs/${id}`, data),
  delete: (id) => api.delete(`/logs/${id}`),
  uploadPhoto: (formData) => api.post('/logs/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getStats: (plantId) => api.get(`/logs/stats/${plantId}`),
};

// Environment API
export const environmentApi = {
  getAll: (params) => api.get('/environment', { params }),
  getLatest: (params) => api.get('/environment/latest', { params }),
  getWeekly: (params) => api.get('/environment/weekly', { params }),
  create: (data) => api.post('/environment', data),
  update: (id, data) => api.put(`/environment/${id}`, data),
  delete: (id) => api.delete(`/environment/${id}`),
  getGrowTents: () => api.get('/environment/grow-tents'),
};

// Health check
export const healthApi = {
  check: () => api.get('/health'),
};

export default api; 