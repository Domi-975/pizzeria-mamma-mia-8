import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, increaseCount, decreaseCount, total, formatPrice } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    // Lógica para procesar el pago
    alert("Procesando pago...");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '60px 20px 20px 20px', 
      maxWidth: '600px', 
      margin: '20px auto', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
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
              style={{ 
                width: '70px', 
                height: '70px', 
                objectFit: 'cover', 
                borderRadius: '6px' 
              }} 
            />
            
            <h3 style={{ 
              margin: '0 10px', 
              flexGrow: 1, 
              textTransform: 'capitalize' 
            }}>
              {item.name.replace(/Pizza/i, '').trim()} 
            </h3>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <p style={{ 
                margin: '0 10px', 
                fontWeight: 'bold', 
                minWidth: '60px', 
                textAlign: 'left', 
                fontSize: '1.1rem' 
              }}>
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

              <span style={{ 
                minWidth: '24px', 
                textAlign: 'center', 
                fontWeight: '600' 
              }}>
                {item.count}
              </span>

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
        
        <div style={{
          display: 'flex',
          gap: '12px',
          width: '100%'
        }}>
          <button 
            onClick={handlePayment}
            disabled={!token || cart.length === 0}
            style={{ 
              backgroundColor: !token || cart.length === 0 ? '#cccccc' : 'black',
              color: 'white', 
              border: 'none', 
              padding: '10px 36px', 
              borderRadius: '12px',
              cursor: !token || cart.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              flex: 1
            }}
            aria-label="Pagar pedido"
          >
            {!token ? 'Inicia sesión para pagar' : 'Pagar'}
          </button>

          {token && (
            <button 
              onClick={handleLogout}
              style={{ 
                backgroundColor: 'transparent', 
                color: 'red', 
                border: '1px solid red', 
                padding: '10px 20px', 
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

