import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from './context/CartContext'; 
const ProductDetails = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const { addToCart } = useCart(); 

  const [quantity, setQuantity] = useState(1); 

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      alert("Product added to cart!"); 
    }
  };

  if (!product) {
    return <div className="text-white text-center mt-5">No product data found.</div>;
  }

  return (
    <div className="product-details-overlay">
      <div className="details-card">
        <button className="close-btn" onClick={() => navigate(-1)}>✖</button>
        <img
          src={`https://jeffson5f8n.pythonanywhere.com/static/images/${product.product_photo}`}
          alt={product.product_name}
          className="product-img"
        />
        <h2>{product.product_name}</h2>
        <p className="desc">{product.product_desc}</p>
        <h4 className="price">Kshs {product.product_cost}</h4>

        <div className="quantity-selector">
          <button 
            className="btn btn-sm" 
            onClick={() => setQuantity(quantity - 1)} 
            disabled={quantity <= 1}
          >
            -
          </button>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))} 
            className="form-control-sm"
            min="1"
          />
          <button 
            className="btn btn-sm" 
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <button className="buy-btn" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
