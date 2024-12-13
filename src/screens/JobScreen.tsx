import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { JobAssignment } from "../components/job-assignment/JobAssignment";

export function JobScreen() {
    const mockJob = {
        id: "123",
        pickup: "456 Market St",
        dropoff: "789 Broadway Ave",
        fare: 32.50,
        distance: "5.2 miles",
        estimatedTime: "15 mins"
    };

    const handleAccept = (jobId: string) => {
        console.log("Accepted job:", jobId);
        // Add logic for accepting job
    };

    const handleDecline = (jobId: string) => {
        console.log("Declined job:", jobId);
        // Add logic for declining job
    };

    return (
        <gridLayout className="bg-gray-100">
            <JobAssignment
                job={mockJob}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
        </gridLayout>
    );
}