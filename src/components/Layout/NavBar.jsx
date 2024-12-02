// src/components/Layout/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-xl font-bold">
            Sistema de Cines
          </Link>
          <Link to="/cines" className="hover:text-gray-300">Cines</Link>
          <Link to="/peliculas" className="hover:text-gray-300">Películas</Link>
          <Link to="/proyecciones" className="hover:text-gray-300">Proyecciones</Link>
        </div>
        <div className="flex items-center space-x-4">
          <span>Usuario: {user?.user_id}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;