import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.*@.*\..*/, "Please fill a valid email address"],
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    registerType: {
        type: String,
        enum: ["normal", "google"],
        default: "normal",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
    },
    socialId: {
        type: String,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});
UserSchema.pre("save", async function() {
    if ((this.password && this.isNew) || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});
const User = mongoose.model("User", UserSchema);
export default User;