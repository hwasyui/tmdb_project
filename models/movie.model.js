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
        required: true,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // This array stores ObjectIds of associated Reviews
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;