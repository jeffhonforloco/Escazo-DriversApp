export const ValidationUtils = {
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
    }
};