import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "../screens/home/HomeScreen";
import { TripScreen } from "../screens/trip/TripScreen";
import { EarningsScreen } from "../screens/earnings/EarningsScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

const StackNavigator = stackNavigatorFactory();

export function MainNavigator() {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#5D3FD3"
                },
                headerTintColor: "#ffffff"
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Dashboard" }}
            />
            <StackNavigator.Screen
                name="Trip"
                component={TripScreen}
                options={{ title: "Current Trip" }}
            />
            <StackNavigator.Screen
                name="Earnings"
                component={EarningsScreen}
                options={{ title: "Earnings" }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />
        </StackNavigator.Navigator>
    );
}