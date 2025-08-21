import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';

// Connect to the database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));