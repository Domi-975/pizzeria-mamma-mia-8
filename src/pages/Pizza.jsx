import React, { useEffect, useState } from 'react';
import './Pizza.css'; 

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const pizzaId = 'p001'; // Puedes cambiar esto si necesitas obtener más pizzas

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas`);
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []); // Aquí se usa el array vacío para que el efecto se ejecute solo una vez

  if (pizzas.length === 0) return <div>Cargando...</div>;

  return (
    <div className="pizza-container">
      <h1 className="title">Nuestras Pizzas</h1>
      <div className="pizza-grid">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="pizza-details">
            <h2>{pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}</h2>
            <img src={pizza.img} alt={pizza.name} />
            <p>Precio: ${pizza.price}</p>
            <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
            <p>Descripción: {pizza.desc}</p>
            <button>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pizza;
