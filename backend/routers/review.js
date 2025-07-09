import { Router } from "express";
import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";
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

// GET
router.get('/', async (req, res) => {
  try {
    const { movieId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const reviews = await Review.find({ movie: movieId })
    .populate('user', 'username') 
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Review.countDocuments({ movie: movieId });

    res.json({ reviews, total, page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  const { movieId } = req.params;
  const { comment, rating, user } = req.body; // ⬅️ change this

  if (!comment) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ error: 'movie not found' });

    const newReview = new Review({ 
      user, 
      comment, 
      rating, 
      movie: movieId 
    });

    const savedReview = await newReview.save();

    movie.reviews.push(savedReview._id);
    await movie.save();

    const userDoc = await User.findById(user);
    if (userDoc) {
      userDoc.reviews.push(savedReview._id);
      await userDoc.save();
    }

    await updateMovieAverageRating(movieId);

    // 👇 Optional: return populated user info
    const populatedReview = await savedReview.populate('user', 'username');
    res.status(201).json(populatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// PUT
router.put('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { movieId } = req.params;
  const { comment, rating } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { comment, rating },
      { new: true }
    );

    if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
    await updateMovieAverageRating(movieId);
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:reviewId', async (req, res) => {
  const { reviewId, movieId } = req.params;

  try {
    const deleted = await Review.findByIdAndDelete(reviewId);

    if (!deleted) return res.status(404).json({ error: 'Review not found' });

    await Movie.findByIdAndUpdate(movieId, {
      $pull: { Reviews: reviewId }
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
