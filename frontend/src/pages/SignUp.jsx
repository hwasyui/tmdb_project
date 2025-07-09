import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/signup', form, {
        withCredentials: true,
      });
      toast.success('Signup successful! Check your email to verify your account.');
    } catch (err) {
      console.log('❌ Signup Error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
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
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="http://localhost:8080/auth/login/google"
            className="inline-block w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Continue with Google
          </a>
        </div>

        <div className="text-center mt-4 text-sm text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
