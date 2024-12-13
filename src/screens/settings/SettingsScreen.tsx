import * as React from "react";
import { ScreenProps } from "../../navigation/types";
import { useSettings } from "../../hooks/useSettings";
import { SettingsSection } from "../../components/settings/SettingsSection";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";

export function SettingsScreen({ navigation }: ScreenProps<"Settings">) {
    const { settings, loading, error, updateSettings } = useSettings();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !settings) {
        return <ErrorMessage message={error?.message || "Failed to load settings"} />;
    }

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <SettingsSection
                    title="Notifications"
                    settings={[
                        {
                            key: "newTrips",
                            label: "New Trip Alerts",
                            type: "toggle",
                            value: settings.notifications.newTrips,
                            onChange: (value) => updateSettings("notifications.newTrips", value)
                        },
                        {
                            key: "earnings",
                            label: "Earnings Updates",
                            type: "toggle",
                            value: settings.notifications.earnings,
                            onChange: (value) => updateSettings("notifications.earnings", value)
                        }
                    ]}
                />

                <SettingsSection
                    title="Navigation"
                    settings={[
                        {
                            key: "preferredMap",
                            label: "Preferred Map App",
                            type: "select",
                            value: settings.navigation.preferredMap,
                            options: ["Google Maps", "Waze"],
                            onChange: (value) => updateSettings("navigation.preferredMap", value)
                        }
                    ]}
                />

                <SettingsSection
                    title="Payment"
                    settings={[
                        {
                            key: "autoPayouts",
                            label: "Automatic Payouts",
                            type: "toggle",
                            value: settings.payment.autoPayouts,
                            onChange: (value) => updateSettings("payment.autoPayouts", value)
                        },
                        {
                            key: "payoutThreshold",
                            label: "Payout Threshold",
                            type: "select",
                            value: settings.payment.payoutThreshold,
                            options: ["$50", "$100", "$200"],
                            onChange: (value) => updateSettings("payment.payoutThreshold", value)
                        }
                    ]}
                />

                <SettingsSection
                    title="App Settings"
                    settings={[
                        {
                            key: "language",
                            label: "Language",
                            type: "select",
                            value: settings.app.language,
                            options: ["English", "Spanish"],
                            onChange: (value) => updateSettings("app.language", value)
                        },
                        {
                            key: "darkMode",
                            label: "Dark Mode",
                            type: "toggle",
                            value: settings.app.darkMode,
                            onChange: (value) => updateSettings("app.darkMode", value)
                        }
                    ]}
                />
            </stackLayout>
        </scrollView>
    );
}