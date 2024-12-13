import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface JobAssignmentProps {
    job: {
        id: string;
        pickup: string;
        dropoff: string;
        fare: number;
        distance: string;
        estimatedTime: string;
    };
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
}

export function JobAssignment({ job, onAccept, onDecline }: JobAssignmentProps) {
    return (
        <absoluteLayout className="bg-white rounded-lg p-4 m-4">
            <stackLayout className="w-full">
                <label className="text-xl font-bold mb-4">New Ride Request</label>
                
                <gridLayout rows="auto, auto, auto" columns="auto, *" className="mb-4">
                    <label row="0" col="0" className="text-gray-500 mr-2">Pickup:</label>
                    <label row="0" col="1" className="font-bold">{job.pickup}</label>
                    
                    <label row="1" col="0" className="text-gray-500 mr-2">Dropoff:</label>
                    <label row="1" col="1" className="font-bold">{job.dropoff}</label>
                    
                    <label row="2" col="0" className="text-gray-500 mr-2">Fare:</label>
                    <label row="2" col="1" className="font-bold text-green-600">${job.fare}</label>
                </gridLayout>

                <gridLayout columns="*, *" className="mt-4">
                    <button
                        col="0"
                        className="bg-red-500 text-white p-4 rounded-lg m-2"
                        onTap={() => onDecline(job.id)}
                    >
                        Decline
                    </button>
                    <button
                        col="1"
                        className="bg-green-500 text-white p-4 rounded-lg m-2"
                        onTap={() => onAccept(job.id)}
                    >
                        Accept
                    </button>
                </gridLayout>
            </stackLayout>
        </absoluteLayout>
    );
}