import express from 'express';
import { bookSeat, getBookingDetails } from '../controllers/bookingController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', authenticateJWT, bookSeat);
router.get('/booking/:booking_id', authenticateJWT, getBookingDetails);

export default router;
