import * as React from "react";

interface TextFieldProps {
    label: string;
    value: string;
    onTextChange: (value: string) => void;
    placeholder?: string;
    secure?: boolean;
    keyboardType?: 'text' | 'email' | 'phone' | 'number';
    error?: string;
    className?: string;
}

export function TextField({
    label,
    value,
    onTextChange,
    placeholder = '',
    secure = false,
    keyboardType = 'text',
    error,
    className = ''
}: TextFieldProps) {
    return (
        <stackLayout className={`mb-4 ${className}`}>
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <textField
                className={`p-4 bg-white rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'}`}
                text={value}
                hint={placeholder}
                secure={secure}
                keyboardType={keyboardType}
                autocorrect={false}
                autocapitalizationType="none"
                onTextChange={(e) => onTextChange(e.value)}
            />
            {error && (
                <label className="text-sm text-red-500 mt-1">
                    {error}
                </label>
            )}
        </stackLayout>
    );
}