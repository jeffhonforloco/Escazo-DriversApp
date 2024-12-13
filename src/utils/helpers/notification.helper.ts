import { LocalNotifications } from '@nativescript/core';

export const NotificationHelper = {
    async requestPermission(): Promise<boolean> {
        try {
            return await LocalNotifications.requestPermission();
        } catch (error) {
            console.error('Failed to request notification permission:', error);
            return false;
        }
    },

    async showNotification(title: string, body: string, id?: number): Promise<void> {
        try {
            await LocalNotifications.schedule([{
                id: id || Date.now(),
                title,
                body,
                badge: 1
            }]);
        } catch (error) {
            console.error('Failed to show notification:', error);
        }
    },

    async cancelNotification(id: number): Promise<void> {
        try {
            await LocalNotifications.cancel(id);
        } catch (error) {
            console.error('Failed to cancel notification:', error);
        }
    }
};