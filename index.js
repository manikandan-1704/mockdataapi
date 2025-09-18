const express = require('express');
const app = express();
const PORT = 3000;

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

// Basic route
app.get('/', (req, res) => {
  res.send('MockDataAPI is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
