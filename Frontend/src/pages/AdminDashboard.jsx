import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        const res = await axios.get('http://backendassignment-yvte.onrender.com/api/products');
        setProducts(res.data.products);
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            await axios.delete(`backendassignment-yvte.onrender.com/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProducts();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Admin Inventory</h1>
                <Link to="/admin/add" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    + Add New Product
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4 text-left">Product Name</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Price</th>
                            <th className="px-6 py-4 text-left">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map(p => (
                            <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 text-gray-600">{p.category}</td>
                                <td className="px-6 py-4 font-bold text-indigo-600">${p.price}</td>
                                <td className="px-6 py-4 text-gray-600">{p.stock}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-4">
                                    <Link
                                        to={`/admin/edit/${p._id}`}
                                        className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-md"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="text-red-600 hover:text-red-900 font-bold text-sm bg-red-50 px-3 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;