import { Router } from "express";
const router = Router();
import Movie from "../models/movie.model.js";
import ReviewRouter from './routers/review.js'
// POST /movie
router.post('/', async (req, res) => {
  try {
    const { title, posterURL, content, year } = req.body;

    const newMovie = new Movie({ title, posterURL, content, year});
    const savedMovie = await newMovie.save();

    res.status(201).json({
      message: 'Movie added successfully',
      data: savedMovie,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /movie
router.get('/', async (req, res) => {  
  try {
    const movies = await Movie.find();
    res.status(200).json({
      message: 'Movies fetched successfully',
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use('/:postId/review', reviewRouter)

router.post('/movie/:id')
export default router