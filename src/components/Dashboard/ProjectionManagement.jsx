// src/components/Dashboard/ProjectionManagement.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectionService } from '../../services/projectionService';

const ProjectionManagement = () => {
  const [projections, setProjections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(null);

  const [formData, setFormData] = useState({
    cinema_id: user?.cinema_id || '',
    cinema_name: '',
    show_id: '',
    title: '',
    hall: '',
    seats_available: 50,
    date: '',
    start_time: '',
    end_time: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editMode) {
        await projectionService.updateProjection({
          ...formData,
          cinema_id: user.cinema_id
        });
      } else {
        await projectionService.addProjection({
          ...formData,
          cinema_id: user.cinema_id
        });
      }
      
      // Resetear el formulario
      setFormData({
        cinema_id: user.cinema_id,
        cinema_name: '',
        show_id: '',
        title: '',
        hall: '',
        seats_available: 50,
        date: '',
        start_time: '',
        end_time: ''
      });
      setEditMode(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cinema_name) => {
    if (!window.confirm('¿Está seguro de eliminar esta proyección?')) return;

    try {
      setLoading(true);
      await projectionService.deleteProjection(user.cinema_id, cinema_name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Proyecciones</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              ID de la Proyección
            </label>
            <input
              type="text"
              value={formData.show_id}
              onChange={(e) => setFormData({...formData, show_id: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Título de la Película
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
              Sala
            </label>
            <input
              type="text"
              value={formData.hall}
              onChange={(e) => setFormData({...formData, hall: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Asientos Disponibles
            </label>
            <input
              type="number"
              value={formData.seats_available}
              onChange={(e) => setFormData({...formData, seats_available: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hora de Inicio
            </label>
            <input
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({...formData, start_time: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hora de Fin
            </label>
            <input
              type="time"
              value={formData.end_time}
              onChange={(e) => setFormData({...formData, end_time: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Procesando...' : (editMode ? 'Actualizar' : 'Agregar')} Proyección
          </button>
          
          {editMode && (
            <button
              type="button"
              onClick={() => setEditMode(null)}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projections.map((projection) => (
            <div key={projection.show_id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <h3 className="font-bold text-xl mb-2">{projection.title}</h3>
              <p>Cine: {projection.cinema_name}</p>
              <p>Sala: {projection.hall}</p>
              <p>Fecha: {projection.date}</p>
              <p>Horario: {projection.start_time} - {projection.end_time}</p>
              <p>Asientos disponibles: {projection.seats_available}</p>
              
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => {
                    setEditMode(projection.show_id);
                    setFormData(projection);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(projection.cinema_name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectionManagement;