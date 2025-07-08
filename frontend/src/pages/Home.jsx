import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:8080/movies', {
        params: { keyword, page, pageSize: 10 },
      });
      setMovies(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [keyword, page]);

  useEffect(() => {
    const handleSearchEvent = (e) => {
      setPage(1);
      setKeyword(e.detail);
    };

    window.addEventListener('triggerSearch', handleSearchEvent);
    return () => {
      window.removeEventListener('triggerSearch', handleSearchEvent);
    };
  }, []);

  return (
    <div className='bg-black'>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={movie._id} movie={movie} index={(page - 1) * 10 + index} />
          ))}
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Home;
