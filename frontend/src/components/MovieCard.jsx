import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 cursor-pointer flex flex-col w-[220px]"
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      <img
        src={movie.posterURL}
        alt={movie.title}
        className="w-full h-[330px] object-cover rounded-t-xl"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-md truncate">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.year}</p>
        </div>
        <p className="text-yellow-600 text-sm mt-2">⭐ {movie.averageRating || '-'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
