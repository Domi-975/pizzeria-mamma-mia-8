import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Navbar = () => {
  const total = 25000; // Total de la compra
  const token = false; // Simulación de estado de login

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
      <div className="container-fluid">
        {/* Logo/Marca */}
        <Link className="navbar-brand" to="/" style={{ color: '#fff' }}>
          Pizzeria Mamma Mía!
        </Link>

        <div className="collapse navbar-collapse d-flex justify-content-between">
          {/* Menú izquierdo */}
          <ul className="navbar-nav me-auto d-flex align-items-center" style={{ gap: '15px' }}>
            {/* Botón Home siempre visible */}
            <li className="nav-item">
              <Link to="/" className="btn btn-link nav-link text-white">
                🍕{' '}
                Home
              </Link>
            </li>

            {/* Botones que dependen del token */}
            {token ? (
              // Si hay token (usuario logueado)
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white">
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white">Logout</button>
                </li>
              </>
            ) : (
              // Si no hay token (usuario no logueado)
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-link nav-link text-white">
                    🔐{' '}
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-link nav-link text-white">
                    🔐{' '}
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Carrito - AHORA CON LINK */}
          <Link 
            to="/cart" 
            className="btn btn-link nav-link text-white d-flex align-items-center"
            style={{ textDecoration: 'none' }}
          >
            🛒 Total: ${total.toLocaleString()}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



