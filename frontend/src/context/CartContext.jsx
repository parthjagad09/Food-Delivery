// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (dish) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item._id === dish._id);
//       if (existing) {
//         return prev.map((item) =>
//           item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...dish, quantity: 1 }];
//     });
//   };

//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, cartCount, subtotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === dish._id);
      if (existing) {
        return prev.map((item) =>
          item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  // ADD THIS: Function to decrease or remove items
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === id);
      if (existing.quantity === 1) {
        return prev.filter((item) => item._id !== id);
      }
      return prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);