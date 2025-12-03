const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 7000;
const path = require('path');

const { logger, getStats } = require('./middleware/logging');

app.use(cors());
app.use(logger);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Middleware to parse JSON
app.use(express.json());

const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

// Routes
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

// API Stats
app.get('/api-stats', (req, res) => {
  res.json(getStats());
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    status: true,
    message: "Hello, welcome to Mock API 🚀"
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
