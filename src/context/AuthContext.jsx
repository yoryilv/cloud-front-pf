// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser({
        user_id: credentials.user_id,
        cinema_id: credentials.cinema_id
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,  // Asegúrate de incluir register aquí
    login,
    logout,
    isAuthenticated: authService.isAuthenticated()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};