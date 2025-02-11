import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = 5000;
app.listen(PORT, async () => {
  await pool.query('SELECT 1'); // Ensure the database is connected
  console.log(`✅ Server is running on port ${PORT}`);
});
