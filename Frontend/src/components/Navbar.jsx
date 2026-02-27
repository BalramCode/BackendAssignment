import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-black text-indigo-600 tracking-tighter">PrimeTrade<span className="text-gray-900">AI</span></Link>
      
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">Home</Link>
        
        {!token ? (
          <>
            {/* The Admin Entrance */}
            <Link to="/admin-login" className="text-sm font-semibold text-orange-600 hover:text-orange-700">Admin Portal</Link>
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition">Register</Link>
          </>
        ) : (
          <>
            {role === 'admin' && (
              <Link to="/admin" className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">Dashboard</Link>
            )}
            <button onClick={logout} className="text-sm font-bold text-red-500 hover:text-red-700">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;