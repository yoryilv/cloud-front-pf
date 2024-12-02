// src/config/api.config.js
export const API_URLS = {
    auth: {
      base: 'https://u80ti422uc.execute-api.us-east-1.amazonaws.com/prod',
      register: '/usuario/crear',
      login: '/usuario/login',
      validate: '/usuario/validar'
    },
  
    cinema: {
      base: 'https://81qyb0udje.execute-api.us-east-1.amazonaws.com/prod',
      add: '/cine/agregar',
      delete: '/cine/eliminar',
      list: '/cine/listar',
      update: '/cine/actualizar'
    },
  
    movie: {
      base: 'https://1poxrjcny4.execute-api.us-east-1.amazonaws.com/prod',
      add: '/pelicula/agregar',
      update: '/pelicula/actualizar',
      delete: '/pelicula/eliminar',
      cartelera: '/pelicula/cartelera'
    },
  
    projection: {
      base: 'https://644jnteloa.execute-api.us-east-1.amazonaws.com/prod',
      add: '/proyecciones/agregar',
      update: '/proyecciones/actualizar',
      delete: '/proyecciones/eliminar'
    },
  
    reservation: {
      base: 'https://0yhvx5pn22.execute-api.us-east-1.amazonaws.com/prod',
      reserve: '/pelicula/reservar'
    },
  
    visits: {
      base: 'https://f7j291qkz0.execute-api.us-east-1.amazonaws.com/prod',
      history: '/visitas/historial',
      detail: '/visitas/detalle',
      filter: '/visitas/filtrar'
    }
  };
   
   // Crear instancias de axios para cada API
   import axios from 'axios';
   
   export const createApiInstance = (baseURL) => {
    const instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
    instance.interceptors.request.use(
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
   
    return instance;
   };
   
   // Instancias de API para cada servicio
   export const authApi = createApiInstance(API_URLS.auth.base);
   export const cinemaApi = createApiInstance(API_URLS.cinema.base);
   export const movieApi = createApiInstance(API_URLS.movie.base);
   export const projectionApi = createApiInstance(API_URLS.projection.base);
   export const reservationApi = createApiInstance(API_URLS.reservation.base);
   export const visitsApi = createApiInstance(API_URLS.visits.base);
   
