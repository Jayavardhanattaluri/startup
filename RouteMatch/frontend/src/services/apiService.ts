// apiService.ts
import axios from 'axios';

// Create an instance of axios with default settings
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL for the backend API
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});

// Function to get available rides
export const getAvailableRides = async () => {
    try {
        const response = await apiClient.get('/rides/available');
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching available rides:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Function to create a new ride
export const createRide = async (rideData) => {
    try {
        const response = await apiClient.post('/rides', rideData);
        return response.data; // Return the created ride data
    } catch (error) {
        console.error('Error creating ride:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Function to get ride details by ID
export const getRideDetails = async (rideId) => {
    try {
        const response = await apiClient.get(`/rides/${rideId}`);
        return response.data; // Return the ride details
    } catch (error) {
        console.error('Error fetching ride details:', error);
        throw error; // Rethrow the error for further handling
    }
};