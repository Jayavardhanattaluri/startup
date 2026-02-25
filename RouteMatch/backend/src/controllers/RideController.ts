import { Request, Response } from 'express';
import { RideStore } from '../models/Ride';
import { matchRiderWithDriver } from '../matchingEngine';

class RideController {
  public createRide(req: Request, res: Response): void {
    try {
      const { pickupLocation, dropOffLocation, riderId } = req.body;

      if (!pickupLocation || !dropOffLocation || !riderId) {
        res.status(400).json({ message: 'pickupLocation, dropOffLocation, and riderId are required' });
        return;
      }

      const newRide = RideStore.create(req.body);
      res.status(201).json(newRide);
    } catch (error) {
      res.status(500).json({ message: 'Error creating ride', error });
    }
  }

  public getRides(_req: Request, res: Response): void {
    res.status(200).json(RideStore.list());
  }

  public getAvailableRides(_req: Request, res: Response): void {
    res.status(200).json(RideStore.listAvailable());
  }

  public getRideById(req: Request, res: Response): void {
    const ride = RideStore.getById(req.params.id);
    if (!ride) {
      res.status(404).json({ message: 'Ride not found' });
      return;
    }

    res.status(200).json(ride);
  }

  public updateRide(req: Request, res: Response): void {
    const updatedRide = RideStore.update(req.params.id, req.body);
    if (!updatedRide) {
      res.status(404).json({ message: 'Ride not found' });
      return;
    }

    res.status(200).json(updatedRide);
  }

  public deleteRide(req: Request, res: Response): void {
    const deleted = RideStore.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Ride not found' });
      return;
    }

    res.status(204).send();
  }

  public matchRide(req: Request, res: Response): void {
    const { riderLocation } = req.body;
    if (!riderLocation?.latitude || !riderLocation?.longitude) {
      res.status(400).json({ message: 'riderLocation with latitude and longitude is required' });
      return;
    }

    const ride = matchRiderWithDriver(riderLocation, RideStore.listAvailable());
    if (!ride) {
      res.status(404).json({ message: 'No suitable ride found' });
      return;
    }

    res.status(200).json(ride);
  }
}

export default new RideController();
