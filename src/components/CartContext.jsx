import React, { createContext, useContext, useState } from "react";

// Create a CartContext
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If product exists, increment quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If product does not exist, add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove product from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update quantity of product in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  return useContext(CartContext);
};
