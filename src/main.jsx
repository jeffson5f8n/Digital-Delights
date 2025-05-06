import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './components/CartContext'; // ✅ import your context provider

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <CartProvider> {/* ✅ wrap the app */}
        <App />
      </CartProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Make sure there is a div with id="root" in your index.html.');
}
