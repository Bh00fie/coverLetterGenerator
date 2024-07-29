const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered' }); // Send JSON response
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ error: 'Error registering user', details: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
});

module.exports = router;
