import React, { useEffect, useState } from 'react';

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);

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
  }, []); // Arreglo vacío para que se ejecute solo una vez

  if (pizzas.length === 0) return <div>Cargando...</div>;

  return (
    <div className="pizza-list">
      {pizzas.map(pizza => (
        <div key={pizza.id} className="pizza-details">
          <h2>{pizza.name}</h2>
          <img src={pizza.img} alt={pizza.name} />
          <p>Precio: ${pizza.price}</p>
          <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
          <p>Descripción: {pizza.desc}</p>
          <button>Añadir al carrito</button>
        </div>
      ))}
    </div>
  );
};

export default Pizza;

