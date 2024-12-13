import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    const [isOnline, setIsOnline] = React.useState(false);

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-3xl mb-6 font-bold text-center">
                Escazo Driver
            </label>
            
            <stackLayout className="mb-4 p-4 bg-white rounded-lg">
                <label className="text-xl mb-2">Driver Status</label>
                <button
                    className={`p-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}
                    onTap={() => setIsOnline(!isOnline)}
                >
                    {isOnline ? 'Online' : 'Offline'}
                </button>
            </stackLayout>

            <stackLayout className="mb-4 p-4 bg-white rounded-lg">
                <label className="text-xl mb-2">Today's Stats</label>
                <gridLayout columns="*, *" rows="auto, auto" className="text-center">
                    <label row="0" col="0" className="p-2">Trips: 0</label>
                    <label row="0" col="1" className="p-2">Earnings: $0</label>
                    <label row="1" col="0" className="p-2">Time: 0h</label>
                    <label row="1" col="1" className="p-2">Rating: 0.0</label>
                </gridLayout>
            </stackLayout>

            <button
                className="text-blue-600 text-lg"
                onTap={() => navigation.navigate("Two", { message: "View Trip History" })}
            >
                View History
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 16,
        backgroundColor: "#f5f5f5"
    }
});