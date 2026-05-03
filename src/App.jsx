import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import './App.css'

export default function App() {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  )
}
