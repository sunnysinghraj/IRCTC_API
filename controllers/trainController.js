import pool from '../config/db.js';

// Add a train (Admin only)
export const addTrain = async (req, res) => {
  const { train_name, source, destination, sourceStationTime, destStationTime, total_seats, available_seats, ticket_price } = req.body;

  // Basic validation for required fields
  if (!train_name || !source || !destination || !sourceStationTime || !destStationTime || !total_seats || !available_seats || !ticket_price) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check for valid seat and price numbers
  if (isNaN(total_seats) || isNaN(available_seats) || isNaN(ticket_price)) {
    return res.status(400).json({ message: 'Seats available, total seats, and ticket price must be numbers.' });
  }

  // Check for valid time format (simple check for 24-hour format)
  if (!/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(sourceStationTime) || !/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(destStationTime)) {
    return res.status(400).json({ message: 'Invalid time format. Use HH:MM (24-hour format).' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO trains (train_name, source, destination, sourceStationTime, destStationTime, total_seats, available_seats, ticketPrice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [train_name, source, destination, sourceStationTime, destStationTime, total_seats, available_seats, ticket_price]
    );

    res.status(201).json({
      message: 'Train added successfully',
      train: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding train:', error);
    res.status(500).json({ message: 'Server error. Could not add train.' });
  }
};

// Get all trains between source and destination
export const getTrains = async (req, res) => {
  const { source, destination } = req.query;

  if (!source || !destination) {
    return res.status(400).json({ message: 'Both source and destination are required.' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM trains WHERE source = $1 AND destination = $2',
      [source, destination]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No trains found between the specified source and destination.' });
    }

    res.json({ trains: result.rows });
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ message: 'Server error. Could not retrieve trains.' });
  }
};

// Get a specific train by ID
export const getTrainById = async (req, res) => {
  const { trainId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM trains WHERE id = $1',
      [trainId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.json({ train: result.rows[0] });
  } catch (error) {
    console.error('Error getting train by ID:', error);
    res.status(500).json({ message: 'Server error. Could not retrieve train.' });
  }
};
