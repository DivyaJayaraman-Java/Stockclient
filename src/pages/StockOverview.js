import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const StockOverview = () => {
  const [products, setProducts] = useState([]);

  // Fetch product data from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Calculations
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.items_sold, 0);
  const totalStockLeft = products.reduce((sum, p) => sum + p.stock_quantity, 0);
  const totalItemsSold = products.reduce((sum, p) => sum + p.items_sold, 0);

  // Chart Data
  const barData = {
    labels: products.map(p => p.name),
    datasets: [{
      label: 'Items Sold',
      data: products.map(p => p.items_sold),
      backgroundColor: '#0d6efd'
    }]
  };

  const pieData = {
    labels: ['Revenue', 'Stock Left'],
    datasets: [{
      label: 'Stock Distribution',
      data: [totalRevenue, totalStockLeft],
      backgroundColor: ['#198754', '#ffc107']
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { font: { size: 10 } }
      }
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: { ticks: { font: { size: 10 } } }
    }
  };

  return (
    <div className="container mt-4" style={{ fontSize: '0.85rem' }}>
      <h4 className="mb-3">📊 Stock Overview</h4>

      {/* Summary Cards */}
      <div className="row">
        {[
          { title: 'Total Revenue', value: `₹${totalRevenue.toFixed(2)}`, bg: 'success' },
          { title: 'Stock Left', value: `${totalStockLeft} items`, bg: 'info' },
          { title: 'Items Sold', value: `${totalItemsSold} items`, bg: 'warning' }
        ].map((card, index) => (
          <div className="col-md-4 col-lg-3 mb-3" key={index}>
            <div className={`card text-white bg-${card.bg}`} style={{ fontSize: '0.8rem' }}>
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{card.title}</h6>
                <p className="card-text">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <div className="card p-2" style={{ height: '180px' }}>
            <h6 className="text-center mb-2" style={{ fontSize: '0.8rem' }}>📈 Items Sold</h6>
            <div style={{ height: '130px' }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-2" style={{ height: '180px' }}>
            <h6 className="text-center mb-2" style={{ fontSize: '0.8rem' }}>🧩 Revenue vs Stock</h6>
            <div style={{ height: '130px' }}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockOverview;
