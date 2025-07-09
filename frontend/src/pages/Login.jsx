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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3 text-sm">
          <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
        </div>

        <div className="mt-6 text-center">
          <a
            href="http://localhost:8080/auth/login/google"
            className="inline-block w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Continue with Google
          </a>
        </div>

        <div className="text-center mt-4 text-sm">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
