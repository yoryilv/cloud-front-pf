// src/services/movieService.js

import axios from 'axios';
import { API_URLS } from '../config/api.config';


const movieApi = axios.create({
    baseURL: API_URLS.movie.base,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  movieApi.interceptors.request.use(
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
  
  export const movieService = {
    addMovie: async (movieData) => {
      try {
        const response = await movieApi.post(API_URLS.movie.add, {
          cinema_id: movieData.cinema_id,
          title: movieData.title,
          genre: movieData.genre,
          duration: movieData.duration,
          rating: movieData.rating
        });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    getCartelera: async (cinema_id) => {
      try {
        const response = await movieApi.post(API_URLS.movie.cartelera, { cinema_id });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    },
  
    deleteMovie: async (cinema_id, title) => {
      try {
        const response = await movieApi.delete(API_URLS.movie.delete, {
          data: { cinema_id, title }
        });
        return response.data;
      } catch (error) {
        throw handleError(error);
      }
    }
  };
  