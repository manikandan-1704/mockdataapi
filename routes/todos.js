const express = require('express');
const router = express.Router();
const todos = require('../data/todos');

// GET all todos with optional filters and pagination
router.get('/', (req, res) => {
  try {
    let result = [...todos];

    // Extract query parameters
    const { status, priority, userId, title, page, limit } = req.query;

    if (status) {
      result = result.filter(t => t.status.toLowerCase() === status.toLowerCase());
    }
    if (priority) {
      result = result.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
    }
    if (userId) {
      result = result.filter(t => t.userId === parseInt(userId));
    }
    if (title) {
      result = result.filter(t => t.title.toLowerCase().includes(title.toLowerCase()));
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

// GET single todo by ID
router.get('/:id', (req, res) => {
  try {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new todo (simulated)
router.post('/', (req, res) => {
  try {
    const newTodo = {
      id: todos.length + 1,
      status: req.body.status || 'pending',
      priority: req.body.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...req.body
    };
    res.status(201).json({ message: 'Todo Created Successfully', data: newTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT/PATCH update todo (simulated)
router.put('/:id', (req, res) => {
  try {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const updatedTodo = { ...todo, ...req.body, updatedAt: new Date().toISOString() };
    res.json({ message: 'Todo Updated Successfully', data: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const updatedTodo = { ...todo, ...req.body, updatedAt: new Date().toISOString() };
    res.json({ message: 'Todo Updated Successfully', data: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE todo (simulated)
router.delete('/:id', (req, res) => {
  try {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json({ message: 'Todo Deleted Successfully', data: todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
