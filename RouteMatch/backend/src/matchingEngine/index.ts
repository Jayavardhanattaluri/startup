// This file implements the logic for matching riders with drivers based on location and availability.

import { Ride } from '../models/Ride';

// Function to match a rider with an available driver
export const matchRiderWithDriver = (riderLocation: { lat: number; lng: number }, availableDrivers: Ride[]): Ride | null => {
    // Logic to find the closest driver based on rider's location
    let closestDriver = null;
    let closestDistance = Infinity;

    availableDrivers.forEach(driver => {
        const distance = calculateDistance(riderLocation, { lat: driver.pickupLocation.lat, lng: driver.pickupLocation.lng });
        if (distance < closestDistance) {
            closestDistance = distance;
            closestDriver = driver;
        }
    });

    return closestDriver;
};

// Function to calculate distance between two geographical points
const calculateDistance = (location1: { lat: number; lng: number }, location2: { lat: number; lng: number }): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(location2.lat - location1.lat);
    const dLng = degreesToRadians(location2.lng - location1.lng);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(location1.lat)) * Math.cos(degreesToRadians(location2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

// Function to convert degrees to radians
const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};