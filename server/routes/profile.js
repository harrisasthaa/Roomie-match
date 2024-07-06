const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.single('photo'), async (req, res) => {
  const { name, year, branch, age, description } = req.body;
  const photo = req.file ? req.file.path : null;
  try {
    const updatedProfile = await User.findByIdAndUpdate(
      req.user.id,
      { name, year, branch, age, description, photo },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
