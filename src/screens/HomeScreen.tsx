import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { EarningsCard } from "../components/earnings/EarningsCard";
import { JobsList } from "../components/jobs/JobsList";
import { SubscriptionStatus } from "../components/subscription/SubscriptionStatus";

const mockJobs = [
    {
        id: "1",
        pickup: "123 Main St",
        dropoff: "456 Oak Ave",
        fare: 25.50,
        time: "2:30 PM"
    },
    {
        id: "2",
        pickup: "789 Pine St",
        dropoff: "321 Elm St",
        fare: 18.75,
        time: "3:45 PM"
    }
];

export function HomeScreen() {
    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <EarningsCard
                    daily={125.50}
                    weekly={850.75}
                    monthly={3250.00}
                />
                
                <JobsList jobs={mockJobs} />
                
                <SubscriptionStatus
                    isActive={true}
                    nextPaymentDate="2024-04-01"
                />
            </stackLayout>
        </scrollView>
    );
}