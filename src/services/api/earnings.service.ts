import { API_CONFIG } from './config';
import type { Earnings } from './types';

export class EarningsService {
    static async getEarnings(driverId: string): Promise<Earnings> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EARNINGS}/${driverId}`, {
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch earnings');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching earnings:', error);
            throw error;
        }
    }
}