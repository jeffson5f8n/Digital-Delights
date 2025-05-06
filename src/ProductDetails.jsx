import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../styles/styles.css';  // make sure this file contains the .alert-floating CSS

const ProductDetails = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  if (!product) {
    return <div className="text-white text-center mt-5">No product data found.</div>;
  }

  return (
    <>
      {showToast && (
        <div className="alert-floating alert-success" role="alert">
          Product added to cart!
          <button className="close-btn" onClick={() => setShowToast(false)}>
            &times;
          </button>
        </div>
      )}

      <div className="product-details-overlay">
        <div className="details-card">
          <button className="close-btn" onClick={() => navigate("/home")}>✖</button>
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
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              className="form-control-sm"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            />
            <button
              className="btn btn-sm"
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>

          <button className="buy-btn" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
