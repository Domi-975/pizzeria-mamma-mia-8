import React from 'react';
import './CardPizza.css'; 

const CardPizza = ({ name, price, ingredients, img }) => {
  // Función para capitalizar la primera letra de la variedad
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="card-pizza">
      <img src={img} alt={name} className="pizza-image" />
      <h2 className="pizza-name">{capitalizeFirstLetter(name)}</h2> {/* Se eliminó "Pizza" */}
      {/* Título Ingredientes */}
      <h3 className="ingredients-title">Ingredientes</h3>
      <ul className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            🍕 {ingredient}
          </li>
        ))}
      </ul>
      <p className="price">Precio: <strong>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong></p>
      <div className="button-container">
        <button className="view-more-button">
          Ver Más 👀
        </button>
        <button className="add-button">
          Añadir 🛒
        </button>
      </div>
    </div>
  );
};

export default CardPizza;


