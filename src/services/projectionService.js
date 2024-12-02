// src/services/projectionService.js

import axios from 'axios';
import { API_URLS } from '../config/api.config';

const projectionApi = axios.create({
    baseURL: API_URLS.projection.base,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  projectionApi.interceptors.request.use(
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
  
  export const projectionService = {
    addProjection: async (projectionData) => {
      try {
        const response = await projectionApi.post(API_URLS.projection.add, {
          cinema_id: projectionData.cinema_id,
          cinema_name: projectionData.cinema_name,
          show_id: projectionData.show_id,
          title: projectionData.title,
          hall: projectionData.hall,
          seats_available: projectionData.seats_available,
          date: projectionData.date,
          start_time: projectionData.start_time,
          end_time: projectionData.end_time
        });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    updateProjection: async (projectionData) => {
      try {
        const response = await projectionApi.put(API_URLS.projection.update, projectionData);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    deleteProjection: async (cinema_id, cinema_name) => {
      try {
        const response = await projectionApi.delete(API_URLS.projection.delete, {
          data: { cinema_id, cinema_name }
        });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    }
  };