import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface Job {
    id: string;
    pickup: string;
    dropoff: string;
    fare: number;
    time: string;
}

interface JobsListProps {
    jobs: Job[];
}

export function JobsList({ jobs }: JobsListProps) {
    return (
        <stackLayout className="mb-4">
            <label className="text-xl font-bold mb-2">Upcoming Jobs</label>
            <listView items={jobs} className="rounded-lg">
                {(job: Job) => (
                    <gridLayout className="p-4 bg-white mb-2" rows="auto, auto" columns="*, auto">
                        <stackLayout row="0" col="0">
                            <label className="font-bold">Pickup: {job.pickup}</label>
                            <label>Dropoff: {job.dropoff}</label>
                        </stackLayout>
                        <stackLayout row="0" col="1" className="text-right">
                            <label className="text-green-600 font-bold">${job.fare}</label>
                            <label className="text-sm text-gray-500">{job.time}</label>
                        </stackLayout>
                    </gridLayout>
                )}
            </listView>
        </stackLayout>
    );
}