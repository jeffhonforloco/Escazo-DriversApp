import { useState, useEffect } from 'react';
import { TripsService } from '../services/api/trips.service';
import type { Trip } from '../services/api/types';

export function useTrip(tripId: string) {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchTrip();
    }, [tripId]);

    const fetchTrip = async () => {
        try {
            setLoading(true);
            const data = await TripsService.getTripById(tripId);
            setTrip(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch trip'));
        } finally {
            setLoading(false);
        }
    };

    const startTrip = async () => {
        try {
            await TripsService.startTrip(tripId);
            await fetchTrip();
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to start trip');
        }
    };

    const completeTrip = async () => {
        try {
            await TripsService.completeTrip(tripId);
            await fetchTrip();
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to complete trip');
        }
    };

    const updateLocation = async (latitude: number, longitude: number) => {
        try {
            await TripsService.updateLocation(tripId, latitude, longitude);
        } catch (err) {
            console.error('Failed to update location:', err);
        }
    };

    return {
        trip,
        loading,
        error,
        startTrip,
        completeTrip,
        updateLocation,
        refreshTrip: fetchTrip
    };
}