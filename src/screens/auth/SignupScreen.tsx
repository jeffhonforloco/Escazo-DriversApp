import * as React from "react";
import { useState } from "react";
import { AuthService } from "../../services/api/auth.service";
import { ErrorMessage } from "../../components/common/ErrorMessage";

export function SignupScreen({ onSignup }: { onSignup: (token: string) => void }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AuthService.signup(formData);
            onSignup(response.token);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-6">
                <label className="text-3xl font-bold mb-8 text-center">
                    Create Account
                </label>

                {error && (
                    <ErrorMessage message={error} />
                )}

                <stackLayout className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <textField
                        className="p-4 bg-white rounded-lg border border-gray-300"
                        text={formData.name}
                        onTextChange={(e) => updateFormData('name', e.value)}
                    />
                </stackLayout>

                <stackLayout className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <textField
                        className="p-4 bg-white rounded-lg border border-gray-300"
                        keyboardType="email"
                        autocorrect={false}
                        autocapitalizationType="none"
                        text={formData.email}
                        onTextChange={(e) => updateFormData('email', e.value)}
                    />
                </stackLayout>

                <stackLayout className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <textField
                        className="p-4 bg-white rounded-lg border border-gray-300"
                        keyboardType="phone"
                        text={formData.phone}
                        onTextChange={(e) => updateFormData('phone', e.value)}
                    />
                </stackLayout>

                <stackLayout className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <textField
                        className="p-4 bg-white rounded-lg border border-gray-300"
                        secure={true}
                        text={formData.password}
                        onTextChange={(e) => updateFormData('password', e.value)}
                    />
                </stackLayout>

                <button
                    className={`p-4 rounded-lg ${loading ? 'bg-blue-300' : 'bg-blue-600'} text-white`}
                    onTap={handleSignup}
                    isEnabled={!loading}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </stackLayout>
        </scrollView>
    );
}