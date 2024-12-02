// src/services/cinemaService.js

import axios from 'axios';
import { API_URLS } from '../config/api.config';

const cinemaApi = axios.create({
    baseURL: API_URLS.cinema.base,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  cinemaApi.interceptors.request.use(
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
  
  export const cinemaService = {
    addCinema: async (cinemaData) => {
      try {
        const response = await cinemaApi.post(API_URLS.cinema.add, {
          cinema_id: cinemaData.cinema_id,
          cinema_name: cinemaData.cinema_name,
          address: cinemaData.address,
          number_of_halls: cinemaData.number_of_halls
        });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    listCinemas: async (cinema_id) => {
      try {
        const response = await cinemaApi.post(API_URLS.cinema.list, { cinema_id });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    updateCinema: async (cinemaData) => {
      try {
        const response = await cinemaApi.put(API_URLS.cinema.update, cinemaData);
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    deleteCinema: async (cinema_id, cinema_name) => {
      try {
        const response = await cinemaApi.delete(API_URLS.cinema.delete, {
          data: {
            cinema_id,
            cinema_name,
            user_id: localStorage.getItem('user_id')
          }
        });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    }
  };
  