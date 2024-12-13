import * as React from "react";
import { formatCurrency } from "../../utils/currency";
import { formatDistance } from "../../utils/distance";
import { formatTime } from "../../utils/date";

interface TripDetailsProps {
    pickup: string;
    dropoff: string;
    fare: number;
    distance: number;
    estimatedTime: number;
    pickupTime: string;
}

export function TripDetails({ 
    pickup, 
    dropoff, 
    fare, 
    distance, 
    estimatedTime, 
    pickupTime 
}: TripDetailsProps) {
    return (
        <stackLayout className="p-4 bg-white rounded-lg">
            <gridLayout rows="auto, auto, auto, auto" columns="auto, *">
                <label row="0" col="0" className="text-gray-500">Pickup</label>
                <label row="0" col="1" className="ml-2">{pickup}</label>
                
                <label row="1" col="0" className="text-gray-500">Dropoff</label>
                <label row="1" col="1" className="ml-2">{dropoff}</label>
                
                <label row="2" col="0" className="text-gray-500">Distance</label>
                <label row="2" col="1" className="ml-2">{formatDistance(distance)}</label>
                
                <label row="3" col="0" className="text-gray-500">Pickup Time</label>
                <label row="3" col="1" className="ml-2">{formatTime(pickupTime)}</label>
            </gridLayout>
            
            <gridLayout columns="*, *" className="mt-4">
                <stackLayout col="0" className="text-center">
                    <label className="text-lg font-bold">{formatCurrency(fare)}</label>
                    <label className="text-sm text-gray-500">Estimated Fare</label>
                </stackLayout>
                
                <stackLayout col="1" className="text-center">
                    <label className="text-lg font-bold">{estimatedTime} min</label>
                    <label className="text-sm text-gray-500">Est. Duration</label>
                </stackLayout>
            </gridLayout>
        </stackLayout>
    );
}