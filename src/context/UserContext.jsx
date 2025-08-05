import React, { createContext, useState } from 'react';

// Crear el contexto de usuario
export const UserContext = createContext();

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  // Estado para almacenar el token de autenticación
  const [token, setToken] = useState(null);
  // Estado para almacenar el email del usuario
  const [email, setEmail] = useState(null);
  // Estado para manejar la carga de solicitudes
  const [loading, setLoading] = useState(false);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Nuevo estado para almacenar el perfil del usuario autenticado
  const [userProfile, setUserProfile] = useState(null);

  // Método para iniciar sesión
  const login = async (email, password) => {
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar errores previos
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token); // Almacenar el token en el estado
        setEmail(data.email); // Almacenar el email en el estado
        setError(null); // Limpiar errores después de un inicio de sesión exitoso
      } else {
        throw new Error(data.message || 'Error desconocido.'); // Manejar errores
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError(error.message); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Método para registrar un nuevo usuario
  const register = async (email, password) => {
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar errores previos
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token); // Almacenar el token en el estado
        setEmail(data.email); // Almacenar el email en el estado
        setError(null); // Limpiar errores después de un registro exitoso
      } else {
        // Manejar errores específicos
        if (data.error) {
          throw new Error(data.error); // Propagar el error específico
        }
        throw new Error(data.message || 'Error desconocido.'); // Manejar errores generales
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError(error.message); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Método para cerrar sesión
  const logout = () => {
    setToken(null); // Limpiar el token
    setEmail(null); // Limpiar el email
    setUserProfile(null); // Limpiar el perfil del usuario al cerrar sesión
  };

  // Método para obtener el perfil del usuario autenticado
  const getUserProfile = async () => {
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar errores previos
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Enviar el token en la cabecera para autenticar la solicitud
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data); // Almacenar el perfil del usuario en el estado
      } else {
        throw new Error(data.message || 'Error al obtener el perfil.'); // Manejar errores
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      setError(error.message); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Proveer el contexto a los componentes hijos
  return (
    <UserContext.Provider value={{ token, email, loading, error, userProfile, login, register, logout, getUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
