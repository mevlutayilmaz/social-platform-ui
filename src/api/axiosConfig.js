import axios from 'axios';
import { showErrorToast, showSuccessToast, showWarningToast } from '../utils/toastUtils';
import AuthService from '../services/AuthService';

const BASE_URL = 'https://localhost:7245/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    if (config.requiresAuth) {
      try {
        const token = await AuthService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          showWarningToast('Lütfen giriş yapın.');
          return Promise.reject('Token bulunamadı.');
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    if (response.config.successMessage) {
      showSuccessToast(response.config.successMessage);
    }
    return response
  },
  error => {    
    if (error.response) {
      error.response.data.errors.map((message) => showWarningToast(message))
    } else if (error.request) {
      showErrorToast('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.');
      
    } else {
      showErrorToast('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
    return Promise.reject(error);
  }
);

export default api;