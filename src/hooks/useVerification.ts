import { useState, useEffect } from 'react';
import { VerificationService, VerificationStatus } from '../services/api/verification.service';

export function useVerification(driverId: string) {
    const [status, setStatus] = useState<VerificationStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchStatus = async () => {
        try {
            setLoading(true);
            const data = await VerificationService.getVerificationStatus(driverId);
            setStatus(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch verification status'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (driverId) {
            fetchStatus();
        }
    }, [driverId]);

    const resubmitDocument = async (documentType: 'license' | 'insurance' | 'vehicle', file: File) => {
        try {
            await VerificationService.resubmitDocument(driverId, documentType, file);
            await fetchStatus(); // Refresh status after resubmission
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to resubmit document');
        }
    };

    return {
        status,
        loading,
        error,
        refreshStatus: fetchStatus,
        resubmitDocument
    };
}