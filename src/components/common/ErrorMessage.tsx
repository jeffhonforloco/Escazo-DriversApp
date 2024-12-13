import * as React from "react";

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <stackLayout className="p-4 bg-red-100 rounded-lg">
            <label className="text-red-600 mb-2">{message}</label>
            {onRetry && (
                <button
                    className="text-blue-600"
                    onTap={onRetry}
                >
                    Retry
                </button>
            )}
        </stackLayout>
    );
}