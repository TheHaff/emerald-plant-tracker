// @ts-nocheck
import axios from 'axios';
import type {
  Plant,
  CreatePlantRequest,
  UpdatePlantRequest,
  ArchivePlantRequest,
  Log,
  CreateLogRequest,
  UpdateLogRequest,
  EnvironmentData,
  CreateEnvironmentRequest,
  UpdateEnvironmentRequest,
  ArchivedGrow,
  GrowTent,
  PlantsQueryParams,
  LogsQueryParams,
  EnvironmentQueryParams,
  FormData,
} from '../types/api';

// In production (single container), use relative paths
// In development, use relative paths with Vite proxy
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '' : 'http://localhost:420');

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const message =
      (error.response?.data as any)?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  },
);

// Plants API
export const plantsApi = {
  getAll: (params?: PlantsQueryParams) =>
    api.get<Plant[]>('/plants', { params }),
  getById: (id: number) => api.get<Plant>(`/plants/${id}`),
  create: (data: CreatePlantRequest) => api.post<Plant>('/plants', data),
  update: (id: number, data: UpdatePlantRequest) =>
    api.put<Plant>(`/plants/${id}`, data),
  delete: (id: number) => api.delete(`/plants/${id}`),
  getGrowTents: () => api.get<GrowTent[]>('/plants/grow-tents'),
  archive: (id: number, data: ArchivePlantRequest) =>
    api.post<Plant>(`/plants/${id}/archive`, data),
  unarchive: (archivedGrowId: number) =>
    api.post<Plant>(`/plants/archived/${archivedGrowId}/unarchive`),
  getArchivedGrows: () => api.get<ArchivedGrow[]>('/plants/archived'),
  getArchivedGrow: (id: number) =>
    api.get<ArchivedGrow>(`/plants/archived/${id}`),
  exportArchivedGrow: (id: number) => {
    return api.get(`/plants/archived/${id}/export`, {
      responseType: 'blob',
      headers: { Accept: 'text/csv' },
    });
  },
  exportArchivedTent: (tentName: string) => {
    return api.get(
      `/plants/archived/tent/${encodeURIComponent(tentName)}/export`,
      {
        responseType: 'blob',
        headers: { Accept: 'text/csv' },
      },
    );
  },
  clearTentEnvironmentData: (tentName: string, confirm = true) => {
    return api.delete(
      `/plants/tent/${encodeURIComponent(tentName)}/environment`,
      {
        data: { confirm },
      },
    );
  },
  getTentSummary: (tentName: string) => {
    return api.get(`/plants/tent/${encodeURIComponent(tentName)}/summary`);
  },
};

// Logs API
export const logsApi = {
  getAll: (params?: LogsQueryParams) => api.get<Log[]>('/logs', { params }),
  getById: (id: number) => api.get<Log>(`/logs/${id}`),
  create: (data: CreateLogRequest) => api.post<Log>('/logs', data),
  update: (id: number, data: UpdateLogRequest) =>
    api.put<Log>(`/logs/${id}`, data),
  delete: (id: number) => api.delete(`/logs/${id}`),
  uploadPhoto: (formData: FormData) =>
    api.post('/logs/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getStats: (plantId: number) => api.get(`/logs/stats/${plantId}`),
};

// Environment API
export const environmentApi = {
  getAll: (params?: EnvironmentQueryParams) =>
    api.get<EnvironmentData[]>('/environment', { params }),
  getLatest: (params?: EnvironmentQueryParams) =>
    api.get<EnvironmentData[]>('/environment/latest', { params }),
  getWeekly: (params?: EnvironmentQueryParams) =>
    api.get<EnvironmentData[]>('/environment/weekly', { params }),
  create: (data: CreateEnvironmentRequest) =>
    api.post<EnvironmentData>('/environment', data),
  update: (id: number, data: UpdateEnvironmentRequest) =>
    api.put<EnvironmentData>(`/environment/${id}`, data),
  delete: (id: number) => api.delete(`/environment/${id}`),
  getGrowTents: () => api.get<GrowTent[]>('/environment/grow-tents'),
};

// Health check
export const healthApi = {
  check: () => api.get('/health'),
};

export default api;
