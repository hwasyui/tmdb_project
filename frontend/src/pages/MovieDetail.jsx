import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ← Tambah useNavigate
import axios from 'axios';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ← Gunakan navigate
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`http://localhost:8080/movies/${id}`);
      setMovie(res.data.data);
    };

    const fetchReviews = async () => {
      const res = await axios.get(`http://localhost:8080/movies/${id}/review`);
      setReviews(res.data.reviews);
    };

    fetchMovie();
    fetchReviews();
  }, [id, refresh]);

  const handleRefresh = () => setRefresh(!refresh);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {half && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-600" />
        ))}
      </>
    );
  };

  if (!movie) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen pt-28">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition mb-2"
        >
          ← Back
        </button>
      </div>

      {/* Movie Info Section */}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-8 gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 shadow-lg rounded-xl overflow-hidden">
          <img
            src={movie.posterURL}
            alt={movie.title}
            className="w-full lg:w-[260px] h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            {movie.title}{' '}
            <span className="text-gray-400 text-2xl font-light">({movie.year})</span>
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            Directed by <span className="text-white font-medium">{movie.director}</span>
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre, idx) => (
              <span
                key={idx}
                className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-700 transition"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-xl">{renderStars(movie.averageRating || 0)}</div>
            <span className="text-yellow-400 font-semibold">
              {movie.averageRating?.toFixed(1) || '0.0'}
            </span>
          </div>

          {/* Description */}
          <p className="italic text-gray-300 leading-relaxed">{movie.content}</p>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-zinc-900 rounded-t-3xl px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">📝 Reviews</h2>

        {/* Review Form */}
        {user && (
          <div className="mb-6">
            <ReviewForm movieId={id} userId={user._id} onSuccess={handleRefresh} />
          </div>
        )}

        {/* Review List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <ReviewItem
                key={r._id}
                review={r}
                movieId={id}
                userId={user?._id}
                onChange={handleRefresh}
              />
            ))
          ) : (
            <p className="text-gray-400 italic">No reviews yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
