import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Footer from "./Footer";

const HomePage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const img_url = "https://jeffson5f8n.pythonanywhere.com/static/images/";

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

  const getProducts = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jeffson5f8n.pythonanywhere.com/api/getproducts"
      );
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
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const handleSearch = (value) => {
    setActiveCategory(null);
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    const updated = [product, ...recentlyViewed.filter(p => p.id !== product.id)];
    const trimmed = updated.slice(0, 6);
    setRecentlyViewed(trimmed);
    localStorage.setItem("recentlyViewed", JSON.stringify(trimmed));
    navigate("/productdetails", { state: { product } });
  };

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const firstLetter = product.product_name
      ? product.product_name.charAt(0).toUpperCase()
      : "#";
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(product);
    return acc;
  }, {});

  const sortedKeys = Object.keys(groupedProducts).sort();
  const categoriesToRender = activeCategory ? [activeCategory] : ["B"];

  return (
    <div className="homepage-container">
      <div className="homepage-overlay" style={{
        position: "absolute", top: 0, left: 0,
        height: "100%", width: "100%",
        background: "radial-gradient(circle at top left, #001f3f, #000000)",
        opacity: 0.4, zIndex: -1,
      }} />

      <div className="hero-section text-center pt-5" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="homepage-title text-white display-5 fw-bold">
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

      <div className="container mt-4" style={{ position: "relative", zIndex: 2 }}>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {sortedKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`btn ${activeCategory === key ? 'btn-info text-white' : 'btn-outline-info'}`}
            >
              {categoryHeaders[key] || key}
            </button>
          ))}
        </div>
      </div>

      <div className="container mt-3" style={{ position: "relative", zIndex: 2 }}>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control"
          style={{ padding: "10px 16px", borderRadius: "12px", border: "1px solid #00bfff", backgroundColor: "#1f1f1f", color: "#fff" }}
        />
      </div>

      <div className="container py-5">
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger text-center text-danger">{error}</div>}

        {categoriesToRender.map((key) => (
          groupedProducts[key] && (
            <div key={key} className="mb-5">
              <h3 className="text-center" style={{
                color: "#00bfff", fontWeight: "bold", fontSize: "2rem",
                background: "linear-gradient(45deg, #00bfff, #0072ff)",
                padding: "10px 0", borderRadius: "10px",
                textShadow: "2px 2px 10px rgba(0,191,255,0.5)"
              }}>
                {categoryHeaders[key] || key}
              </h3>
              <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", padding: "0 12px", marginTop: "20px" }}>
                {groupedProducts[key].map((product) => (
                  <div key={product.id} className="card-container" style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card" style={{
                      background: "linear-gradient(145deg,#0a0a0a,#111827)", color: "#fff",
                      borderRadius: "16px", border: "1px solid #00bfff", maxWidth: "280px",
                      transition: "transform 0.3s,box-shadow 0.3s", boxShadow: "0 0 12px rgba(0,191,255,0.2)"
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 25px rgba(0,191,255,0.5)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,191,255,0.2)"; }}>
                      <img src={img_url + product.product_photo} alt={product.product_name}
                        style={{ height: "220px", width: "100%", objectFit: "cover", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }} />
                      <div className="card-body text-center p-3">
                        <h5 style={{ fontWeight: "600", color: "#00bfff" }}>{product.product_name}</h5>
                        {product.product_quantity <= 0 && (
                          <span style={{
                            display: "inline-block", backgroundColor: "#ff4d4f",
                            color: "#fff", fontSize: "0.75rem", fontWeight: "bold",
                            padding: "4px 8px", borderRadius: "8px", marginTop: "6px"
                          }}>
                            Low Stock
                          </span>
                        )}
                        <p className="text-light mb-2" style={{ fontSize: "0.9rem" }}>
                          {product.product_desc.length > 50 ? product.product_desc.substring(0, 50) + "..." : product.product_desc}
                        </p>
                        <p className="fw-bold mb-2" style={{ color: "#00ffcc" }}>Kshs {product.product_cost}</p>
                        <button className="btn w-100" style={{
                          backgroundColor: "#ffa500", border: "none", color: "#121212",
                          fontWeight: "bold"
                        }} onClick={() => handleViewDetails(product)}>
                          View Details 🔍
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {recentlyViewed.length > 0 && (
          <div className="recently-viewed mt-5">
            <h3 className="text-center mb-2" style={{ color: "#00ffcc", fontWeight: "bold" }}>Recently Viewed</h3>
            <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {recentlyViewed.map((product) => (
                <div key={product.id} className="card" style={{
                  background: "linear-gradient(145deg,#0a0a0a,#111827)", color: "#fff",
                  border: "1px solid #00bfff", borderRadius: "16px",
                  transition: "transform 0.3s, box-shadow 0.3s"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 25px rgba(0,191,255,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,191,255,0.2)"; }}>
                  <img src={img_url + product.product_photo} alt={product.product_name}
                    style={{
                      height: "300px",  
                      width: "40%",    
                      objectFit: "cover",  
                      borderTopLeftRadius: "16px",  
                      borderTopRightRadius: "16px", 
                    }} />
                  <div className="card-body text-center p-3">
                    <h5 style={{ color: "#00bfff" }}>{product.product_name}</h5>
                    <p className="text-light" style={{ fontSize: "0.85rem" }}>
                      {product.product_desc.length > 50 ? product.product_desc.substring(0, 50) + "..." : product.product_desc}
                    </p>
                    <p className="fw-bold" style={{ color: "#00ffcc" }}>Kshs {product.product_cost}</p>
                    <button className="btn w-100 mt-2" style={{ backgroundColor: "#ffa500", border: "none", fontWeight: "bold" }} onClick={() => handleViewDetails(product)}>
                      View Again 🔁
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
