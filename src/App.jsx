import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Typewriter from './components/Typewriter';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import ProductDetails from './ProductDetails';
import Navbar from './components/Navbar';
import AddProducts from './components/AddProduct';
import Cart from './components/Cart';
import AboutUs from './components/About';
import { CartProvider } from './context/CartContext';
import ContactUs from './components/ContactUs';

const TypewriterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid1">
      <br /><br />
      <div className="stunning-text-container">
        <Typewriter text="Welcome to Digital Delights. Where Gaming Dreams Come True!" speed={70} />
      </div>
      <button className="btn btn-primary" onClick={() => navigate("/login")}><b>LOGIN</b></button>
      <button className="btn btn-primary" onClick={() => navigate("/signup")}><b>SIGN UP</b></button>
    </div>
  );
};

const StyledWrapper = ({ children }) => (
  <div style={{ marginTop: '750px' }}>
    {children}
  </div>
);

const PlainWrapper = ({ children }) => (
  <div style={{ marginTop: '0px' }}>
    {children}
  </div>
);

function AppWrapper() {
  const location = useLocation();

  // Show Navbar only if not on landing page
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <CartProvider>
        {[
          "/home",
          "/productdetails",
          "/addproduct",
          "/cart",
          "/about",
          "/contactus"
        ].includes(location.pathname) ? (
          <StyledWrapper>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/productdetails" element={<ProductDetails />} />
              <Route path="/addproduct" element={<AddProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
            </Routes>
          </StyledWrapper>
        ) : (
          <PlainWrapper>
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<TypewriterPage />} />
            </Routes>
          </PlainWrapper>
        )}
      </CartProvider>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
