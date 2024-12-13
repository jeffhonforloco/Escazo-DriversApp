import * as React from "react";
import { MapView, Marker, Polyline } from "@nativescript/google-maps";
import type { Location } from "@nativescript/core";

interface TripMapProps {
    pickup: string;
    dropoff: string;
    driverLocation: Location | null;
}

export function TripMap({ pickup, dropoff, driverLocation }: TripMapProps) {
    return (
        <mapView
            className="w-full h-full"
            zoom={15}
            showUserLocation={true}
            mapReady={(e) => {
                // Initialize map
                const map = e.object;
                // Add markers and route
            }}
        >
            {driverLocation && (
                <marker
                    position={driverLocation}
                    title="Your Location"
                    snippet="Current position"
                    icon="~/assets/images/car-marker.png"
                />
            )}
            
            <marker
                position={pickup}
                title="Pickup"
                snippet="Pickup location"
                icon="~/assets/images/pickup-marker.png"
            />
            
            <marker
                position={dropoff}
                title="Dropoff"
                snippet="Dropoff location"
                icon="~/assets/images/dropoff-marker.png"
            />
        </mapView>
    );
}