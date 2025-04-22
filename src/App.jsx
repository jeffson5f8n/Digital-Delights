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
import './styles/layout.css';
import './styles/typography.css';
import './styles/buttons.css';
import './styles/animations.css';
import './styles/form.css';
import './styles/productCard.css';
import './styles/modal.css';
import './styles/typewriter.css';
import './styles/testimonials.css';

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

function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      
      <div className="pt-16">

      <CartProvider>

      <div className="content">
        <Routes>
          <Route path="/" element={<TypewriterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
      </CartProvider>
      </div>
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
