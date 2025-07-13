import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, inverse = false }) => {
  const { token } = useContext(UserContext);

  if (inverse) {
    // Para login/register - redirige a home si hay token
    return token ? <Navigate to="/" replace /> : children;
  }

  // Para rutas protegidas - redirige a login si no hay token
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
