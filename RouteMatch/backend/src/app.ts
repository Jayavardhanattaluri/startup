import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './api/index';
import { initializeFirebase } from './config/firebase';
import { initializeMapbox } from './config/mapbox';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Firebase and Mapbox
initializeFirebase();
initializeMapbox();

// API Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;