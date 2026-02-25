import axios from 'axios';

interface LocationPoint {
  latitude: number;
  longitude: number;
}

export interface RidePayload {
  pickupLocation: LocationPoint;
  dropOffLocation: LocationPoint;
  riderId: string;
  vehicleType?: 'bike' | 'car' | 'scooter';
}

export interface Ride extends RidePayload {
  id: string;
  status: 'pending' | 'matched' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

const apiClient = axios.create({
  baseURL: process.env.ROUTEMATCH_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAvailableRides = async (): Promise<Ride[]> => {
  const response = await apiClient.get<Ride[]>('/rides/available');
  return response.data;
};

export const createRide = async (rideData: RidePayload): Promise<Ride> => {
  const response = await apiClient.post<Ride>('/rides', rideData);
  return response.data;
};

export const getRideDetails = async (rideId: string): Promise<Ride> => {
  const response = await apiClient.get<Ride>(`/rides/${rideId}`);
  return response.data;
};
