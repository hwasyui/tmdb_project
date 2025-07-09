import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const fetchUser = async () => {
  try {
    const res = await axios.get('http://localhost:8080/auth/current_user', {
      withCredentials: true,
    });
    console.log('[fetchUser] Authenticated user:', res.data.user);
    setUser(res.data.user);
  } catch (err) {
    console.log('[fetchUser] No authenticated user');
    setUser(null);
  }
};

const logout = async () => {
  try {
    await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
    console.log('[logout] Logged out successfully');
    setUser(null);
    window.location.reload();
  } catch (err) {
    console.error('[logout] Logout error:', err);
  }
};

useEffect(() => {
  console.log('[AuthContext] user:', user);
}, [user]);
useEffect(() => {
  fetchUser(); // this will run on mount
}, []);

useEffect(() => {
  if (user === null) {
    fetchUser(); // recheck when user becomes null
  }
}, [user]);
  return (
    <AuthContext.Provider value={{ user, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
