import React, { useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const ReviewItem = ({ review, movieId, userId, onChange }) => {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(
        `http://localhost:8080/movies/${movieId}/review/${review._id}`
      );
      onChange();
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.error || 'Failed to delete review');
    }
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
    <div className="border border-gray-200 p-4 rounded bg-white shadow">
      <p className="mb-1">{review.comment}</p>
      <p className="text-yellow-600 text-sm mb-2">⭐ {review.rating}</p>

      {review.user === userId && (
        <div className="flex gap-3 text-sm">
          <button onClick={() => setEditing(true)} className="text-blue-500">
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
