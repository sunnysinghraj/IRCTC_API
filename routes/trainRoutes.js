import express from 'express';
import { addTrain, getTrains,getTrainById } from '../controllers/trainController.js';
import authenticateJWT from '../middleware/authMiddleware.js';
import checkAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/add', authenticateJWT, checkAdmin, addTrain);
router.get('/', getTrains);
router.get('/api/trains/:trainId', getTrainById);

export default router;
