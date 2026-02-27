import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://backendassignment-yvte.onrender.com/api/products');
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ⚡ Slimmer Hero Section */}
      <div className="bg-indigo-600 text-white py-4 px-6 rounded-2xl mb-8 text-center shadow-md mx-4 mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Summer Collection 2026</h1>
        <p className="text-indigo-100 text-sm md:text-base max-w-xl mx-auto opacity-90">
          Latest trends in tech and fashion. Quality at unbeatable prices.
        </p>
      </div>

      <div className="px-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Featured Products</h2>
          <span className="text-xs text-gray-400 font-semibold uppercase">{products.length} Items</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* ⚡ Smaller Image Placeholder (h-40 instead of h-56) */}
              <div className="relative h-40 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-50">
                <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">No Image Available</span>
                <div className="absolute top-3 right-3 bg-indigo-50 px-2 py-1 rounded-md text-[10px] font-bold text-indigo-600 uppercase">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                
                <p className="text-gray-500 text-xs line-clamp-2 mb-3 h-8">
                  {product.description || "Premium quality item curated for your needs."}
                </p>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-black text-gray-900">${product.price}</span>
                    
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {product.stock > 0 ? `Stock: ${product.stock}` : 'Sold Out'}
                    </span>
                  </div>

                  <Link 
                    to={`/product/${product._id}`} 
                    className="block w-full text-center bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;