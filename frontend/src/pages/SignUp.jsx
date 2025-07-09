import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

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
      console.error('❌ Signup Error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 px-4 pt-28">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-xl shadow-2xl border border-zinc-700">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-yellow-400">Create an Account</h1>
          <p className="text-zinc-400 text-sm mt-1">Join us and start your journey</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <a
            href="http://localhost:8080/auth/login/google"
            className="flex items-center justify-center w-full bg-white text-black font-medium px-4 py-2 rounded-md hover:bg-zinc-100 transition duration-200"
          >
            <FcGoogle className="text-xl mr-2" />
            Continue with Google
          </a>
        </div>

        <div className="text-center mt-6 text-sm text-zinc-400">
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
