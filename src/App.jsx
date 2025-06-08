import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Home from './components/Home';
// import RegisterPage from './components/Register.jsx';
import LoginPage from './components/Login.jsx';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router basename="/pizzeria-mamma-mia">
      <div>
        <Navbar />
        {/* Solo se muestra el formulario de login */}
        <LoginPage />
        {/* <Home /> */}
        {/* <RegisterPage /> */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;


