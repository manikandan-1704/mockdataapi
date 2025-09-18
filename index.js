const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');

// Routes
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('MockDataAPI is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
