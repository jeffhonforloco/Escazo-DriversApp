import { useState, useCallback } from 'react';

interface FormConfig<T> {
    initialValues: T;
    onSubmit: (values: T) => Promise<void>;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>({ 
    initialValues, 
    onSubmit, 
    validate 
}: FormConfig<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback((field: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const handleSubmit = async () => {
        if (loading) return;

        try {
            setLoading(true);
            
            if (validate) {
                const validationErrors = validate(values);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }
            }

            await onSubmit(values);
        } finally {
            setLoading(false);
        }
    };

    return {
        values,
        errors,
        loading,
        handleChange,
        handleSubmit
    };
}