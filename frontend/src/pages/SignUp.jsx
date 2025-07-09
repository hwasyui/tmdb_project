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
        console.log('❌ Signup Error:', err.response?.data); // <- add this
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
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

        <div className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
