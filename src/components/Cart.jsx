import React, { useState } from 'react';
import { pizzaCart } from '../pizzas'; 

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const increaseCount = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ));
  };

  const decreaseCount = (id) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, count: item.count > 1 ? item.count - 1 : 0 } 
        : item
    ).filter(item => item.count > 0)); 
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div style={{ minHeight: '100vh', padding: '30px 20px 20px 20px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'left', marginBottom: '24px' }}>Detalles del Pedido</h2>
      <div>
        {cart.map(item => (
          <div 
            key={item.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px', 
              gap: '16px',
              justifyContent: 'flex-start' 
            }}
          >
            <img 
              src={item.img} 
              alt={item.name} 
              style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} // Increased size
            />
            <h3 style={{ margin: '0 10px', flexGrow: 1, textTransform: 'capitalize' }}>
              {item.name.replace(/Pizza/i, '').trim()} 
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <p style={{ margin: '0 10px', fontWeight: 'bold', minWidth: '60px', textAlign: 'left', fontSize: '1.1rem' }}>
                {formatPrice(item.price)}
              </p>

              <button 
                onClick={() => decreaseCount(item.id)} 
                style={{ 
                  backgroundColor: 'white', 
                  color: 'deeppink', 
                  border: '2px solid deeppink', 
                  padding: '4px 12px', 
                  cursor: 'pointer', 
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  userSelect: 'none',
                }}
                aria-label={`Disminuir cantidad de ${item.name}`}
              >
                -
              </button>

              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '600' }}>{item.count}</span>

              <button 
                onClick={() => increaseCount(item.id)} 
                style={{ 
                  backgroundColor: 'white', 
                  color: 'blue', 
                  border: '2px solid blue', 
                  padding: '4px 12px', 
                  cursor: 'pointer', 
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  userSelect: 'none',
                }}
                aria-label={`Aumentar cantidad de ${item.name}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
      }}>
        <h2 style={{ margin: 0 }}>Total: ${formatPrice(total)}</h2>
        <button 
          style={{ 
            backgroundColor: 'black', 
            color: 'white', 
            border: 'none', 
            padding: '10px 36px', 
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginTop: '12px',
          }}
          aria-label="Pagar pedido"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;
