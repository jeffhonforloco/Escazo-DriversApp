import { API_CONFIG } from './config';
import type { Trip } from './types';

export class TripsService {
    static async getTripById(tripId: string): Promise<Trip> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}`, {
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch trip details');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching trip details:', error);
            throw error;
        }
    }

    static async startTrip(tripId: string): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}/start`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Failed to start trip');
            }
        } catch (error) {
            console.error('Error starting trip:', error);
            throw error;
        }
    }

    static async completeTrip(tripId: string): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}/complete`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Failed to complete trip');
            }
        } catch (error) {
            console.error('Error completing trip:', error);
            throw error;
        }
    }

    static async updateLocation(tripId: string, latitude: number, longitude: number): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}/location`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ latitude, longitude })
            });

            if (!response.ok) {
                throw new Error('Failed to update location');
            }
        } catch (error) {
            console.error('Error updating location:', error);
            throw error;
        }
    }
}