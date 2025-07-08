import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/movieSlice';

const SearchBar = () => {
const dispatch = useDispatch();

const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
};
return (
        <Input.Search
        placeholder="Search movies..."
        onChange={handleSearch}
        style={{ marginBottom: '1rem' }}
        />
);
};

export default SearchBar;