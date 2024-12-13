import { API_CONFIG } from './config';

export interface VerificationStatus {
    isVerified: boolean;
    documentsStatus: {
        license: 'pending' | 'approved' | 'rejected';
        insurance: 'pending' | 'approved' | 'rejected';
        vehicle: 'pending' | 'approved' | 'rejected';
    };
    rejectionReason?: string;
    submissionDate: string;
    reviewDate?: string;
}

export class VerificationService {
    static async getVerificationStatus(driverId: string): Promise<VerificationStatus> {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VERIFICATION}/${driverId}`,
                { headers: API_CONFIG.HEADERS }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch verification status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching verification status:', error);
            throw error;
        }
    }

    static async resubmitDocument(
        driverId: string,
        documentType: 'license' | 'insurance' | 'vehicle',
        file: File
    ): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('type', documentType);

            const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VERIFICATION}/${driverId}/resubmit`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('Failed to resubmit document');
            }
        } catch (error) {
            console.error('Error resubmitting document:', error);
            throw error;
        }
    }
}