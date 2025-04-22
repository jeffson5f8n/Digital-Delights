import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import CartContext to access cart state
import axios from "axios"; // For making the API call

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart(); // Access cart, removeItem, and updateQuantity functions
  const img_url = "https://jeffson5f8n.pythonanywhere.com/static/images/";

  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('mpesa'); // Default to M-PESA
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  // Calculate total cost of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product_cost * item.quantity, 0);
  };

  const handleHover = () => {
    if (!phone) {
      const randomX = Math.floor(Math.random() * 100) - 50;
      const randomY = Math.floor(Math.random() * 100) - 50;
      setBtnOffset({ x: randomX, y: randomY });
    } else {
      setBtnOffset({ x: 0, y: 0 });
    }
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setLoading("Processing Payment...");
    setSuccess('');
    setError('');

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", calculateTotal().toString()); // Pass the dynamic amount

      const response = await axios.post("https://jeffson5f8n.pythonanywhere.com/api/mpesa_payment", data);

      setLoading('');
      setSuccess(response.data.message);
    } catch (error) {
      setLoading('');
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-12 p-4 rounded-4"
          style={{
            boxShadow: "0 0 30px rgba(31, 5, 179, 0.3)",
            border: "1px solid rgb(15, 15, 15)",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#00bfff", fontWeight: "bold" }}>
            💙 Your Cart
          </h3>

          {cart.length === 0 ? (
            <div className="text-center">Oops!! Nothing to see here😄.</div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id} // Ensure unique key for each product in the cart
                className="d-flex justify-content-between align-items-center mb-3"
                style={{
                  backgroundColor: "#1e1e1e",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={img_url + item.product_photo}
                    alt={item.product_name}
                    style={{
                      width: "80px", // Image size
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="ms-3">
                    <div style={{ fontWeight: "bold" }}>{item.product_name}</div>
                    <div>Ksh {item.product_cost}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                    onClick={() => removeItem(item.id)} // Correctly remove item by ID
                  >
                    Remove
                  </button>

                  <div className="ms-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10)) // Correctly update quantity for the product
                      }
                      min="1"
                      className="form-control form-control-sm"
                      style={{
                        width: "60px",
                        backgroundColor: "#121212",
                        color: "#fff",
                        border: "1px solid #00bfff",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="d-flex justify-content-between mt-4" style={{ fontWeight: "bold", color: "#00bfff" }}>
            <span>Total</span>
            <span>Ksh {calculateTotal()}</span>
          </div>

          {cart.length > 0 && (
            <button
              className="btn w-100 mt-4"
              style={{
                backgroundColor: "#00bfff",
                border: "none",
                color: "#000814",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: "8px",
                display: "inline-block",
              }}
              onClick={() => setShowPayment(true)} // Show the payment modal
            >
              Proceed to Checkout 🚀
            </button>
          )}
        </div>
      </div>

      {showPayment && (
        <div className="payment-modal">
          <div className="payment-card">
            <button className="close-btn" onClick={() => setShowPayment(false)}>✖</button>
            <h3>Select Payment Method</h3>

            <div className="btn-group d-flex justify-content-center mb-3" role="group">
              <button className="btn btn-outline-warning" onClick={() => setSelectedMethod('card')}>💳 Card</button>
              <button className="btn btn-outline-success" onClick={() => setSelectedMethod('mpesa')}>📱 M-PESA</button>
              <button className="btn btn-outline-primary" onClick={() => setSelectedMethod('paypal')}>💰 PayPal</button>
            </div>

            {/* MPESA FORM */}
            {selectedMethod === 'mpesa' && (
              <form onSubmit={handleMpesaPayment}>
                <h4>📱 M-PESA Payment</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Mpesa No. 2547xxxxxxxxx"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <button
                  className="btn pay-btn w-100 mt-3"
                  style={{
                    transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                    transition: 'transform 0.2s ease',
                    backgroundColor: "#ffa500",
                    fontWeight: 'bold',
                    fontSize: "18px",
                    border: "none",
                    color: "#121212",
                  }}
                  onMouseMove={handleHover}
                >
                  PAY NOW 💲
                </button>
              </form>
            )}

            {/* Success/Error Messages */}
            {success && <b className="text-success">{success}</b>}
            {error && <b className="text-danger">{error}</b>}
            {loading && <b className="text-warning">{loading}</b>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
