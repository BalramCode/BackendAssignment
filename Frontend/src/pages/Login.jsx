import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backendassignmenttt.onrender.com/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      alert("Login Successful!");
      res.data.user.role === 'admin' ? navigate('/admin') : navigate('/');
      window.location.reload();
    } catch (err) {
      // This will help us see the REAL error in the console
      console.error("Login Error Details:", err.response?.data);
      alert(err.response?.data?.message || "Login failed. Check server console.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;