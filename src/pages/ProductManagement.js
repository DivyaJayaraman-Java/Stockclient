import React, { useState, useEffect } from 'react';
import API from '../api/index'; // import centralized axios instance
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock_quantity: '',
    items_sold: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/api/products/${editingId}`, formData);
      } else {
        await API.post('/api/products', formData);
      }
      setFormData({ name: '', category: '', price: '', stock_quantity: '', items_sold: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error('Submit Error:', err.response?.data || err.message);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id); // MongoDB uses _id
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Delete Error:', err);
      }
    }
  };

  return (
    <div className="container my-4" style={{ fontSize: '0.85rem' }}>
      <div className="text-center mb-3">
        <h4 className="fw-semibold" style={{ fontSize: '1.2rem' }}>📦 Product Management</h4>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Add, edit, and delete your products easily.</p>
      </div>

      <div className="card shadow-sm mb-4" style={{ fontSize: '0.85rem' }}>
        <div className="card-body p-3">
          <h5 className="mb-3" style={{ fontSize: '1rem' }}>{editingId ? '✏️ Edit Product' : '➕ Add New Product'}</h5>
          <form className="row g-2" onSubmit={handleSubmit}>
            <div className="col-md-6 col-lg-4">
              <label className="form-label">Product Name</label>
              <input type="text" className="form-control form-control-sm" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6 col-lg-4">
              <label className="form-label">Category</label>
              <input type="text" className="form-control form-control-sm" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="col-md-6 col-lg-4">
              <label className="form-label">Price (₹)</label>
              <input type="number" className="form-control form-control-sm" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="col-md-6 col-lg-6">
              <label className="form-label">Stock Quantity</label>
              <input type="number" className="form-control form-control-sm" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required />
            </div>
            <div className="col-md-6 col-lg-6">
              <label className="form-label">Items Sold</label>
              <input type="number" className="form-control form-control-sm" name="items_sold" value={formData.items_sold} onChange={handleChange} required />
            </div>
            <div className="col-12 d-flex justify-content-end mt-2">
              <button type="submit" className={`btn btn-sm ${editingId ? 'btn-warning' : 'btn-success'}`}>
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm" style={{ fontSize: '0.8rem' }}>
        <div className="card-body p-3">
          <h5 className="mb-3" style={{ fontSize: '1rem' }}>📋 Product List</h5>
          <div className="table-responsive">
            <table className="table table-sm table-hover table-bordered text-center align-middle" style={{ fontSize: '0.75rem' }}>
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Sold</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6">No products found.</td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stock_quantity}</td>
                      <td>{product.items_sold}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-1">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(product)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
