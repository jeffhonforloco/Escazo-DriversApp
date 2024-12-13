import { useState, useEffect } from 'react';
import { LocalNotifications } from '@nativescript/core';

export function useNotifications() {
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        try {
            const hasPermission = await LocalNotifications.requestPermission();
            setPermission(hasPermission);
        } catch (error) {
            console.error('Failed to request notification permission:', error);
        }
    };

    const showNotification = async (title: string, body: string) => {
        if (!permission) {
            return;
        }

        await LocalNotifications.schedule([{
            id: Date.now(),
            title,
            body,
            badge: 1
        }]);
    };

    return {
        hasPermission: permission,
        showNotification
    };
}