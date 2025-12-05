// Ride.ts
import { Schema, model, Document } from 'mongoose';

interface IRide extends Document {
    pickupLocation: {
        latitude: number;
        longitude: number;
    };
    dropOffLocation: {
        latitude: number;
        longitude: number;
    };
    userId: string; // Reference to the user who requested the ride
    driverId?: string; // Optional reference to the driver assigned to the ride
    status: 'pending' | 'accepted' | 'completed' | 'canceled'; // Current status of the ride
    createdAt: Date;
    updatedAt: Date;
}

const rideSchema = new Schema<IRide>({
    pickupLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    dropOffLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    userId: { type: String, required: true },
    driverId: { type: String, default: null },
    status: { type: String, enum: ['pending', 'accepted', 'completed', 'canceled'], default: 'pending' },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Ride = model<IRide>('Ride', rideSchema);

export default Ride;