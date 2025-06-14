import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Navbar = () => {
  const total = 25000; // Total de la compra
  const token = false; // Simulación de estado de login

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: '#fff' }}>
          Pizzeria Mamma Mía!
        </a>
        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav me-auto d-flex align-items-center" style={{ gap: '15px' }}>
            {/* Botón Home siempre visible */}
            <li className="nav-item">
              <a href="/" className="btn btn-link nav-link text-white">
                🍕{' '}
                Home
              </a>
            </li>
            {/* Botones que dependen del token */}
            {token ? (
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
              <>
                <li className="nav-item">
                  <a href="/login" className="btn btn-link nav-link text-white">
                    🔐{' '}
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/register" className="btn btn-link nav-link text-white">
                    🔐{' '}
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
          {/* Botón Total a la derecha */}
          <button className="btn btn-link nav-link text-white d-flex align-items-center">
            🛒 Total: ${total.toLocaleString()}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


