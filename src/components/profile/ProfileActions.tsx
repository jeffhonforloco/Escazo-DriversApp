import * as React from "react";
import { Button } from "../common/Button";

interface ProfileActionsProps {
    onSettings: () => void;
    onSupport: () => void;
    onLogout: () => void;
}

export function ProfileActions({ onSettings, onSupport, onLogout }: ProfileActionsProps) {
    return (
        <stackLayout className="bg-white p-4 rounded-lg">
            <Button
                text="Settings"
                onTap={onSettings}
                variant="secondary"
                className="mb-2"
            />
            <Button
                text="Support"
                onTap={onSupport}
                variant="secondary"
                className="mb-2"
            />
            <Button
                text="Logout"
                onTap={onLogout}
                variant="danger"
            />
        </stackLayout>
    );
}