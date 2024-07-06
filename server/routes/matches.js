const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const User = require('../models/User');

// Get user matches
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('matches');
    res.status(200).json(user.matches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a match
router.post('/', async (req, res) => {
  const { userId } = req.body;
  try {
    const match = new Match({ user1: req.user.id, user2: userId });
    await match.save();
    res.status(201).send('Match created successfully');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
