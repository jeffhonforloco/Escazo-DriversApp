import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface SubscriptionStatusProps {
    isActive: boolean;
    nextPaymentDate: string;
}

export function SubscriptionStatus({ isActive, nextPaymentDate }: SubscriptionStatusProps) {
    return (
        <stackLayout className={`p-4 rounded-lg mb-4 ${isActive ? 'bg-green-100' : 'bg-red-100'}`}>
            <label className="font-bold mb-1">
                {isActive ? 'Subscription Active' : 'Subscription Inactive'}
            </label>
            <label className="text-sm text-gray-600">
                Next Payment: {nextPaymentDate}
            </label>
        </stackLayout>
    );
}