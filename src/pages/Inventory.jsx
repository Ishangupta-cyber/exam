import React, { useContext, useState, useEffect } from 'react';
import { InventoryContext } from '../context/InventoryContext';

export default function Inventory() {
  const { products, loading, error, fetchProducts, addProduct, removeProduct, increaseStock, decreaseStock } = useContext(InventoryContext);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: '',
    count: ''
  });

  // Fetch initial products if empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addProduct({
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
      rating: parseFloat(formData.rating),
      count: parseInt(formData.count)
    });
    setFormData({ title: '', price: '', description: '', category: '', image: '', rating: '', count: '' });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory Management (Admin Only)</h1>
      
      <button onClick={fetchProducts} style={{ padding: '10px', marginBottom: '20px' }}>
        Sync Products (Fetch from API)
      </button>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: '1', border: '1px solid #ccc', padding: '15px' }}>
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
            <input type="number" name="rating" placeholder="Rating (0-5)" value={formData.rating} onChange={handleChange} required />
            <input type="number" name="count" placeholder="Initial Stock Count" value={formData.count} onChange={handleChange} required />
            <button type="submit">Add Product</button>
          </form>
        </div>

        <div style={{ flex: '2' }}>
          <h2>Current Inventory</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map(product => (
              <div key={product.id} style={{ display: 'flex', border: '1px solid #eee', padding: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                  <div>
                    <strong>{product.title}</strong>
                    <p>${product.price} | Stock: {product.count}</p>
                  </div>
                </div>
                <div>
                  <button onClick={() => increaseStock(product.id)}>+</button>
                  <button onClick={() => decreaseStock(product.id)} style={{ margin: '0 5px' }}>-</button>
                  <button onClick={() => removeProduct(product.id)} style={{ color: 'red' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
