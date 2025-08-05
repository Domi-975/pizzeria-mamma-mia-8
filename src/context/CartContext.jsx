import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cargar carrito desde localStorage o inicializar vacío
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pizza) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === pizza.id);
      if (existingItem) {
        
        return prevCart.map(item =>
          item.id === pizza.id 
            ? { ...item, count: item.count + 1 } 
            : item
        );
      }
      
      return [...prevCart, { ...pizza, count: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const increaseCount = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = (id) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter(item => item.count > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


// Nueva función para manejar el checkout
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart), // Envía el carrito al backend
      });
      if (!response.ok) {
        throw new Error('Error al realizar la compra');
      }


const data = await response.json();
      setSuccessMessage('Compra realizada con éxito!'); // Mensaje de éxito
      // Aquí puedes limpiar el carrito si es necesario
      // setCart([]); // Descomentar si deseas vaciar el carrito después de la compra
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Hubo un problema al realizar la compra.'); // Mensaje de error
    }
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseCount,
        decreaseCount,
        total,
        formatPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
