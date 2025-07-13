// src/context/UserContext.jsx
import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true);  // Estado inicial del token

  const logout = () => {
    setToken(false);  // Cambiar el estado del token a false
  };

  return (
    <UserContext.Provider value={{ token, logout }}> 
      {children}
    </UserContext.Provider>
  );
};
