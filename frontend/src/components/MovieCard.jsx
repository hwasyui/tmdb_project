import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie, index }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col w-[220px]"
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      {/* Poster */}
      <img
        src={movie.posterURL}
        alt={movie.title}
        className="w-full h-[330px] object-cover rounded-t-xl"
      />

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col gap-1">
        {/* Rating with blue star */}
        <div className="flex items-center gap-1 text-blue-400 text-sm">
          <FaStar />
          <span>{movie.averageRating?.toFixed(1) || '-'}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-tight">
          {index !== undefined ? `${index + 1}. ` : ''}{movie.title}
        </h3>

        {/* Director */}
        <p className="text-xs text-gray-400">Directed by {movie.director}</p>

        {/* Year */}
        <p className="text-xs text-gray-400">{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
