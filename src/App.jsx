import React from 'react';
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Pizza from "./pages/Pizza"; 
import Cart from "./pages/Cart";   
import Home from "./pages/HomePage";   
import Login from "./pages/LoginPage";  
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <>
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            
            {/* Rutas de auth - solo accesibles sin token */}
            <Route path="/login" element={
              <ProtectedRoute inverse>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute inverse>
                <Register />
              </ProtectedRoute>
            } />
            
            {/* Ruta protegida - solo accesible con token */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </>
    </UserProvider>
  );
};

export default App;

