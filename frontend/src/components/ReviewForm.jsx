import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
const ReviewForm = ({ movieId, userId, reviewToEdit, onSuccess }) => {
  const [comment, setComment] = useState(reviewToEdit?.comment || '');
  const [rating, setRating] = useState(reviewToEdit?.rating || 1);
  const [hover, setHover] = useState(null);
  const [editing, setEditing] = useState(!!reviewToEdit);
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8080/movies/${movieId}/review/${reviewToEdit._id}`,
          { comment, rating, user: user?._id }
        );
      } else {
        await axios.post(
          `http://localhost:8080/movies/${movieId}/review`,
          { comment, rating, user: user?._id }
        );
      }

      setComment('');
      setRating(1);
      setHover(null);
      setEditing(false);
      onSuccess();
    } catch (err) {
      console.error('Review form error:', err);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-zinc-900 text-white p-4 rounded shadow">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        required
        className="w-full bg-zinc-800 border border-gray-600 p-2 rounded text-white"
      />

      {/* Star Rating Selection */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium">Your Rating:</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <FaStar
                className={`text-xl ${
                  (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold"
      >
        {editing ? 'Update Review' : 'Add Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
