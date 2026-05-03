import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalQuantity, totalPrice } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', border: '1px solid #ccc', padding: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.title}</h3>
                <p style={{ margin: 0 }}>${item.price}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div>
                <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ color: 'red' }}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '2px solid #ccc', paddingTop: '20px', textAlign: 'right' }}>
        <h3>Total Items: {totalQuantity}</h3>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}
