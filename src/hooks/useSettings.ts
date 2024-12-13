import { useState, useEffect } from 'react';
import { SettingsService } from '../services/api/settings.service';

interface Settings {
    notifications: {
        newTrips: boolean;
        earnings: boolean;
    };
    navigation: {
        preferredMap: string;
    };
    payment: {
        autoPayouts: boolean;
        payoutThreshold: string;
    };
    app: {
        language: string;
        darkMode: boolean;
    };
}

export function useSettings() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const data = await SettingsService.getSettings();
            setSettings(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch settings'));
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (path: string, value: any) => {
        try {
            await SettingsService.updateSetting(path, value);
            // Update local state
            const pathParts = path.split('.');
            setSettings(prev => {
                if (!prev) return prev;
                const newSettings = { ...prev };
                let current: any = newSettings;
                for (let i = 0; i < pathParts.length - 1; i++) {
                    current = current[pathParts[i]];
                }
                current[pathParts[pathParts.length - 1]] = value;
                return newSettings;
            });
        } catch (err) {
            throw err instanceof Error ? err : new Error('Failed to update setting');
        }
    };

    return {
        settings,
        loading,
        error,
        updateSettings,
        refreshSettings: fetchSettings
    };
}