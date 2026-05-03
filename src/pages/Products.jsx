import React, { useContext, useState, useEffect } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const { products, loading, error, fetchProducts } = useContext(InventoryContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Fetch initial products if empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleAddToCart(product) {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  }

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Products</h1>
        
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Skeleton UI */}
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ border: '1px solid #ccc', padding: '15px', width: '250px', height: '350px', backgroundColor: '#f0f0f0', animation: 'pulse 1.5s infinite' }}>
              Loading...
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No products found</h2>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredProducts.map(product => {
            const isOutOfStock = product.count === 0;

            return (
              <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
                  <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 5px 0' }}>{product.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: '10px 0' }}>${product.price}</h2>
                    <span style={{ fontSize: '0.9rem' }}>⭐ {product.rating?.rate}</span>
                  </div>
                  <p style={{ color: isOutOfStock ? 'red' : 'green', margin: '5px 0 15px 0' }}>
                    {isOutOfStock ? 'Out of Stock' : `In Stock: ${product.count}`}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={isOutOfStock}
                  style={{ 
                    padding: '10px', 
                    backgroundColor: isOutOfStock ? '#ccc' : '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
