import * as React from "react";
import { useState } from "react";
import { AuthService } from "../../services/api/auth.service";
import { ErrorMessage } from "../../components/common/ErrorMessage";

export function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AuthService.login({ email, password });
            onLogin(response.token);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-6">
                <label className="text-3xl font-bold mb-8 text-center">
                    Welcome Back
                </label>

                {error && (
                    <ErrorMessage message={error} />
                )}

                <stackLayout className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <textField
                        className="p-4 bg-white rounded-lg border border-gray-300"
                        keyboardType="email"
                        autocorrect={false}
                        autocapitalizationType="none"
                        text={email}
                        onTextChange={(e) => setEmail(e.value)}
                    />
                </stackLayout>

                <stackLayout className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <textField
                        className="p-4 bg-white rounded-lg border border-gray-300"
                        secure={true}
                        text={password}
                        onTextChange={(e) => setPassword(e.value)}
                    />
                </stackLayout>

                <button
                    className={`p-4 rounded-lg ${loading ? 'bg-blue-300' : 'bg-blue-600'} text-white`}
                    onTap={handleLogin}
                    isEnabled={!loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </stackLayout>
        </scrollView>
    );
}