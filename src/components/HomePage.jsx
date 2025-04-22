import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import the CartContext
const HomePage = () => {
  const { addToCart } = useCart(); // Access the addToCart function from the context
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const img_url = "https://jeffson5f8n.pythonanywhere.com/static/images/";

  const getProducts = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get("https://jeffson5f8n.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("API error:", error.response || error.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (value) => {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const firstLetter = product.product_name ? product.product_name.charAt(0).toUpperCase() : "Others";
    acc[firstLetter] = acc[firstLetter] || [];
    acc[firstLetter].push(product);
    return acc;
  }, {});

  const categoryHeaders = {
    A: "Apple Products",
    B: "Gaming Computers",
    C: "Computers & Accessories",
    D: "Digital Cameras",
    E: "Ergonomic Furniture",
    F: "Fashion & Apparel",
    G: "Gaming Consoles",
    H: "Gaming Pads",
    I: "Industrial Tools",
    J: "Jewelry & Watches",
    K: "Mouse & Keyboards",
    M: "Mobile Phones",
    N: "Networking Devices",
    O: "Virtual Reality",
    P: "Sound Equipments",
    S: "Consoles",
  };

  const defaultCategory = "Miscellaneous";

  return (
    <div className="homepage-container">
      <div
        className="homepage-overlay"
        style={{
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "radial-gradient(circle at top left, #001f3f, #000000)",
          opacity: 0.4,
          zIndex: -1,
        }}
      />

      {/* Hero Section */}
      <div className="hero-section text-center pt-5" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="homepage-title text-white display-5 fw-bold">
            <br />
            <TypeAnimation
              sequence={[
                "Welcome to Digital Delights", 2000,
                "Where Gaming Dreams Come True!", 2000,
                "Shop Your Favorites", 2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </h1>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="container mt-3" style={{ position: "relative", zIndex: 2 }}>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control"
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid #00bfff",
            backgroundColor: "#1f1f1f",
            color: "#fff",
          }}
        />
        <br />
        <br />
      </div>

      {/* Product Section */}
      <div className="container py-5">
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {filteredProducts.length === 0 && !loading && !error && (
          <p className="text-center text-white mt-4">No products available.</p>
        )}

        {/* Grouped Product Categories */}
        {Object.keys(groupedProducts).sort().map((letter) => (
          <div key={letter} className="mb-5">
            <h3
              className="category-header text-center"
              style={{
                color: "#00bfff",
                fontWeight: "bold",
                fontSize: "2rem",
                background: "linear-gradient(45deg, #00bfff, #0072ff)",
                padding: "10px 0",
                borderRadius: "10px",
                textShadow: "2px 2px 10px rgba(0, 191, 255, 0.5)",
              }}
            >
              {categoryHeaders[letter] || defaultCategory}
            </h3>

            {/* 4-Column Grid */}
            <div
              className="product-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",  // Four columns per row
                gap: "24px", // Spacing between items
                padding: "0 12px",
                marginTop: "20px",
              }}
            >
              {groupedProducts[letter].map((product) => (
                <div key={product.id} style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="card"
                    style={{
                      background: "linear-gradient(145deg, #0a0a0a, #111827)",
                      color: "#fff",
                      borderRadius: "16px",
                      border: "1px solid #00bfff",
                      width: "100%",
                      maxWidth: "280px", // Limit the card size
                      transition: "transform 0.3s, box-shadow 0.3s",
                      boxShadow: "0 0 12px rgba(0, 191, 255, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 0 25px rgba(0,191,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 191, 255, 0.2)";
                    }}
                  >
                    <img
                      src={img_url + product.product_photo}
                      alt={product.product_name}
                      style={{
                        height: "220px",
                        width: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                    />
                    <div className="card-body text-center p-3">
                      <h5 style={{ fontWeight: "600", color: "#00bfff" }}>{product.product_name}</h5>
                      <p className="text-light mb-2" style={{ fontSize: "0.9rem" }}>
                        {product.product_desc.length > 50
                          ? product.product_desc.substring(0, 50) + "..."
                          : product.product_desc}
                      </p>
                      <p className="fw-bold mb-2" style={{ color: "#00ffcc" }}>
                        Kshs {product.product_cost}
                      </p>
                      
                      <button
                        className="btn w-100"
                        style={{
                          backgroundColor: "#ffa500",
                          border: "none",
                          color: "#121212",
                          fontWeight: "bold",
                        }}
                        onClick={() => navigate("/productdetails", { state: { product } })}
                      >
                        View Details 🔍
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
