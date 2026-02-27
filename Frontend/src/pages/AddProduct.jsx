import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', category: '', image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('http://localhost:3000/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("🚀 Product launched successfully!");
      navigate('/admin'); // Redirect back to dashboard
    } catch (err) {
      alert("Error adding product. Check if you are authorized.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gray-900 p-8 text-white">
          <h2 className="text-3xl font-bold">Add New Product</h2>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Inventory Management</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. Premium Wireless Headphones" 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="99.99" 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Inventory Stock</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="50" 
                onChange={e => setFormData({...formData, stock: e.target.value})} 
                required
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                onChange={e => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Select a Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Gadgets">Gadgets</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Describe the key features of the product..." 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={() => navigate('/admin')}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className={`flex-[2] bg-indigo-600 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Deploy Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;