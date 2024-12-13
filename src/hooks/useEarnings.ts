import { useState, useEffect } from 'react';
import { EarningsService } from '../services/api/earnings.service';
import type { Earnings } from '../services/api/types';

export function useEarnings(driverId: string) {
    const [earnings, setEarnings] = useState<Earnings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchEarnings();
    }, [driverId]);

    const fetchEarnings = async () => {
        try {
            setLoading(true);
            const data = await EarningsService.getEarnings(driverId);
            setEarnings(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch earnings'));
        } finally {
            setLoading(false);
        }
    };

    return {
        earnings,
        loading,
        error,
        refreshEarnings: fetchEarnings
    };
}