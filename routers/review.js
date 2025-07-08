import { Router } from "express";
import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import mongoose from "mongoose";
const router = Router({ mergeParams: true });

const updateMovieAverageRating = async (movieId) => {
  const result = await Review.aggregate([
    { $match: { movie: new mongoose.Types.ObjectId(movieId) } },
    {
      $group: {
        _id: "$movie",
        averageRating: { $avg: "$rating" }
      }
    }
  ]);

  const avg = result[0]?.averageRating || 0;
  await Movie.findByIdAndUpdate(movieId, { averageRating: avg });
};

/**
 * GET /posts/:postId/Reviews
 * Get all Reviews for a specific post
 */
router.get('/', async (req, res) => {
  try {
    const { movieId } = req.params;
    /*const Reviews = await Review.find({ post: postId });
    res.json(Reviews);*/
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const reviews = await Review.find({ movie: movieId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Review.countDocuments({ movie: movieId });

    res.json({ reviews, total, page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * movie /movies/:movieId/Reviews
 * Create a new Review for a movie
 */
router.post('/', async (req, res) => {
  const { movieId } = req.params;
  const { user, comment, rating } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ error: 'movie not found' });
    const newReview = new Review({ user, comment, rating, movie: movieId });
    const savedReview = await newReview.save();
    // Optional: push Review reference to movie.Reviews array
    movie.reviews.push(savedReview._id);
    await movie.save();
    await updateMovieAverageRating(movieId);
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /movies/:movieId/Reviews/:ReviewId
 * Update a Review
 */
router.put('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { comment, rating } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { comment, rating },
      { new: true }
    );

    if (!updatedReview) return res.status(404).json({ error: 'Review not found' });

    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /movies/:movieId/Reviews/:ReviewId
 * Delete a Review
 */
router.delete('/:reviewId', async (req, res) => {
  const { reviewId, movieId } = req.params;

  try {
    const deleted = await Review.findByIdAndDelete(reviewId);

    if (!deleted) return res.status(404).json({ error: 'Review not found' });

    // Optional: remove from movie.Reviews array
    await Movie.findByIdAndUpdate(movieId, {
      $pull: { Reviews: reviewId }
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
