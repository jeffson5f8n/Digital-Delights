import React, { useState } from "react";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const img_url = "https://jeffson5f8n.pythonanywhere.com/static/images/";

  const calculateTotal = () => {
    return cart.reduce((acc, product) => acc + parseInt(product.product_cost), 0);
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setLoading("Processing Payment...");
    setSuccess("");
    setError("");

    if (!/^(254)\d{9}$/.test(phone)) {
      setError("Invalid phone number format. Please enter a valid Kenyan number.");
      setLoading("");
      return;
    }

    try {
      const data = new FormData();
      const totalAmount = calculateTotal();

      data.append("amount", totalAmount);
      data.append("phone", phone);

      const response = await axios.post("https://Sanse.pythonanywhere.com/api/mpesa_payment", data);

      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order = {
        id: orderId,
        phone: phone,
        total_amount: totalAmount,
        items: cart,
        status: "Order Placed",
      };

      localStorage.setItem(`order_${orderId}`, JSON.stringify(order));

      setSuccess(`Payment successful! Your Order ID is ${orderId}.`);
      setPhone("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading("");
    }
  };

  const handleHover = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setBtnOffset({ x: (offsetX - 75) / 10, y: (offsetY - 20) / 10 });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h3 className="text-primary mb-4"><b>YOUR CART</b></h3>

        {cart.length === 0 ? (
          <div className="alert alert-warning text-center">Your cart is empty</div>
        ) : (
          <>
            <div className="row">
              {cart.map((product, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card shadow">
                    <img
                      src={img_url + product.product_photo}
                      alt={product.product_name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name}</h5>
                      <p className="card-text text-muted">
                        {product.product_desc.slice(0, 50)}...
                      </p>
                      <p className="text-warning fw-bold">{product.product_cost} KSh</p>
                      <button
                        className="btn btn-danger w-100 mb-2"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL AND PROCEED BUTTON AT THE BOTTOM */}
            <div className="mt-4 p-3 shadow bg-light rounded">
              <div className="d-flex justify-content-between" style={{ fontWeight: "bold", color: "#00bfff" }}>
                <span>Total</span>
                <span>Ksh {calculateTotal()}</span>
              </div>

              <button
                className="btn w-100 mt-3"
                style={{
                  backgroundColor: "#00bfff",
                  border: "none",
                  color: "#000814",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "8px",
                }}
                onClick={() => setShowPayment(true)}
              >
                Proceed to Checkout 🚀
              </button>
            </div>
          </>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-card">
            <button className="close-btn" onClick={() => setShowPayment(false)}>✖</button>
            <h3>Select Payment Method</h3>

            <div className="btn-group d-flex justify-content-center mb-3">
              <button className="btn btn-outline-warning" onClick={() => setSelectedMethod("card")}>💳 Card</button>
              <button className="btn btn-outline-success" onClick={() => setSelectedMethod("mpesa")}>📱 M-PESA</button>
              <button className="btn btn-outline-primary" onClick={() => setSelectedMethod("paypal")}>💰 PayPal</button>
            </div>

            {selectedMethod === "mpesa" && (
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
                    transition: "transform 0.2s ease",
                    backgroundColor: "#ffa500",
                    fontWeight: "bold",
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

            {success && <b className="text-success mt-3 d-block">{success}</b>}
            {error && <b className="text-danger mt-3 d-block">{error}</b>}
            {loading && <b className="text-warning mt-3 d-block">{loading}</b>}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
 
