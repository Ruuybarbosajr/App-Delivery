import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Products from './pages/Products';
import OrderDetails from './pages/OrderDetails';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProviderCart from './context/ProviderCart';
import AuthToken from './components/AuthToken';
import Order from './pages/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate replace to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route
          path="/customer/orders"
          element={
            <ProviderCart>
              <AuthToken>
                <Order />
              </AuthToken>
            </ProviderCart>
          }
        />
        <Route
          path="/seller/orders"
          element={
            <ProviderCart>
              <AuthToken>
                <Order />
              </AuthToken>
            </ProviderCart>
          }
        />
        <Route
          path="/customer/orders/:id"
          element={
            <ProviderCart>
              <AuthToken>
                <OrderDetails />
              </AuthToken>
            </ProviderCart>
          }
        />
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
        <Route
          path="/seller/orders/:id"
          element={
            <ProviderCart>
              <AuthToken>
                <OrderDetails />
              </AuthToken>
            </ProviderCart>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
