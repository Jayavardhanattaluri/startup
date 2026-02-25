import { Ride } from '../models/Ride';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const matchRiderWithDriver = (riderLocation: Coordinates, availableRides: Ride[]): Ride | null => {
  let closestRide: Ride | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  availableRides.forEach((ride) => {
    const distance = calculateDistance(riderLocation, ride.pickupLocation);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestRide = ride;
    }
  });

  return closestRide;
};

const calculateDistance = (origin: Coordinates, destination: Coordinates): number => {
  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(destination.latitude - origin.latitude);
  const dLon = degreesToRadians(destination.longitude - origin.longitude);
  const lat1 = degreesToRadians(origin.latitude);
  const lat2 = degreesToRadians(destination.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);
