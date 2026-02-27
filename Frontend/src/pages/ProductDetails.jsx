import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://backenddassignment.onrender.com/${id}`)
      .then(res => setProduct(res.data.product));
  }, [id]);

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Please login to order");
    try {
      await axios.post('https://backenddassignment.onrender.com/api/orders', 
        { orderItems: [{ product: product._id, quantity: 1 }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order successful!");
    } catch (err) { alert("Error placing order"); }
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl mx-auto">
      <div className="md:w-1/2 bg-gray-200 h-64 md:h-auto flex items-center justify-center">
        <span className="text-gray-400">Product Image</span>
      </div>
      <div className="p-8 md:w-1/2">
        <span className="text-indigo-600 text-sm font-bold uppercase tracking-widest">{product.category}</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
        <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-4xl font-bold text-gray-900">${product.price}</span>
          <button 
            onClick={handleOrder}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Order Now
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium">Stock available: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetails;