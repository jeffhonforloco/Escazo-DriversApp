import * as React from "react";
import { useState } from "react";
import { ScreenProps } from "../../navigation/types";
import { useDriver } from "../../hooks/useDriver";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileDetails } from "../../components/profile/ProfileDetails";
import { ProfileActions } from "../../components/profile/ProfileActions";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";

export function ProfileScreen({ navigation }: ScreenProps<"Profile">) {
    const { driver, loading, error, updateDriverStatus } = useDriver();
    const [isEditing, setIsEditing] = useState(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !driver) {
        return <ErrorMessage message={error?.message || "Failed to load profile"} />;
    }

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <ProfileHeader
                    name={driver.name}
                    rating={driver.rating}
                    isOnline={driver.isOnline}
                    onStatusChange={updateDriverStatus}
                />

                <ProfileDetails
                    driver={driver}
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(true)}
                    onSave={() => setIsEditing(false)}
                />

                <ProfileActions
                    onSettings={() => navigation.navigate("Settings")}
                    onSupport={() => {/* Handle support */}}
                    onLogout={() => {/* Handle logout */}}
                />
            </stackLayout>
        </scrollView>
    );
}