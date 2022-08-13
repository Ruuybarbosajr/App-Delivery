import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Products from './pages/Products';
import ProductsDetails from './pages/ProductsDetails';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate replace to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/orders/:id" element={ <ProductsDetails /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
