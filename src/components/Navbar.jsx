import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Parse the stored user data
    }
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage and update state
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Digital Delights 
        </Link>

        {/* Center Nav Links */}
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/product" className="navbar-link">
            Products
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contactus" className="navbar-link">
            Contact Us
          </Link>
        </div>

        {/* Right Side */}
        <div className="navbar-icons">
          <Link to="/cart" className="navbar-icon">
            <ShoppingCart size={30} />
          </Link>

          {user ? (
            <>
              <span className="navbar-icon">Hello, {user.username}</span>
              <button className="navbar-iconz" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-icon">
                <User size={30} />
              </Link>
              <Link to="/signup" className="navbar-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
