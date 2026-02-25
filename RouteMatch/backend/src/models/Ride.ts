export type RideStatus = 'pending' | 'matched' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface RideLocation {
  latitude: number;
  longitude: number;
}

export interface Ride {
  id: string;
  pickupLocation: RideLocation;
  dropOffLocation: RideLocation;
  riderId: string;
  driverId?: string;
  vehicleType: 'bike' | 'car' | 'scooter';
  detourLimitKm: number;
  status: RideStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRideInput {
  pickupLocation: RideLocation;
  dropOffLocation: RideLocation;
  riderId: string;
  driverId?: string;
  vehicleType?: 'bike' | 'car' | 'scooter';
  detourLimitKm?: number;
}

const rides = new Map<string, Ride>();

const generateId = () => `ride_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const RideStore = {
  create(input: CreateRideInput): Ride {
    const now = new Date().toISOString();
    const ride: Ride = {
      id: generateId(),
      pickupLocation: input.pickupLocation,
      dropOffLocation: input.dropOffLocation,
      riderId: input.riderId,
      driverId: input.driverId,
      vehicleType: input.vehicleType || 'car',
      detourLimitKm: input.detourLimitKm ?? 1,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    rides.set(ride.id, ride);
    return ride;
  },

  list(): Ride[] {
    return Array.from(rides.values());
  },

  listAvailable(): Ride[] {
    return Array.from(rides.values()).filter((ride) => ['pending', 'matched'].includes(ride.status));
  },

  getById(id: string): Ride | undefined {
    return rides.get(id);
  },

  update(id: string, patch: Partial<Omit<Ride, 'id' | 'createdAt'>>): Ride | undefined {
    const existing = rides.get(id);
    if (!existing) {
      return undefined;
    }

    const updated: Ride = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    rides.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return rides.delete(id);
  },
};
