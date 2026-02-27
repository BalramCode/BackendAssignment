import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://backenddassignment.onrender.com/api/auth/login', { email, password });

            // Verification: Check if the logged-in user actually has the admin role in DB
            if (res.data.user.role !== 'admin') {
                alert("Access Denied: You are not an administrator.");
                return;
            }

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', 'admin');

            alert("Access Granted. Welcome, Admin.");
            navigate('/admin');
            window.location.reload();
        } catch (err) {
            alert("Invalid Admin Credentials.");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-6">
            {/* Container for 2 columns */}
            <div className="flex flex-col md:flex-row md:space-x-12 w-full max-w-6xl">

                {/* Right-side Login Details Card */}
                <div className="md:flex md:justify-end mb-8 md:mb-0 md:w-1/3">
                    <div className=" text-black p-6 rounded-lg  w-full max-w-xs">
                        <h2 className="text-lg font-semibold mb-4">Login Details</h2>
                        <p className="mb-2"><span className="font-medium">Email:</span> primetrade@gmail.com</p>
                        <p><span className="font-medium">Password:</span> 123456</p>
                    </div>
                </div>

                {/* Admin Form Card */}
                <div className="md:w-2/3 max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border-t-4 border-orange-500">
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-orange-50 rounded-full mb-4">
                            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3m0 0l-3 3m3-3l3 3M5 13a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v5m-3-2l3 2 3-2M4 7h16" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Admin Control Center</h2>
                        <p className="text-gray-500 text-sm mt-1">Authorized Personnel Only</p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Admin Email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Secure Password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg">
                            Authorize Access
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdminLogin;