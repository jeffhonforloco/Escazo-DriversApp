import { useState, useEffect } from 'react';
import { getCurrentLocation, Location } from '@nativescript/core';

export function useLocation() {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const updateLocation = async () => {
        try {
            setLoading(true);
            const currentLocation = await getCurrentLocation({
                desiredAccuracy: 3,
                updateDistance: 10,
                maximumAge: 20000,
                timeout: 20000
            });
            setLocation(currentLocation);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to get location'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateLocation();
    }, []);

    return {
        location,
        error,
        loading,
        updateLocation
    };
}