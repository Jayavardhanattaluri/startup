// RideController.ts

import { Request, Response } from 'express';
import Ride from '../models/Ride';

class RideController {
    // Create a new ride
    public async createRide(req: Request, res: Response): Promise<void> {
        try {
            const rideData = req.body;
            const newRide = new Ride(rideData);
            await newRide.save();
            res.status(201).json(newRide);
        } catch (error) {
            res.status(500).json({ message: 'Error creating ride', error });
        }
    }

    // Fetch all rides
    public async getRides(req: Request, res: Response): Promise<void> {
        try {
            const rides = await Ride.find();
            res.status(200).json(rides);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching rides', error });
        }
    }

    // Fetch a ride by ID
    public async getRideById(req: Request, res: Response): Promise<void> {
        try {
            const rideId = req.params.id;
            const ride = await Ride.findById(rideId);
            if (!ride) {
                res.status(404).json({ message: 'Ride not found' });
                return;
            }
            res.status(200).json(ride);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching ride', error });
        }
    }

    // Update a ride
    public async updateRide(req: Request, res: Response): Promise<void> {
        try {
            const rideId = req.params.id;
            const updatedRide = await Ride.findByIdAndUpdate(rideId, req.body, { new: true });
            if (!updatedRide) {
                res.status(404).json({ message: 'Ride not found' });
                return;
            }
            res.status(200).json(updatedRide);
        } catch (error) {
            res.status(500).json({ message: 'Error updating ride', error });
        }
    }

    // Delete a ride
    public async deleteRide(req: Request, res: Response): Promise<void> {
        try {
            const rideId = req.params.id;
            const deletedRide = await Ride.findByIdAndDelete(rideId);
            if (!deletedRide) {
                res.status(404).json({ message: 'Ride not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting ride', error });
        }
    }
}

export default new RideController();