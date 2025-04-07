import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // ✅ Custom styles with hover effects

const Navbar = () => (
  <nav
    className="navbar navbar-expand-lg navbar-dark"
    style={{ backgroundColor: '#d4edda' }} // 🌿 Light green background
  >
    <div className="container">
      <Link className="navbar-brand text-dark" to="/">Supermarket</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/">🏠 Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/product-management">📦 Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/stock-overview">📊 Stock Overview</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/login">🔐 Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
