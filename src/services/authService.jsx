// src/services/authService.js
import axios from 'axios';
import { API_URLS } from '../config/api.config';

const api = axios.create({
  baseURL: API_URLS.auth.base,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post(API_URLS.auth.register, {
        cinema_id: userData.cinema_id,
        user_id: userData.user_id,
        password: userData.password,
        role: userData.role || 'client'
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post(API_URLS.auth.login, {
        cinema_id: credentials.cinema_id,
        user_id: credentials.user_id,
        password: credentials.password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', credentials.user_id);
        localStorage.setItem('cinema_id', credentials.cinema_id);
      }
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  validateToken: async (token) => {
    try {
      const response = await api.post(API_URLS.auth.validate, { token });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('cinema_id');
    localStorage.removeItem('role');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

const handleError = (error) => {
  if (error.response?.data?.error) {
    return new Error(error.response.data.error);
  }
  return new Error('Error en el servidor');
};
