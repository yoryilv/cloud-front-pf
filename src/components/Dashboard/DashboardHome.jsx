// src/components/Dashboard/DashboardHome.jsx
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Bienvenido al Sistema de Gestión de Cines
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/cines" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Gestión de Cines</h2>
          <p className="text-gray-600">Administra la información de los cines</p>
        </Link>

        <Link to="/peliculas" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Gestión de Películas</h2>
          <p className="text-gray-600">Administra el catálogo de películas</p>
        </Link>

        <Link to="/proyecciones" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Gestión de Proyecciones</h2>
          <p className="text-gray-600">Administra las proyecciones de películas</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;