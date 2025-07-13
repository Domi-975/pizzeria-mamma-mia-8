import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Pizza = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [pizza, setPizza] = useState(null);
  const { addToCart } = useContext(CartContext);

   // Función para capitalizar la primera letra de cada palabra
  const capitalizeWords = (string) => {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };


  // Definir los estilos
  const styles = {
    container: {
      padding: '70px',
      maxWidth: '600px',  // achicar la descripcion
      margin: '0 auto' , // centrar
      textAlign: 'center'
    
    },
    image: {
      width: '300px',
      height: 'auto',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error('Error fetching pizza:', error);
      }
    };
    fetchPizza();
  }, [id]);

  if (!pizza) return <div>Cargando pizza...</div>;

  return (
    <div style={styles.container}>
      <h1>{capitalizeWords(pizza.name)}</h1>
      <img src={pizza.img} alt={pizza.name} style={styles.image} />
      <p>{pizza.desc}</p>
      <p>Precio: ${pizza.price}</p>
      <button style={styles.button} onClick={() => addToCart(pizza)}>Añadir al carrito</button>
    </div>
  );
};

export default Pizza;


