import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface EarningsCardProps {
    daily: number;
    weekly: number;
    monthly: number;
}

export function EarningsCard({ daily, weekly, monthly }: EarningsCardProps) {
    return (
        <stackLayout className="p-4 bg-white rounded-lg mb-4">
            <label className="text-xl font-bold mb-2">Earnings Overview</label>
            <gridLayout columns="*, *" rows="auto, auto, auto" className="text-center">
                <label row="0" col="0" className="p-2">Daily</label>
                <label row="0" col="1" className="p-2 font-bold">${daily}</label>
                <label row="1" col="0" className="p-2">Weekly</label>
                <label row="1" col="1" className="p-2 font-bold">${weekly}</label>
                <label row="2" col="0" className="p-2">Monthly</label>
                <label row="2" col="1" className="p-2 font-bold">${monthly}</label>
            </gridLayout>
        </stackLayout>
    );
}