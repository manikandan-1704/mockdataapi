const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../data/users');

const ACCESS_SECRET = 'mockaccesssecret';
const REFRESH_SECRET = 'mockrefreshsecret';
const TOKEN_EXPIRY = '15m'; // access token expires in 15 minutes
const REFRESH_EXPIRY = '7d'; // refresh token expires in 7 days

// In-memory refresh tokens (since no DB)
let refreshTokens = [];

// LOGIN
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const inactive = user.status === 'inactive';
    if (inactive) return res.status(403).json({ error: 'Account is inactive' });

    const accessToken = jwt.sign({ id: user.id, email: user.email, roleId: user.roleId }, ACCESS_SECRET, { expiresIn: TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });

    refreshTokens.push(refreshToken);

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        status: user.status,
        image: user.image
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// REFRESH TOKEN
router.post('/refresh', (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'Refresh token required' });
    if (!refreshTokens.includes(token)) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(token, REFRESH_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });

      const accessToken = jwt.sign({ id: userData.id, email: userData.email }, ACCESS_SECRET, { expiresIn: TOKEN_EXPIRY });
      res.json({ accessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  try {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route example
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, ACCESS_SECRET, (err, userData) => {
    if (err) return res.status(403).json({ error: 'Invalid access token' });
    const user = users.find(u => u.id === userData.id);
    res.json({ id: user.id, name: user.name, email: user.email, roleId: user.roleId, status: user.status, image: user.image });
  });
});

module.exports = router;
