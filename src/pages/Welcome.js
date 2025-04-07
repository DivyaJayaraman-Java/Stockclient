import React from 'react';
import '../styles/Welcome.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
  
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center min-vh-100 px-3"
        style={{
          background: 'linear-gradient(135deg, #e8f5e9, #d0f0d0)',
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Supermarket Logo"
          className="mb-4"
          style={{ width: '120px', animation: 'float 3s ease-in-out infinite' }}
        />
  
        {/* Title */}
        <h1 className="fw-bold text-success">Welcome to GreenMart Stock Management 🌿</h1>
        <p className="lead text-dark">Manage your supermarket inventory with ease and clarity.</p>
  
        {/* Buttons */}
        <div className="mt-4 d-flex flex-column flex-md-row justify-content-center gap-3">
          <button
            className="btn btn-success btn-lg animated-btn"
            onClick={() => navigate('/product-management')}
          >
            🛒 Manage Products
          </button>
          <button
            className="btn btn-outline-success btn-lg animated-btn"
            onClick={() => navigate('/stock-overview')}
          >
            📊 Stock Overview
          </button>
        </div>
  
        {/* Inline styles */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
  
          .animated-btn {
            border-radius: 10px;
            transition: all 0.3s ease;
          }
  
          .animated-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 128, 0, 0.3);
          }
  
          @media (prefers-color-scheme: dark) {
            .welcome-container {
              background: linear-gradient(135deg, #1b1b1b, #2c2c2c);
              color: #ffffff;
            }
  
            .lead {
              color: #cccccc;
            }
  
            .btn-success,
            .btn-outline-success {
              background-color:rgb(54, 54, 229);
              border-color: #28a745;
              color: white;
            }
  
            .btn-outline-success:hover {
              background-color: #218838;
              color: white;
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default Welcome;