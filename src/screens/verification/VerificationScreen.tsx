import * as React from "react";
import { useState } from "react";
import { useVerification } from "../../hooks/useVerification";
import { VerificationStatus } from "../../components/verification/VerificationStatus";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";

interface VerificationScreenProps {
    driverId: string;
}

export function VerificationScreen({ driverId }: VerificationScreenProps) {
    const { status, loading, error, refreshStatus, resubmitDocument } = useVerification(driverId);
    const [resubmitting, setResubmitting] = useState(false);

    const handleResubmit = async (documentType: 'license' | 'insurance' | 'vehicle') => {
        try {
            setResubmitting(true);
            // Here you would typically show a file picker
            // For now, we'll just show a placeholder message
            alert('File picker would open here');
            // const file = await pickFile();
            // await resubmitDocument(documentType, file);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to resubmit document');
        } finally {
            setResubmitting(false);
        }
    };

    if (loading) {
        return (
            <gridLayout className="p-4">
                <LoadingSpinner />
            </gridLayout>
        );
    }

    if (error) {
        return (
            <gridLayout className="p-4">
                <ErrorMessage 
                    message={error.message} 
                    onRetry={refreshStatus}
                />
            </gridLayout>
        );
    }

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                {status && (
                    <VerificationStatus
                        status={status}
                        onResubmit={handleResubmit}
                    />
                )}

                {resubmitting && (
                    <LoadingSpinner />
                )}

                {status?.isVerified ? (
                    <stackLayout className="mt-4 p-4 bg-green-100 rounded-lg">
                        <label className="text-green-800 text-center">
                            Your account is verified! You can now start accepting rides.
                        </label>
                    </stackLayout>
                ) : (
                    <stackLayout className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <label className="text-gray-600 text-center">
                            Please wait while we verify your documents. This usually takes 1-2 business days.
                        </label>
                    </stackLayout>
                )}
            </stackLayout>
        </scrollView>
    );
}