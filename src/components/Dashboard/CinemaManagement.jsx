// src/components/Dashboard/CinemaManagement.jsx
import { useState, useEffect } from 'react';
import { cinemaService } from '../../services/cinemaService';
import { useAuth } from '../../context/AuthContext';

const CinemaManagement = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    cinema_id: '',
    cinema_name: '',
    address: '',
    number_of_halls: ''
  });
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  useEffect(() => {
    loadCinemas();
  }, []);

  const loadCinemas = async () => {
    try {
      setLoading(true);
      const result = await cinemaService.listCinemas(user.cinema_id);
      if (Array.isArray(result)) {
        setCinemas(result);
      } else {
        setError('Error: cinemas data is not an array');
      }
    } catch (err) {
      setError('Error al cargar los cines: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editMode) {
        await cinemaService.updateCinema(formData);
      } else {
        await cinemaService.createCinema(formData);
      }
      await loadCinemas();
      setFormData({
        cinema_id: '',
        cinema_name: '',
        address: '',
        number_of_halls: ''
      });
      setEditMode(null);
    } catch (err) {
      setError('Error al ' + (editMode ? 'actualizar' : 'crear') + ' el cine: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cinema_id, cinema_name) => {
    if (!window.confirm('¿Está seguro de eliminar este cine?')) return;

    try {
      setLoading(true);
      await cinemaService.deleteCinema(cinema_id, cinema_name);
      await loadCinemas();
    } catch (err) {
      setError('Error al eliminar el cine: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Cines</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID del Cine
            </label>
            <input
              type="text"
              value={formData.cinema_id}
              onChange={(e) => setFormData({...formData, cinema_id: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={editMode}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del Cine
            </label>
            <input
              type="text"
              value={formData.cinema_name}
              onChange={(e) => setFormData({...formData, cinema_name: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Número de Salas
            </label>
            <input
              type="number"
              value={formData.number_of_halls}
              onChange={(e) => setFormData({...formData, number_of_halls: e.target.value})}
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
            {loading ? 'Procesando...' : (editMode ? 'Actualizar' : 'Crear')} Cine
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(null);
                setFormData({
                  cinema_id: '',
                  cinema_name: '',
                  address: '',
                  number_of_halls: ''
                });
              }}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading && <div className="text-center">Cargando...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cinemas.map((cinema) => (
          <div key={cinema.cinema_id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h3 className="font-bold text-xl mb-2">{cinema.cinema_name}</h3>
            <p className="text-gray-700 mb-2">ID: {cinema.cinema_id}</p>
            <p className="text-gray-700 mb-2">Dirección: {cinema.address}</p>
            <p className="text-gray-700 mb-4">Salas: {cinema.number_of_halls}</p>
            
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditMode(cinema.cinema_id);
                  setFormData(cinema);
                }}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(cinema.cinema_id, cinema.cinema_name)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaManagement;