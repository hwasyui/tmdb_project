import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ movieId, userId, reviewToEdit, onSuccess }) => {
  const [comment, setComment] = useState(reviewToEdit?.comment || '');
  const [rating, setRating] = useState(reviewToEdit?.rating || 1);
  const [editing, setEditing] = useState(!!reviewToEdit);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8080/movies/${movieId}/review/${reviewToEdit._id}`,
          { comment, rating, user: userId }
        );
      } else {
        await axios.post(
          `http://localhost:8080/movies/${movieId}/review`,
          { comment, rating, user: userId }
        );
      }

      setComment('');
      setRating(1);
      setEditing(false);
      onSuccess();
    } catch (err) {
      console.error('Review form error:', err);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        required
        className="w-full border border-gray-300 p-2 rounded"
      />
      <div className="flex items-center space-x-2">
        <label>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-1 rounded"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          {editing ? 'Update' : 'Add'} Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
