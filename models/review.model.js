import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Ensure every review has user
        index: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
        index: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;