import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalQuantity } = useContext(CartContext);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#333', color: 'white' }}>
      <div>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
          React E-Commerce
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        
        {user ? (
          <>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
              Cart ({totalQuantity})
            </Link>
            {user.role === 'admin' && (
              <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
            )}
            <span style={{ color: '#ccc' }}>| Hello, {user.username}</span>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
