const express = require('express');
const router = express.Router();
const roles = require('../data/roles');

// GET all roles with optional filters and pagination
router.get('/', (req, res) => {
  try {
    let result = [...roles];

    // Extract query parameters
    const { status, name, page, limit } = req.query;

    if (status) {
      result = result.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    if (name) {
      result = result.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No results found' });
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

// GET single role by ID
router.get('/:id', (req, res) => {
  try {
    const role = roles.find(r => r.id === parseInt(req.params.id));
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new role (simulated)
router.post('/', (req, res) => {
  try {
    const newRole = {
      id: roles.length + 1,
      status: req.body.status || 'active',
      permissions: req.body.permissions || [],
      ...req.body
    };
    res.status(201).json({ message: 'Role Created Successfully', data: newRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT/PATCH update role (simulated)
router.put('/:id', (req, res) => {
  try {
    const role = roles.find(r => r.id === parseInt(req.params.id));
    if (!role) return res.status(404).json({ error: 'Role not found' });

    const updatedRole = { ...role, ...req.body };
    res.json({ message: 'Role Updated Successfully', data: updatedRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const role = roles.find(r => r.id === parseInt(req.params.id));
    if (!role) return res.status(404).json({ error: 'Role not found' });

    const updatedRole = { ...role, ...req.body };
    res.json({ message: 'Role Updated Successfully', data: updatedRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE role (simulated)
router.delete('/:id', (req, res) => {
  try {
    const role = roles.find(r => r.id === parseInt(req.params.id));
    if (!role) return res.status(404).json({ error: 'Role not found' });

    res.json({ message: 'Role Deleted Successfully', data: role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
