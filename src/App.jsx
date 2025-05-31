import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router basename="/pizzeria-mamma-mia">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
