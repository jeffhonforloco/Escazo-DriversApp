import { useState, useEffect } from 'react';
import { DriverService } from '../services/api/driver.service';
import type { Driver } from '../services/api/types';

export function useDriver(driverId: string) {
    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchDriver();
    }, [driverId]);

    const fetchDriver = async () => {
        try {
            setLoading(true);
            const data = await DriverService.getProfile(driverId);
            setDriver(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch driver'));
        } finally {
            setLoading(false);
        }
    };

    const updateDriverStatus = async (isOnline: boolean) => {
        try {
            await DriverService.updateStatus(driverId, isOnline);
            setDriver(prev => prev ? { ...prev, isOnline } : null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to update status'));
        }
    };

    return {
        driver,
        loading,
        error,
        updateDriverStatus,
        refreshDriver: fetchDriver
    };
}