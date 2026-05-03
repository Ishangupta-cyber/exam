import React, { createContext, useState, useEffect, useRef } from 'react';

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const abortControllerRef = useRef(null);

  async function fetchProducts() {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        signal: abortControllerRef.current.signal
      });
      
      const data = await response.json();
      
      // Add a default stock count to the fetched products
      const productsWithStock = data.map(item => ({
        ...item,
        count: Math.floor(Math.random() * 20) // Random stock between 0 and 19 for testing
      }));
      
      setProducts(productsWithStock);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to fetch products');
      }
    } finally {
      setLoading(false);
    }
  }

  function addProduct(productData) {
    const newProduct = {
      ...productData,
      id: Date.now(),
      rating: { rate: productData.rating, count: 0 }
    };
    setProducts([newProduct, ...products]);
  }

  function removeProduct(id) {
    setProducts(products.filter(p => p.id !== id));
  }

  function increaseStock(id) {
    setProducts(products.map(p => 
      p.id === id ? { ...p, count: p.count + 1 } : p
    ));
  }

  function decreaseStock(id) {
    setProducts(products.map(p => {
      if (p.id === id && p.count > 0) {
        return { ...p, count: p.count - 1 };
      }
      return p;
    }));
  }

  return (
    <InventoryContext.Provider value={{ 
      products, 
      loading, 
      error, 
      fetchProducts, 
      addProduct, 
      removeProduct, 
      increaseStock, 
      decreaseStock 
    }}>
      {children}
    </InventoryContext.Provider>
  );
}
