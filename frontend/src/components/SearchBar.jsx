import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4 width-full">
      <input
        type="text"
        placeholder="Search movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-yellow-400 p-3 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 rounded-r-md text-white px-6 rounded-r-m"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
