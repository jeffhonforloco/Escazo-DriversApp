import { useState, useEffect } from 'react';
import { TripsService } from '../services/api/trips.service';
import type { Trip } from '../services/api/types';

export function useTrips(driverId: string) {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchTrips();
    }, [driverId]);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const data = await TripsService.getCurrentTrips(driverId);
            setTrips(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch trips'));
        } finally {
            setLoading(false);
        }
    };

    const acceptTrip = async (tripId: string) => {
        try {
            await TripsService.acceptTrip(tripId, driverId);
            await fetchTrips(); // Refresh trips after accepting
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to accept trip'));
        }
    };

    const declineTrip = async (tripId: string) => {
        try {
            await TripsService.declineTrip(tripId, driverId);
            await fetchTrips(); // Refresh trips after declining
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to decline trip'));
        }
    };

    return {
        trips,
        loading,
        error,
        acceptTrip,
        declineTrip,
        refreshTrips: fetchTrips
    };
}