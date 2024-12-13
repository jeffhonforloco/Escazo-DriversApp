import { API_CONFIG } from './config';
import { StorageUtils, StorageKeys } from '../../utils/storage';
import { ValidationUtils } from '../../utils/validation';
import { AppError } from '../../utils/error';

interface AuthResponse {
    token: string;
    driver: {
        id: string;
        email: string;
        isVerified: boolean;
    };
}

interface SignupData {
    email: string;
    password: string;
    name: string;
    phone: string;
}

interface LoginData {
    email: string;
    password: string;
}

export class AuthService {
    static async signup(data: SignupData): Promise<AuthResponse> {
        // Validate input
        if (!ValidationUtils.isValidEmail(data.email)) {
            throw new AppError('Invalid email address');
        }
        if (!ValidationUtils.isValidPassword(data.password)) {
            throw new AppError('Password must be at least 8 characters');
        }
        if (!ValidationUtils.isValidPhone(data.phone)) {
            throw new AppError('Invalid phone number');
        }
        if (!ValidationUtils.isValidName(data.name)) {
            throw new AppError('Name is required');
        }

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/signup`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new AppError('Signup failed');
            }

            const authData = await response.json();
            
            // Store auth data
            StorageUtils.setItem(StorageKeys.AUTH_TOKEN, authData.token);
            StorageUtils.setItem(StorageKeys.DRIVER_ID, authData.driver.id);
            StorageUtils.setItem(StorageKeys.IS_VERIFIED, String(authData.driver.isVerified));

            return authData;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Signup failed');
        }
    }

    static async login(data: LoginData): Promise<AuthResponse> {
        if (!ValidationUtils.isValidEmail(data.email)) {
            throw new AppError('Invalid email address');
        }

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/login`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new AppError('Invalid credentials');
            }

            const authData = await response.json();
            
            // Store auth data
            StorageUtils.setItem(StorageKeys.AUTH_TOKEN, authData.token);
            StorageUtils.setItem(StorageKeys.DRIVER_ID, authData.driver.id);
            StorageUtils.setItem(StorageKeys.IS_VERIFIED, String(authData.driver.isVerified));

            return authData;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Login failed');
        }
    }

    static async resetPassword(email: string): Promise<void> {
        if (!ValidationUtils.isValidEmail(email)) {
            throw new AppError('Invalid email address');
        }

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/reset-password`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new AppError('Failed to reset password');
            }
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Failed to reset password');
        }
    }

    static logout(): void {
        StorageUtils.clearAll();
    }
}