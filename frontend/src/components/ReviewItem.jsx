import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ReviewItem = ({ review, movieId, userId, onChange }) => {
  const [editing, setEditing] = useState(false);

  const confirmDelete = () => {
    return new Promise((resolve, reject) => {
      toast((t) => (
        <span className="flex flex-col space-y-2">
          <span className="text-sm font-semibold">Are you sure you want to delete this review?</span>
          <div className="flex gap-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                reject();
              }}
              className="bg-gray-300 text-black px-3 py-1 rounded text-sm"
            >
              No
            </button>
          </div>
        </span>
      ), { duration: Infinity });
    });
  };

  const handleDelete = async () => {
    try {
      await confirmDelete();
      await axios.delete(`http://localhost:8080/movies/${movieId}/review/${review._id}`);
      toast.success('Review deleted!');
      onChange();
    } catch (err) {
      if (err) {
        console.error('Delete error:', err);
        toast.error(err.response?.data?.error || 'Failed to delete review');
      }
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {half && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-400" />
        ))}
      </>
    );
  };

  if (editing) {
    return (
      <ReviewForm
        movieId={movieId}
        userId={userId}
        reviewToEdit={review}
        onSuccess={() => {
          setEditing(false);
          onChange();
        }}
      />
    );
  }

  return (
    <div className="border border-white p-4 rounded bg-zinc-900 text-white shadow">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold">{review.user?.username || 'Anonymous'}</p>
        <div className="flex items-center gap-1 text-sm">
          {renderStars(review.rating)}
          <span className="ml-2 text-yellow-400 font-medium">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-gray-300 mb-2">{review.comment}</p>

      {userId && review.user && review.user._id?.toString() === userId && (
  <div className="flex gap-3 text-sm mt-2">
    <button onClick={() => setEditing(true)} className="text-blue-400 hover:underline">
      Edit
    </button>
    <button onClick={handleDelete} className="text-red-400 hover:underline">
      Delete
    </button>
  </div>
)}
    </div>
  );
};

export default ReviewItem;
