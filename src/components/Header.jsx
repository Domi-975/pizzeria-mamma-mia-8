import React from 'react';
import backgroundImage from '@/assets/img/Header.jpg';

const Header = () => {
  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 10px',
    userSelect: 'none',
  };

  const h1Style = {
    margin: '0',
    fontSize: '3.5rem',
    fontWeight: '700',
  };

  const pStyle = {
    marginTop: '10px',
    fontSize: '1.5rem',
    fontWeight: '500',
    maxWidth: '600px',
    textAlign: 'center',
  };

  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>¡Pizzeria Mamma Mia!</h1>
      <p style={pStyle}>¡Tenemos las mejores Pizzas que podrás encontrar!</p>
    </header>
  );
};

export default Header;





