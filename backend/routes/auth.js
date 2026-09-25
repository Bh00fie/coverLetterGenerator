const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

const MIN_PASSWORD_LENGTH = 8;

// Returns normalized credentials, or null if either is missing
function readCredentials(body = {}) {
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    return email && password ? { email, password } : null;
}

// Register Route
router.post('/register', async (req, res) => {
    const credentials = readCredentials(req.body);
    if (!credentials) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    if (credentials.password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }
    try {
        const user = new User(credentials);
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'An account with this email already exists' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const credentials = readCredentials(req.body);
    if (!credentials) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email: credentials.email });
        if (!user || !(await user.comparePassword(credentials.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
