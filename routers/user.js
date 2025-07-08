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
    const Users = await User.find();
    res.status(200).json({
      message: 'Users fetched successfully',
      data: Users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router