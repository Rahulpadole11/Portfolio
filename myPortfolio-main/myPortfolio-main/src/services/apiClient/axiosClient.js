// API Client Configuration
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;
const ENABLE_LOGGING = import.meta.env.VITE_ENABLE_LOGGING === 'true';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (ENABLE_LOGGING) {
      console.log(`📤 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (ENABLE_LOGGING) {
      console.log(`📥 [API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`❌ [API Error] ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('❌ [API Error] No response received:', error.request);
    } else {
      console.error('❌ [API Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
