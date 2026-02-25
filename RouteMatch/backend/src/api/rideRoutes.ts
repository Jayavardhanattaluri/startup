import express from 'express';
import RideController from '../controllers/RideController';

const router = express.Router();

router.get('/', (req, res) => RideController.getRides(req, res));
router.get('/available', (req, res) => RideController.getAvailableRides(req, res));
router.get('/:id', (req, res) => RideController.getRideById(req, res));
router.post('/', (req, res) => RideController.createRide(req, res));
router.post('/match', (req, res) => RideController.matchRide(req, res));
router.patch('/:id', (req, res) => RideController.updateRide(req, res));
router.delete('/:id', (req, res) => RideController.deleteRide(req, res));

export default router;
