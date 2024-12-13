import * as React from "react";
import { useState, useEffect } from "react";
import { ScreenProps } from "../../navigation/types";
import { useLocation } from "../../hooks/useLocation";
import { useNotifications } from "../../hooks/useNotifications";
import { TripDetails } from "../../components/trip/TripDetails";
import { TripActions } from "../../components/trip/TripActions";
import { TripMap } from "../../components/trip/TripMap";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { TripsService } from "../../services/api/trips.service";
import type { Trip } from "../../services/api/types";

export function TripScreen({ route, navigation }: ScreenProps<"Trip">) {
    const { tripId } = route.params;
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { location } = useLocation();
    const { showNotification } = useNotifications();

    useEffect(() => {
        fetchTripDetails();
    }, [tripId]);

    const fetchTripDetails = async () => {
        try {
            setLoading(true);
            const tripData = await TripsService.getTripById(tripId);
            setTrip(tripData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load trip details");
        } finally {
            setLoading(false);
        }
    };

    const handleStartTrip = async () => {
        if (!trip) return;
        try {
            await TripsService.startTrip(trip.id);
            showNotification("Trip Started", "You can now proceed to pickup location");
            fetchTripDetails();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to start trip");
        }
    };

    const handleCompleteTrip = async () => {
        if (!trip) return;
        try {
            await TripsService.completeTrip(trip.id);
            showNotification("Trip Completed", "Thank you for driving with Escazo");
            navigation.navigate("Home");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to complete trip");
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={fetchTripDetails} />;
    }

    if (!trip) {
        return <ErrorMessage message="Trip not found" />;
    }

    return (
        <gridLayout rows="*, auto">
            <TripMap
                row={0}
                pickup={trip.pickup}
                dropoff={trip.dropoff}
                driverLocation={location}
            />
            
            <stackLayout row={1} className="bg-white p-4">
                <TripDetails
                    pickup={trip.pickup}
                    dropoff={trip.dropoff}
                    fare={trip.fare}
                    distance={trip.distance}
                    estimatedTime={trip.duration}
                    status={trip.status}
                />
                
                <TripActions
                    status={trip.status}
                    onStart={handleStartTrip}
                    onComplete={handleCompleteTrip}
                />
            </stackLayout>
        </gridLayout>
    );
}