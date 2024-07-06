const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const { branch, year } = req.query;
  try {
    const users = await User.find({ branch, year });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
