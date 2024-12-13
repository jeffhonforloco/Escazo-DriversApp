import { API_CONFIG } from './config';
import type { Driver } from './types';

export class DriverService {
    static async getProfile(driverId: string): Promise<Driver> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DRIVER}/${driverId}`, {
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch driver profile');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching driver profile:', error);
            throw error;
        }
    }

    static async updateStatus(driverId: string, isOnline: boolean): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DRIVER}/${driverId}/status`, {
                method: 'PUT',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ isOnline })
            });

            if (!response.ok) {
                throw new Error('Failed to update driver status');
            }
        } catch (error) {
            console.error('Error updating driver status:', error);
            throw error;
        }
    }
}