// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Navbar from './components/Layout/NavBar';
import DashboardHome from './components/Dashboard/DashboardHome';
import CinemaManagement from './components/Dashboard/CinemaManagement';
import MovieManagement from './components/Dashboard/MovieManagement';
import ProjectionManagement from './components/Dashboard/ProjectionManagement';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Rutas de dashboard */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/cines" element={<CinemaManagement />} />
              <Route path="/peliculas" element={<MovieManagement />} />
              <Route path="/proyecciones" element={<ProjectionManagement />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;