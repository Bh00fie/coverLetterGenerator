// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Accepts either "Authorization: Bearer <token>" or a bare token
const authMiddleware = async (req, res, next) => {
    const header = req.header('Authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    if (!token) return res.status(401).json({ error: 'Access denied' });

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    try {
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ error: 'User no longer exists' });
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authMiddleware;
