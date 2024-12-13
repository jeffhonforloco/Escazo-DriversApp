import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { ScreenOne } from "./ScreenOne";
import { ScreenTwo } from "./ScreenTwo";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="One"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2563eb",
                },
                headerTintColor: "#ffffff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="One"
                component={ScreenOne}
                options={{ title: "Driver Dashboard" }}
            />
            <StackNavigator.Screen
                name="Two"
                component={ScreenTwo}
                options={{ title: "Trip History" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);