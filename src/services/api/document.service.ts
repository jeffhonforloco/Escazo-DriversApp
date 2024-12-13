import { API_CONFIG } from './config';

interface UploadResponse {
    documentId: string;
    url: string;
    status: 'pending' | 'approved' | 'rejected';
}

export class DocumentService {
    static async uploadDocument(driverId: string, file: File, type: 'license' | 'insurance' | 'vehicle'): Promise<UploadResponse> {
        try {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('type', type);
            formData.append('driverId', driverId);

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOCUMENTS}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Document upload failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading document:', error);
            throw error;
        }
    }

    static async getDocumentStatus(documentId: string): Promise<UploadResponse> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOCUMENTS}/${documentId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Failed to get document status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting document status:', error);
            throw error;
        }
    }
}