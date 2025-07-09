import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie, index }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="w-full h-[330px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-300 rounded-t-xl"></div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow">
          <FaStar className="text-yellow-400" />
          <span>{movie.averageRating?.toFixed(1) || '-'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        <h3 className="text-white text-sm font-semibold leading-tight">
          {/* {index !== undefined ? `${index + 1}. ` : ''} */}
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400">🎬 Directed by {movie.director}</p>
        <p className="text-xs text-gray-500">📅 {movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
