export const StorageKeys = {
    AUTH_TOKEN: 'auth_token',
    DRIVER_ID: 'driver_id',
    IS_VERIFIED: 'is_verified'
} as const;

export const StorageUtils = {
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
    }
};