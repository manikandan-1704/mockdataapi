const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('MockDataAPI is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
