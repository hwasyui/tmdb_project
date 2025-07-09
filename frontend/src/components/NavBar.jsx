import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const hasTyped = useRef(false); // Track if user has typed
  const { user, logout } = useContext(AuthContext);
  console.log('[Navbar] user from context:', user);


  // Debounce search (wait 500ms after user stops typing)
  useEffect(() => {
    if (!hasTyped.current) return; // Prevent running on mount

    const delayDebounce = setTimeout(() => {
      onSearch(input);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input, onSearch]);

  const handleChange = (e) => {
    if (!hasTyped.current) hasTyped.current = true;
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hasTyped.current = true;
    onSearch(input);
  };

  return (
    <nav className="bg-zinc-900 text-white px-4 py-2 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-yellow-400 font-bold text-xl">
          IMDB
        </Link>
        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          <FaBars />
          <span className="text-sm">Menu</span>
        </div>
      </div>

      {/* Middle - Search */}
      <form onSubmit={handleSubmit} className="flex flex-1 max-w-2xl mx-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={handleChange}
          className="w-full p-2 rounded-l-md focus:outline-none text-black bg-zinc-50 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 px-4 rounded-r-md text-black"
        >
          <FaSearch />
        </button>
      </form>

      {/* Right section */}
      <div className="flex items-center gap-4 text-sm">
       {user ? (
  <>
    <span className="text-yellow-400 font-semibold">Hi, {user.username}</span>
    <button onClick={logout}>Logout</button>
  </>
) : (
  <Link to="/login">Login</Link>
)}

        <span className="cursor-pointer hover:underline">EN ▼</span>
      </div>
    </nav>
  );
};

export default Navbar;
