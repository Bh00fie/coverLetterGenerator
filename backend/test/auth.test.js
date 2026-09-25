const { describe, test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'test-secret';
const User = require('../models/User');
const authRoutes = require('../routes/auth');
const authMiddleware = require('../middleware/authMiddleware');

// Stub the database layer so the routes can be tested without MongoDB
const users = new Map();
User.prototype.save = async function () {
    if (users.has(this.email)) throw Object.assign(new Error('dup'), { code: 11000 });
    this.password = await bcrypt.hash(this.password, 4);
    users.set(this.email, this);
    return this;
};
User.findOne = async ({ email }) => users.get(email) || null;
User.findById = async (id) => [...users.values()].find((u) => String(u._id) === String(id)) || null;

describe('auth routes', () => {
    let server;
    let base;
    before(async () => {
        const app = express();
        app.use(express.json());
        app.use('/api/auth', authRoutes);
        app.get('/protected', authMiddleware, (req, res) => res.json({ email: req.user.email }));
        server = app.listen(0);
        await new Promise((resolve) => server.once('listening', resolve));
        base = `http://127.0.0.1:${server.address().port}`;
    });
    after(() => {
        server.closeAllConnections();
        server.close();
    });
    beforeEach(() => users.clear());

    const post = (path, body) =>
        fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

    test('registers, rejects duplicates case-insensitively, and logs in', async () => {
        assert.strictEqual((await post('/api/auth/register', { email: 'A@x.com', password: 'password1' })).status, 201);
        assert.strictEqual((await post('/api/auth/register', { email: 'a@x.com ', password: 'password1' })).status, 409);

        const res = await post('/api/auth/login', { email: 'a@X.com', password: 'password1' });
        assert.strictEqual(res.status, 200);
        const { token } = await res.json();
        assert.strictEqual(jwt.verify(token, 'test-secret').email, 'a@x.com');

        const me = await fetch(base + '/protected', { headers: { Authorization: `Bearer ${token}` } });
        assert.deepStrictEqual(await me.json(), { email: 'a@x.com' });
    });

    test('rejects bad input and wrong credentials', async () => {
        assert.strictEqual((await post('/api/auth/register', { email: 'a@x.com' })).status, 400);
        assert.strictEqual((await post('/api/auth/register', { email: 'a@x.com', password: 'short' })).status, 400);
        assert.strictEqual((await post('/api/auth/login', { email: 'nobody@x.com', password: 'password1' })).status, 401);

        await post('/api/auth/register', { email: 'a@x.com', password: 'password1' });
        assert.strictEqual((await post('/api/auth/login', { email: 'a@x.com', password: 'wrongpass' })).status, 401);
    });

    test('protected route rejects missing and invalid tokens', async () => {
        assert.strictEqual((await fetch(base + '/protected')).status, 401);
        const bad = await fetch(base + '/protected', { headers: { Authorization: 'Bearer nope' } });
        assert.strictEqual(bad.status, 401);
    });
});
