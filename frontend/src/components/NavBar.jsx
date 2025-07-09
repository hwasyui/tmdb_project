import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasTyped = useRef(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!hasTyped.current) return;
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-yellow-400 font-bold text-xl tracking-wide hover:text-yellow-300 transition">
            IMDB
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white md:hidden ml-auto"
          >
            <FaBars className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-2xl mx-6">
          <input
            type="text"
            placeholder="Search movies..."
            value={input}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-l-md text-sm text-black bg-zinc-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-md text-black transition-all duration-200"
          >
            <FaSearch />
          </button>
        </form>

        <div className="hidden md:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-yellow-400 font-medium">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 transition font-medium">
              Login
            </Link>
          )}
          <span className="cursor-pointer hover:underline hover:text-yellow-400 transition">
            EN <span className="text-xs">▼</span>
          </span>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <form onSubmit={handleSubmit} className="flex px-4">
            <input
              type="text"
              placeholder="Search..."
              value={input}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-l-md text-sm text-black bg-zinc-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-md text-black transition-all duration-200"
            >
              <FaSearch />
            </button>
          </form>

          <div className="px-4 space-y-2 text-sm">
            {user ? (
              <>
                <span className="text-yellow-400 font-medium block">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block hover:text-yellow-400 transition font-medium">
                Login
              </Link>
            )}
            <span className="block cursor-pointer hover:underline hover:text-yellow-400 transition">
              EN <span className="text-xs">▼</span>
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
