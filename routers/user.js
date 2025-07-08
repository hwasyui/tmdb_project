import { Router } from "express";
const router = Router();
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import passport from "../config/passport.js";
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import Review from "../models/review.model.js";
dotenv.config()


// POST /User
router.post('/', async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const newUser = new User({ username, email, password, isAdmin});
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User added successfully',
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /User
router.get('/', async (req, res) => {  
  try {
    
    const Users = await User.find().populate('reviews');
    
    res.status(200).json({
      message: 'Users fetched successfully',
      data: Users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /User/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('reviews');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User fetched successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE /user/:userId
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ error: 'user not found' });

    // Optional: delete all reviews associated with this user
    await Review.deleteMany({ user: userId });

    res.status(200).json({ message: 'user deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /user/:userId
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, isAdmin } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password, isAdmin },
      { new: true, runValidators: true  }
    );

    if (!updatedUser) return res.status(404).json({ error: 'user not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// TRANSPORTER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,           
        pass: process.env.GOOGLE_APP_PASSWORD,  
    },
});


// AUTHENTICATION
router.post('/signup', async (req, res) => {
    // Mengambil data dari body
    const {email, username, password} = req.body;
    const verificationCode = uuidv4();

    try {
        const user = await User.create({
            username,
            email,
            password,
            verificationCode,
            isVerified: false
        });

        const verifyLink = `${process.env.URL}/auth/signup/${verificationCode}`;

        // Kirim email setelah user berhasil dibuat
        await transporter.sendMail({
            from: process.env.EMAIL, 
            to: email,
            subject: 'Verify Your Account!',
            text: `Hi ${username},\n\nThank you for signing up. We're glad to have you!\nClick this link to verify your account: ${verifyLink}\n\nRegards,\nYour Team`,
        });

        res.status(201).json({
            success: true,
            message: 'User registered and email sent',
            user,
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})

router.get('/signup/:generatedCode', async (req, res) => {
  const { generatedCode } = req.params;

  const user = await User.findOne({ verificationCode: generatedCode });

  if(!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  if(user.isVerified) {
    return res.status(400).json({ error: 'User already verified, You can login now' });
  }

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.status(200).send('Email verified, you can now login');

})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info?.message || 'Login failed' });
        if(!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });

        // Generate JWT
        const _id = user._id;
        const payload = { _id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.cookie('token', token);
        res.json({
            message: 'login success!'
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    res.cookie('token', null, {maxAge: 0,});
    res.json({ message: 'logout success!' });
});

router.get("/login/google", passport.authenticate("google", {scope: ["email", "profile"]}));

router.get("/login/google/callback", 
    passport.authenticate(
        "google", 
        {session: false}), 
        (req, res) => {
            let token = null
            if (req.user) {
                const payload = { _id: req.user._id };
                token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
                res.cookie('jwt', token);
                res.redirect('http://localhost:3000/movies');
            } else {
                res.json({message: 'Login failed'})
            }
        }
    );
export default router