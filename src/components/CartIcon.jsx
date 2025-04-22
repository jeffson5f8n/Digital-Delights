import React from 'react';
import { useCart } from './context/CartContext'; // Import CartContext to access cart state

const CartIcon = () => {
  const { cart } = useCart(); // Access cart state from context

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div 
      className="cart-icon-container" 
      style={{
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Cart Icon */}
      <i className="fa fa-shopping-cart" style={{ fontSize: '24px', color: '#fff' }}></i>
      
      {/* Show the badge only if there are items in the cart */}
      {totalQuantity > 0 && (
        <span 
          className="cart-badge" 
          style={{
            position: 'absolute', 
            top: '-5px', 
            right: '-5px', 
            backgroundColor: '#ff4d4d', 
            color: '#fff', 
            borderRadius: '50%', 
            padding: '5px 10px',
            fontSize: '14px',
            fontWeight: 'bold',
            minWidth: '20px',
            textAlign: 'center',
          }}
        >
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
