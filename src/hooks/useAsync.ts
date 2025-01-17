import { useState, useCallback } from 'react';
import { ErrorUtils, AppError } from '../utils/error';

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: AppError | null;
}

export function useAsync<T>() {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: false,
        error: null
    });

    const execute = useCallback(async (promise: Promise<T>) => {
        setState(prev => ({ ...prev, loading: true }));
        
        try {
            const data = await promise;
            setState({ data, loading: false, error: null });
            return data;
        } catch (error) {
            const appError = ErrorUtils.handleApiError(error);
            setState({ data: null, loading: false, error: appError });
            throw appError;
        }
    }, []);

    return {
        ...state,
        execute
    };
}