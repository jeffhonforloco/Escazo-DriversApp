import * as React from "react";
import { formatDate } from "../../utils/date";
import type { VerificationStatus as IVerificationStatus } from "../../services/api/verification.service";

interface VerificationStatusProps {
    status: IVerificationStatus;
    onResubmit?: (documentType: 'license' | 'insurance' | 'vehicle') => void;
}

export function VerificationStatus({ status, onResubmit }: VerificationStatusProps) {
    const getStatusColor = (status: 'pending' | 'approved' | 'rejected') => {
        switch (status) {
            case 'approved': return 'text-green-600';
            case 'rejected': return 'text-red-600';
            default: return 'text-yellow-600';
        }
    };

    const getStatusIcon = (status: 'pending' | 'approved' | 'rejected') => {
        switch (status) {
            case 'approved': return '✓';
            case 'rejected': return '✗';
            default: return '⋯';
        }
    };

    return (
        <stackLayout className="p-4 bg-white rounded-lg">
            <label className="text-xl font-bold mb-4">Verification Status</label>

            {!status.isVerified && (
                <stackLayout className="mb-4 p-3 bg-yellow-50 rounded">
                    <label className="text-yellow-800">
                        Your documents are under review. We'll notify you once the verification is complete.
                    </label>
                </stackLayout>
            )}

            <gridLayout rows="auto, auto, auto" columns="*, auto" className="mb-4">
                <label row="0" col="0" className="text-gray-600">Driver's License</label>
                <stackLayout row="0" col="1" orientation="horizontal">
                    <label className={getStatusColor(status.documentsStatus.license)}>
                        {getStatusIcon(status.documentsStatus.license)}
                    </label>
                    {status.documentsStatus.license === 'rejected' && onResubmit && (
                        <button 
                            className="ml-2 text-blue-600 text-sm"
                            onTap={() => onResubmit('license')}
                        >
                            Resubmit
                        </button>
                    )}
                </stackLayout>

                <label row="1" col="0" className="text-gray-600">Insurance</label>
                <stackLayout row="1" col="1" orientation="horizontal">
                    <label className={getStatusColor(status.documentsStatus.insurance)}>
                        {getStatusIcon(status.documentsStatus.insurance)}
                    </label>
                    {status.documentsStatus.insurance === 'rejected' && onResubmit && (
                        <button 
                            className="ml-2 text-blue-600 text-sm"
                            onTap={() => onResubmit('insurance')}
                        >
                            Resubmit
                        </button>
                    )}
                </stackLayout>

                <label row="2" col="0" className="text-gray-600">Vehicle Registration</label>
                <stackLayout row="2" col="1" orientation="horizontal">
                    <label className={getStatusColor(status.documentsStatus.vehicle)}>
                        {getStatusIcon(status.documentsStatus.vehicle)}
                    </label>
                    {status.documentsStatus.vehicle === 'rejected' && onResubmit && (
                        <button 
                            className="ml-2 text-blue-600 text-sm"
                            onTap={() => onResubmit('vehicle')}
                        >
                            Resubmit
                        </button>
                    )}
                </stackLayout>
            </gridLayout>

            {status.rejectionReason && (
                <stackLayout className="mb-4 p-3 bg-red-50 rounded">
                    <label className="text-red-800">
                        Reason for rejection: {status.rejectionReason}
                    </label>
                </stackLayout>
            )}

            <stackLayout className="text-sm text-gray-500">
                <label>Submitted: {formatDate(status.submissionDate)}</label>
                {status.reviewDate && (
                    <label>Last reviewed: {formatDate(status.reviewDate)}</label>
                )}
            </stackLayout>
        </stackLayout>
    );
}