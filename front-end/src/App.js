import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProviderCart from './context/ProviderCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate replace to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route
          path="/customer/products"
          element={
            <ProviderCart>
              <Products />
            </ProviderCart>
          }
        />
        <Route
          path="/customer/checkout"
          element={
            <ProviderCart>
              <Checkout />
            </ProviderCart>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
