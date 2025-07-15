const express = require('express');
const cors = require('cors');  // Import cors

const app = express();

app.use(cors());  // Use cors middleware for all routes

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(3001, () => {
  console.log('API running on port 3001');
});
