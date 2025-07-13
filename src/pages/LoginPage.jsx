import React, { useState } from 'react';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ visible: false, type: '', message: '' });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert('error', 'Todos los campos son obligatorios.');
    } else if (password.length < 6) {
      showAlert('error', 'La contraseña debe tener al menos 6 caracteres.');
    } else {
      showAlert('success', 'Autenticación exitosa.');
    }
  };

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
  };

  const closeAlert = () => {
    setAlert({ visible: false, type: '', message: '' });
  };

  return (
    <>
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
          padding: 2rem;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          position: relative;
        }

        .login-card {
          background: #ffffff;
          width: 100%;
          max-width: 400px;
          padding: 3rem 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-sizing: border-box;
          z-index: 1;
        }

        .login-title {
          font-size: 3rem;
          font-weight: 700;
          color: #111827;
          text-align: center;
          margin-bottom: 1rem;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        label {
          font-weight: 600;
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
          display: block;
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.3);
        }

        button[type="submit"] {
          background-color: #2563eb;
          color: white;
          font-size: 1.125rem;
          font-weight: 700;
          padding: 1rem 0;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
          font-family: inherit;
          margin-top: 0.5rem;
        }

        button[type="submit"]:hover,
        button[type="submit"]:focus {
          background-color: #1e40af;
          outline: none;
        }

        /* Overlay for alert modal */
        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        /* Alert box */
        .alert-box {
          background: black; /* Cambiado a negro */
          padding: 2rem 2.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          max-width: 360px;
          width: 90%;
          text-align: center;
        }

        .alert-message {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          color: white;
        }

        .alert-button {
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .alert-button:hover,
        .alert-button:focus {
          background-color: #1e40af;
          outline: none;
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                minLength={6}
                required
                aria-required="true"
              />
            </div>
            <button type="submit">Enviar</button>
          </form>
        </section>

        {alert.visible && (
          <div
            className="alert-overlay"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            aria-describedby="alert-desc"
          >
            <div className="alert-box">
              <p
                id="alert-desc"
                className="alert-message"
              >
                {alert.message}
              </p>
              <button
                className="alert-button"
                onClick={() => setAlert({ visible: false, type: '', message: '' })}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
