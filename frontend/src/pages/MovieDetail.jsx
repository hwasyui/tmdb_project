import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalf) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-600" />);
        }

        return stars;
    };

    if (!movie) return <div className="p-6 text-white">Loading...</div>;

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-12 gap-8">
                {/* Poster */}
                <div className="flex-shrink-0">
                    <img
                        src={movie.posterURL}
                        alt={movie.title}
                        className="rounded-lg shadow-lg w-[200px] lg:w-[250px] object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">
                        {movie.title}{' '}
                        <span className="text-gray-400 text-2xl">({movie.year})</span>
                    </h1>
                    <p className="text-sm text-gray-400 mb-4">
                        Directed by <span className="text-white">{movie.director}</span>
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map((genre, idx) => (
                            <span key={idx} className="bg-gray-800 text-sm px-3 py-1 rounded-full">
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-xl">
                            {renderStars(movie.averageRating || 0)}
                        </div>
                        <span className="text-yellow-400 font-semibold">
                            {movie.averageRating?.toFixed(1) || '0.0'}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="italic text-gray-300">{movie.content}</p>
                </div>
            </div>

            {/* Reviews */}
            <div className="max-w-4xl mx-auto px-6 pb-20">
                <hr className="border-gray-700 my-8" />
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <ReviewForm movieId={id} userId={dummyUserId} onSuccess={handleRefresh} />
                <div className="space-y-4 mt-6">
                    {reviews.length > 0 ? (
                        reviews.map((r) => (
                            <ReviewItem
                                key={r._id}
                                review={r}
                                movieId={id}
                                userId={dummyUserId} // FIXED typo from uuserId
                                onChange={handleRefresh}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
