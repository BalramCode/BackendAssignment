import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/admin" element={
              <ProtectedRoute isAdmin={true}><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/admin/add" element={
              <ProtectedRoute isAdmin={true}><AddProduct /></ProtectedRoute>
            } />
            <Route path="/admin/edit/:id" element={
              <ProtectedRoute isAdmin={true}>
                <EditProduct />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;