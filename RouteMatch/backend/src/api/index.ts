import express from 'express';
import rideRoutes from './rideRoutes'; // Import ride-related routes

const router = express.Router();

// Set up API routes
router.use('/rides', rideRoutes); // Mount ride routes under /rides

// Export the router
export default router;