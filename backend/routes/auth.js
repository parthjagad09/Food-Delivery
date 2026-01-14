// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashed });
//   res.json(user);
// });

// // router.post('/login', async (req, res) => {
// //   const user = await User.findOne({ email: req.body.email });
// //   if (!user) return res.status(400).json({ msg: 'Invalid' });

// //   const match = await bcrypt.compare(req.body.password, user.password);
// //   if (!match) return res.status(400).json({ msg: 'Invalid' });

// //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
// //   res.json({ token });
// // });
// // backend/routes/auth.js
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // 1. Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // 2. Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     // 3. Generate Token (Ensure JWT_SECRET is in your .env)
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// module.exports = router;

// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // REMOVED: const hashed = await bcrypt.hash(password, 10);
    // Just pass the plain password; the pre-save hook in User.js handles hashing!
    const user = await User.create({ name, email, password });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
// backend/routes/auth.js
router.post('/admin-login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    // Strictly check the database flag you set in Atlas
    if (user && user.isAdmin) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } else {
        res.status(403).json({ success: false, message: "Unauthorized Access" });
    }
});
module.exports = router;