import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { User } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { cart } = useCart();
// anza hapa
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
        <Link to="/" className="navbar-logo">
          Digital Delights 
        </Link>

        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            Bookings
          </Link>
          {/* <Link to="/about" className="navbar-link">
            About
          </Link> */}
          <Link to="/contactus" className="navbar-link">
            Contact Us
          </Link>
        </div>

        <div className="navbar-icons">
        <Link to="/cart" className="nav-link position-relative">
                <img src="images/shopping-cart.png" height="30px" alt="Cart" />
                {cart.length > 0 && (
                  <span
                    className="position-absolute "
                    style={{ fontSize: "15px" }}
                  >
                    {cart.length}
                  </span>
                )}
              </Link>


        {/* hapa ni kuonyesha sign in na sign up na logut the time theyre needed */}
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
