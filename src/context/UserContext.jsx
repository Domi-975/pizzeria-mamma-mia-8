import React, { createContext, useState } from 'react';

// Crear el contexto de usuario
export const UserContext = createContext();

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  // Estado para almacenar el token de autenticación (ahora con persistencia en localStorage)
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  // Estado para almacenar el email del usuario
  const [email, setEmail] = useState(null);
  // Estado para manejar la carga de solicitudes
  const [loading, setLoading] = useState(false);
  // Estado para manejar errores
  const [error, setError] = useState(null);
  // Nuevo estado para almacenar el perfil del usuario autenticado
  const [userProfile, setUserProfile] = useState(null);

  // Método para iniciar sesión (actualizado para guardar token en localStorage)
  const login = async (email, password) => {
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar errores previos

    // Validación básica
    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña."); // Mensaje de error si faltan campos
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Enviar email y contraseña
      });

      const data = await response.json(); // Parsear la respuesta JSON
      if (response.ok) {
        // Guardar el token en localStorage para persistencia entre sesiones
        localStorage.setItem("token", data.token); // Asegúrate de que data.token exista
        setToken(data.token); // Almacenar el token en el estado
        setEmail(data.email); // Almacenar el email en el estado
        setError(null); // Limpiar errores después de un inicio de sesión exitoso
      } else {
        // Manejar errores específicos
        if (response.status === 401) {
          setError("Credenciales incorrectas."); // Mensaje específico para 401
        } else {
          throw new Error(data.message || 'Error desconocido.'); // Manejar otros errores
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error); // Log de error en la consola
      setError(error.message); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Método para registrar un nuevo usuario (mantenido como referencia)
  const register = async (email, password) => {
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar errores previos
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Enviar email y contraseña
      });
      const data = await response.json(); // Parsear la respuesta JSON
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
      console.error('Error en el registro:', error); // Log de error en la consola
      setError(error.message); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Método para cerrar sesión (actualizado para limpiar localStorage)
  const logout = () => {
    localStorage.removeItem("token"); // Eliminar el token de localStorage
    setToken(null); // Limpiar el token del estado
    setEmail(null); // Limpiar el email del estado
    setUserProfile(null); // Limpiar el perfil del usuario al cerrar sesión
  };

  // Método para obtener el perfil del usuario autenticado (nuevo método esencial)
  const getUserProfile = async () => {
    setLoading(true); // Iniciar el estado de carga
    setError(null); // Limpiar errores previos
    const token = localStorage.getItem("token"); // Obtener el token de localStorage

    if (!token) {
      setError("No hay token disponible."); // Manejar el caso sin token
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Enviar el token en la cabecera para autenticar la solicitud
        },
      });

      const data = await response.json(); // Parsear la respuesta JSON

      if (response.ok) {
        setUserProfile(data); // Almacenar el perfil del usuario en el estado
      } else {
        throw new Error(data.message || 'Error al obtener el perfil.'); // Manejar errores
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error); // Log de error en la consola
      setError(error.message); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Proveer el contexto a los componentes hijos (ahora incluye userProfile y getUser Profile)
  return (
    <UserContext.Provider value={{ 
      token, 
      email, 
      loading, 
      error, 
      userProfile,  // Nuevo valor proporcionado
      login, 
      register, 
      logout, 
      getUserProfile  // Nuevo método proporcionado
    }}>
      {children}
    </UserContext.Provider>
  );
};
