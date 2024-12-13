import * as React from "react";
import { Button } from "../common/Button";
import type { TripStatus } from "../../services/api/types";

interface TripActionsProps {
    status: TripStatus;
    onStart: () => void;
    onComplete: () => void;
}

export function TripActions({ status, onStart, onComplete }: TripActionsProps) {
    return (
        <stackLayout className="mt-4">
            {status === "accepted" && (
                <Button
                    text="Start Trip"
                    onTap={onStart}
                    variant="primary"
                    className="mb-2"
                />
            )}
            
            {status === "in_progress" && (
                <Button
                    text="Complete Trip"
                    onTap={onComplete}
                    variant="primary"
                    className="mb-2"
                />
            )}
            
            <Button
                text="Contact Support"
                onTap={() => {/* Handle support contact */}}
                variant="secondary"
            />
        </stackLayout>
    );
}