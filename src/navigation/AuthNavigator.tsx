import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { SignupScreen } from "../screens/auth/SignupScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";

const StackNavigator = stackNavigatorFactory();

export function AuthNavigator() {
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
                name="Login"
                component={LoginScreen}
                options={{ title: "Login" }}
            />
            <StackNavigator.Screen
                name="Signup"
                component={SignupScreen}
                options={{ title: "Create Account" }}
            />
            <StackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ title: "Reset Password" }}
            />
        </StackNavigator.Navigator>
    );
}