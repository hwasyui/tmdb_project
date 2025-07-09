import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { FcClapperboard } from "react-icons/fc";


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/movies', {
        params: { keyword, page, pageSize: 10 },
      });
      setMovies(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-10">
        <h1 className="text-3xl font-bold mb-6 text-center"><FcClapperboard className="inline-block mr-2" /> Movie Collection</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <div
                key={movie._id}
                className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <MovieCard movie={movie} index={(page - 1) * 10 + index} />
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && (
        <div className="flex justify-center pb-10">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="space-x-2"
            renderPage={(pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`px-4 py-2 rounded-md transition-all duration-200
                  ${pg === page
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-gray-800 text-white hover:bg-gray-600'
                  }`}
              >
                {pg}
              </button>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
