export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public details?: Record<string, any>
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const ErrorUtils = {
    handleApiError: (error: unknown): AppError => {
        if (error instanceof AppError) {
            return error;
        }

        if (error instanceof Error) {
            return new AppError(error.message);
        }

        return new AppError('An unexpected error occurred');
    },

    isNetworkError: (error: unknown): boolean => {
        return error instanceof Error && 
            (error.message.includes('network') || error.message.includes('Network'));
    }
};