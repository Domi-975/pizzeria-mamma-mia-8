import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FaPizzaSlice, FaLock, FaUser  } from 'react-icons/fa'; 

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
          <ul className="navbar-nav me-auto d-flex align-items-center" style={{gap: '15px'}}>
            {/* Botón Home siempre visible */}
            <li className="nav-item">
              <button className="btn btn-link nav-link text-white">
                  <FaPizzaSlice />{' '}
                  Home
              </button>
            </li>
            {/* Botones que dependen del token */}
            {token ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white">
                    <FaUser />{' '}
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
                  <button className="btn btn-link nav-link text-white">
                    <FaLock />{' '}
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white">
                    <FaLock />{' '}
                    Register
                  </button>
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
