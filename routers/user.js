import { Router } from "express";
const router = Router();
import User from "../models/user.model.js";
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
export default router