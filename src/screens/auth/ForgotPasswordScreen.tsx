import * as React from "react";
import { useState } from "react";
import { AuthService } from "../../services/api/auth.service";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { ValidationUtils } from "../../utils/validation";

export function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async () => {
        if (!ValidationUtils.isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await AuthService.resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-6">
                <label className="text-2xl font-bold mb-4 text-center">
                    Reset Password
                </label>

                {error && (
                    <ErrorMessage message={error} />
                )}

                {success ? (
                    <stackLayout className="p-4 bg-green-100 rounded-lg">
                        <label className="text-green-800 text-center">
                            Password reset instructions have been sent to your email.
                        </label>
                    </stackLayout>
                ) : (
                    <>
                        <TextField
                            label="Email"
                            value={email}
                            onTextChange={setEmail}
                            keyboardType="email"
                            placeholder="Enter your email"
                        />

                        <Button
                            text="Reset Password"
                            onTap={handleResetPassword}
                            loading={loading}
                            disabled={!email}
                        />
                    </>
                )}
            </stackLayout>
        </scrollView>
    );
}