import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext'; // Importa el contexto de usuario

const LoginPage = () => {
  // Extrae la función login del contexto
  const { login } = useContext(UserContext);
  
  // Estados para manejar el email, la contraseña y las alertas
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      // Intenta iniciar sesión y obtener el token
      await login(email, password); // Asegúrate de que login maneje el token internamente
      showAlert('success', 'Autenticación exitosa.'); // Muestra un mensaje de éxito
    } catch (error) {
      showAlert('error', error.message); // Muestra un mensaje de error
    }
  };

  // Función para mostrar alertas
  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
  };

  // Función para cerrar la alerta
  const closeAlert = () => {
    setAlert({ visible: false, type: '', message: '' });
  };

  return (
    <>
      <style>{`
        .login-container {
          min-height: 100vh; /* Altura mínima de la pantalla */
          display: flex; /* Usar flexbox para centrar el contenido */
          justify-content: center; /* Centrar horizontalmente */
          align-items: center; /* Centrar verticalmente */
          background-color: #ffffff; /* Color de fondo */
          padding: 2rem; /* Espaciado interno */
          box-sizing: border-box; /* Incluir padding en el tamaño total */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; /* Tipografía */
          position: relative; /* Posicionamiento relativo */
        }

        .login-card {
          background: #ffffff; /* Fondo blanco para la tarjeta de login */
          width: 100%; /* Ancho completo */
          max-width: 400px; /* Ancho máximo */
          padding: 3rem 2rem; /* Espaciado interno */
          border-radius: 0.75rem; /* Bordes redondeados */
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* Sombra */
          display: flex; /* Usar flexbox para el contenido */
          flex-direction: column; /* Colocar elementos en columna */
          gap: 1.5rem; /* Espacio entre elementos */
          box-sizing: border-box; /* Incluir padding en el tamaño total */
          z-index: 1; /* Asegurar que esté por encima de otros elementos */
        }

        .login-title {
          font-size: 3rem; /* Tamaño de fuente del título */
          font-weight: 700; /* Peso de la fuente */
          color: #111827; /* Color del texto */
          text-align: center; /* Centrar el texto */
          margin-bottom: 1rem; /* Margen inferior */
        }

        form {
          display: flex; /* Usar flexbox para el formulario */
          flex-direction: column; /* Colocar elementos en columna */
          gap: 1.5rem; /* Espacio entre elementos */
        }

        label {
          font-weight: 600; /* Peso de la fuente */
          font-size: 1rem; /* Tamaño de fuente */
          color: #6b7280; /* Color del texto */
          margin-bottom: 0.5rem; /* Margen inferior */
          display: block; /* Mostrar como bloque */
        }

        input[type="email"],
        input[type="password"] {
          width: 100%; /* Ancho completo */
          padding: 0.75rem 1rem; /* Espaciado interno */
          border-radius: 0.5rem; /* Bordes redondeados */
          border: 1px solid #d1d5db; /* Borde gris */
          font-size: 1rem; /* Tamaño de fuente */
          box-sizing: border-box; /* Incluir padding en el tamaño total */
          transition: border-color 0.3s ease; /* Transición suave para el borde */
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
          outline: none; /* Sin contorno */
          border-color: #2563eb; /* Color del borde al enfocar */
          box-shadow: 0 0 0 3px rgba(37,99,235,0.3); /* Sombra al enfocar */
        }

        button[type="submit"] {
          background-color: #2563eb; /* Color de fondo del botón */
          color: white; /* Color del texto */
          font-size: 1.125rem; /* Tamaño de fuente */
          font-weight: 700; /* Peso de la fuente */
          padding: 1rem 0; /* Espaciado interno */
          border: none; /* Sin borde */
          border-radius: 0.75rem; /* Bordes redondeados */
          cursor: pointer; /* Cambiar cursor al pasar por encima */
          transition: background-color 0.3s ease; /* Transición suave para el fondo */
          width: 100%; /* Ancho completo */
          font-family: inherit; /* Heredar la fuente del contenedor */
          margin-top: 0.5rem; /* Margen superior */
        }

        button[type="submit"]:hover,
        button[type="submit"]:focus {
          background-color: #1e40af; /* Color de fondo al pasar el mouse */
          outline: none; /* Sin contorno */
        }

        .alert-overlay {
          position: fixed; /* Posicionamiento fijo */
          top: 0; /* Desde la parte superior */
          left: 0; /* Desde la parte izquierda */
          width: 100vw; /* Ancho completo de la ventana */
          height: 100vh; /* Alto completo de la ventana */
          background: rgba(0,0,0,0.3); /* Fondo semi-transparente */
          display: flex; /* Usar flexbox para centrar el contenido */
          justify-content: center; /* Centrar horizontalmente */
          align-items: center; /* Centrar verticalmente */
          z-index: 1000; /* Asegurar que esté por encima de otros elementos */
        }

        .alert-box {
          background: black; /* Fondo negro para la alerta */
          padding: 2rem 2.5rem; /* Espaciado interno */
          border-radius: 12px; /* Bordes redondeados */
          box-shadow: 0 8px 24px rgba(0,0,0,0.15); /* Sombra */
          max-width: 360px; /* Ancho máximo */
          width: 90%; /* Ancho del 90% */
          text-align: center; /* Centrar el texto */
        }

        .alert-message {
          font-size: 1.125rem; /* Tamaño de fuente del mensaje */
          margin-bottom: 1.5rem; /* Margen inferior */
          color: white; /* Color del texto */
        }

        .alert-button {
          background-color: #2563eb; /* Color de fondo del botón de alerta */
          color: white; /* Color del texto */
          border: none; /* Sin borde */
          border-radius: 0.5rem; /* Bordes redondeados */
          padding: 0.75rem 1.5rem; /* Espaciado interno */
          font-weight: 700; /* Peso de la fuente */
          font-size: 1rem; /* Tamaño de fuente */
          cursor: pointer; /* Cambiar cursor al pasar por encima */
          transition: background-color 0.3s ease; /* Transición suave para el fondo */
        }

        .alert-button:hover,
        .alert-button:focus {
          background-color: #1e40af; /* Color de fondo al pasar el mouse */
          outline: none; /* Sin contorno */
        }
      `}</style>

      <div className="login-container" role="main">
        <section className="login-card" aria-labelledby="login-title">
          <h1 id="login-title" className="login-title">
            Login
          </h1>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
                placeholder="ejemplo@correo.com"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
                placeholder="********"
                minLength={6}
                required
                aria-required="true"
              />
            </div>
            <button type="submit">Enviar</button> {/* Botón para enviar el formulario */}
          </form>
        </section>

        {alert.visible && ( // Muestra la alerta si está visible
          <div
            className="alert-overlay"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            aria-describedby="alert-desc"
          >
            <div className="alert-box">
              <p id="alert-desc" className="alert-message">{alert.message}</p> {/* Mensaje de alerta */}
              <button className="alert-button" onClick={closeAlert}>Cerrar</button> {/* Botón para cerrar la alerta */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage; // Exporta el componente LoginPage
