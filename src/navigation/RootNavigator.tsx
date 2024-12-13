import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";
import { OnboardingNavigator } from "./OnboardingNavigator";
import { useAuth } from "../hooks/useAuth";

const StackNavigator = stackNavigatorFactory();

export function RootNavigator() {
    const { isAuthenticated, isVerified } = useAuth();

    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {!isAuthenticated ? (
                <StackNavigator.Screen
                    name="Auth"
                    component={AuthNavigator}
                />
            ) : !isVerified ? (
                <StackNavigator.Screen
                    name="Onboarding"
                    component={OnboardingNavigator}
                />
            ) : (
                <StackNavigator.Screen
                    name="Main"
                    component={MainNavigator}
                />
            )}
        </StackNavigator.Navigator>
    );
}