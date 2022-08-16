import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Products from './pages/Products';
import ProductsDetails from './pages/ProductsDetails';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProviderCart from './context/ProviderCart';
import AuthToken from './components/AuthToken';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate replace to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/orders/:id" element={ <ProductsDetails /> } />
        <Route
          path="/customer/products"
          element={
            <ProviderCart>
              <AuthToken>
                <Products />
              </AuthToken>
            </ProviderCart>
          }
        />
        <Route
          path="/customer/checkout"
          element={
            <ProviderCart>
              <AuthToken>
                <Checkout />
              </AuthToken>
            </ProviderCart>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
