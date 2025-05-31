import React from 'react';

const CardPizza = ({ name, price, ingredients, img }) => {
    return (
        <div className="card-pizza">
            <img src={img} alt={name} className="pizza-image" />
            <div className="pizza-info">
                <h3 className="pizza-name">{name}</h3>
                <hr className="ingredient-line" />
                <p className="ingredients-label">Ingredientes</p>
                <p className="ingredients">
                    <span role="img" aria-label="pizza">🍕</span>
                    {ingredients.join(', ')}
                </p>
                <hr className="ingredient-line" />
                <h2 className="pizza-price">Precio: ${price.toLocaleString('es-ES')}</h2>
                <div className="buttons">
                    <button className="view-more">
                        <span>Ver más</span> <span role="img" aria-label="ver más">👀</span>
                    </button>
                    <button className="add-to-cart">
                        Añadir <span role="img" aria-label="añadir">🛒</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardPizza;


