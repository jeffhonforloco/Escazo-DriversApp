import { API_CONFIG } from './config';

export class SettingsService {
    static async getSettings(): Promise<any> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SETTINGS}`, {
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch settings');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    }

    static async updateSetting(path: string, value: any): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SETTINGS}`, {
                method: 'PATCH',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({
                    path,
                    value
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update setting');
            }
        } catch (error) {
            console.error('Error updating setting:', error);
            throw error;
        }
    }
}