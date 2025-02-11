import pool from '../config/db.js';

// Book a seat
export const bookSeat = async (req, res) => {
  const { train_id } = req.body;
  const user_id = req.user.id;

  const result = await pool.query('SELECT * FROM trains WHERE id = $1 FOR UPDATE', [train_id]);
  const train = result.rows[0];

  if (train.available_seats <= 0) {
    return res.status(400).json({ message: 'No available seats' });
  }

  await pool.query('BEGIN');
  await pool.query('UPDATE trains SET available_seats = available_seats - 1 WHERE id = $1', [train_id]);

  const bookingResult = await pool.query(
    'INSERT INTO bookings (train_id, user_id) VALUES ($1, $2) RETURNING *',
    [train_id, user_id]
  );

  await pool.query('COMMIT');

  res.status(201).json({ booking: bookingResult.rows[0] });
};

// Get specific booking details
export const getBookingDetails = async (req, res) => {
  const { booking_id } = req.params;

  const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [booking_id]);

  if (!result.rows.length) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.json({ booking: result.rows[0] });
};
