import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Inventory from '../pages/Inventory';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotAuthorized from '../pages/NotAuthorized';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/inventory" 
        element={
          <ProtectedRoute adminOnly={true}>
            <Inventory />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
