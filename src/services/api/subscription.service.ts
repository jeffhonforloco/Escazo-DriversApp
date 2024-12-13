import { API_CONFIG } from './config';

export class SubscriptionService {
    static async getSubscriptionStatus(driverId: string): Promise<{ isActive: boolean; nextPaymentDate: string }> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUBSCRIPTION}/${driverId}`, {
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch subscription status');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching subscription status:', error);
            throw error;
        }
    }

    static async createSubscription(driverId: string): Promise<{ url: string }> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUBSCRIPTION}/create`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ driverId })
            });

            if (!response.ok) {
                throw new Error('Failed to create subscription');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw error;
        }
    }
}