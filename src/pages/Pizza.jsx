import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Pizza = () => {
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

  if (pizzas.length === 0) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div className="loader">Cargando pizzas...</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nuestras Especialidades</h1>
      
      <div style={styles.pizzaGrid}>
        {pizzas.map(pizza => (
          <div key={pizza.id} style={styles.pizzaCard}>
            <div style={styles.pizzaImageContainer}>
              <img 
                src={pizza.img} 
                alt={pizza.name}
                style={styles.pizzaImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400?text=Pizza";
                }}
              />
            </div>
            <div style={styles.pizzaInfo}>
              <h2 style={styles.pizzaName}>{pizza.name}</h2>
              <p style={styles.pizzaDescription}>{pizza.desc}</p>
              <div style={styles.ingredientsContainer}>
                {pizza.ingredients.map((ingredient, i) => (
                  <span key={i} style={styles.ingredientTag}>
                    {ingredient}
                  </span>
                ))}
              </div>
              <div style={styles.priceContainer}>
                <span style={styles.price}>${pizza.price}</span>
                <button
                  onClick={() => handleAddToCart(pizza)}
                  style={styles.addButton}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Pizza;

