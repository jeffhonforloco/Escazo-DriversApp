import { STORAGE_KEYS } from '../constants/storage.constants';

export const StorageHelper = {
    getItem: (key: string): string | null => {
        return localStorage.getItem(key);
    },

    setItem: (key: string, value: string): void => {
        localStorage.setItem(key, value);
    },

    removeItem: (key: string): void => {
        localStorage.removeItem(key);
    },

    clearAll: (): void => {
        localStorage.clear();
    },

    getAuthToken: (): string | null => {
        return StorageHelper.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    setAuthToken: (token: string): void => {
        StorageHelper.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    },

    getDriverId: (): string | null => {
        return StorageHelper.getItem(STORAGE_KEYS.DRIVER_ID);
    },

    clearAuth: (): void => {
        StorageHelper.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        StorageHelper.removeItem(STORAGE_KEYS.DRIVER_ID);
        StorageHelper.removeItem(STORAGE_KEYS.IS_VERIFIED);
    }
};