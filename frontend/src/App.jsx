// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/NavBar';
import { Toaster, toast } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/SignUp';
const Layout = ({ children }) => {
  const location = useLocation();

  const handleSearch = (input) => {
    if (location.pathname !== '/') {
      toast.error('Search is only available on the homepage!');
    } else {
      // Custom event to pass search to Home component
      const searchEvent = new CustomEvent('triggerSearch', { detail: input });
      window.dispatchEvent(searchEvent);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Toaster position="top-right" />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
