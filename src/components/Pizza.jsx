import React, { useEffect, useState } from 'react';

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const pizzaId = 'p001'; // ID de la pizza que queremos mostrar

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${pizzaId}`);
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error('Error fetching pizza:', error);
      }
    };

    fetchPizza();
  }, []); // Aquí se usa el array vacío para que el efecto se ejecute solo una vez

  if (!pizza) return <div>Cargando...</div>;

  return (
    <div className="pizza-details">
      <h2>{pizza.name}</h2>
      <img src={pizza.img} alt={pizza.name} />
      <p>Precio: ${pizza.price}</p>
      <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
      <p>Descripción: {pizza.desc}</p>
      <button>Añadir al carrito</button>
    </div>
  );
};

export default Pizza;
