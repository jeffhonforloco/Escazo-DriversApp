import * as React from "react";
import { Image } from "@nativescript/core";

interface ProfileHeaderProps {
    name: string;
    rating: number;
    isOnline: boolean;
    onStatusChange: (status: boolean) => void;
}

export function ProfileHeader({ name, rating, isOnline, onStatusChange }: ProfileHeaderProps) {
    return (
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
            <gridLayout columns="auto, *" rows="auto, auto" className="mb-4">
                <image
                    col="0"
                    rowSpan="2"
                    src="~/assets/images/profile-placeholder.png"
                    className="w-20 h-20 rounded-full mr-4"
                />
                
                <label col="1" row="0" className="text-xl font-bold">
                    {name}
                </label>
                
                <stackLayout col="1" row="1" orientation="horizontal">
                    <label className="text-yellow-500 mr-1">★</label>
                    <label className="text-gray-600">{rating.toFixed(1)}</label>
                </stackLayout>
            </gridLayout>

            <button
                className={`p-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}
                onTap={() => onStatusChange(!isOnline)}
            >
                {isOnline ? 'Online' : 'Offline'}
            </button>
        </stackLayout>
    );
}