export const API_ENDPOINTS = {
    AUTH: '/api/auth',
    DRIVER: '/api/driver',
    TRIPS: '/api/trips',
    EARNINGS: '/api/earnings',
    SUBSCRIPTION: '/api/subscription',
    VERIFICATION: '/api/verification',
    DOCUMENTS: '/api/documents'
} as const;

export const API_CONFIG = {
    BASE_URL: 'https://api.escazo.com',
    ENDPOINTS: API_ENDPOINTS,
    HEADERS: {
        'Content-Type': 'application/json'
    }
} as const;