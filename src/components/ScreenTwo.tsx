import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ScreenTwoProps = {
    route: RouteProp<MainStackParamList, "Two">,
    navigation: FrameNavigationProp<MainStackParamList, "Two">,
};

export function ScreenTwo({ navigation, route }: ScreenTwoProps) {
    const mockTrips = [
        { id: 1, date: '2024-03-20', pickup: '123 Main St', dropoff: '456 Oak Ave', earnings: '$25.50' },
        { id: 2, date: '2024-03-19', pickup: '789 Pine St', dropoff: '321 Elm St', earnings: '$18.75' },
    ];

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold">Trip History</label>
            
            <listView items={mockTrips} className="w-full">
                {(trip) => (
                    <gridLayout className="p-4 mb-2 bg-white rounded-lg" rows="auto, auto" columns="*, auto">
                        <label row="0" col="0" className="font-bold">{trip.date}</label>
                        <label row="0" col="1" className="text-green-600">{trip.earnings}</label>
                        <stackLayout row="1" col="0" colSpan="2">
                            <label className="text-gray-600">From: {trip.pickup}</label>
                            <label className="text-gray-600">To: {trip.dropoff}</label>
                        </stackLayout>
                    </gridLayout>
                )}
            </listView>

            <button
                className="text-blue-600 text-lg mt-4"
                onTap={() => navigation.goBack()}
            >
                Back to Dashboard
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        padding: 16,
        backgroundColor: "#f5f5f5"
    }
});