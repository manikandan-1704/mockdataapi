const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Get all users
router.get('/', (req, res) => {
  try {
    let result = [...users];

    // Extract query parameters
    const { status, roleId, city, name, username, email, page, limit } = req.query;

    if (status) {
      result = result.filter(u => u.status.toLowerCase() === status.toLowerCase());
    }
    if (roleId) {
      result = result.filter(u => u.roleId === parseInt(roleId));
    }
    if (city) {
      result = result.filter(u => u.address.city.toLowerCase() === city.toLowerCase());
    }
    if (name) {
      result = result.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (username) {
      result = result.filter(u => u.username.toLowerCase().includes(username.toLowerCase()));
    }
    if (email) {
      result = result.filter(u => u.email.toLowerCase().includes(email.toLowerCase()));
    }

    if (result.length === 0) {
      return res.status(200).json({ message: 'No results found' });
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedResult = result.slice(startIndex, endIndex);

    res.json({
      page: pageNum,
      limit: pageSize,
      totalResults: result.length,
      results: paginatedResult
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get single user by ID
router.get('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new user
router.post('/', (req, res) => {
  try {
    const newUser = {
      id: users.length + 1,
      roleId: req.body.roleId || 4,
      status: req.body.status || 'active',
      ...req.body
    };
    res.status(201).json({ message: 'User Created Successfully', data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user
router.put('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedUser = { ...user, ...req.body };
    res.json({ message: 'User Updated Successfully', data: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User Deleted Successfully', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
