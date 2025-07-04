import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };
    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    
  };

  if (pizzas.length === 0) return <div style={styles.loading}>Cargando pizzas...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nuestras Pizzas</h1>
      <div style={styles.gridContainer}>
        {pizzas.map((pizza) => (
          <div key={pizza.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img 
                src={pizza.img} 
                alt={pizza.name}
                style={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400?text=Pizza";
                }}
              />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.pizzaName}>{pizza.name}</h3>
              <p style={styles.description}>{pizza.desc}</p>
              <div style={styles.ingredients}>
                {pizza.ingredients.join(', ')}
              </div>
              <div style={styles.footer}>
                <span style={styles.price}>${pizza.price}</span>
                <button
                  onClick={() => handleAddToCart(pizza)}
                  style={styles.button}
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos 
const styles = {
  
  container: {
    maxWidth: '1350px',
    margin: '0 auto',
    padding: '5rem 2rem',
    fontFamily: 'Arial, sans-serif'
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginTop: '2rem'
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '1rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
     display: 'flex', 
    flexDirection: 'column', 
    height: '100%',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  imageContainer: {
    height: '200px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  cardBody: {
    padding: '1.0rem'
    
  },
  pizzaName: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: '#222'
  },
  description: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  ingredients: {
    fontSize: '0.8rem',
    color: '#888',
    marginBottom: '1.5rem',
    fontStyle: 'italic'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e63946'
  },
  button: {
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#c1121f'
    }
  }
};

export default HomePage;


