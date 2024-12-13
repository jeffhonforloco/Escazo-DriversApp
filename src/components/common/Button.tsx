import * as React from "react";

interface ButtonProps {
    onTap: () => void;
    text: string;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
}

export function Button({ 
    onTap, 
    text, 
    loading = false, 
    disabled = false,
    variant = 'primary',
    className = ''
}: ButtonProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-600 text-white';
            case 'secondary':
                return 'bg-gray-600 text-white';
            case 'danger':
                return 'bg-red-600 text-white';
            default:
                return 'bg-blue-600 text-white';
        }
    };

    const isDisabled = loading || disabled;
    const variantClasses = getVariantClasses();

    return (
        <button
            className={`p-4 rounded-lg ${variantClasses} ${isDisabled ? 'opacity-50' : ''} ${className}`}
            onTap={onTap}
            isEnabled={!isDisabled}
        >
            {loading ? 'Loading...' : text}
        </button>
    );
}