import React from 'react';
import { Link } from 'react-router-dom';

export default function NotAuthorized() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Not Authorized</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/products">Go back to Products</Link>
    </div>
  );
}
