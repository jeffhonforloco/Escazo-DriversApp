export const ValidationHelper = {
    isValidEmail: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPhone: (phone: string): boolean => {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    },

    isValidPassword: (password: string): boolean => {
        return password.length >= 8;
    },

    isValidName: (name: string): boolean => {
        return name.trim().length >= 2;
    },

    isValidCoordinates: (lat: number, lng: number): boolean => {
        return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    }
};