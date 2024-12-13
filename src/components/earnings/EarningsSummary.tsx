import * as React from "react";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/date";

interface EarningsSummaryProps {
    period: 'daily' | 'weekly' | 'monthly';
    amount: number;
    trips: number;
    startDate: string;
    endDate: string;
}

export function EarningsSummary({ period, amount, trips, startDate, endDate }: EarningsSummaryProps) {
    return (
        <stackLayout className="p-4 bg-white rounded-lg">
            <label className="text-lg font-bold mb-2">
                {period.charAt(0).toUpperCase() + period.slice(1)} Summary
            </label>
            <gridLayout columns="*, *" rows="auto, auto, auto" className="text-sm">
                <label row="0" col="0">Earnings</label>
                <label row="0" col="1" className="text-right font-bold">
                    {formatCurrency(amount)}
                </label>
                
                <label row="1" col="0">Trips</label>
                <label row="1" col="1" className="text-right">{trips}</label>
                
                <label row="2" col="0">Period</label>
                <label row="2" col="1" className="text-right">
                    {formatDate(startDate)} - {formatDate(endDate)}
                </label>
            </gridLayout>
        </stackLayout>
    );
}