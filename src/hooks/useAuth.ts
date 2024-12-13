import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services/api/auth.service';
import { StorageUtils, StorageKeys } from '../utils/storage';
import { AppError } from '../utils/error';

interface AuthState {
    isAuthenticated: boolean;
    isVerified: boolean;
    driverId: string | null;
    loading: boolean;
    error: string | null;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        isVerified: false,
        driverId: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = useCallback(async () => {
        const token = StorageUtils.getItem(StorageKeys.AUTH_TOKEN);
        const driverId = StorageUtils.getItem(StorageKeys.DRIVER_ID);
        const isVerified = StorageUtils.getItem(StorageKeys.IS_VERIFIED) === 'true';

        setState(prev => ({
            ...prev,
            isAuthenticated: !!token,
            isVerified,
            driverId,
            loading: false
        }));
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            await AuthService.login({ email, password });
            await checkAuthStatus();
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof AppError ? error.message : 'Login failed'
            }));
            throw error;
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const signup = async (data: { email: string; password: string; name: string; phone: string }) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            await AuthService.signup(data);
            await checkAuthStatus();
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof AppError ? error.message : 'Signup failed'
            }));
            throw error;
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const logout = useCallback(() => {
        AuthService.logout();
        setState({
            isAuthenticated: false,
            isVerified: false,
            driverId: null,
            loading: false,
            error: null
        });
    }, []);

    return {
        ...state,
        login,
        signup,
        logout
    };
}