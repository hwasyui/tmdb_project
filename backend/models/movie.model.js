import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  posterURL: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  director: {
    type: String,
  },
  genres: {
    type: [String], 
    default: [],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, {
  timestamps: true,
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
