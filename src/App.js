// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import ProductManagement from './pages/ProductManagement';
import StockOverview from './pages/StockOverview';
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/stock-overview" element={<StockOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-management" element={
  <PrivateRoute>
    <ProductManagement />
  </PrivateRoute>
} />
      </Routes>
    </Router>
  );
};

export default App;
