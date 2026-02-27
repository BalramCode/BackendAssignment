import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', category: ''
  });

  // Fetch current product details to fill the form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://backenddassignment.onrender.com/api/products/${id}`);
        const p = res.data.product;
        setFormData({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category
        });
      } catch (err) {
        alert("Error fetching product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      await axios.put(`https://backenddassignment.onrender.com/api/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Product updated successfully!");
      navigate('/admin');
    } catch (err) {
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold">Edit Product</h2>
          <p className="text-indigo-100 mt-2 text-sm uppercase tracking-widest">Updating: {formData.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input 
                value={formData.name}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input 
                type="number" 
                value={formData.price}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock</label>
              <input 
                type="number" 
                value={formData.stock}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={e => setFormData({...formData, stock: e.target.value})} 
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                rows="4"
                value={formData.description}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={() => navigate('/admin')} className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
              {loading ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;