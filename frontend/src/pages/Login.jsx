import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/login', form, {
        withCredentials: true,
      });
      await fetchUser();
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3 text-sm">
          <a href="#" className="text-yellow-300 hover:underline">Forgot Password?</a>
        </div>

        <div className="mt-6 text-center">
          <a
            href="http://localhost:8080/auth/login/google"
            className="inline-block w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Continue with Google
          </a>
        </div>

        <div className="text-center mt-4 text-sm text-white">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
