import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';

const dummyUserId = '686cefb2a0a9f80e562a90de';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  if (!movie) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{movie.year}</p>
      <img src={movie.posterURL} alt={movie.title} className="w-[300px] mb-4" />
      <p className="mb-6">{movie.content}</p>
      <p className="text-yellow-600 font-semibold">⭐ {movie.averageRating?.toFixed(1) || '-'}</p>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>

      <ReviewForm movieId={id} userId={dummyUserId} onSuccess={handleRefresh} />

      <div className="space-y-4 mt-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <ReviewItem key={r._id} review={r} movieId={id} userId={dummyUserId} onChange={handleRefresh} />
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
