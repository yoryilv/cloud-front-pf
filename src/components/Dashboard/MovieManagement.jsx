// src/components/Dashboard/MovieManagement.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { movieService } from '../../services/movieService';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    cinema_id: user?.cinema_id || '',
    title: '',
    genre: '',
    duration: '',
    rating: ''
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const result = await movieService.getMovies(user.cinema_id);
      setMovies(result);
    } catch (err) {
      setError('Error al cargar películas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await movieService.addMovie({
        ...formData,
        cinema_id: user.cinema_id
      });
      await loadMovies();
      setFormData({
        cinema_id: user.cinema_id,
        title: '',
        genre: '',
        duration: '',
        rating: ''
      });
    } catch (err) {
      setError('Error al agregar la película: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (title) => {
    if (!window.confirm('¿Está seguro de eliminar esta película?')) return;

    try {
      setLoading(true);
      await movieService.deleteMovie(user.cinema_id, title);
      await loadMovies();
    } catch (err) {
      setError('Error al eliminar la película: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Películas</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Género
            </label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Duración (minutos)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Clasificación
            </label>
            <input
              type="text"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Agregando...' : 'Agregar Película'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie.title} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
              <p className="text-gray-700 mb-2">Género: {movie.genre}</p>
              <p className="text-gray-700 mb-2">Duración: {movie.duration} minutos</p>
              <p className="text-gray-700 mb-4">Clasificación: {movie.rating}</p>
              
              <button
                onClick={() => handleDelete(movie.title)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieManagement;